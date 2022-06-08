const backendAddr = 'http://127.0.0.1:3000';

// Get message for current queryString (key)
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

// Save new message tot queryString (key)
const saveMessage = () => {
  const locker = new URLSearchParams(window.location.search);

  const newMessage = document.getElementById("new-message-text").value;

  fetch(`${backendAddr}/${locker.get("locker")}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: newMessage,
    }),
  }).then(res => {
    if (!res.ok) {
      throw(res.statusText);
    }
    return res.json();
  }).then(data => {
    alert("Message changed successfully!");
    location.reload();
  }).catch(err => {
    console.log(`Error: ${err}`);
    alert("Unsuccessful in updating message. Try again later");
  });
}

getMessage();
