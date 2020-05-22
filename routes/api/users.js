const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const userData = require('../../Users');
const router = express.Router();


const salt = 10;
let users;

async function readUsers() {
    users = await userData.getAll();

    // all users
    router.get('/', (req, res) => res.json(users));

    // new user
    router.post('/', async (req, res) => {
        const newUser = {
          id: uuid.v4(),
          name: req.body.name,
          email: req.body.email,
          passHash: await bcrypt.hash(req.body.password, salt)
        };
        if (!newUser.name || !newUser.email) {
          res.status(400).json({
            msg: 'Please include all the info'
          });
        } else {
          users.push(newUser);
          res.json({
            msg: 'User registered!'
          });
          await userData.writeAll(users);
        }
      });
    //one user
    router.post('/user', (req, res) => {
        const found = users.some(user => user.id === req.body.id);
        if (found) {
          const user = users.filter(user => user.id === req.body.id)[0];
          res.json(user);
        } else {
          res.status(400).json({
            user: null
          });
        }
      });
      
    //one user for login
    router.post('/user/id', (req, res) => {
        const found = users.some(user => user.email === req.body.email);
        if (found) {
          const user = users.filter(user => user.email === req.body.email)[0];
          if (bcrypt.compareSync(req.body.password, user.passHash)) {
            res.json({
              found: true,
              id: user.id
            });
          } else {
            res.json({
              found: false
            });
          }
        } else {
          res.status(400).json({
            user: null
          });
        }
      });
}
readUsers();
module.exports = router;