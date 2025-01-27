const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express()
const problemsRoutes = require("./routes/problemsRoutes")

app.use(cors()); // Enable Cross-Origin Resource Sharing for frontend
app.use(express.json());  // Parse incoming JSON requests

// Use routes
app.use('/api/problems', problemsRoutes);

// port listening on 5000 by default
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`) })
