import { createDoc, addToStorage } from '../../../firebase-config/firebase'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../provider/userProvider'
import { useContext } from 'react'
import { eventsContext } from '../../provider/eventsProvider'
import FormInput from "../../form-input/form-input-component"
import Select from '../../select/Select'
import Button from "../../button/Button"

import './AddEvent.css'

const eventInfo = { title: '', start: '', day: '', eventNumber: '', extension: '', time: '', data: '', imageUrl: '' }

const AddEvent = () => {

    const [file, setFile] = useState(null);
    const [formInput, setFormInput] = useState(eventInfo);
    const { title, start, day, eventNumber, extension, time, data } = formInput;
    const { setEvents } = useContext(eventsContext);
    const navigate = useNavigate();
    const { currentUser } = useContext(userContext);


    const change = (e) => {

        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    }

    const fileChange = async (e) => {

        setFile(e.target.files[0]);
    }

    const submit = async (e) => {
        e.preventDefault();

        const { title, start } = formInput;

        if (currentUser.isAdmin || (currentUser.BuildManager && currentUser.extension === extension)) {

            try {

                const url = await addToStorage(file);
                setFormInput({ ...formInput, imageUrl: url });
                await createDoc({ ...formInput, imageUrl: url }, 'events');
                await createDoc({ title, start }, 'calendar');
                setEvents(prev => [...prev, formInput])
                setFormInput(eventInfo);
                setFile(null);
                navigate('../events-manage');

            } catch (error) {
                console.log(error.message);
            }
        }else{
            alert("No permission to add event");
        }

    }


    return (
        <form className='add-event-form' onSubmit={submit}>

            <h1>?????????? ??????</h1>

            <FormInput type="text" placeholder='???? ??????????...' value={title} name='title' onChange={change} required />

            <FormInput type="date" value={start} name='start' onChange={change} required />

            <FormInput type="text" placeholder='??????...' value={day} name='day' onChange={change} required />

            <FormInput type="text" placeholder='???????? ??????????...' value={eventNumber} name='eventNumber' onChange={change} required />

            <FormInput type="time" placeholder='??????...' value={time} name='time' onChange={change} required />

            <Select value={extension} name='extension' onChange={change} />

            <textarea placeholder='?????????? ??????????...' value={data} name='data' onChange={change} />

            <FormInput type="file" label='???????? ??????????' name='imageName' onChange={fileChange} accept="image/png, image/jpeg" required />

            <Button className="add-event-button" type="submit" text="???????? ??????????" />

        </form>
    )
}

export default AddEvent