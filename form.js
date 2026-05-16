document.addEventListener('DOMContentLoaded', () => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const form = document.getElementById('inquiryForm');
    const emailError = document.getElementById('emailError');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Filter to strictly allow ONLY letters and spaces for names
    const restrictToLetters = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    };

    firstName.addEventListener('input', restrictToLetters);
    lastName.addEventListener('input', restrictToLetters);

    // Filter to ONLY allow numbers and strictly limit to 10 characters
    phone.addEventListener('input', (e) => {
        // Remove any non-numeric character
        let cleanNumbers = e.target.value.replace(/[^0-9]/g, '');
        
        // Ensure max 10 digits
        if (cleanNumbers.length > 10) {
            cleanNumbers = cleanNumbers.slice(0, 10);
        }
        
        e.target.value = cleanNumbers;
    });

    // Handle Form Submission and Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        let isValid = true;

        // Validating Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.style.borderColor = '#d9534f';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            email.style.borderColor = '#ccc';
            emailError.style.display = 'none';
        }

        // Validate Contact Number (Exactly 10 digits)
        if (phone.value.trim().length !== 10) {
            phone.style.borderColor = '#d9534f';
            isValid = false; 
        } else {
            phone.style.borderColor = '#ccc';
        }

        // Validate that Text Fields aren't empty
        const textFields = [firstName, lastName, subject, message];
        textFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#d9534f';
                isValid = false;
            } else {
                field.style.borderColor = '#ccc';
            }
        });

        // Trigger Popup on Full Validation Pass
        if (isValid) {
            window.location.hash = "popup1";
            form.reset(); 
        }
    });
});