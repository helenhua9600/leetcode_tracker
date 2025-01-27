import React, { useEffect, useState } from 'react'

function App() {
  
  const [problems, setProblems] = useState([])
  const [newProblem, setNewProblem] = useState({
      title: '',
      link: '',
      difficulty: '',
      description: '',
      usedAnswer: 0,
  });
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

    // Add new problem
    const handleAddProblem = () => {
        fetch('http://localhost:5000/api/problems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProblem),
        }).then(
          (response) => response.json()
        ).then((data) => {
          console.log(data);
          setProblems([...problems, newProblem]);  // Add the new problem to the state
        }).catch((error) => console.error('Error adding problem:', error));
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
              <button onClick={() => handleUpdateAnswerStatus(problem.problem_id, 1)}>Mark as solved</button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddProblem}>Add Problem</button>
    </div>
    
  )
}

export default App