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

//Creation of object connectino for MongoDB Plant collecction
const Plant = mongoose.model('Plant', {
  user_email: String,
  common_name: String,
  scientific_name: String,
  assigned_name: String,
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

app.post('/greenhouse/plants', function(req, res) {
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
      res.send(202).json({"message":"plant successfully deleted"})

    }).catch((err) => {
      console.log("failed to remove plant")
      res.status(500).json({"error":err.message})
    })

  }).catch((err) => {
    console.log("failed to find one")
    res.status(500).json({"error":err.message})
  })

});

app.listen(process.env.PORT || 3001, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
