function changeAccountType(current) {
    const allTogglable = document.querySelectorAll("[data-accountType]")
    allTogglable.forEach(togglable => {
        togglable.style.display = togglable.dataset.accounttype === current ? 'block' : 'none';
    })
}

function changeAddressInfo(current) {
    const allTogglable = document.querySelectorAll("[data-addressInfo]")
    allTogglable.forEach(togglable => {
        togglable.style.display = togglable.dataset.addressinfo === current ? 'block' : 'none';
    })
}

function changePaymentMethod(current) {
    const allTogglable = document.querySelectorAll("[data-paymentMethod]")
    allTogglable.forEach(togglable => {
        togglable.style.display = togglable.dataset.paymentmethod === current ? 'block' : 'none';
    })
}

function onAccountTypeChange(e) {
    const current = e.checked ? "private" : "company";
    changeAccountType(current);
}

function onAddressInfoChange(e) {
    const current = e.checked ? "shrink" : "full";
    changeAddressInfo(current);
}

$(document).ready(function() {
    changeAccountType("company");
    changeAddressInfo("full");
    changePaymentMethod("card");
})
