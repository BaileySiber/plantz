const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');


// Setup Ssrver packages/configuration
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Creation of object connection for MongoDB User collection
const User = mongoose.model('User', {
  name: String,
  email: String,
})

//Creation of object connectino for MongoDB Plant collecction
const Plant = mongoose.model('Plant', {
  user_email: String,
  assigned_name: String,
  plant_data: {
    name: String,
    scientific_name: String,
    plant_type: String,
    description: String,
    watering_frequency: String,
    watering_amount: String
  }
})

//Creation of object connectino for MongoDB Plant collecction
const plantData = mongoose.model('plantData', {
  name: String,
  scientific_name: String,
  plant_type: String,
  description: String,
  watering_frequency: String,
  watering_amount: String
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

app.post('/greenhouse/plants/', function(req, res) {
  console.log('in add new plant')

  new Plant(req.body).save().then((result) => {

    console.log("Yay saved a plant!")
    // Return a 201 indicating a new plant was created
    res.status(201).json({"message":"a new plant was made woot!"})

  }).catch((err) => {
    console.log("darn something went wrong")
    // Return a 500 if there was a problem inserting into the database
    res.status(500).json({"error":err.message})
  })

});

app.delete('/greenhouse/plants', function(req, res){
  console.log("in delete plant func")

  if(!req.body.id){
    console.log("no plant id")
    res.status(400).json({"message":"bad request - no plant id"})
  }

  Plant.findOne({ _id: req.body.id }).then(result => {
    console.log("tryna find one")
    if(!result){
      console.log("no plant sad")
      res.status(404).json({"message":"not found - plant does not exist"})
    }

    Plant.remove({'_id':req.body.id}).then((result) => {
      console.log("in plant remove")
      res.status(202).json({"message":"plant successfully deleted"})

    }).catch((err) => {
      console.log("failed to remove plant")
      res.status(500).json({"error":err.message})
    })

  }).catch((err) => {
    console.log("failed to find one")
    res.status(500).json({"error":err.message})
  })

});

app.get('/greenhouse/plants/', function(req, res) {
  console.log("in get plant list func")

  plantData.find().then(result => {
    console.log("in plant list find" + result)
    res.status(200).json(result)

  }).catch((err => {
    res.status(500).json({"error": err.message })
  }))

})

app.get('/greenhouse/plants/:user_email', function(req, res){
  console.log('in get plant func')

  if(!req.params.user_email){
    console.log("no email address provided")
    res.status(400).json({"message":"bad request - no user email"})
  }

  User.findOne({ email: req.params.user_email }).then(result => {
    console.log("in find user")
    if(!result){
      res.status(404).json({"message":"not found - user does not exist"})
    }

    Plant.find({ user_email: req.params.user_email }).then((result) => {
      console.log("found all the plants!" + result)
      res.status(200).json(result)

    }).catch((err) => {
      res.status(500).json({"message":"failed to get the plants :("})
    })

  }).catch((err) => {
    console.log("failed to find user")
    res.status(500).json({"error": err.message})
  })

});

app.post('/greenhouse/plants/reminder/:user_email', function(req, res){
  console.log('in reminder post method')

  if(!req.params.user_email){
    console.log("no email address provided")
    res.status(400).json({"message":"bad request - no user email"})
  }

  User.findOne({ email: req.params.user_email }).then(result => {
    console.log("in find user")
    if(!result){
      res.status(404).json({"message":"not found - user does not exist"})
    }

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.params.user_email,
      subject: 'Reminder - It is Time to water your plants!',
      text: 'Water dem plants!'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(500).json({"error": err.message})
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ "message": "yay email was sent!" })
      }
    });

  }).catch((err) => {
    console.log("failed to find user")
    res.status(500).json({"error": err.message})
  })

})


app.listen(process.env.PORT || 3001, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
