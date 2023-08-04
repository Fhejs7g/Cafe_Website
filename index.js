const admin = require('firebase-admin')
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');


const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const bookRouter = require('./routes/book');

const app = express();


const path = require('path');
const mime = require('mime')

//
app.get('*.js', (req, res, next) => {
  res.type('application/javascript');
  next();
});


app.get('*.css', (req, res, next) => {
  res.type('text/css');
  next();
});


app.get('*.(png|jpg|jpeg|gif|ico)', (req, res, next) => {
  const filePath = path.join(__dirname, req.url);
  const contentType = mime.getType(filePath);
  res.type(contentType);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static('public', { maxAge: '1h' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['lkasld235j'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);



app.use(authRouter); 
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);
app.use(bookRouter);


 
app.listen(3001, () => {
  console.log('running server on port: http://localhost:3001')
});
