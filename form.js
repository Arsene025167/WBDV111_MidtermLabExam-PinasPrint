document.addEventListener('DOMContentLoaded', () => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const form = document.getElementById('inquiryForm');
    const emailError = document.getElementById('emailError');

    // Filter to allow ONLY letters and spaces for names
    const letterOnlyFilter = (e) => {
        // Replace anything that is not a letter or a space with an empty string
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    };

    firstName.addEventListener('input', letterOnlyFilter);
    lastName.addEventListener('input', letterOnlyFilter);

    // Filter to allow ONLY numbers for the phone field
    phone.addEventListener('input', (e) => {
        // Replace anything that is not a number with an empty string
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Handle Form Submission and Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        let isValid = true;

        // 1. Email Validation (Strict Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.style.borderColor = '#d9534f';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            email.style.borderColor = '#ccc';
            emailError.style.display = 'none';
        }

        // 2. Phone Validation (Must be exactly 10 digits since +63 is prefixed)
        if (phone.value.length !== 10) {
            phone.style.borderColor = '#d9534f';
            alert('Phone number must contain exactly 10 digits following the +63 prefix.');
            isValid = false;
        } else {
            phone.style.borderColor = '#ccc';
        }

        // 3. Ensure other fields aren't empty
        if (!firstName.value.trim() || !lastName.value.trim()) {
            alert('Please ensure your first and last name are filled out.');
            isValid = false;
        }

        // Final Check
        if (isValid) {
            alert('Form successfully submitted!');
            form.reset(); // Optional: clears the form after success
        }
    });
});