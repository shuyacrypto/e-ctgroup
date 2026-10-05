// Enquiry form handler: emails each submission to team@e-ctgroup.co.uk via Resend.
// Needs RESEND_API_KEY set in Vercel (Settings → Environment Variables).
// ENQUIRY_FROM is optional; until e-ctgroup.co.uk is verified in Resend it falls back to Resend's test sender.

const TO = 'team@e-ctgroup.co.uk';
const FROM = process.env.ENQUIRY_FROM || 'E-CT Group website <onboarding@resend.dev>';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const LIMITS = { name: 200, org: 200, role: 100, email: 254, message: 5000 };

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ ok: false, error: 'Email is not configured' });
  }

  var body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'Invalid request' });

  // Bots fill the hidden "website" field; real visitors never see it. Pretend it worked.
  if (body.website) return res.status(200).json({ ok: true });

  var f = {};
  for (var k in LIMITS) f[k] = String(body[k] || '').trim().slice(0, LIMITS[k]);
  if (!f.name || !EMAIL_RE.test(f.email)) {
    return res.status(400).json({ ok: false, error: 'Please add your name and a valid work email.' });
  }

  var oneLine = function (s) { return s.replace(/[\r\n]+/g, ' '); };
  var subject = 'Supplier information request' + (f.org ? ' from ' + oneLine(f.org) : '');
  var text = 'Name: ' + f.name + '\nOrganisation: ' + f.org + '\nRole: ' + f.role + '\nEmail: ' + f.email + '\n\n' + f.message;

  try {
    var r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: f.email, subject: subject, text: text })
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'Could not send' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Resend request failed', e);
    return res.status(502).json({ ok: false, error: 'Could not send' });
  }
};
