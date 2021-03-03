import './Product.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState,useContext } from "react"
import { db } from "../../firebase";
import NumberFormat from 'react-number-format'
import {BiRupee,MdAddShoppingCart} from 'react-icons/all'
import Navbar from '../Navbar/navbar';
import firebase from 'firebase'
import { UserContext } from '../../context/context';

const ProductDetails = ({ match }) => {
    const {
        params: { id }
    } = match
    const [user, setuser] = useContext(UserContext).user
    const [elementNumber, setElementNumber] = useState(0);
    const [images, setImages] = useState([]);
    const [details, setdetails] = useState({
        title: '',
        content: '',
        price: 0
    })
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

    const getDetails = () => {
        db.collection('products').doc(id).get()
            .then((snapshot) => {
                const filePath = snapshot.data()
                setImages([...filePath.images])
                setdetails({
                    title: filePath.details.title,
                    content: filePath.details.description,
                    price: filePath.price
                })
            })
    }
    useEffect(async () => {
        await getDetails();
        GetItemsNumberInCart()
    }, [])
    const AddToCart = async (id) => {
       await db.collection('users').doc(user.uid).update({
            cart: firebase.firestore.FieldValue.arrayUnion(id)
       })
        GetItemsNumberInCart()
    }
    
    return (
        <>
            <Navbar elementNumber={elementNumber}/>
            <div className='details'>
            <div className="carousel">
                <Carousel>
                    {
                        images.map((image, i) => {
                            return (
                                <div key={i}>
                                    <img src={image} />
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='product-details'>
                <div className="title">
                    {details.title}
                </div>
                <div className="description">
                    {details.content}
                </div>
                <div className="Price">
                    <NumberFormat value={details.price} displayType={'text'} thousandSeparator={true} /> <BiRupee />
                </div>
                    <div className="Addtocart">
                        <button type="button" class="btn btn-success" onClick={()=>AddToCart(id)} style={{marginTop:'20px',padding:'5px 25px'}}><MdAddShoppingCart/> Add To Cart</button>
                </div>
            </div>
        </div>
        </>
    )
};
export default ProductDetails