 // src/app.ts
import express from 'express';
import path from 'path';

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

