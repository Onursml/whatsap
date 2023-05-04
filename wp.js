const express = require('express');
const bodyParser = require('body-parser');

const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const client = new Client({ authStrategy: new LocalAuth() ,
    puppeteer: {
		args: ['--no-sandbox'],
	}

});

client.on('qr', qr => {
  // Generate and display QR code
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('authenticated', (session) => {
  // Save session data to reuse later
});

client.initialize();

const msg = (k,m) => {
    client.sendMessage(`${k}@c.us`, `${m}`)
}

app.get('/send-message', (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const message = req.query.message;
  
    console.log(phoneNumber, message);
  msg(phoneNumber,message)
    // Response handling goes here
    res.send('Message sent successfully!');
  
  });




app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});