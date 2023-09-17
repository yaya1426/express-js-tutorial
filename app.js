const express = require("express");
const app = express();

app.use(express.json());

const users = [];

// HTTP METHODS
// GET - Retrive Data
app.get("/", (request, response) => {
  response.send("Welcome to home!");
});

app.get("/users", (request, response) => {
  if (users.length == 0) {
    response.status(404).send("No users found!");
    return;
  }
  response.status(200).send(users);
});

// POST - Create data
app.post("/users", (request, response) => {
  const user = request.body;
  const findUser = users.find((x) => x.id === user.id);
  if (findUser) {
    response.status(400).send("User already exists");
    return;
  }
  users.push(user);
  response.status(201).send("Created!");
});

// DELETE - Remove data
app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    const findUserIndex = users.findIndex((x) => x.id === id)
    if(findUserIndex == -1) {
        response.status(400).send("User not found!")
        return
    }
    users.splice(findUserIndex, 1)
    response.status(200).send("User deleted successfully!")
})

app.listen(3000, () => {
  console.log("Started on port 3000");
});
