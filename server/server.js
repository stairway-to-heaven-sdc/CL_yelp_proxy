const nr = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cors());
app.use('/bizs/:bId', express.static(`${__dirname}/../public`));
app.use(express.static(`${__dirname}/../public`));

/**biz service */
// app.use('/biz', proxy({ target: process.env.Biz, changeOrigin: true }));
// /**photo service */
// app.use('/biz_photos', proxy({target: process.env.Biz, changeOrigin: true}));
/**review service */
app.use('/reviews', proxy({ target: "http://ec2-3-82-56-93.compute-1.amazonaws.com:3002", changeOrigin: true }));
/**user service */
app.use('/user/', proxy({ target: "http://ec2-3-82-56-93.compute-1.amazonaws.com:3002", changeOrigin: true }));
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


