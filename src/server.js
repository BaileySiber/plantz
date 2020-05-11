const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

const User = mongoose.model('User', {
  name: String,
  email: String,
})

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

app.post('/login', function (req, res) {
  console.log(req.body)
  new User(req.body)
    .save()
    .then((result) => res.json(result))
    .catch((err) => {
      console.log('did not work!!')
      res.status(500).end(err.message)
    })
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
