const mysql = require('mysql2')
const dotenv = require('dotenv').config();

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }) 

const addProblem = (req, res) => {
    const { link, difficulty, usedAnswer, comments, title } = req.body;
    const query = 'INSERT INTO Problems (link, difficulty, usedAnswer, comments, title) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [link, difficulty, usedAnswer, comments, title], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error inserting problem', details: err.stack });
        }
        res.status(201).json({ message: 'Problem inserted', problemId: results.insertId });
    });
};

const updateAnswerStatus = (req, res) => {
    const { problemId, usedAnswer } = req.body;
    const query = 'UPDATE Problems SET usedAnswer = ? WHERE problem_id = ?';
    
    db.query(query, [usedAnswer, problemId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating answer status', details: err.stack });
        }
        res.status(200).json({ message: 'Problem updated successfully' });
    });
};

const getAllProblems = (req, res) => {
    const query = 'SELECT * FROM Problems';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching problems', details: err.stack });
        }
        res.status(200).json(results);
    });
};

// Function to delete a problem
const deleteProblem = (req, res) => {
    const { problemId } = req.params;
    const query = 'DELETE FROM Problems WHERE problem_id = ?';
    
    db.query(query, [problemId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting problem', details: err.stack });
        }
        res.status(200).json({ message: 'Problem deleted successfully' });
    });
};

module.exports = { addProblem, updateAnswerStatus, getAllProblems, deleteProblem };