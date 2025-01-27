const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problemsController');

router.post('/', problemsController.addProblem);  // Add a new problem
router.put('/', problemsController.updateAnswerStatus);  // Update answer status
router.get('/', problemsController.getAllProblems);  // Get all problems
router.delete('/:problemId', problemsController.deleteProblem);  // Delete a problem

module.exports = router;