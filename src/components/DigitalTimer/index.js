// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInseconds: 0,
    timerLimitInminutes: 25,
  }

  componentWillUnmount = () => {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInminutes} = this.state
    if (timerLimitInminutes > 1) {
      this.setState(prevState => ({
        timerLimitInminutes: prevState.timerLimitInminutes - 1,
      }))
    }
  }

  onIncreaseTimerLimtInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInminutes: prevState.timerLimitInminutes + 1,
    }))
  }

  incrementTimeElapsedInseconds = () => {
    const {timeElapsedInseconds, timerLimitInminutes} = this.state
    const isTimerCompleted = timeElapsedInseconds === timerLimitInminutes * 60
    if (isTimerCompleted) {
      clearInterval(this.intervalId)
      this.setState({
        isTimerRunning: false,
      })
    } else {
      this.setState(prevState => ({
        isTimerRunning: !prevState.isTimerRunning,
        timeElapsedInseconds: prevState.timeElapsedInseconds - 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning} = this.state
    const {timeElapsedInseconds, timerLimitInminutes} = this.state

    const isTimerCompleted = timeElapsedInseconds === timerLimitInminutes * 60
    if (isTimerCompleted) {
      this.setState({
        timeElapsedInseconds: 0,
      })
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInseconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInminutes, timeElapsedInseconds} = this.state
    const isButtonDisabled = timeElapsedInseconds > 0
    return (
      <div className="timer-limt-controller-container">
        <p>set Timer limit</p>
        <button
          className="minus-button"
          disabled={isButtonDisabled}
          type="button"
          onClick={this.onDecreaseTimerLimitInminutes}
        >
          -
        </button>
        <p className="timer-container">{timerLimitInminutes}</p>
        <button
          className="plus-button"
          type="button"
          onClick={this.onIncreaseTimerLimitInminutes}
        >
          +
        </button>
      </div>
    )
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-limit-container">
        <button
          className="timer-controller"
          onClick={this.satrtOrPauseTimer}
          type="button"
        >
          <img
            src={startOrPauseImageUrl}
            className="tc-icon"
            alt={startOrPauseAltText}
          />
          <p className="description">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          className="timer-controller"
          onClick={this.onResetTimer}
          type="button"
        >
          Reset
        </button>
      </div>
    )
  }

  getElapsedsecondsInTimeFormat = () => {
    const {timeElapsedInseconds, timerElapsedInminutes} = this.state
    const totalRemainingSeconds =
      timerElapsedInminutes * 60 - timeElapsedInseconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifyMinutes = minutes < 10 ? `0${minutes}` : minutes
    const stringifySeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${stringifyMinutes}:${stringifySeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <div className="content-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timersetting">
            <h1>{this.getElapsedSecondsInTimerFormat()}</h1>
            <p>{labelText}</p>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
