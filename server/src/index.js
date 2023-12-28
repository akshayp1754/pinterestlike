import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import logger,{morganMiddleware} from './logger'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import { connectDB } from './utils/db.utils'
import postRoutes from "./routes/post";
import commentRoutes from "./routes/comment";
import axios from 'axios'
import FormData from "form-data";
require('events').EventEmitter.prototype._maxListeners = 60;

const app = express()
const PORT = process.env.PORT || 8080

connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morganMiddleware)
app.use('/auth', authRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

app.get('/', (req, res) =>{
    res.send(`Server is running `)
})

app.get("/seed-db", async (req, res) => {
  const imageCount = 30;
  const imageWidths = Array.from(
    { length: imageCount },
    () => Math.floor(Math.random() * 1000) + 200
  );
  const imageHeights = Array.from(
    { length: imageCount },
    () => Math.floor(Math.random() * 1000) + 200
  );
  const imageUrls = Array.from(
    { length: imageCount },
    (_, i) => `https://picsum.photos/${imageWidths[i]}/${imageHeights[i]}`
  );

  const dataArr = [];
  for (let i = 0; i < imageCount; i++) {
    const response = await axios.get(imageUrls[i], {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");
    const fd = new FormData();
    fd.append(`image`, buffer, { filename: `image-${i}.jpg` });
    fd.append(`title`, `Random Image ${i}`);
    dataArr.push(fd);
  }

  const postPromises = [];
  for (let i = 0; i < imageCount; i++) {
   const fd = dataArr[i];
    postPromises.push(axios.post("http://localhost:8080/post", fd, {}));
  }

  Promise.all(postPromises)
    .then(() => {
      res.send("Posts created successfully");
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error creating posts");
    });
});

// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dymn8ioz4', 
//   api_key: '318657514335847', 
//   api_secret: 'Ubaq4Izk6LXobA0QHW40vr8UE3U' 
// });

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`)
})