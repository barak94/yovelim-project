import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { userContext } from '../provider/userProvider'
import { signOutUser } from '../../firebase-config/firebase'
import Dropdown from 'react-dropdown';
import Structures from '../home-page/Structures/Structures';
import LogIn from '../log-in-page/LogIn'
import './nav.css'

const Nav = () => {
    const { currentUser } = useContext(userContext);
    const [loginPressed, setLoginPressed] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {

        if (event.value === 'ניהול משתמשים')
            navigate('./users-manage');
        else
            navigate('./events-manage');

    }

    return (
        <>
            <div className="nav">

                <div className='img-container'>
                    <Link to='/'>
                        <img src="https://firebasestorage.googleapis.com/v0/b/test-1-9bda5.appspot.com/o/images%2Flogo.png?alt=media&token=a27526d9-8068-4203-9c2d-88571200ea17" alt='לוגו יובלים' />
                    </Link>
                </div>

                <div className="link-container">

                    <Link to='/' className="nav-link">
                        בית
                    </Link>
                    <Link to="About" className='nav-link' >
                        מי אנחנו
                    </Link>
                    <Link to="Events" className='nav-link' >
                        לוח ארועים
                    </Link>
                    <Link to="Contact" className='nav-link'>
                        צור קשר
                    </Link>
                    {currentUser && (currentUser.isAdmin || currentUser.BuildManager) &&

                        <Dropdown
                            className='nav-link'
                            aria-expanded="false"
                            placeholder="אפשרויות מנהל"
                            onChange={handleChange}
                            options={[{ label:'ניהול משתמשים', value: 'ניהול משתמשים' },
                            { lable:'ניהול אירועים', value: 'ניהול אירועים' }]}
                        />}

                </div>

                {currentUser ? <Link to="" className='nav-link' onClick={signOutUser}> יציאה </Link>
                    : <span onClick={() => setLoginPressed(!loginPressed)} className='nav-link'>
                        כניסת עובדים
                    </span>}

            </div >

              <div className= "facilities-text">
                <Structures currentUser={currentUser} />

                {!currentUser && <div className="text">
                    <h3>חזון יובלים</h3>
                    <p>מינהל קהילתי יובלים יהיה בית פתוח לכלל הקהילה וייתן מענה לצרכים המשתנים של כל קבוצה וכל פרט בה, תוך שמירה על פלורליזם ושוויון.
                        תושבי שכונת יובלים יהוו גורם יוזם ומשמעותי בעיצוב המרחב החינוכי, הקהילתי, התרבותי והאורבאני.
                        החינוך הפורמאלי והבלתי פורמאלי יהוו את הליבה הערכית של השכונה ומוסדות החינוך יהיו שותפים במרקם הקהילה.
                        מרחב יובלים יהיה נגיש לכל, לבעלי צרכים מיוחדים, לילדים, להורים ולאוכלוסייה המבוגרת.
                        המינהל יפעל בשיתוף פעולה עם כלל הגורמים, יפתח ערבות הדדית וחברה יוזמת וחסונה.</p>
                </div>}
            </div>

            {loginPressed && <LogIn setlogin={setLoginPressed} />}
        </>
    )
}

export default Nav