// GET to backend
const getMessage = () => {
  const locker = new URLSearchParams(window.location.search);
  console.log(locker.get("locker"));
  if (!locker.get("locker")) {
    document.getElementById("message-text").innerText = ""; // DUMMY
    return "";
  }
  document.getElementById("message-text").innerText = locker.get("locker"); // DUMMY
  document.getElementById("new-message-text").value = locker.get("locker");
  /*
    request message from backend given locker
    If success, change text in span and textarea for editing
    else some error, so meaningful message
  */
};

// Toggle hidden for storing message in locker
const editMessage = () => {
  document.getElementById("new-message").hidden = false;
  document.getElementById("message").hidden = true;
}

// POST to backend
// Also need to handle meaningful indicator of success/failure. Just use an alert
const saveMessage = () => {
  alert("Message changed successfully!");
  location.reload(); // on success. Can also edit id values but id rather not
}
