const scriptURL = 'https://script.google.com/macros/s/AKfycbx2PkmYdYKU3CUQg9RJbQqyAUNeXET_X9sEOP3qd5F92fK6j50TPSXqeAL5UAYuZarwTg/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener("submit", e => {
    e.preventDefault();

    // ----------- VALIDATION -----------
    if (!form.Name.value.trim()) {
        alert("Please enter your name");
        return;
    }
    if (!form.Email.value.trim()) {
        alert("Please enter your email");
        return;
    }
    if (!form.Subject.value.trim()) {
        alert("Please enter a subject");
        return;
    }
    if (!form.Message.value.trim()) {
        alert("Please enter your message");
        return;
    }

    // ----------- SEND DATA -----------
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully!";
        setTimeout(() => (msg.innerHTML = ""), 5000);
        form.reset();
    })
    .catch(error => {
        console.error("Error!", error.message);
        msg.innerHTML = "Failed to send. Try again!";
    });
});