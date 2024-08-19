function updateFeedback(input, isValid, message) {
    const feedbackElement = document.getElementById(`${input.id}Feedback`);
    if (isValid) {
        feedbackElement.innerHTML = '<i class="fa-solid fa-check form-valid"></i>';
        input.classList.remove('error');
        input.classList.add('valid');
    } else {
        feedbackElement.innerHTML = `<i class="fa-solid fa-xmark form-error"></i> ${message}`;
        input.classList.remove('valid');
        input.classList.add('error');
    }
}

function validateName() {
    const name = document.getElementById('name').value;
    const isValid = /^[A-Za-z\s]{3,}$/.test(name);
    updateFeedback(document.getElementById('name'), isValid, 'Name must be at least 3 characters long and contain only letters and spaces.');
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    updateFeedback(document.getElementById('email'), isValid, 'Please enter a valid email address.');
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const isValid = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(password);
    updateFeedback(document.getElementById('password'), isValid, 'Password must be at least 8 characters long and contain both letters and numbers.');
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const isValid = confirmPassword === password;
    updateFeedback(document.getElementById('confirmPassword'), isValid, 'Passwords do not match.');
}

function validateDob() {
    const dobInput = document.getElementById('dob').value;
    const dob = new Date(dobInput);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const isValid = dob <= maxDate && dob >= minDate;
    updateFeedback(document.getElementById('dob'), isValid, 'You must be at least 18 years old and not older than 120 years.');
    return isValid;
}

function checkAge() {
    const dobInput = document.getElementById('dob').value;
    const dob = new Date(dobInput);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    const submitButton = document.getElementById('submitButton');
    if (age < 18) {
        submitButton.disabled = true;
        updateFeedback(document.getElementById('dob'), false, 'You must be at least 18 years old.');
    } else {
        submitButton.disabled = false;
        updateFeedback(document.getElementById('dob'), true, '');
    }
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    const dobValid = validateDob();
    checkAge();

    if (document.querySelectorAll('.form-control.error').length === 0 && dobValid) {
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
    }
});

document.getElementById('name').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);
document.getElementById('dob').addEventListener('input', function() {
    validateDob();
    checkAge();
});
