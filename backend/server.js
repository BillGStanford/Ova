const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based MySQL
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configure the MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "DiskCart5@", // Replace with your MySQL password
  database: "mova",
});

// User registration
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Check if the username or email already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Username or email already exists. Please try again with a different one.",
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );

    res.status(201).json({
      message: "Account created successfully! You can now log in.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating your account. Please try again later.",
    });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body; // 'username' is used as a generic identifier for email/username
  try {
    // Check if the identifier matches either username or email
    const [user] = await db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, username]
    );

    if (user.length === 0) {
      return res.status(401).json({
        message: "Invalid username/email or password. Please check and try again.",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username/email or password. Please check and try again.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user[0].id }, "SECRET_KEY", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while logging in. Please try again later.",
    });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
