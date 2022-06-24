import React, { useState, useContext } from 'react'
import { addToStorage, updateExistingDoc } from '../../firebase-config/firebase';
import { userContext } from '../provider/userProvider';
import { useNavigate } from 'react-router-dom';
import FormInput from "../form-input/form-input-component"
import Select from '../select/Select'
import Button from '../button/Button';

const roomInfo = { roomName: '', extension: '', imageUrl: '' };

const AddRoom = () => {

    const [formInput, setFormInput] = useState(roomInfo);
    const [file, setFile] = useState(null);
    const { roomName, extension } = formInput;
    const { currentUser } = useContext(userContext);
    const navigate = useNavigate();

    const change = (e) => {
        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    }

    const fileChange = async (e) => {
        setFile(e.target.files[0]);
    }

    const submit = async (e) => {
        e.preventDefault();

        if (currentUser.isAdmin || (currentUser.BuildManager && currentUser.extension === extension)) {

            try {

                const url = await addToStorage(file);
                await updateExistingDoc("rooms", extension, { ...formInput, imageUrl: url });
                setFormInput(roomInfo);
                setFile(null);
                navigate('../');

            } catch (error) {
                console.log(error.message);
            }
        }else{
            alert("No permission");
        }
    }


    return (

        <form className='add-event-form' onSubmit={submit}>

            <h1>חדר חדש</h1>

            <FormInput type="text" placeholder='שם חדר...' value={roomName} name='roomName' onChange={change} required />

            <Select value={extension} name='extension' onChange={change} required />

            <FormInput type="file" label='הוסף תמונה' name='imageName' onChange={fileChange} accept="image/png, image/jpeg" required />

            <Button className="add-room-button" type="submit" text="הוסף חדר" />
        </form>
    )
}

export default AddRoom