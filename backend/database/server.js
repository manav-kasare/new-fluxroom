require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
app.use(cors());

// const IP = "192.168.43.89";
const IP = '192.168.1.23';
// const IP = '172.20.10.14';
const PORT = 8000;

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));

// Should be in .env
const SECRET_TOKEN =
  '5468ab9611b6647195adaef0fc673d6b1e9f7a92f0569b6ee8a556c820339a57ad5b68c0d284842acc6cb7d81c87f3fcb264dbf43aef14add7f7fce841f3f0da';

// Creating the transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fluxroom.demo@gmail.com',
    pass: 'Corona@123',
  },
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'xMySql@2020',
  database: 'fluxroom',
  multipleStatements: true,
});

// Sending Emails
app.get('/emailConfirmation', (req, res) => {
  const {toEmail, userID} = req.query;
  jwt.sign(
    {id: userID},
    SECRET_TOKEN,
    {expiresIn: '1d'},
    (err, accessToken) => {
      const url = `http://${IP}:8000/emailConfirmation/verify/${accessToken}`;

      // Setting the email
      let mailOptions = {
        from: 'fluxroom.demo@gmail.com',
        to: `${toEmail}`,
        subject: 'Please Verify your email',
        html: `Click this link to verify your email:  <a href="${url}">${url}</a>`,
      };
      // Sending the email
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) res.send(err);
        else res.send('success');
      });
    },
  );
});

// Confirming the email
app.get('/emailConfirmation/verify/:accessToken', async (req, res) => {
  try {
    const {id} = jwt.verify(req.params.accessToken, SECRET_TOKEN);
    connection.query(
      `UPDATE fluxroom.users SET confirmed='1' WHERE id='${id}'`,
      (err, results) => {
        if (err) res.send(err);
        else res.send('verified');
      },
    );
  } catch (err) {
    console.error(err);
  }
});

// Is Email registered to the database
app.get('/isEmailRegistered', (req, res) => {
  const {email} = req.query;
  connection.query(
    `SELECT id FROM fluxroom.users WHERE email='${email}'`,
    (err, results) => {
      if (err) res.send('does not exist');
      else if (results.length === 0) res.send('does not exist');
      else if (results.length > 0) res.send('exists');
    },
  );
});

app.get('/isUsernameRegistered', (req, res) => {
  const {username} = req.query;
  connection.query(
    `SELECT id FROM fluxroom.users WHERE username='${username}'`,
    (err, results) => {
      if (err) res.send('does not exist');
      else if (results.length === 0) res.send('does not exist');
      else if (results.length > 0) res.send('exists');
    },
  );
});

// Forgot Password
app.get('/forgotPassword', (req, res) => {
  const {toEmail} = req.query;
  jwt.sign(
    {email: toEmail},
    SECRET_TOKEN,
    {expiresIn: '1d'},
    (err, accessToken) => {
      const url = `http://${IP}:8000/changePassword/${accessToken}`;

      // Setting the email
      let mailOptions = {
        from: 'fluxroom.demo@gmail.com',
        to: `${toEmail}`,
        subject: 'Forgot Password',
        html: `<a href="${url}">Change Password</a>`,
      };
      // Sending the email
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) res.send(err);
        else res.send('success');
      });
    },
  );
});

// Confirming the email
app.get('/changePassword/:accessToken', (req, res) => {
  try {
    const {email} = jwt.verify(req.params.accessToken, SECRET_TOKEN);
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./ChangePassword.html', null, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.writeHead('File not Found');
      } else res.write(data);
      res.end();
    });
  } catch (err) {
    res.send(err);
  }
});

// Get users
app.get('/users', (req, res) => {
  connection.query(`SELECT * FROM users`, (err, results) => {
    if (err) res.send(err);
    else res.send({data: results});
  });
});

// Change Password
app.get('/user/changePassword', async (req, res) => {
  const {id, password} = req.query;
  const hashedPassword = await bcrypt.hash(password, 10);
  connection.query(
    `UPDATE fluxroom.users SET password='${hashedPassword}' WHERE id='${id}'`,
    (err, results) => {
      if (err) res.send('error');
      else res.send('success');
    },
  );
});

// Verify password
app.get('/user/verifyPassword', (req, res) => {
  const {id, password} = req.query;
  connection.query(
    `SELECT password FROM fluxroom.users WHERE id='${id}'`,
    async (err, results) => {
      if (err) res.send('error');
      else {
        const dbPassword = results[0].password;
        const isValid = await bcrypt.compare(password, dbPassword);
        if (isValid) res.send('valid');
        else res.send('error');
      }
    },
  );
});

// get user info
app.get('/user/info', (req, res) => {
  const {id} = req.query;
  connection.query(
    `SELECT * FROM fluxroom.users WHERE id='${id}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send({data: results});
    },
  );
});

app.get('/user/loginWithUsername', (req, res) => {
  const {username, password} = req.query;
  const hashing = async () => {
    connection.query(
      `SELECT * FROM fluxroom.users WHERE username='${username}'`,
      async (err, results) => {
        if (err) {
          res.send({data: 'error'});
        } else {
          const dbPassword = results[0].password;
          const isValid = await bcrypt.compare(password, dbPassword);
          if (isValid) res.send({data: results[0]});
          else res.send({data: 'error'});
        }
      },
    );
  };
  hashing();
});

app.get('/user/loginWithEmail', (req, res) => {
  const {email, password} = req.query;
  const hashing = async () => {
    connection.query(
      `SELECT * FROM fluxroom.users WHERE email='${email}'`,
      async (err, results) => {
        if (err) {
          res.send({data: 'error'});
        } else {
          const dbPassword = results[0].password;
          const isValid = await bcrypt.compare(password, dbPassword);
          if (isValid) res.send({data: results[0]});
          else res.send({data: 'error'});
        }
      },
    );
  };
  hashing();
});

// Add user to database
app.get('/user/add', async (req, res) => {
  const {email, password, id} = req.query;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  connection.query(
    `INSERT INTO fluxroom.users (id ,email, password, chatrooms) VALUES ('${id}', '${email}','${hashedPassword}', JSON_OBJECT('chatrooms', JSON_ARRAY()))`,
    (err, results) => {
      console.log(results);
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/user/updateProfilePhoto', (req, res) => {
  const {id, profilePhoto} = req.query;
  connection.query(
    `UPDATE fluxroom.users SET profilePhoto='${profilePhoto}' WHERE id='${id}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/user/updateUsernameDescription', (req, res) => {
  const {username, description, userID} = req.query;
  connection.query(
    `UPDATE fluxroom.users SET username='${username}', description='${description}' WHERE id='${userID}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/user/updateDescription', (req, res) => {
  const {id, description} = req.query;
  connection.query(
    `UPDATE fluxroom.users SET description='${description}' WHERE id='${id}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/user/updateEmail', (req, res) => {
  const {id, email} = req.query;
  connection.query(
    `UPDATE fluxroom.users SET email='${email}' WHERE id='${id}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

// Get user Chatroom
app.get('/user/chatrooms', (req, res) => {
  const {userID} = req.query;
  connection.query(
    `SELECT chatrooms FROM fluxroom.users WHERE id='${userID}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send(results);
    },
  );
});

app.get('/sendRequest', (req, res) => {
  const {fromID, toID} = req.query;
  connection.query(
    `UPDATE fluxroom.users SET requests=JSON_ARRAY_APPEND(requests, '$.requests', '${fromID}') where id='${toID}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/addFriend', (req, res) => {
  const {userID, friendID} = req.query;
  connection.query(
    `UPDATE fluxroom.users SET requests = JSON_REMOVE(requests, JSON_UNQUOTE(JSON_SEARCH(requests, 'one', '${friendID}'))) WHERE id='${userID}'; UPDATE fluxroom.users SET friends=JSON_ARRAY_APPEND(friends, '$.friends', '${friendID}') WHERE id='${userID}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/declineRequest', (req, res) => {
  const {friendID, userID} = req.query;
  connection.query(
    `UPDATE fluxroom.users SET requests = JSON_REMOVE(requests, JSON_UNQUOTE(JSON_SEARCH(requests, 'one', '${friendID}'))) WHERE id='${userID}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/removeFriend', (req, res) => {
  const {friendID, userID} = req.query;
  connection.query(
    `UPDATE fluxroom.users SET friends = JSON_REMOVE(friends, JSON_UNQUOTE(JSON_SEARCH(friends, 'one', '${friendID}'))) WHERE id='${userID}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/chatrooms', (req, res) => {
  connection.query(`SELECT * FROM fluxroom.chatrooms`, (err, results) => {
    if (err) res.send(err);
    else res.send({data: results});
  });
});

// Get Chatroom information
app.get('/chatroom/getInfo', (req, res) => {
  const {roomID} = req.query;
  connection.query(
    `SELECT * FROM fluxroom.chatrooms WHERE id='${roomID}'`,
    (err, results) => {
      if (err) res.send(err);
      else res.send(results);
    },
  );
});

// Create Chatroom
app.get('/chatroom/create', (req, res) => {
  const {roomID, name, description, profilePhoto, userID} = req.query;
  // Adding to chatrooms table and then adding to users table
  connection.query(
    `INSERT INTO fluxroom.chatrooms(id, name, description, profilePhoto, members) VALUES('${roomID}', '${name}', '${description}', '${profilePhoto}',JSON_OBJECT('host', '${userID}', 'members', JSON_ARRAY('${userID}'))); UPDATE fluxroom.users SET chatrooms=JSON_OBJECT(chatrooms', JSON_ARRAY('${roomID}')), host='${roomID}' WHERE id='${userID}';`,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/chatroom/join', (req, res) => {
  const {userID, roomID} = req.query;
  // Adding to chatrooms table and to users table
  connection.query(
    `UPDATE fluxroom.chatrooms SET members=JSON_ARRAY_APPEND(members, '$.members', '${userID}') WHERE id='${roomID}'; UPDATE fluxroom.users SET chatrooms=JSON_ARRAY_APPEND(chatrooms, '$.chatrooms', '${roomID}') WHERE id='${userID}'; `,
    (err, results) => {
      if (err) res.send(err);
      else res.send('success');
    },
  );
});

app.get('/', (req, res) => {
  res.send(
    'Go to /users to get the users list and /users/add to add a user to database',
  );
});
