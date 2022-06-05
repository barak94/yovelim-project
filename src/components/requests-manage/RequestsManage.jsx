import React, { useState, useEffect } from 'react'
import { getCollection, deleteDocRef } from '../../firebase-config/firebase'
import Button from '../button/Button'
import './RequestsManage.css'

const RequestsManage = () => {

    const [requests, setRequests] = useState([]);

    useEffect(() => {

        const requestCollection = async () => {

            try {
                const collection = await getCollection('requests');

                setRequests(collection);
            } catch (error) {

                console.log(error);
            }
        }

        requestCollection();

    }, []);

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
                    {`התקבל ב- ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}

                    <Button text="מחק בקשה" className='request-button' onClick={() => { deletRequest(request.id) }} />

                </div>

            })}


        </div>)

}

export default RequestsManage