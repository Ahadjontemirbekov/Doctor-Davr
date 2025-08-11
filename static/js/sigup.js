document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    form.addEventListener('submit', function (e) {
        if (password.value !== confirmPassword.value) {
            e.preventDefault();
            alert("Parollar mos kelmadi! Iltimos, parollarni tekshiring.");
        }
    });
});
