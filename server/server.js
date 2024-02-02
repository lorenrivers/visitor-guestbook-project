import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Database from "better-sqlite3";

const app = express();
const PORT = "9898";
const db = new Database("database.db"); //connect to database to get SQL methods

app.use(express.json()); //parse incoming json requests
app.use(cors()); //tells server to accept requests from outside of itself

//POST request. Creates variables to store the information entered by the user. Then runs a prepare statement to prepare the code (uses ? to avoid user input in SQL code) and then runs (which adds info the user entered to the database). Sends error if did not work.
app.post("/messages", (req, res) => {
  try {
    const username = req.body.username;
    const message = req.body.message;

    const newMessage = db
      .prepare(`INSERT INTO messages (username, message) VALUES (?, ?)`)
      .run(username, message);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET request to show the user all the messages already within the message board and sends successful status code. Sends error if did not work.
app.get("/messages", (req, res) => {
  try {
    let messages = db.prepare(`SELECT * FROM messages`).all();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//listen for connections on the specified port number and console logs that it is connected.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
