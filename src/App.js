import React from 'react'
import CustomInputNumber from '../components/CustomInputNumber'

function App() {
  function onChange(event) {
    console.log('onChange name', event.target.name)
    console.log('onChange value', event.target.value)
  }

  function onBlur(event) {
    console.log('onBlur name', event.target.name)
    console.log('onBlur value', event.target.value)
  }

  return (
    <div>
      <CustomInputNumber
        name={'customInputNumber'}
        min={0}
        max={10}
        value={0}
        step={3}
        onChange={(event) => onChange(event)}
        onBlur={(event) => onBlur(event)}
      ></CustomInputNumber>
    </div>
  )
}

export default App
