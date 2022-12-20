import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/authContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const passwordRef = useRef();
  const history = useHistory();
  const authCntx = useContext(AuthContext);

  const passwordChangeHandler = (event) =>{
    event.preventDefault();
    const passwordInput = passwordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAYqGsIgEfHUjolsfD8V7lSCnYOhX1ahYs',{
      method : 'POST',
      body: JSON.stringify({
        idToken : authCntx.token,
        password : passwordInput,
        returnSecureToken : true
      }),
      headers : {
        'content-type': 'application/json'
      }
    }).then(res=>{
      history.replace('/');
    });
  }
  
  return (
    <form className={classes.form} onSubmit={passwordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={7} ref={passwordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
