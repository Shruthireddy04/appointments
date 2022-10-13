// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {listItem, startClicked} = props
  const {title, date, id, isStarred} = listItem
  const formatted = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
  const url = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    startClicked(id)
  }

  return (
    <li className="appointmentItem-cnt">
      <div className="title-star-cnt">
        <p className="heading">{title}</p>
        <button type="button" className="btn-click" onClick={onClickStar}>
          <img src={url} alt="star" className="img-star" />
        </button>
      </div>
      <p className="para">Date: {formatted}</p>
    </li>
  )
}
export default AppointmentItem
