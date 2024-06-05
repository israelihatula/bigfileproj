import * as express from 'express';
import { Request, Response } from 'express';
import * as fs from 'fs';
import axios from 'axios';

const app = express();
const PORT = 3000;
const FILE_PATH = './file';

app.get('/', async (req: Request, res: Response) => {
  try {
    const stat = fs.statSync(FILE_PATH);
    const fileSize = stat.size;
    const stream = fs.createReadStream(FILE_PATH);

    const response = await axios({
      method: 'post',
      url: 'http://localhost:4000/receive-file',
      data: stream,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileSize.toString()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    res.status(200).send('File sent successfully');
  } catch (error) {
    console.error('Error sending file:', error);
    res.status(500).send('Failed to send file');
  }
});

app.listen(PORT, () => {
  console.log(`Sender server is running on http://localhost:${PORT}`);
});
