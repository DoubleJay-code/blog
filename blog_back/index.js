import express from 'express';
import mongoose from 'mongoose';
import PostModel from './models/Post.js';
import cors from 'cors';

mongoose
  .connect(
    'mongodb+srv://admin:1234567890@cluster0.58jigvb.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => {
    console.log('DB error', err);
  });

const app = express();
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(express.json());
app.use(cors());

const posts = PostModel.find().then((res) => console.log(res));

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/posts', async (req, res) => {
  const posts = await PostModel.find();
  res.send(posts);
});

app.post('/send/posts', (req, res) => {
  try {
    if (!req.body.title || !req.body.text) {
      return res.status(400).json({
        success: false,
      });
    }
    const post = new PostModel({
      title: req.body.title,
      text: req.body.text,
    });
    post.save();
    res.json({
      success: true,
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massage: 'Что то пошло не так',
    });
  }
});

app.listen(3001, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
