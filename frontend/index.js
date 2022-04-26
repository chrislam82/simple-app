const backendAddr = 'http://127.0.0.1:5000';

/*
  request message from backend given locker in querystring
  - change text in span and textarea on success
*/
const getMessage = () => {
  const locker = new URLSearchParams(window.location.search);
  if (!locker.get("locker")) {
    document.getElementById("message-text").innerText = "";
    return;
  }

  fetch(`${backendAddr}/${locker.get("locker")}`
  ).then(res => {
    if (!res.ok) {
      throw(res.statusText);
    }
    return res.json();
  }).then(data => {
    document.getElementById("message-text").innerText = data.message;
    document.getElementById("new-message-text").value = data.message;
  }).catch(err => {
    console.log(`Error: ${err}`);
    alert("Unable to access lockers. Try again later");
  });
};

// Toggle hidden for storing message in locker
const editMessage = () => {
  document.getElementById("new-message").hidden = false;
  document.getElementById("message").hidden = true;
}

// POST to backend
// Also need to handle meaningful indicator of success/failure. Just use an alert
const saveMessage = () => {
  console.log(document.getElementById("new-message-text"));
  return; 

  alert("Message changed successfully!");
  location.reload(); // on success. Can also edit id values but id rather not
}
