import React from 'react'

const FAQ = ({ question, answer }) => {
  return (
    <div>
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  )
}

export default FAQ
