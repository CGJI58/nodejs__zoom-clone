const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
});

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message from the server:", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});
