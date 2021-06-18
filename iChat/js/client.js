const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const message = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message", position); 
  messageContainer.append(messageElement);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = message.value;
  append(`You: ${data}`, "right");
  socket.emit("send", data);
  message.value = "";
});

let name = prompt("enter your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

socket.on("received", ({ message, name }) => {
  console.log(message);
  append(`${name}: ${message}`, "left");
});

socket.on('left',({name})=>{
  append(`${name} left the chat`,'left');
})


