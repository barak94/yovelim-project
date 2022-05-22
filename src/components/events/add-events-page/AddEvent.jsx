import { createDoc, addToStorage } from '../../../firebase-config/firebase'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { eventsContext } from '../../provider/eventsProvider'
import FormInput from "../../form-input/form-input-component"
import Button from "../../button/Button"

import './AddEvent.css'

const eventInfo = { title: '', start: '', day: '', eventNumber: '', extension:'', time:'', data: '', imageName: '' }

const AddEvent = () => {

    const [file, setFile] = useState(null);
    const [formInput, setFormInput] = useState(eventInfo);
    const { title, start, day, eventNumber, extension, time, data } = formInput;
    const { setEvents } = useContext(eventsContext);
    const navigate = useNavigate();


    const change = (e) => {

        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    }

    const fileChange = async (e) => {

        const { name } = e.target.files[0];
        setFile(e.target.files[0]);
        setFormInput({ ...formInput, [e.target.name]: name });

    }

    const submit = async (e) => {
        e.preventDefault();

        const { title, start } = formInput;

        try {
            if (file)
                addToStorage(file);
            await createDoc(formInput, 'events');
            await createDoc({ title, start }, 'calendar');
            setEvents( prev => [...prev, formInput] )
            setFormInput(eventInfo);
            setFile(null);
            navigate('../events-manage');

        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <form className='add-event-form' onSubmit={submit}>

            <h1>אירוע חדש</h1>

            <FormInput type="text" placeholder='שם אירוע...' value={title} name='title' onChange={change} required />

            <FormInput type="date" value={start} name='start' onChange={change} required />

            <FormInput type="text" placeholder='יום...' value={day} name='day' onChange={change} required />

            <FormInput type="text" placeholder='מספר אירוע...' value={eventNumber} name='eventNumber' onChange={change} required />

            <FormInput type="time" placeholder='שעה...' value={time} name='time' onChange={change} required />

            <select value={extension} name='extension' onChange={change}>
                <option value="">שלוחה</option>
                <option value="שלוחת מלחה" name='שלוחת מלחה' >שלוחת מלחה</option>
                <option value="רמת שרת דניה">רמת שרת דניה</option>
                <option value="עין כרם">עין כרם</option>
                <option value="מרכז תרבות בית טיילור">מרכז תרבות בית טיילור</option>
                <option value="מרכז ספורט בית טיילור">מרכז ספורט בית טיילור</option>
                <option value="בית רחל">בית רחל</option>
                <option value="פיליפ לאון">פיליפ לאון</option>
                <option value="מרכז ספורט בית טיילור">המרכז הקהילתי עש הסנפלד</option>
            </select>

            <textarea placeholder='תיאור אירוע...' value={data} name='data' onChange={change} />

            <FormInput type="file" label='הוסף תמונה' name='imageName' onChange={fileChange} accept="image/png, image/jpeg" required />

            <Button className="add-event-button" type="submit" text="הוסף אירוע" />

        </form>
    )
}

export default AddEvent