import React, { useState, useContext } from 'react'
import { facilityContext } from '../provider/facilityProvider'
import { getDocByName } from '../../firebase-config/firebase'
import HeadLine from '../head-line/HeadLine'

import './Facility.css'

const Facility = () => {

    const [rooms, setRooms] = useState([]);
    const { facility } = useContext(facilityContext);


    const facilitiesCollection = async () => {
        try {

            const snapShot = (await getDocByName("rooms", facility)).data();
            setRooms(snapShot.rooms);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    facilitiesCollection();

    return (
        <>
            <HeadLine title={`החדרים של ${facility}`} />
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