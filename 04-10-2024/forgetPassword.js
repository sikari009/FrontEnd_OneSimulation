document.querySelector("#continue")?.addEventListener("click", ()=>{
        


// Select the form element
const form = document.querySelector('form');

// Listen for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the email input value
    const emailInput = document.querySelector('input[name="email"]').value;

    // Simple email validation (checks for the presence of @ and .)
    if (validateEmail(emailInput)) {
        // If the email is valid, you can process the request here
        console.log('Valid email:', emailInput);

        // Optionally, you can send the form data using an AJAX request
        sendResetPasswordRequest(emailInput);
    } else {
        alert('Please enter a valid email address.');
    }
});

})
// Function to validate the email format
function validateEmail(email) {
    // A simple email validation regex
    setTimeout(() => {
        window.location.href = "index.html";
    }, 5000);
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());

    
}

// Function to send the reset password request (mockup)
function sendResetPasswordRequest(email) {
    // Mockup of an AJAX request to reset password
    console.log(`Sending reset password request for: ${email}`);

    // Simulate a network request delay (you would use fetch/axios in a real app)
    setTimeout(() => {
        alert('A password reset link has been sent to your email.');
    }, 1000);
}

// setTimeout(() => {
//     window.location.href = "index.html";
// }, 5000);
