import './navbar.css'
import { useContext,useEffect, useState } from "react"
import { UserContext } from "../../context/context"
import {FaRegUserCircle,MdShoppingCart,IoStorefrontOutline} from 'react-icons/all'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'

const Navbar = ({elementNumber}) => {
    const [user, setuser] = useContext(UserContext).user
    const [username,setusername] = useState('')
    useEffect( async () => {
        await db.collection('users').doc(user.uid).get()
            .then((snapshot) => {
                setusername(snapshot.data().name)
            })
    }, [])
    return (
        <div className="navbar">
            {
                
            }
            <div className="logo">
                <Link to="/home" style={{textDecoration:"none",color:'black'}}><IoStorefrontOutline /> E-commerce</Link>
            </div>
            <div className="">
                <Link to="/home" style={{textDecoration:"none",color:'black'}}>Home</Link>
            </div>
            <div className="information">
                Welcome, {user.displayName ? (<>{username} <img src={user.photoURL} alt="profile image" height="30px" style={{ borderRadius: "50%" }} /></>)
                    : (<> {username} < FaRegUserCircle /></>
                    )}
            </div>
            <div className="cart" >
                <div className='indicator'>{elementNumber}</div>
                <Link to='/cart' style={{color:'black'}}>
                    <MdShoppingCart className='carticon'/>
                </Link>
            </div>
        </div>
    )
}

export default Navbar