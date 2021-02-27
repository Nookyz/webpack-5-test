import React, { useState } from 'react'
import Button from './Button'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props{}

const Home: React.FC<Props> = () => {
  const [value, setValue] = useState<number>(0)
  
  const handleClick = () => setValue(value + 1)

  return (
    <div>
      <p>Home page</p>
      <Button onClick={handleClick}>{value}</Button>
    </div>
  )
}

export default Home
