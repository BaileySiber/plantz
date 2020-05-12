const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


// Setup Ssrver packages/configuration
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


// Creation of object connection for MongoDB User collection 
const User = mongoose.model('User', {
  name: String,
  email: String,
})


// Server method to handle user login 
app.post('/login/user', function (req, res) {
  console.log('in server.js /login/user')

  User.findOne({ email: req.body.email }).then(result => {

    // If there does not exist a user in the database with the same email, create a new one
    console.log(result)
    if (!result) {

      new User(req.body).save().then((result) => {
        // Return a 201 indicating a new user was created
        console.log("Yaaaaaay new friend with new plantlings")
        res.status(201).json({ "message": "welcome! we have new user :D" })
      }).catch((err) => {
        // Return a 500 if there was a problem inserting into the database
        console.log('did not work!! whooopsies')
        res.status(500).json({ "error": err.message })
      })
    } else {
      // User exists, so we return a 200 indicating the user successfully signed in
      console.log('already have dem')
      res.status(200).json({ "message": "hello! you already exist!" })
    }
  })

});

app.listen(process.env.PORT || 3001, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
