////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

router.post("/signup", async(req, res) => {
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  User.create(req.body)
    .then((user) => {
      // redirect to login page
      req.session.username = username;
      req.session.loggegIn = true;
      res.status(200).json({message: 'successfully created account'});
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});


router.post("/login", async (req, res) => {
    // get the data from the request body
    const { username, password } = req.body;
    // search for the user
    User.findOne({ username })
      .then(async (user) => {
        // check if user exists
        if (user) {
          // compare password
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            req.session.username = user.username;
            req.session.loggedIn = true

            // redirect to fruits page if successful
            res.status(200).json({message: 'Successfully logged in!'});
          } else {
            // error if password doesn't match
            res.json({ error: "password doesn't match" });
          }
        } else {
          // send error if user doesn't exist
          res.json({ error: "user doesn't exist" });
        }
      })
      .catch((error) => {
        // send error as json
        console.log(error);
        res.json({ error });
      });
  });
router.get('/logout', (req,res) =>{
    req.session.destroy(err => res.status(200).json({message: 'Successfully logged out!'}))
})
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;