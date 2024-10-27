const socket = io('http://localhost:8000'); 

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer= document.querySelector(".container");


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); // Combine classes
    messageElement.classList.add(position); 
    messageContainer.append(messageElement);
};

// Use 'submit' event with 'e' parameter
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''; // Clear the input field
});

form.addEventListener('submit', ()=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, "right");
    socket.emit('send', 'message');
    messageInput.value = ''

})
// Prompt for the user's name
const name = prompt("Enter your name here to join the chat!!!");
socket.emit('new-user-joined', name);

// Handle user joining
socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'right'); // Align to left
});

// Receive messages from others
socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left'); // Align to left
});





