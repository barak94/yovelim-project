import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDocByName, removeExistingDog } from '../../firebase-config/firebase'
import Button from '../button/Button'
import HeadLine from '../head-line/HeadLine'
import ConfirmRemove from '../confirm-remove/ConfirmRemove'
import { userContext } from '../provider/userProvider'

import './Facility.css'

const Facility = () => {

    const [deleted, setDeleted] = useState(false);
    const [room, setRoomInfo] = useState(null)
    const [rooms, setRooms] = useState([]);
    const { name } = useParams();
    const { currentUser } = useContext(userContext);
    const navigate = useNavigate();


    const facilitiesCollection = async () => {
        try {

            const snapShot = (await getDocByName("rooms", name)).data();
            setRooms(snapShot.rooms);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    facilitiesCollection();

    const navigateHandles = (room) => {

        navigate(`../../Contact/${name}/${room.roomName}`, { state: { image: room.imageUrl } });

    }

    const addRoom = () => {
        navigate("../add-room")
    }

    const resetInfo = () => {
        setRoomInfo(null);
        setDeleted(false);
      }

      const deleteRoom = async () => {
          console.log(room);
        await removeExistingDog("rooms",room);
        resetInfo();
      }


    return (
        <>
            <div className='room-container'>
                <HeadLine title={`החדרים של ${name}`} />
                <div className="items">
                    {rooms.map((room) => <div key={room.roomName} className="item">
                        <img src={room.imageUrl} alt={room.roomName} />
                        <h4>{room.roomName}</h4>
                        {!currentUser && <Button text="שלח בקשה" onClick={() => { navigateHandles(room) }} />}
                        {currentUser && (currentUser.isAdmin || (currentUser.BuildManager && currentUser.extension === name)) &&
                         <Button text="מחק חדר" onClick={()=> {setRoomInfo(room); setDeleted(true);}} />}
                    </div>)}

                </div>
                {currentUser && (currentUser.isAdmin || currentUser.BuildManager) && <Button className='add-room' type='button' text='הוסף חדר' onClick={addRoom} />}
            </div>

            {deleted && <ConfirmRemove onDelete={deleteRoom} onReset={resetInfo} />}
        </>
    )
}

export default Facility