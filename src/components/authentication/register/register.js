import React,{useContext, useState,} from 'react'

import { UserContext } from '../../../context/context'
import { auth } from '../../../firebase';
import { signInWithGoogle } from '../../../services/auth'
import Signinbutton from '../../Signgoogle/buttons';
import { RiLock2Fill } from 'react-icons/all';
import { Link,Redirect } from 'react-router-dom';


const Register = () => {
    
    const [formdata, setformdata] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [logged, setlogged] = useState(false);
    const [emailerror, setemailerror] = useState(false);
    const [user, setuser] = useContext(UserContext).user
    const[email, setemail] = useState(false);
    const SignInWithGoogle = async () => {
        let user = await signInWithGoogle();
        if (user) {
            setuser(user);
            setlogged(true);
        }
    }

    const registerbro = async () => {
        await auth.createUserWithEmailAndPassword(formdata.email, formdata.password)
            .then((res => {
                console.log(res.user);
                setlogged(true)
                setuser(res.user);
            }))
            .catch((err) => {
                console.log(err.message);
                if (err.message == 'The email address is badly formatted.') {
                    setemailerror(true);
                }
                if (err.message == 'The email address is already in use by another account.') {
                    setemail(true);
                }
            })
    };
    const valuechanged = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setemailerror(false);
        setformdata((preve) => {
        
            return {
                ...preve,
                [name]: value
            }
        })
    }

    return (
        <div>
            <div className="Login-form">
                {logged ? <Redirect to='/home' /> : null}
                <div style={{ color: 'black', fontSize: '25px', fontWeight: '600' }}>Register</div>
                 {email ? (<div style={{ color:'red'}}>User Already exits</div>):null}
                <div className='form'>
                    <div className="form-floating mb-3">
                        <input name='username' type="text" className="form-control" id="floatingInput" placeholder="xyz" onChange={valuechanged} value={formdata.username} />
                        <label for="floatingInput">User name</label>
                    </div>
                    {emailerror ? (<div style={{ color: 'red' }}>PLs provide correct email</div>) : null}
                    <div className="form-floating mb-3">
                        <input name='email' type="email" className='form-control' id="floatingInput" placeholder="name@example.com" onChange={valuechanged} value={formdata.email} />
                        <label for="floatingInput">Email address</label>
                    </div>
                    
                    <div className="form-floating">
                        <input name='password' type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={valuechanged} value={formdata.password} />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button type="button" class="btn btn-success" onClick={registerbro} style={{ marginTop: '10px' }}>Register <RiLock2Fill /></button>
                 <div>Already have Account? <Link to='/'>Login</Link></div>   
                </div>
                
            </div>
            <div style={{textAlign: 'center'}}>
                recommended google sign in
            </div>
            <div onClick={SignInWithGoogle}>
                <Signinbutton />
            </div>
        </div>
    )
}

export default Register