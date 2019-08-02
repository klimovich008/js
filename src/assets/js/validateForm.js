const errorTexts = {
    "firstName": "Please enter your first name",
    "lastName": "Please enter your last name",
    "phoneNumber": "Please enter your phone number",
    "phoneExtension": "Please enter your phone extension",
    "currentPassword": "Please enter your current password",
    "businessName": "Please enter your business name",
    "gstNumber": "Please enter your GST number (#########AA####)",
    "addressFirst": "Please enter your shipping address",
    "shippingAddress": "Please enter your shipping address",
    "billingAddress": "Please enter your billing address",
    "transitNumber": "Please enter your transit number",
    "accountNumber": "Please enter your account number",
    "postalCodeUp": "Please enter your postal code",
    "postalCodeBottom": "Please enter your postal code",
    "addressCityUp": "Please enter your city",
    "addressCityBottom": "Please enter your city",
    "birthDate": "Please enter your birthdate"
}

function InputFocus(event) {
    event.target.classList.remove('validation-error');
}

function ValidateForm() {
    let fields = document.querySelectorAll('input[required]');
    fields.forEach(function(element){
        if (!element.value) {
            element.classList.add('validation-error');
            element.placeholder = 'REQUIRED';
            const le = document.getElementById(element.id + "-error");
            const spanMessage = errorTexts[element.name];
            if (element.name === "currentPassword") {
                let toggler = document.querySelector('.js-password-toggler');
                toggler.classList.add("toggler_disable");
            }
            le.textContent = spanMessage;
            le.style.cssText = "display: block";
            element.onfocus = InputFocus
        }
    })
}
