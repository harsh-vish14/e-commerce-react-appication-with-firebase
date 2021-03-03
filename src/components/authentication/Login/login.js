import './login.css'
import {RiLock2Fill} from 'react-icons/all'
import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../../../context/context'
import { signInWithGoogle } from '../../../services/auth'
import Signinbutton from '../../Signgoogle/buttons';
import { auth, db } from '../../../firebase';

const Login = () => {
    const [formdata, setformdata] = useState({
        email: '',
        password: ''
    })
    const [user,setuser] = useContext(UserContext).user
    const [logged, setlogged] = useState(false);
    const [emailerror, setemailerror] = useState(false);
    const [nouser, setnouser] = useState(false);

    const loginbro = async () => {
        await auth.signInWithEmailAndPassword(formdata.email, formdata.password)
            .then((res) => {
                console.log(res.user);
                setlogged(true);
                setuser(res.user);
            }).catch((err) => {
                console.log(err.message);
                if (err.message == 'The email address is badly formatted.') {
                    setemailerror(true);
                }
                if (err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.' || err.message == 'The password is invalid or the user does not have a password.') {
                    setnouser(true);
                }
            })
        console.log(formdata);
    }
    
    const valuechanged = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setemailerror(false);
        setnouser(false);
        setformdata((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    
    const SignInWithGoogle = async () => {
        let user = await signInWithGoogle();
        if (user) {
            db.collection(`users`).doc(user.uid).set({
                name: user.displayName,
            },{ merge: true })
            setuser(user);
            setlogged(true);
            
        }
    }
// is-valid
    return (
        <div>
            <div className="Login-form">
                {logged ? <Redirect to='/home' /> : null}
                <div style={{ color: 'black', fontSize: '25px', fontWeight: '600' }}>Login</div>
                {nouser ? (<div style={{ color:'red'}}>Invalid email or password</div>):null}
                <div className='form'>
                    {emailerror ? (<div style={{ color:'red'}}>PLs provide correct email</div>):null}
                    <div className="form-floating mb-3">
                        <input name='email' type="email" className='form-control' id="floatingInput" placeholder="name@example.com" onChange={valuechanged} value={formdata.email} />
                        <label for="floatingInput">Email address</label>
                    </div>
                    
                    <div className="form-floating">
                        <input name='password' type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={valuechanged} value={formdata.password} />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button type="button" class="btn btn-success" onClick={loginbro} style={{ marginTop: '10px' }}>Login <RiLock2Fill /></button>
                    <div>
                        Not have a account? <Link to="/Register" style={{color:'#0247ae'}}>Register</Link>
                    </div>
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                recommended google sign in
            </div>
            <div onClick={SignInWithGoogle} >
                <Signinbutton />
            </div>
        </div>
    )
}

export default Login