import React, { useState } from 'react'
import { getDocByName } from '../../firebase-config/firebase'
import HeadLine from '../head-line/HeadLine'
import { useParams } from 'react-router-dom'

import './Facility.css'

const Facility = () => {

    const [rooms, setRooms] = useState([]);
    const { name } = useParams();


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

    return (
        <>
            <HeadLine title={`החדרים של ${name}`} />
            <div className="items">
                {rooms.map((room) => <div key={room.name} className="item">
                    <img src={room.imageUrl} alt={room.name} />
                    <h4>{room.name}</h4>
                    <button>שלח בקשה</button>
                </div>)}
            </div>
        </>
    )
}

export default Facility