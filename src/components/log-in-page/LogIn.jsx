import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logInWithEmailAndPassword } from '../../firebase-config/firebase'
import Button from '../button/Button'
import FormInput from '../form-input/form-input-component'
import './LogIn.css'


const LogIn = ({setlogin}) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = async () => {

        setlogin(false);

        try {
            const { user } = await logInWithEmailAndPassword(email, password);
            if (user)
                navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    return (    
            <form className='logIn-container'>

            <h1>התחברות</h1>

                <FormInput
                    type="email"
                    placeholder='...מייל'
                    value={email}
                    required
                    onChange={(e) => { setEmail(e.target.value) }} />

                <FormInput
                    type="password"
                    placeholder='...סיסמא'
                    value={password}
                    required
                    onChange={(e) => { setPassword(e.target.value) }} />

                <Button type='button' onClick={logIn} text="כניסה" className="log-in-button" />

            </form>
    )
}

export default LogIn