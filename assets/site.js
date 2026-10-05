// Enquiry form: builds an email to team@e-ctgroup.co.uk in the visitor's own email app.
(function () {
  var form = document.getElementById('enquiry');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var name = v('f-name'), org = v('f-org'), role = v('f-role'), email = v('f-email'), msg = v('f-msg');
    var note = document.getElementById('enquiry-note');
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      if (note) { note.textContent = 'Please add your name and a valid work email.'; note.style.color = '#B42318'; }
      (name ? document.getElementById('f-email') : document.getElementById('f-name')).focus();
      return;
    }
    var subject = 'Supplier information request' + (org ? ' from ' + org : '');
    var body = 'Name: ' + name + '\nOrganisation: ' + org + '\nRole: ' + role + '\nEmail: ' + email + '\n\n' + msg;
    window.location.href = 'mailto:team@e-ctgroup.co.uk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    if (note) { note.textContent = 'Your email app should now open with your message ready to send. If it does not, email team@e-ctgroup.co.uk directly.'; note.style.color = '#4A5568'; }
  });
  // Close the mobile menu after choosing a link
  var menu = document.querySelector('.mnav');
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.removeAttribute('open'); });
})();
