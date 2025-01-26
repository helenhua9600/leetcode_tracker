import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  // empty array to run only on the first render of component
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof backendData.users === "undefined") ? (
        <p>Loadinbg...</p>
      ): (
        backendData.users.map((user,i) => (
          <p key={i}> {user} </p> 
        ))
      )}
    </div>
  )
}

export default App