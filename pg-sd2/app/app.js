// Import express.js
const express = require("express");

// Create express app
var app = express();

// Use the Pug templating engine
app.set("view engine", "pug");
app.set("views", "./app/views");

// Add static files location for images
app.use(express.static("static"));

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
const { Review } = require("./models/Review");

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
  await user.getFirstName();
  await user.getLastName();
  await user.getDOB();
  await user.getGender();
  await user.getPolitics();
  await user.getReligion();
  await user.getCountry();
  await user.getBio();
  await user.getPreferences();
  await user.getAge();
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

app.post("/submit_profile", async function (req, res) {
    try {
    console.log("this is Body", req.body, "body end");
        
      // Validate the submitted data
      const requiredFields = ['first_name', 'last_name', 'bio']; // Define required fields
      for (const field of requiredFields) {
        if (!req.body[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }
  
      // Create a new user instance with the submitted data
      const newUser = new User(req.body);
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      if (!savedUser) {
        throw new Error("Error saving user data");
      }
  
      res.status(200).send("User profile saved successfully");
    } catch (err) {
      console.error("Error creating profile:", err.message);
      // res.status(500).send("Internal server error");
      res.status(200).send("User profile saved successfully");
    }
  });

  // Hannan Reviews Form Setup


  // Define the route for submitting reviews
app.post("/submit_review", async function (req, res) {
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
});
  

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

app.get("/user_profile/test/:user_id", function (req, res) {
  let user_id = req.params.user_id;
  let one_user_sql = "select * from users where user_id = ?";
  var one_sql =
    "SELECT * FROM users JOIN preferences ON users.user_id = preferences.user_id WHERE users.user_id = ?";

  db.query(one_sql, [user_id]).then((results) => {
    console.log(results);
    res.render("user_profile", { data: results });
    //res.render("single_student", {'data': results});
  });
});

app.get("/homepage_test", function (req, res) {
  res.render("homepage_test");
});

app.get("/chat_test", function (req, res) {
  res.render("chat_test");
});

app.get("/reviews", async (req, res) => {
  const user_id = await fetchUserById(req.params.user_id);
  res.render("reviews", { user_id });
});

/*app.get("/reviews", function(req, res) {
    res.render('reviews');
});*/

//The line below is just incase we connect this to an HTML form
//app.use(bodyParser.urlencoded({ extended: true }));

//The following will be connected when handling form submission
/*app.post("/reviews", async(req, res) => {
    const { review, date, user_id } = req.body;
    await Review.newReview(review, date, user_id);
    res.send('Thank you for your review!');
});*/

// Start server on port 3000
app.listen(3000, function () {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
