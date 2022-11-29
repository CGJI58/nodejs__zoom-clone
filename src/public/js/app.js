const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nicknameForm");
const messageForm = document.querySelector("#messageForm");
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
  const message = { type, payload };
  return JSON.stringify(message);
};

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
});

nicknameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
});

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});
