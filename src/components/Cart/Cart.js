import './cart.css'
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../context/context'
import { db } from "../../firebase";
import Navbar from "../Navbar/navbar"
import CartProduct from './CartProduct/CartProduct'
import NumberFormat from 'react-number-format'
import {BiRupee} from 'react-icons/all'

const Cart = () => {
    const [user, setuser] = useContext(UserContext).user;
    const [itemsList, setitemsList] = useState([]);
    const [product, setproduct] = useState([])
    const [cost, setcost] = useState(0)
    useEffect( () => {
        ItemInformation();
        console.log('runed')
    },[]);
    
    const ItemInformation = async () => {
        await db.collection('users').doc(user.uid).get()
            .then((snapshot) => {
                const dataPath = snapshot.data()
                dataPath.cart.forEach((id) => {
                    getProductDetails(id)
                })
            })
    }

    const RemoveAll = async () => {
        setproduct([])
        setcost(0)
        await db.collection('users').doc(user.uid).update({
            cart: []
        })
    }

    const removeMe = async (id) => {
        // console.log(id);
        var newList = product.filter((item) => {
            return id != item.id
        })
        setproduct(newList)
        var idsonly = newList.map((item) => {
            return (item.id)
        })
        // console.log(newList)
        await db.collection('users').doc(user.uid).update({
            cart: idsonly
        })
        // ItemInformation()
    }
    const getProductDetails = (id) => {
        db.collection('products').doc(id).get()
            .then((snapshot) => {
                const filePath = snapshot.data()
                setcost((preve) => (parseFloat(preve) + parseFloat(filePath.price)))
                setproduct((preve) => {
                    return [
                        ...preve,
                        {
                            id: id,
                            title: filePath.details.title,
                            image: filePath.images[0],
                            price: filePath.price
                        }
                    ]
                })
            })
    }
    
    return (
        <div>
            <Navbar elementNumber={product.length} />
            <div className="total"><>Total Cost: </><NumberFormat value={cost} displayType={'text'} thousandSeparator={true} /> <BiRupee /><div><button type="button" class="btn btn-danger" onClick={RemoveAll}>Remove All Items</button></div></div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                product.map((item) => {
                    return (<CartProduct detail={item} key={item.id+'key'} removeMe={removeMe}/>)
                })
            }
            </div>
        </div>
    )
};

export default Cart