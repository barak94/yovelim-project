import React from 'react'
import Button from '../button/Button'
import './ConfirmRemove.css'

const ConfirmRemove = ({onDelete, onReset}) => {

    return (
        <div className="confirm-delete">
            <h3>האם אתה בטוח שברצונך למחוק ?</h3>

            <div className="delete-button">
                <Button className='deleteButton' text="כן" type='button' onClick={onDelete} />
                <Button className='deleteButton' text="לא" type='button' onClick={onReset} />
            </div>
        </div>
    )
}

export default ConfirmRemove