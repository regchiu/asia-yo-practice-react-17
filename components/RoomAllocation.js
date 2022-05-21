import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './RoomAllocation.css'

import CustomInputNumber from './CustomInputNumber'

const ROOM_CAPACITY = 4

function RoomPicker({ index, guestRoom, onChange, onBlur, disabled }) {
  const { adult, child } = guestRoom
  const [innerAdult, setInnerAdult] = useState(adult)
  const [innerChild, setInnerChild] = useState(child)
  const [total, setTotal] = useState(adult)
  const [maxAdult, setMaxAdult] = useState(ROOM_CAPACITY)
  const [maxChild, setMaxChild] = useState(ROOM_CAPACITY)

  useEffect(() => {
    setTotal(innerAdult + innerChild)
  }, [innerAdult, innerChild])

  useEffect(() => {
    if (total === ROOM_CAPACITY) {
      setMaxAdult(() => innerAdult)
      setMaxChild(() => innerChild)
    } else {
      setMaxAdult(() => ROOM_CAPACITY)
      setMaxChild(() => ROOM_CAPACITY)
    }
  }, [innerAdult, innerChild, total])

  useEffect(() => {
    const result = {
      index,
      adult: innerAdult,
      child: innerChild,
    }
    onChange(result)
  }, [index, innerAdult, innerChild, onChange])

  function handleBlur() {
    const result = {
      index,
      adult: innerAdult,
      child: innerChild,
    }
    onBlur(result)
  }

  return (
    <div className="room-picker mt20">
      <div className="title">房間: {total} 人</div>
      <div className="row space-between mt20">
        <div>
          <div className="subtitle1">大人</div>
          <div className="subtitle2">年齡 20+</div>
        </div>
        <CustomInputNumber
          name={'customInputNumber'}
          min={1}
          max={maxAdult}
          value={adult}
          step={1}
          disabled={disabled}
          onChange={(event) => setInnerAdult(Number(event.target.value))}
          onBlur={() => handleBlur()}
        />
      </div>
      <div className="row space-between mt20">
        <div>
          <div className="subtitle1">小孩</div>
        </div>
        <CustomInputNumber
          name={'customInputNumber'}
          min={0}
          max={maxChild}
          value={child}
          step={1}
          disabled={disabled}
          onChange={(event) => setInnerChild(Number(event.target.value))}
          onBlur={() => handleBlur()}
        />
      </div>
    </div>
  )
}

RoomPicker.propTypes = {
  index: PropTypes.number,
  guestRoom: PropTypes.shape({
    adult: PropTypes.number,
    child: PropTypes.number,
  }),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

function RoomAllocation({ guest, room, onChange, onBlur }) {
  const guestUnit = {
    adult: 1,
    child: 0,
  }

  const guestRooms = Array(room).fill(guestUnit)

  const [remaining, setRemaining] = useState(guest)
  const [disabled, setDisabled] = useState(false)

  function isValidGuest() {
    return guest <= room * ROOM_CAPACITY
  }

  function calculateRemaining() {
    const sumOfAdult = guestRooms.map((guestRoom) => guestRoom.adult).reduce((acc, curr) => acc + curr)
    const sumOfChild = guestRooms.map((guestRoom) => guestRoom.child).reduce((acc, curr) => acc + curr)
    if (sumOfAdult + sumOfChild >= guest) {
      setRemaining(0)
      if (guestRooms.every((guestRoom) => guestRoom.adult <= ROOM_CAPACITY && guestRoom.child <= ROOM_CAPACITY)) {
        setDisabled(true)
      }
    } else {
      setRemaining(guest - (sumOfAdult + sumOfChild))
      setDisabled(false)
    }
  }

  function handleChange(result) {
    guestRooms.splice(result.index, 1, { adult: result.adult, child: result.child })
    calculateRemaining()
    onChange(guestRooms)
  }

  function handleBlur(result) {
    guestRooms.splice(result.index, 1, { adult: result.adult, child: result.child })
    calculateRemaining()
    onBlur(guestRooms)
  }

  return (
    <div className="room-alloction">
      <div className="title">
        住客人數: {guest} 人 / {room} 房
      </div>
      {isValidGuest() ? (
        <>
          <div className="banner mt20">尚未分配人數: {remaining} 人</div>
          {guestRooms?.map((guestRoom, index) => (
            <div key={index}>
              {index !== 0 ? <hr className="mt20" /> : null}
              <RoomPicker
                index={index}
                guestRoom={guestRoom}
                disabled={disabled}
                onChange={(result) => handleChange(result)}
                onBlur={(result) => handleBlur(result)}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="banner banner--error mt20">Error: The number of guest can not exceed the room capacity!!</div>
      )}
    </div>
  )
}

RoomAllocation.propTypes = {
  guest: PropTypes.number,
  room: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

export default RoomAllocation
