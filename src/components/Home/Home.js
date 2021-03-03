
import './Home.css'
import { useEffect, useState, useContext } from "react";
import { db } from "../../firebase";
import Navbar from "../Navbar/navbar"
import { UserContext } from '../../context/context'
import firebase from 'firebase'
import Product from '../product/product';


const Home = () => {
    const [products, setproducts] = useState([]);
    const [user, setuser] = useContext(UserContext).user
    const [elementNumber, setElementNumber] = useState(0);

    const GetItemsNumberInCart = async () => {
        try {
            await db.collection('users').doc(user.uid).get()
                .then((snapshot) => {
                    setElementNumber(snapshot.data().cart.length)
                })
        } catch (error) {
            console.log(error);
            setElementNumber(0)
        }
    }

    const AddToCart = async (id) => {
       await db.collection('users').doc(user.uid).update({
            cart: firebase.firestore.FieldValue.arrayUnion(id)
       })
        GetItemsNumberInCart()
    }


    useEffect(async () => {
        await db.collection('products').onSnapshot((snapshot) => {
            setproducts(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        product: doc.data()
                    }
                })
            )
        })
        GetItemsNumberInCart()
    }, [])

    return (
        <div>
            <Navbar elementNumber={elementNumber}/>
            <div className="products">
                {
                    products.map(({ id, product }) => {
                        return (

                            <Product id={id} product={product} AddToCart={AddToCart}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home