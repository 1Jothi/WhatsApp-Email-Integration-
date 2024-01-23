import express, { static } from 'express';
import { urlencoded } from 'body-parser';
import twilio from 'twilio';
import { createTransport } from 'nodemailer';

const app = express();
const port = 3000;

// Twilio credentials
const accountSid = 'AC0166f3a1e8f87ee960ad7c3be7d082c6';
const authToken = 'e815c90bf6eb0a8b9fd4f38f436309ee';
const twilioClient = twilio(accountSid, authToken);

// Nodemailer configuration
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user:'rjothijesus@gmail.com',
        pass:'jpgxxykrfqahvkqa'
  },
});

app.use(urlencoded({ extended: true }));
app.use(static('public'));

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // Send WhatsApp message
  twilioClient.messages
    .create({
      from: 'whatsapp:+16193455508', // Twilio sandbox WhatsApp number
      to: 'whatsapp:+6383963146', // Replace with your WhatsApp number
      body: `New message from ${name} (${email}): ${message}`,
    })
    .then((whatsappMessage) => {
      console.log('WhatsApp Message SID:', whatsappMessage.sid);

      // Send email
      const mailOptions = {
        from: 'rjothijothi2002@gmail.com',
        to: 'rjothijesus@gmail.com',
        subject: 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Message sent successfully!');
        }
      });
    })
    .catch((error) => {
      console.error('Error sending WhatsApp message:', error);
      res.status(500).send('Error sending WhatsApp message');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;

    // Append user's message to the chat container
    appendMessage('sent', message);

    // Clear the input field
    messageInput.value = '';
    
    // Other logic (e.g., sending the message to server) remains the same
    // ...

    // For demonstration, we'll show an alert indicating success
    alert('Message sent successfully!');
}

function appendMessage(type, content) {
    const chatContainer = document.getElementById('chatContainer');
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${type}`;
    messageElement.innerText = content;
    chatContainer.appendChild(messageElement);

    // Scroll to the bottom to show the latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
