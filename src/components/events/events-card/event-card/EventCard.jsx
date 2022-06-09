import Button from '../../../button/Button'
import './EventCard.css'

const EventCard = ({ event, textButton, onClickFunc, buttonClass, cardClassName }) => {

    return (
        <div className={cardClassName} >
            <img src={event.imageUrl} alt={event.title} />
            <span className='event-name'>{event.title}</span>
            <Button className={buttonClass} type='button' onClick={() => { onClickFunc(event) }} text={textButton} />
        </div>

    )
}

export default EventCard