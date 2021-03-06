import { useState } from 'react'
import FormInput from '../form-input/form-input-component'
import HeadLile from '../head-line/HeadLine'
import Button from '../button/Button'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { createDoc } from '../../firebase-config/firebase'
import './Contact.css'

const contactInfo = { name: '', email: '', phone: '', address: '', data: '', extension: '' }

const Contact = () => {

  const [formInput, setFormInput] = useState(contactInfo);
  const { name, email, phone, address, data } = formInput;
  const { fname, roomName } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  }

  const submit = async (e) => {
    e.preventDefault();

    try {

      await createDoc({...formInput, extension:fname }, 'requests');
      setFormInput(contactInfo);
      navigate('../');

    } catch (error) {
      console.log(error.message);
    }

  }


  return (
    <div className="contact-container">

      <HeadLile title='צור קשר' />

      <div className="contand-details">

        <form className='contact-form' onSubmit={submit}>

          <h4>מלאו פרטים ונחזור אליכם בהקדם:</h4>

          <FormInput type="text" placeholder='שם מלא...' value={name} name='name' onChange={change} required />

          <FormInput type="email" placeholder='דואר אלקטרוני...' value={email} name='email' onChange={change} required />

          <FormInput type="text" placeholder='טלפון/נייד...' value={phone} name='phone' onChange={change} required />

          <FormInput type="text" placeholder='כתובת...' value={address} name='address' onChange={change} />

          <textarea placeholder='פרטי פניה...' value={data} name='data' onChange={change} required />

          <Button className="contact-button" type="submit" text="שלח פניה" />

        </form>

        {state && <div className="details">
          <h3>{fname}</h3>
          <h3>{roomName}</h3>
            <img src={state.image} alt="room" />
        </div>}
      </div>
    </div>
  )
}

export default Contact