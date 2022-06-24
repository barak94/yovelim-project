import React, { useContext, useState, useEffect } from 'react'
import { usersContext } from '../provider/usersProvider'
import "./UserManag.css";
import { AiFillDelete } from 'react-icons/ai';
import Button from '../button/Button';
import ConfirmRemove from '../confirm-remove/ConfirmRemove';
import { useNavigate } from 'react-router-dom'
import { deleteAuthUser } from '../../firebase-config/firebase';


const UserManag = ({ currentUser }) => {

  const { users, setUsers } = useContext(usersContext);
  const [deleted, setDeleted] = useState(false);
  const [myUser, setMyUser] = useState([]);
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {

    setMyUser(users);

    if (currentUser !== null && currentUser.BuildManager && !currentUser.isAdmin) {
      setMyUser(users.filter((item) => currentUser.extension === item.extension));
    }

  }, [users, currentUser]);

  const navigate = useNavigate();

  const resetInfo = () => {
    setUserInfo(null);
    setDeleted(false);
  }

  const deleteUser = async () => {

    await deleteAuthUser(userInfo);
    setUsers(prev => prev.filter((user) => user.email !== userInfo.email))
    resetInfo();
  }


  const addUser = () => {
    navigate("./registr");
  }

  return (

    <>
      <div className='users-container' >
        <div className='users-box'>
          {myUser.map((user) => {

            return <div className='user-box' key={user.email} >
              <h3>{user.name}</h3>
              <span>דוא"ל: {user.email}</span>
              <span>תפקיד: {user.role}</span>
              <span>שלוחה: {user.extension}</span>
              <span>טלפון: {user.phoneNumber}</span>
              <AiFillDelete className='delete-icon' onDoubleClick={() => { setUserInfo(user); setDeleted(true); }} />
            </div>

          })}
        </div>

        <Button className='add-user' type='button' text='רישום עובד' onClick={addUser} />

      </div>

      {deleted && <ConfirmRemove onDelete={deleteUser} onReset={resetInfo} />}
    </>
  )
}

export default UserManag