import './navbar.css'
import { useContext, useState } from "react"
import { UserContext } from "../../context/context"
import {FaRegUserCircle,MdShoppingCart,IoStorefrontOutline} from 'react-icons/all'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'

const Navbar = ({elementNumber}) => {
    const [user, setuser] = useContext(UserContext).user
    return (
        <div className="navbar">
            {
                console.log("this is current user uid: "+user.uid)
            }
            <div className="logo">
                <Link to="/home" style={{textDecoration:"none",color:'black'}}><IoStorefrontOutline /> E-commerce</Link>
            </div>
            <div className="information">
                Welcome, {user.displayName ? (<>{user.displayName} <img src={user.photoURL} alt="profile image" height="30px" style={{ borderRadius: "50%" }} /></>)
                    : (<FaRegUserCircle />
                    )}
            </div>
            <div className="cart" >
                <div className='indicator'>{elementNumber}</div>
                    <MdShoppingCart className='carticon'/>
            </div>
        </div>
    )
}

export default Navbar