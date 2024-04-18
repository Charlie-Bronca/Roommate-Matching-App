// Import express.js
const express = require("express");

// Create express app
var app = express();

// Use the Pug templating engine
app.set("view engine", "pug");
app.set("views", "./app/views");

// Add static files location for images
app.use(express.static("static"));

//Tanya originally had this commented out because we were not using it
//Hannan without the bodyparser my questionnaire form is not getting the data in body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//Code below can be used if we are not using an HTML form to submit
//app.use(express.json());

// Get the functions in the db.js file to use
const db = require("./services/db");

//Get User Class
const { User } = require("./models/user");

//Get Chat Class
const { Chat } = require("./models/chat");

//Get Review Class
const { Review } = require("./models/review");

// Create a route for root - /
app.get("/", function (req, res) {
  // Set up an array of data
  var test_data = ["one", "two", "three", "four"];
  // Send the array through to the template as a variable called data
  res.render("index", {
    title: "My index page",
    heading: "My heading",
    data: test_data,
  });
});

app.get("/flat_buddies_test", function (req, res) {
  var sql = "select * from users";
  db.query(sql).then((results) => {
    // Send the results rows to the all-students template
    // The rows will be in a variable called data
    res.render("flat_buddies_test", { data: results });
  });
});

app.get("/homepage", function (req, res) {
  res.render("homepage");
});

app.get("/questionnaire", function (req, res) {
  res.render("questionnaire");
});

app.get("/user_profile/:user_id", async function (req, res) {
  let user_id = req.params.user_id;
  let user = new User(user_id);
  /*
  await user.getFirstName();
  await user.getLastName();
  await user.getDOB();
  await user.getGender();
  await user.getPolitics();
  await user.getReligion();
  await user.getCountry();
  await user.getBio();
  */
  await user.getUserDetails();
  await user.getPreferences();
  //await user.getAge();
  console.log(user);
  //res.send(user);
  res.render("user_profile_oop", { user: user });
});

//Data for chat, added for Sprint4
app.get("/chat", async function (req, res) {
  const chatData = {
    chat_id: "chat1",
    sender_id: "user1",
    recipient_id: "user2",
    timestamp: new Date(),
    message: "Hello, Bob!",
  };

  const chat = new Chat(
    chatData.chat_id,
    chatData.sender_id,
    chatData.recipient_id,
    chatData.timestamp,
    chatData.message
  );

  const senderName = await chat.getSenderName();
  const recipientName = await chat.getRecipientName();

  res.render("chat", { senderName, recipientName, chatData });
});

//HANNAN Questionnaire

// app.post("/submit_profile", async function (req, res) {
//   try {
//     // Validate the submitted data (optional but recommended)
//     console.log("this is Body", req.body, "body end");
//     const Data = req.body; // Destructuring for cleaner access
//     if (!Data) {
//       throw new Error("Missing required field: note");
//     }

//     // Create a new user instance with the submitted data
//     const newUser = new User(Data); // Assuming 'id' is a unique identifier

//     // Save the new user to the database using await
//      const savedUser = await newUser.save();


//     if (!savedUser) {
//       throw new Error("Error saving user data");
//     }
//   } catch (err) {
//     console.error("Error creating profile:", err.message);
//     res.status(500).send("Internal server error"); // Informative error response to client
//   }
// });

// HANNAN QUESTIONNAIRE PAGE

// error-message This page was not restored from back/forward cache because a content script from the extension with ID nkbihfbeogaeaoehlefnkodbefgpgknn received a message while the page was cached. This behavior will change shortly which may break the extension. If you are the developer of the extension, see https://developer.chrome.com/blog/bfcache-extension-messaging-changes.

// app.post("/submit_profile", async function (req, res) {
//   try {
//     // Validate the submitted data
//     const { first_name, last_name, dob, gender, religion, politics, bio, country, job } = console.Console.log( req.body);
//     if (!first_name || !last_name || !dob || !gender || !religion || !politics || !bio || !country || !job) {
//       throw new Error("Missing required fields");
//     }

//     // Create a new user instance with the submitted data
//     const newUser = new User({
//       first_name,
//       last_name,
//       dob,
//       gender,
//       religion,
//       politics,
//       bio,
//       country,
//       job
//     });

//     // Save the new user to the database
//     const savedUser = await newUser.save();

//     if (!savedUser) {
//       throw new Error("Error saving user data");
//     }

//     res.status(200).send("User profile saved successfully");
//   } catch (err) {
//     console.error("Error creating profile:", err.message);
//     res.status(500).send("Internal server error");
//   }
// });



// ??? code
app.post("/submit_profile", async function (req, res) {
  try {
      console.log("Submitted Profile Data:", req.body); // Log the submitted profile data

      // Validate the submitted data
      const requiredFields = ['first_name', 'last_name', 'bio']; // Define required fields
      for (const field of requiredFields) {
          if (!req.body[field]) {
              throw new Error(`Missing required field: ${field}`);
          }
      }

      // Create a new user instance with the submitted data
      const newUser = new User();

      // Assign values to user instance properties
      newUser.first_name = req.body.first_name;
      newUser.last_name = req.body.last_name;
      newUser.bio = req.body.bio;


      res.status(200).send("User profile saved successfully");
  } catch (err) {
      console.error("Error creating profile:", err.message);
      res.status(500).send("Internal server error");
  }
});


    // app.post('/submit_profile', async function (req, res) {
  //   params = req.body;
  //   var user = new User(params.id);
  //   try {
  //     await user.addUserDetails(params.bio);
  //     res.send('form submitted');
  //    }
  //    catch (err) {
  //        console.error(`Error while adding newuser `, err.message);
  //    }
  //    res.send('form submitted');
  // });

  // Hannan Reviews Form Setup


  app.post("/submit_review", async function (req, res) {
    try {
        console.log("Review Submitted:", req.body); // Log the submitted review data

        // Validate the submitted data
        const requiredFields = ['review-text']; // Define required fields
        for (const field of requiredFields) {
            if (!req.body[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

    

        res.status(200).send("Review submitted successfully");
    } catch (err) {
        console.error("Error submitting review:", err.message);
        res.status(500).send("Internal server error");
    }
});


  // Define the route for submitting reviews
/*app.post("/submit_review", async function (req, res) {
  try {
    console.log("Received review data:", req.body);
    
    // Validate the submitted data
    const requiredFields = ['user_id', 'rating', 'comment']; // Define required fields for a review
    for (const field of requiredFields) {
      if (!req.body[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Create a new review instance with the submitted data
    const newReview = new Review(req.body);

    // Save the new review to the database
    const savedReview = await newReview.save();
    
    if (!savedReview) {
      throw new Error("Error saving review data");
    }

    res.status(200).send("Review submitted successfully");
  } catch (err) {
    console.error("Error submitting review:", err.message);
    res.status(500).send("Internal server error");
  }
});*/
  

/*
function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const dobMonth = dobDate.getMonth();
    const currentMonth = currentDate.getMonth();
    if (currentMonth < dobMonth || (currentMonth === dobMonth && currentDate.getDate() < dobDate.getDate())) {
        age--;
    }
    return age;
}*/

app.get("/profiles", function (req, res) {
  var sql = "select * from users";
  db.query(sql).then((results) => {
    // Send the results rows to the all-students template
    // The rows will be in a variable called data
    res.render("profiles", { data: results });
  });
});

app.get("/chat", function (req, res) {
  res.render("chat");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/user_profile/test/:user_id", async function (req, res) {
  let user_id = req.params.user_id;
  let user = new User(user_id);
  /*
  await user.getFirstName();
  await user.getLastName();
  await user.getDOB();
  await user.getGender();
  await user.getPolitics();
  await user.getReligion();
  await user.getCountry();
  await user.getBio();
  */
  await user.getUserDetails()
  await user.getPreferences();
  //await user.getAge();
  console.log(user);
  //res.send(user);
  res.render("user_profile_post", { user: user });
});

app.get("/homepage_test", function (req, res) {
  res.render("homepage_test");
});

app.get("/chat_list", function(req, res) {
    res.render('chat_list');
});

/*app.get("/reviews", async (req, res) => {
  const user_id = await fetchUserById(req.params.user_id);
  res.render("reviews", { user_id });
});*/

app.get("/reviews", function(req, res) {
    res.render('reviews');
});

//The line below is just incase we connect this to an HTML form
//app.use(bodyParser.urlencoded({ extended: true }));

//The following will be connected when handling form submission
/*app.post("/reviews", async(req, res) => {
    const { review, date, user_id } = req.body;
    await Review.newReview(review, date, user_id);
    res.send('Thank you for your review!');
});*/

app.post('/add-bio', async function (req, res) {
  params = req.body;
  var user = new User(params.id);
  try {
    await user.addBio(params.bio);
    res.send('form submitted');
   }
   catch (err) {
       console.error(`Error while adding bio `, err.message);
   }
   res.send('form submitted');
});


// Start server on port 3000
app.listen(3000, function () {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
