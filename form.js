document.addEventListener('DOMContentLoaded', () => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const form = document.getElementById('inquiryForm');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    const restrictToLetters = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    };

    firstName.addEventListener('input', restrictToLetters);
    lastName.addEventListener('input', restrictToLetters);

    phone.addEventListener('input', (e) => {
        let cleanNumbers = e.target.value.replace(/[^0-9]/g, '');

        if (cleanNumbers.length > 0 && cleanNumbers[0] !== '9') {
            cleanNumbers = '';
        }

        if (cleanNumbers.length > 10) {
            cleanNumbers = cleanNumbers.slice(0, 10);
        }

        e.target.value = cleanNumbers;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.style.borderColor = '#d9534f';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            email.style.borderColor = '#ccc';
            emailError.style.display = 'none';
        }

        // Validate Phone
        if (phone.value.trim().length !== 10 || phone.value[0] !== '9') {
            phone.style.borderColor = '#d9534f';
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phone.style.borderColor = '#ccc';
            phoneError.style.display = 'none';
        }

        // Validate Text Fields
        const textFields = [firstName, lastName, subject, message];
        textFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#d9534f';
                isValid = false;
            } else {
                field.style.borderColor = '#ccc';
            }
        });

        if (isValid) {
            window.location.hash = "popup1";
            form.reset();
        }
    });
});