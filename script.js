function sendMessage() {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        const chat = document.querySelector('.chat');

        // Create and append the user's message
        const userMessageElement = createMessageElement(messageText, 'user');
        chat.appendChild(userMessageElement);

        // Simulate a response after a short delay (for demonstration purposes)
        setTimeout(() => {
            const responseText = "This is a response from the other member.";
            const botMessageElement = createMessageElement(responseText, 'bot');
            chat.appendChild(botMessageElement);

            // Scroll to the bottom of the chat
            scrollToBottom();
        }, 500);

        // Clear the input field
        messageInput.value = '';

        // Scroll to the bottom of the chat
        scrollToBottom();
    }
}

function createMessageElement(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user' : 'bot');
    messageElement.innerHTML = `<p>${text}</p>`;
    return messageElement;
}

function scrollToBottom() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
