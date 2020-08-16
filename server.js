const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');


// Setup Ssrver packages/configuration
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// Creation of an object to send emails
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


//Creation of object connection for MongoDB Plant collecction
const Plant = mongoose.model('Plant', {
  user_email: String,
  assigned_name: String,
  plant_data: {
    name: String,
    scientific_name: String,
    plant_type: String,
    description: String,
    watering_frequency: Number,
    watering_amount: String
  },
  reminder: String,
  last_watered: Date
})


//Creation of object connection for MongoDB PlantData collecction
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
  console.log("User email is: ", req.body.email);

  // If request doesn't have an email in the body, return an error message directly
  if (!req.body.email){
    res.status(400).json({ "error": "No email provided" })
    return
  }

  User.findOne({ email: req.body.email }).then(result => {
    console.log(result)

    // If there does not exist a user in the database with the same email, create a new one
    if (!result || result.length == 0) {

      new User(req.body).save().then((result) => {
        // Return a 201 indicating a new user was created
        console.log("Yaaaaaay new friend with new plantlings")
        res.status(201).json({ "message": "welcome! we have new user :D" })
        return
      }).catch((err) => {
        // Return a 500 if there was a problem inserting into the database
        console.log('did not work!! whooopsies')
        res.status(500).json({ "error": err.message })
        return
      })
    } else {
      // User exists, so we return a 200 indicating the user successfully signed in
      console.log('already have dem')
      res.status(200).json({ "message": "hello! you already exist!" })
      return
    }
  }).catch((err) => {
    // Return a 500 if there was a problem searching the database
    console.log('ughhhh :( trouble searching database')
    res.status(500).json({ "error": err.message })
    return
  })

});


// Server route to handle adding a new plant to our user plants database
app.post('/greenhouse/plants/', function(req, res) {
  console.log('in add new plant')

  new Plant(req.body).save().then((result) => {

    console.log("Yay saved a plant!")
    // Return a 201 indicating a new plant was created
    res.status(201).json({"message":"a new plant was made woot!"})
    return

  }).catch((err) => {
    console.log("darn something went wrong")
    // Return a 500 if there was a problem inserting into the database
    res.status(500).json({"error":err.message})
    return
  })

});


// Server route to delete plant from database
app.delete('/greenhouse/plants', function(req, res){
  console.log("in delete plant func")

  if(!req.body.id){
    console.log("no plant id")
    res.status(400).json({"message":"bad request - no plant id"})
    return
  }

  Plant.findOne({ _id: req.body.id }).then(result => {
    console.log("tryna find one")
    if(!result){
      console.log("no plant sad")
      res.status(404).json({"message":"not found - plant does not exist"})
      return
    }

    Plant.remove({'_id':req.body.id}).then((result) => {
      console.log("in plant remove")
      res.status(202).json({"message":"plant successfully deleted"})
      return

    }).catch((err) => {
      console.log("failed to remove plant")
      res.status(500).json({"error":err.message})
      return
    })

  }).catch((err) => {
    console.log("failed to find one")
    res.status(500).json({"error":err.message})
    return
  })

});


// Server route to get list of all plant data objects in database
app.get('/greenhouse/plants/', function(req, res) {
  console.log("in get plant list func")

  plantData.find().then(result => {
    console.log("in plant list find" + result)
    res.status(200).json(result)
    return

  }).catch((err => {
    res.status(500).json({"error": err.message })
    return
  }))

})


// Server route to get list of all user plants belonging to the user
app.get('/greenhouse/plants/:user_email', function(req, res){
  console.log('in get plant func')

  if(!req.params.user_email){
    console.log("no email address provided")
    res.status(400).json({"message":"bad request - no user email"})
    return
  }

  User.findOne({ email: req.params.user_email }).then(result => {
    console.log("in find user")
    if(!result){
      res.status(404).json({"message":"not found - user does not exist"})
      return
    }

    console.log("the users email is" + req.params.user_email)

    Plant.find({ user_email: req.params.user_email }).then((result) => {
      console.log("found all the plants!" + result)
      res.status(200).json(result)
      return

    }).catch((err) => {
      console.log("error finding dem little buddies ", err)
      res.status(500).json({"message":"failed to get the plants :("})
      return
    })

  }).catch((err) => {
    console.log("failed to find user")
    res.status(500).json({"error": err.message})
    return
  })

});


// Server route to update reminder bool on a single plant
app.post('/greenhouse/plants/reminder', function(req, res){
  console.log('in set reminder func')

  if(req.body._id == null || req.body.reminder == null){
    console.log("no plant id or reminder bool provided")
    res.status(400).json({"message":"bad request - no plant id or reminder"})
    return
  }

  Plant.update({ _id: req.body._id }, {
    reminder: req.body.reminder
  }).then((result) => {
    console.log("updated the plant reminder!" + result)
    res.status(200).json(result)
    return
  }).catch((err) => {
    console.log("failed to update plant reminder" + err)
    res.status(500).json({"error": err.message})
    return
  })
})

// Helper function to send user email if user has plants that need watering
var sendWateringReminder = (user, userPlants) => {
  console.log('sending watering reminder for user')

  thirstyPlants = []
  for (i = 0; i < userPlants.length; i++) {
    currentPlant = userPlants[i]
    console.log("Current plant is: ", currentPlant)

    if (currentPlant.reminder === "True"){
      console.log("watering reminder is on")
      lastWatered = currentPlant.last_watered
      water_freq  = currentPlant.plant_data.watering_frequency
      var today = new Date()
      var nextWater = lastWatered
      nextWater.setDate(nextWater.getDate() + water_freq)
      console.log("Next Watering Date is: " + nextWater)

      if ( nextWater <= today ){
        console.log("plant is thiiiiiiiirsty")

        currentPlant.last_watered = today
        console.log('todays last watered is ' +   currentPlant.last_watered)
        console.log('plant _id ' +   currentPlant._id)

        Plant.update({ _id: currentPlant._id }, {
          last_watered: today
        }).then((result) => {
          console.log("updated the plant!" + result)
          thirstyPlants.push(currentPlant)
        }).catch((err) => {
          console.log("failed to update plant" + err)
        })

      }else {console.log("you're a buttface")}

    }else{console.log("watering reminder is off")}
  }

  if (thirstyPlants.length != 0){
    var emailText = 'These plants are thiiiiiiiirsty\n'
    for (i = 0; i < thirstyPlants.length; i++) {
      emailText += thirstyPlants[i].assigned_name + '\n'
    }

    var mailOptions = {
      from:    process.env.EMAIL_USER,
      to:      user.email,
      subject: 'Reminder - It is Time to water your plants!',
      text:    emailText
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log('Email sent: ' + info.response);
        return true;
      }
    });
  }

}

// Helper function to get all plants for given user
var getUserPlants = (user, callback) => {

  console.log("Finding all plants in helper function")

  Plant.find({ user_email: user.email }).then((result) => {
    console.log("finded all dem planties" + result)
    callback(user, result)

  }).catch((err) => {
    console.log("error finding user plants: ", err)
    // TODO: handle this better
    callback(user, result)
  })

}

// Server route to handle sending plant watering reminders
var sendReminder = () => {

  console.log('in reminder func')

  User.find().then((result) => {

    console.log("found all the peoples!" + result)

    for (i = 0; i < result.length; i++) {
      getUserPlants(result[i], sendWateringReminder)
    }
  }).catch((err) => {
    console.log(err);
  })

}

//run sendWatering Reminder once a day every day to trigger emails
setInterval(sendReminder, 86400000);


app.listen(process.env.PORT || 3001, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
