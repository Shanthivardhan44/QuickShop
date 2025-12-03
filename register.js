// Simple client-side registration — stores users in localStorage (demo only)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('reg-email');
    const pwEl = document.getElementById('reg-password');
    const confEl = document.getElementById('reg-confirm');
    const errEl = document.getElementById('reg-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errEl.hidden = true;

        const name = (nameEl.value || '').trim();
        const email = (emailEl.value || '').trim().toLowerCase();
        const pw = pwEl.value || '';
        const conf = confEl.value || '';

        if (!name) return showError('Enter your name.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError('Enter a valid email address.');
        if (pw.length < 4) return showError('Password must be at least 4 characters.');
        if (pw !== conf) return showError('Passwords do not match.');

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) return showError('An account with this email already exists.');

        // store user (demo: plaintext password). For production use server-side storage and hashing.
        users.push({ name, email, password: pw, created: Date.now() });
        localStorage.setItem('users', JSON.stringify(users));

        // create session and redirect to main page
        const session = { email, name, ts: Date.now() };
        try { localStorage.setItem('quickshop_session', JSON.stringify(session)); } catch (err) { /* ignore */ }

        // redirect to quick.html after registration
        window.location.href = 'quick.html';
    });

    function showError(msg) {
        errEl.textContent = msg;
        errEl.hidden = false;
    }
});