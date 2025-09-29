import express from 'express';

const PORT = 8000;
const app = express();


app.listen(PORT, (err) => {
    if(err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});