
function toggleForm(form) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');

    if (form === 'login') {
        loginForm.classList.add('active-form');
        signupForm.classList.remove('active-form');
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
    } else {
        signupForm.classList.add('active-form');
        loginForm.classList.remove('active-form');
        signupToggle.classList.add('active');
        loginToggle.classList.remove('active');
    }
}

function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function validateLoginForm() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username.length < 3 || password.length < 5) {
        alert('Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.');
        return false;
    }
    alert('Kirish muvaffaqiyatli!');
    return false;
}

function validateSignupForm() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (name.length < 3 || !email.includes('@') || password.length < 6 || password !== confirmPassword) {
        alert('Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.');
        return false;
    }
    alert('Ro‘yxatdan o‘tish muvaffaqiyatli!');
    return false;
}
