// Enquiry form: sends to team@e-ctgroup.co.uk via /api/enquiry, falling back to the visitor's email app if that fails.
(function () {
  var form = document.getElementById('enquiry');
  if (!form) return;
  var sending = false;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var name = v('f-name'), org = v('f-org'), role = v('f-role'), email = v('f-email'), msg = v('f-msg'), website = v('f-website');
    var note = document.getElementById('enquiry-note');
    var button = form.querySelector('button[type="submit"]');
    var say = function (text, color) { if (note) { note.textContent = text; note.style.color = color; } };
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      say('Please add your name and a valid work email.', '#B42318');
      (name ? document.getElementById('f-email') : document.getElementById('f-name')).focus();
      return;
    }
    var openEmailApp = function () {
      var subject = 'Supplier information request' + (org ? ' from ' + org : '');
      var body = 'Name: ' + name + '\nOrganisation: ' + org + '\nRole: ' + role + '\nEmail: ' + email + '\n\n' + msg;
      window.location.href = 'mailto:team@e-ctgroup.co.uk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      say('We could not send your request from the website, so your email app should now open with your message ready to send. If it does not, email team@e-ctgroup.co.uk directly.', '#4A5568');
    };
    sending = true;
    if (button) button.disabled = true;
    say('Sending your request…', '#4A5568');
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, org: org, role: role, email: email, message: msg, website: website })
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      form.reset();
      say('Thank you. Your request has been sent to team@e-ctgroup.co.uk and we will reply to ' + email + '.', '#027A48');
    }).catch(openEmailApp).then(function () {
      sending = false;
      if (button) button.disabled = false;
    });
  });
  // Close the mobile menu after choosing a link
  var menu = document.querySelector('.mnav');
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.removeAttribute('open'); });
})();
