import React, { useState, useEffect } from 'react'
import { getCollection, deleteDocRef } from '../../firebase-config/firebase'

import Button from '../button/Button'
import './RequestsManage.css'

const RequestsManage = ({ currentUser }) => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {

        const requestCollection = async () => {

            try {
                const collection = await getCollection('requests');
                collection.sort((a, b) => a.date.toDate() - b.date.toDate());

                if (currentUser !== null && currentUser.BuildManager && !currentUser.isAdmin) {
                    setRequests(collection.filter((item) => currentUser.extension === item.extension));
                } else {
                    setRequests(collection);
                }
            } catch (error) {
                console.log(error);
            }
        }

        requestCollection();
    }, [currentUser]);

    const deletRequest = async (id) => {

        try {
            await deleteDocRef('requests', id);
            setRequests(prev => prev.filter((request) => request.id !== id));
        } catch (error) {
            console.log(error);
        }

    }



    return (
        <div className="requests-container">
            {requests.map(request => {
                const date = request.date.toDate();
                return <div className="request-card" key={request.id}>
                    <p>שם המבקש: {request.name}</p>
                    <p>דוא"ל: {request.email}</p>
                    <p>פלפון: {request.phone}</p>
                    <p>{request.extension}</p>
                    <p>פרטי בקשה: {request.data}</p>
                    {`התקבל ב- ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}

                    <Button text="מחק בקשה" className='request-button' onClick={() => { deletRequest(request.id) }} />
                </div>
            })}

        </div>)
}

export default RequestsManage