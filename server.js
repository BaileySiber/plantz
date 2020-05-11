const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
// mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

const User = mongoose.model('User', {
  name: String,
  email: String,
})

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

app.post('/login/user', function (req, res) {
  console.log('in server.js /login/user')

  User.findOne({email: req.body.email})
  .then(result => {
    if(!result) {
      new User(req.body)
        .save()
        .then((result) => {
          res.status(201).end()
        })
        .catch((err) => {
          console.log('did not work!!')
          res.status(500).end(err.message)
        })
    }

    else {
      console.log('already have dem')
      res.status(200).json({error: "hello! you already exist!"})
    }

  })


});

app.listen(process.env.PORT || 3001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
