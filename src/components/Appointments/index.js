// Write your code here
import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

const firstList = []

class Appointments extends Component {
  state = {title: '', date: '', initialList: firstList, isFiltered: false}

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onChangeDate = e => {
    this.setState({date: e.target.value})
  }

  startClicked = id1 => {
    this.setState(prev => ({
      initialList: prev.initialList.map(i => {
        if (i.id === id1) {
          return {...i, isStarred: !i.isStarred}
        }
        return i
      }),
    }))
  }

  onStarredBtn = () => {
    this.setState(prev => ({isFiltered: !prev.isFiltered}))
  }

  onAddAppointment = e => {
    e.preventDefault()
    const {title, date} = this.state
    const newList = {id: v4(), title, date, isStarred: false}
    if (title !== '' && date !== '') {
      this.setState(prev => ({
        initialList: [...prev.initialList, newList],
        title: '',
        date: '',
      }))
    }
  }

  render() {
    const {title, date, initialList, isFiltered} = this.state
    const classToApply = isFiltered ? 'starred-btn' : 'star-btn'
    const filteredList = isFiltered
      ? initialList.filter(i => i.isStarred === true)
      : initialList

    return (
      <div className="bg-cnt">
        <div className="card-cnt">
          <div className="form-img">
            <div className="form-cnt">
              <h1>Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <label htmlFor="titleInput" className="labelEle">
                  TITLE
                </label>
                <br />
                <input
                  id="titleInput"
                  value={title}
                  onChange={this.onChangeTitle}
                  type="text"
                  className="inputEle"
                  placeholder="Title"
                />
                <br />
                <br />
                <label htmlFor="dateInp" className="labelEle">
                  DATE
                </label>
                <br />
                <input
                  id="dateInp"
                  value={date}
                  type="date"
                  onChange={this.onChangeDate}
                  className="inputEle"
                />
                <br />
                <br />

                <button type="submit" className="sbt-btn">
                  Add
                </button>
              </form>
            </div>
            <img
              className="imgElem"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appoint-starter">
            <h1 className="head">Appointments</h1>
            <button
              type="button"
              onClick={this.onStarredBtn}
              className={classToApply}
            >
              Starred
            </button>
          </div>
          <ul className="list-items">
            {filteredList.map(i => (
              <AppointmentItem
                startClicked={this.startClicked}
                key={i.id}
                listItem={i}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
