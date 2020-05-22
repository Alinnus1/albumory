const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


// body parsre
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));


//routes for api users
app.use('/api/users', require(path.join(__dirname, 'routes', 'api', 'users')));
app.use('/api/albums', require(path.join(__dirname, 'routes', 'api', 'albums')));


//get
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'albums.html'))
  });
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'))
  });
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
  });
app.get('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
      return;
    }
   
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));