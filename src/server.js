require("dotenv").config();         // load .env
const app = require("./app");        // import Express app
const connectDB = require("./config/db"); // import DB connection

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
