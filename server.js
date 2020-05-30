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


// Server route to handle adding a new plant to our user plants database
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


// Server route to delete plant from database
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


// Server route to get list of all plant data objects in database
app.get('/greenhouse/plants/', function(req, res) {
  console.log("in get plant list func")

  plantData.find().then(result => {
    console.log("in plant list find" + result)
    res.status(200).json(result)

  }).catch((err => {
    res.status(500).json({"error": err.message })
  }))

})


// Server route to get list of all user plants belonging to the user
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

// // Psuedo code for emailing notification service
// 1. Query user collection for all users
// 2. For each user:
// a. Query user plant collection for all plants for given user
// b. For each plant:
// i. Check if last watered day + watering Frequency <= today
// Yes -> add to list of plants that need watering, update last watered day for given plant to today
// No  -> do nothing
// c. Create content for body of email using array of thirsty plants
// d. Send email to user (optional: on success, update last watered day here instead of 192)


// Helper function to send user email if user has plants that need watering
var sendWateringReminder = async (user) => {
  console.log('sending watering reminder for user')

  userPlants = await getUserPlants(user)

  console.log("user plants are: ")
  console.log(userPlants)

  thirstyPlants = []
  for (i = 0; i < userPlants.length; i++) {
    // TODO: add check for reminder boolean

    lastWatered = userPlants[i].last_watered
    water_freq  = userPlants[i].plant_data.watering_frequency

    var today = new Date().getDate();
    console.log("Today's Date is: " + today)

    var nextWater = lastWatered
    nextWater.setDate(nextWater.getDate() + water_freq);
    console.log("Next Watering Date is: " + nextWater.getDate())

    if ( nextWater <= today ){

      thirstyPlants.push(userPlants[i])
      userPlants[i].last_watered = today
      Plant.updateOne({ _id: userPlants[i]._id }, userPlants[i])

    } else {
      console.log("you're a buttface")
    }
  }

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

// Helper function to get all plants for given user
var getUserPlants = async (user) => {

  console.log("Finding all plants in helper function")

  Plant.find({ user_email: user.email }).then((result) => {
    console.log("finded all dem planties" + result)
    return result

  }).catch((err) => {
    console.log("error finding user plants: ", err)
    return []
  })

}

// Server route to handle sending plant watering reminders
app.post('/greenhouse/plants/reminders', async function(req, res){
  console.log('in reminder post method')

  User.find().then((result) => {

    console.log("found all the peoples!" + result)

    sendWateringReminder(result[0])
    // for (i = 0; i < result.length; i++){
    //   sendWateringReminder(result[i])
    // }
    res.status(200).send()

  }).catch((err) => {
    console.log(err);
    res.status(500).json({"message":"failed to find users :("})
  })

})


app.listen(process.env.PORT || 3001, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
