const form = document.getElementById("form");
const messageBoard = document.getElementById("messageBoard");
const serverURL = import.meta.env.VITE_Server;

//Add an event listener to the submit message button
// This is async because we don't want fetch to occur until user sends info to the server.
form.addEventListener("submit", async (event) => {
  event.preventDefault(); //Prevents the default behaviour of the button which allows us to handle what happens with the form submission

  const formData = new FormData(form); //will look at form in HTML and create an object with key:value pairs
  const messageData = Object.fromEntries(formData); //turn it into object

  //saving the response to the server
  const response = await fetch(`${serverURL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, //so it knows the data to send is json
    body: JSON.stringify(messageData), //turns the input data into json
  });
  if (response.ok) {
    displayMessages(); //should redisplay the messages including newly created message
  } else {
    console.error("Message failed to send", response.status);
  }
});

//fetches all the messages in the database in the server and returns that.
async function fetchMessages() {
  const messages = await fetch(`${serverURL}/messages`);
  let result = await messages.json();
  return result;
}

//displays all the messages within the database
async function displayMessages() {
  let messages = await fetchMessages(); //array of all messages (as objects) in database

  messageBoard.innerHTML = " "; //stops creation of multiple duplicate entries
  //loops through each message to create elements to be displayed
  messages.forEach((message) => {
    let usernameH3 = document.createElement("h3");
    let messageP = document.createElement("p");
    let messageContainer = document.createElement("div");

    usernameH3.textContent = message.username;
    messageP.textContent = message.message;

    messageContainer.classList.add("message-container");

    messageContainer.appendChild(usernameH3);
    messageContainer.appendChild(messageP);

    messageBoard.appendChild(messageContainer);
  });
}

displayMessages();
