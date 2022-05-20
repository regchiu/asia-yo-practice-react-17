import React from 'react'
import CustomInputNumber from '../components/CustomInputNumber'
import RoomAllocation from '../components/RoomAllocation'

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
      />
      <hr />
      <RoomAllocation
        guest={10}
        room={3}
        onChange={(result) => console.log('onChange result', result)}
        onBlur={(result) => console.log('onBlur result', result)}
      />
    </div>
  )
}

export default App
