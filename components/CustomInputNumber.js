import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './CustomInputNumber.css'

function CustomInputNumber({ min, max, step = 1, value = 0, name, disabled = false, onChange, onBlur }) {
  const inputRef = useRef(null)
  const [innerValue, setInnerValue] = useState(value)
  const [disabledIncrease, setDisabledIncrease] = useState(disabled)
  const [disabledDecrease, setDisabledDecrease] = useState(disabled)
  const timer = useRef(null)

  useEffect(() => {
    onChange({
      target: {
        name: inputRef.current.name,
        value: inputRef.current.value,
      },
    })
  })

  useEffect(() => {
    setDisabledIncrease(disabled)
    if (innerValue === max) {
      setDisabledIncrease(true)
    }
  }, [disabled, innerValue, max])

  useEffect(() => {
    setDisabledDecrease(disabled)
    if (innerValue === min) {
      setDisabledDecrease(true)
    }
  }, [disabled, innerValue, min])

  function increase() {
    setInnerValue((prev) => {
      if (prev + step > max) {
        clearTimer()
        return max
      } else {
        return prev + step
      }
    })
  }

  function decrease() {
    setInnerValue((prev) => {
      if (prev - step < min) {
        clearTimer()
        return min
      } else {
        return prev - step
      }
    })
  }

  function handleMouseDown(operate) {
    const start = Date.now()
    switch (operate) {
      case '+':
        timer.current = setInterval(() => {
          const end = Date.now()
          if (end - start > 500) {
            increase()
          }
        }, 100)
        break
      case '-':
        timer.current = setInterval(() => {
          const end = Date.now()
          if (end - start > 500) {
            decrease()
          }
        }, 100)
        break
      default:
        break
    }
  }

  function clearTimer() {
    clearInterval(timer.current)
  }

  function handleChange(event) {
    setInnerValue(Number(event.target.value))
  }

  function handleBlur(event) {
    if (innerValue > max || innerValue < min) {
      setInnerValue(value)
    }
    onBlur(event)
  }

  return (
    <div className="custom-input-number">
      <button
        className="btn"
        disabled={disabledDecrease}
        onClick={() => decrease()}
        onMouseDown={() => handleMouseDown('-')}
        onMouseLeave={() => clearTimer()}
        onMouseUp={() => clearTimer()}
      >
        -
      </button>
      <input
        ref={inputRef}
        className="input-number"
        type="number"
        min={min}
        max={max}
        step={step}
        name={name}
        value={innerValue}
        disabled={disabled}
        onChange={(event) => handleChange(event)}
        onBlur={(event) => handleBlur(event)}
      />
      <button
        className="btn"
        disabled={disabledIncrease}
        onClick={() => increase()}
        onMouseDown={() => handleMouseDown('+')}
        onMouseLeave={() => clearTimer()}
        onMouseUp={() => clearTimer()}
      >
        +
      </button>
    </div>
  )
}

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

export default CustomInputNumber
