/*
Project:    Project5 - Personal Web Site
Name:       Mitchel Bigler
Submitted:  8/2/24

Disclaimer:
    I declare that the following source code was written by me, or provided
    by the instructor for this project. I understand that copying source
    code from any other source, providing source code to another student, 
    or leaving my code on a public web site constitutes cheating.
    I acknowledge that  If I am found in violation of this policy this may result
    in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Changes:
    -- 
*/

/* ----CHECKBOXES---- */

// Make sure one box is checked
function validateCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="find-page"]');
    let valid = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    // Display an error message if none are checked
    let errorDiv = document.getElementById('checkboxError');
    if (errorDiv) {
        if (valid) {
            errorDiv.textContent = '';
        } else {
            errorDiv.textContent = 'Must select at least one option.';
        }
    }

    return valid;
}

/* ----TEMPLATE---- */

// Set format rules
let phoneRegex = /^(\+?(\d{1,3}))?[-.\s]?((\(\d{1,4}\))|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
let emailRegex = /^[\w._%+-]+@[\w.-]+\.(com|gov|edu|io|net)$/;
let zipCodeRegex = /^\d{5}(-\d{4})?$/;

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form = null;
let successMsg = null;

function initValidation(formId, successId) {
    form = document.getElementById(formId);
    successMsg = document.getElementById(successId);

    // Add change listeners to all inputs
    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        input.addEventListener("input", inputChanged); // Use 'input' event instead of 'change'
    }
    form.addEventListener("submit", submitForm);
}

// Validate if input changed
function inputChanged(ev) {
    let el = ev.currentTarget;
    // Validate only the specific field that changed
    validateField(el);
}

// Submit button pressed
function submitForm(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    // Validate entire form
    let allValid = validateForm() && validateCheckboxes();
    
    if (allValid) {
        successMsg.style.display = 'block';
        form.reset();
        form.style.display = 'none';
    } else {
        form.classList.add('was-validated');
    }
}

// Validate a specific field
function validateField(el) {
    let id = el.id;
    switch (id) {
        case 'state':
            validateState(id, "Not a valid State, enter two digit code e.g., UT");
            break;
        case 'email':
            checkFormat(id, "Email format is bad", emailRegex);
            break;
        case 'zip':
            checkFormat(id, `Malformed zip-code, please use either "#####", or "#####-####" format.`, zipCodeRegex);
            break;
        case 'phone':
            checkFormat(id, "Phone format is bad", phoneRegex);
            break;
        case 'first-name':
        case 'last-name':
        case 'address':
        case 'city':
            checkRequired(id, `${id.replace('-', ' ')} is Required`);
            break;
        case 'newspaper':
            validateCheckboxes(); // Validate checkboxes if they are changed
            break;
        default:
            break;
    }
}

// Run checkRequired against all inputs and validate checkboxes
function validateForm() {
    let valid = true;
    
    valid = checkRequired("first-name", "First Name is Required") && valid;
    valid = checkRequired("last-name", "Last Name is Required") && valid;
    valid = checkRequired("address", "Address is Required") && valid;
    valid = checkRequired("city", "City is Required") && valid;
  
    if (checkRequired("state", "State is Required")) {
        valid = validateState("state", "Not a valid State, enter two digit code e.g., UT") && valid;
    }
    if (checkRequired("email", "Email Address is required")) {
        valid = checkFormat("email", "Email format is bad", emailRegex) && valid;
    }
    if (checkRequired("zip", "Zip Code is Required")) {
        valid = checkFormat("zip", `Malformed zip-code, please use either "#####", or "#####-####" format.`, zipCodeRegex) && valid;
    }
    if (checkRequired("phone", "Phone is required")) {
        valid = checkFormat("phone", "Phone format is bad", phoneRegex) && valid;
    }
    valid = validateCheckboxes() && valid;

    return valid;
}

// Check 'State' input
function validateState(id, msg) {
    let el = document.getElementById(id);
    let value = el.value.toUpperCase().trim();
    let valid = stateAbbreviations.includes(value);
    setElementValidity(id, valid, msg);
    return valid;
}

// Check format controlled inputs against regexes 
function checkFormat(id, msg, regex) {
    let el = document.getElementById(id);
    let valid = regex.test(el.value.trim());
    setElementValidity(id, valid, msg);
    return valid;
}

// Check if input is required and valid
function checkRequired(id, message) {
    let el = document.getElementById(id);
    let valid = false;
    let type = el.type;

    switch (type) {
        case 'text':
        case 'password':
            valid = el.value.trim() !== '';
            break;

        case 'checkbox':
        case 'radio':
            const checkboxes = document.querySelectorAll(`input[name="${el.name}"]`);
            valid = Array.from(checkboxes).some(checkbox => checkbox.checked);
            break;
    }

    setElementValidity(id, valid, message);
    return valid;
}

// Set validity or set error message
function setElementValidity(id, valid, message) {
    let el = document.getElementById(id);
    let errorDiv = el.nextElementSibling;

    if (valid) {
        el.setCustomValidity('');
        if (errorDiv && errorDiv.classList.contains('errorMsg')) {
            errorDiv.textContent = '';
        }
    } else {
        el.setCustomValidity(message);
        if (errorDiv && errorDiv.classList.contains('errorMsg')) {
            errorDiv.textContent = message;
        }
    }
}

// Run on loaded
document.addEventListener('DOMContentLoaded', () => {
    initValidation('myform', 'success');
});
