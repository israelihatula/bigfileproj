const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const SAVE_PATH = './gettedfile';

// Set limit for incoming payload to handle large files
app.use(express.json({ limit: '20gb' }));
app.use(express.urlencoded({ limit: '20gb', extended: true }));

app.post('/receive-file', (req, res) => {
    const writeStream = fs.createWriteStream(SAVE_PATH);
    req.pipe(writeStream);

    writeStream.on('finish', () => {
        res.status(200).send('File received successfully');
    });

    writeStream.on('error', (error) => {
        console.error('Error saving file:', error);
        res.status(500).send('Failed to receive file');
    });
});

app.listen(PORT, () => {
    console.log(`Receiver server is running on http://localhost:${PORT}`);
});
