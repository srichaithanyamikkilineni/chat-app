const express = require("express");
let app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
let chats = require("./models/mongo");

// Read operations
app.get("/chats", async (req, res) => {
  let allchats = await chats.find();
  res.render("home.ejs", { allchats });
});

// Render new chat form
app.get("/chats/new", async (req, res) => {
  res.render("form.ejs");
});

// Create a new chat
app.post("/chats", async (req, res) => {
  // Marking this as async
  try {
    console.log(req.body);
    let { from, message, to } = req.body;

    await chats.insertMany([
      {
        from,
        message, // Ensure you're using the correct variable name
        to,
      },
    ]);
    res.send("Chat has been saved successfully");
    res.redirect("/chats");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
