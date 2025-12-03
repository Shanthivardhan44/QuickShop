// Simple client-side login — checks users saved in localStorage and redirects to quick.html
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const emailEl = document.getElementById('email');
    const pwEl = document.getElementById('password');
    const togglePw = document.getElementById('toggle-pw');
    const errorEl = document.getElementById('error');

    togglePw.addEventListener('click', () => {
        const t = pwEl.type === 'password' ? 'text' : 'password';
        pwEl.type = t;
        togglePw.textContent = t === 'password' ? 'Show' : 'Hide';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errorEl.hidden = true;

        const email = (emailEl.value || '').trim().toLowerCase();
        const pw = pwEl.value || '';

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('Enter a valid email address.');
            return;
        }
        if (pw.length < 4) {
            showError('Password must be at least 4 characters.');
            return;
        }

        // load stored users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email);

        // allow demo user fallback
        const demoOK = (email === 'demo@quickshop.com' && pw === 'demo123');

        if (user) {
            if (user.password !== pw) {
                showError('Incorrect password.');
                return;
            }
        } else if (!demoOK) {
            showError('No account found. Please sign up.');
            return;
        }

        // save session (minimal)
        const session = { email, ts: Date.now() };
        try {
            if (document.getElementById('remember').checked) localStorage.setItem('quickshop_session', JSON.stringify(session));
            else sessionStorage.setItem('quickshop_session', JSON.stringify(session));
        } catch (err) {
            // ignore storage errors
        }

        // redirect to main page
        window.location.href = 'quick.html';
    });

    function showError(msg) {
        errorEl.textContent = msg;
        errorEl.hidden = false;
    }
});

// example: replace local check with server login
async function serverLogin(email, password, remember) {
  const res = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  const token = data.token;
  if (remember) localStorage.setItem('quickshop_token', token);
  else sessionStorage.setItem('quickshop_token', token);
  // Save basic user
  localStorage.setItem('quickshop_user', JSON.stringify(data.user));
  window.location.href = '/quick.html';
}
