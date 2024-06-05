import * as fs from 'fs';

const FILE_PATH = './file';
const FILE_SIZE = 10 * 1024 * 1024 * 1024; // 10 GB in bytes

const createLargeFile = (filePath: string, size: number) => {
  const stream = fs.createWriteStream(filePath);

  stream.on('open', () => {
    let written = 0;
    const chunkSize = 1024 * 1024; // 1 MB
    const chunk = Buffer.alloc(chunkSize, '0'); // 1 MB chunk filled with '0'

    const writeChunk = () => {
      if (written >= size) {
        stream.end();
        console.log('File creation completed.');
        return;
      }

      stream.write(chunk, () => {
        written += chunkSize;
        writeChunk();
      });
    };

    writeChunk();
  });

  stream.on('error', (err) => {
    console.error('Error creating file:', err);
  });
};

createLargeFile(FILE_PATH, FILE_SIZE);
