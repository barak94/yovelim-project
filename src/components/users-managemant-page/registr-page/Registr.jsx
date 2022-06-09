import { creatAuthUserWithEmailAndPassword, createUser } from '../../../firebase-config/firebase'
import React, { useState, useContext } from 'react'
import { usersContext } from '../../provider/usersProvider'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../form-input/form-input-component'
import Select from '../../select/Select'
import Button from '../../button/Button'
import './Registr.css'


const userInfo = { name: '', email: '', phoneNumber: '', role: '', extension: '', password: '', ConfirmPassword: '', isAdmin: false, BuildManager: false }

const Registr = () => {

  const [formInput, setFormInput] = useState(userInfo);
  const { name, email, phoneNumber, role, extension, password, ConfirmPassword, isAdmin, BuildManager } = formInput;
  const navigate = useNavigate();

  const { setUsers } = useContext(usersContext);

  const change = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  }

  const submit = async (e) => {
    e.preventDefault();

    if (password !== ConfirmPassword) {
      alert("The Password Dont match");
      return;
    }

    try {

      const { user } = await creatAuthUserWithEmailAndPassword(email, password);
      await createUser(user, formInput);
      setUsers(prev => [...prev, formInput]);
      setFormInput(userInfo);
      navigate('../users-manage');

    } catch (error) {
      if (error.code === 'auth/email-already-in-use')
        alert("user already in use");

    }

  }

  return (
    <form className='register-form' onSubmit={submit}>

      <h1>רישום עובד</h1>

      <FormInput type="text" placeholder='שם משתמש...' value={name} name='name' onChange={change} required />

      <FormInput type="email" placeholder='דוא"ל...' value={email} name='email' onChange={change} required />

      <FormInput type="text" placeholder='מספר פלפון...' value={phoneNumber} name='phoneNumber' onChange={change} required />

      <FormInput type="text" placeholder='תפקיד...' value={role} name='role' onChange={change} required />

      <Select value={extension} name='extension' onChange={change}/>

      <FormInput type="password" placeholder='סיסמא...' value={password} name='password' onChange={change} required />

      <FormInput type="password" placeholder='אימות סיסמא...' value={ConfirmPassword} name='ConfirmPassword' onChange={change} required />

      <FormInput type="checkbox"
        label="מנהל כללי"
        value={isAdmin}
        name='isAdmin'
        onChange={(e) => {
          const { name, checked } = e.target;
          setFormInput({ ...formInput, [name]: checked });
        }} />

      <FormInput type="checkbox"
        label="מנהל מבנה"
        value={BuildManager}
        name='BuildManager'
        onChange={(e) => {
          const { name, checked } = e.target;
          setFormInput({ ...formInput, [name]: checked });
        }} />

      <Button className="register-button" type="submit" text="רישום" />

    </form>
  )
}

export default Registr