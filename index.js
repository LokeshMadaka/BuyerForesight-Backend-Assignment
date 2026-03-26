const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;


app.use(express.json()); //middleware


const DATA_FILE = path.join(__dirname, "data", "users.json"); //file path

//functions
const readUsers = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};



// get /users 
app.get("/users", (req, res) => {
  try {
    let users = readUsers();
    const { search, sort, order } = req.query;

    if (search) {
      users = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort) {
      users.sort((a, b) => {
        if (order === "desc") {
          return b[sort] > a[sort] ? 1 : -1;
        } else {
          return a[sort] > b[sort] ? 1 : -1;
        }
      });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET /users/:id
app.get("/users/:id", (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// POST /users
app.post("/users", (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const users = readUsers();

    const newUser = {
      id: uuidv4(),
      name,
      email,
      age: age || null,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// PUT /users/:id
app.put("/users/:id", (req, res) => {
  try {
    const users = readUsers();
    const index = users.findIndex(u => u.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = {
      ...users[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    users[index] = updatedUser;
    writeUsers(users);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  try {
    const users = readUsers();
    const newUsers = users.filter(u => u.id !== req.params.id);

    if (users.length === newUsers.length) {
      return res.status(404).json({ message: "User not found" });
    }

    writeUsers(newUsers);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});