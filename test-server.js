import express from 'express';
const app = express();
const PORT = 3005;

app.get('/', (req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`Test server on ${PORT}`);
  // Simulate something async
  setTimeout(() => {
    console.log('Async work done');
  }, 2000);
});
