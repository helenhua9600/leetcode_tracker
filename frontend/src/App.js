import React, { useEffect, useState } from 'react'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [link, setLink] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [usedAnswer, setUsedAnswer] = useState(0);
  const [comments, setComments] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProblem(link, difficulty, usedAnswer, comments);
    setShowForm(false); // Hide form after submission
    setLink("");
    setDifficulty("");
    setUsedAnswer(0);
    setComments("");
  };
  const [problems, setProblems] = useState([])
  
  // Fetch problems from the backend
  useEffect(() => {
      fetch('http://localhost:5000/api/problems').then(
        (response) => response.json()
      ).then(
        (data) => {
          setProblems(data)
          console.log(data)
        }
      ).catch((error) => console.error('Error fetching problems:', error));
  }, []);

  // Get title of leetcode problem when provided a link
  const getTitleFromLink = (link) => {
      try {
          const parts = link.split('/'); // Split URL by "/"
          const index = parts.indexOf('problems'); // Find "problems" in the URL
  
          if (index !== -1 && index + 1 < parts.length) {
              return parts[index + 1]; // Return the next part after "problems"
          } else {
              throw new Error('Invalid link format');
          }
      } catch (error) {
          console.error('Error extracting title from link:', error.message);
          return null;
      }
  };

  // Add new problem
  const handleAddProblem = (link, difficulty, usedAnswer, comments) => {
    let title = getTitleFromLink(link);
    let newProblem = {
      link,
      difficulty,
      usedAnswer: Number(usedAnswer), // Ensure it's a number (0 or 1)
      comments,
      title,
    };  
    fetch('http://localhost:5000/api/problems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProblem),
    }).then(
      (response) => response.json()
    ).then((data) => {
      setProblems([...problems, newProblem]);  // Add the new problem to the state
    }).catch((error) => console.error('Error adding problem:', error));
  };

  // Remove problem
  const handleDeleteProblem = (problemId) => {
    console.log('problemId: ' + problemId);
    fetch('http://localhost:5000/api/problems/' + problemId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      (response) => response.json()
    ).then((data) => {
      console.log(data);
      setProblems((filterProblems) => filterProblems.filter( (problem) => problem.problem_id !== problemId));  // Remove the problem from state
    }).catch((error) => console.error('Error deleting problem:', error));
  };

  // Update answer status
  const handleUpdateAnswerStatus = (problemId, usedAnswer) => {
    fetch('http://localhost:5000/api/problems', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problemId, usedAnswer }),
    }).then(
      (response) => response.json()
    ).then(
      (data) => console.log(data)
    ).catch((error) => console.error('Error updating problem status:', error));
  };

  

  return (
    <div>
      <h1>LeetCode Problems</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.problem_id}>
            {problem.title} - {problem.difficulty}
            {<button onClick={() => handleDeleteProblem(problem.problem_id)}>Delete</button>}
            {/* <button onClick={() => handleUpdateAnswerStatus(problem.problem_id, 1)}>Mark as solved</button> */}
          </li>
        ))}
      </ul>

      {!showForm ? (
        <button onClick={() => setShowForm(true)}>Add Problem</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Link: 
            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
          </label>
          <br />

          <label>
            Difficulty: 
            <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required />
          </label>
          <br />

          <label>
            Used Answer (1 or 0): 
            <input type="number" min="0" max="1" value={usedAnswer} onChange={(e) => setUsedAnswer(Number(e.target.value))} required />
          </label>
          <br />

          <label>
            Comments: 
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} required />
          </label>
          <br />

          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  )
}

export default App