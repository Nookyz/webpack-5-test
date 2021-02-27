import React from 'react'
import moment from 'moment'

const About: React.FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
  )
}

export default About