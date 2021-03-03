import './cart.css'
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../context/context'
import { db } from "../../firebase";
import Navbar from "../Navbar/navbar"
import CartProduct from './CartProduct/CartProduct'
import NumberFormat from 'react-number-format'
import {BiRupee} from 'react-icons/all'
import StripeCheckout from 'react-stripe-checkout'
const Cart = () => {
    const [user, setuser] = useContext(UserContext).user;
    const [itemsList, setitemsList] = useState([]);
    const [product, setproduct] = useState([])
    const [cost, setcost] = useState(0)
    const [cartItemCount,setcartItemCount] = useState({})
    useEffect(() => {
        ItemInformation();
    }, []);
    
    const addOneMore = (id) => {
        const itemClicked = product.filter((item) => {
            return id == item.id
        })
        setcost((preve) => {
            return parseFloat(itemClicked[0].price) + parseFloat(preve)
        })
        setcartItemCount((preve) => {
            return {
                ...preve,
                [id]:preve[id]+1
            }

        })
    };

    const removeOneMore = (id) => {
        if (cartItemCount[id] > 1) {
            const itemClicked = product.filter((item) => {
                return id == item.id
            })
            setcost((preve) => {
                return parseFloat(preve) - parseFloat(itemClicked[0].price)
            })
            setcartItemCount((preve) => {
                return {
                    ...preve,
                    [id]: preve[id] - 1
                }

            })
        }
    };

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
        var newList = product.filter((item) => {
            return id != item.id
        })
        setproduct(newList)
        var idsonly = newList.map((item) => {
            return (item.id)
        })
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
                setcartItemCount((preve) => {
                    return {
                        ...preve,
                        
                            [id]: 1
                        
                }
                })
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

    const onToken = (token) => {
        if (token) {
            RemoveAll()
        }
    }
    
    return (
        <div>
            <Navbar elementNumber={product.length} />
            {product.length != 0 ? (
                <>
                     <div className="total"><>Total Cost: </><NumberFormat value={cost} displayType={'text'} thousandSeparator={true} /> <BiRupee />
                <div>
                    <StripeCheckout
                        token={onToken}
                        currency='In'
                        amount={cost*100}
                        stripeKey='pk_test_51HblxaFatY2lMDlS0BbqxLb773qgMENPTmcfIY8uqlnkUPKDdWMyZket60szkecmhqfycOJ5toKUg7OTHjoWENZa000SG3Ynda'
                        name='E-commerce'
                        shippingAddress
                        style={{marginRight:'20px'}}
                    />
                    <button type="button" class="btn btn-danger" onClick={RemoveAll}>Remove All Items</button>
                </div>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    product.map((item) => {
                        return (<CartProduct detail={item} key={item.id + 'key'} removeMe={removeMe} addOneMore={addOneMore} cartItemCount={cartItemCount} removeOneMore={removeOneMore}/>)
                    })
                }
            </div>
               </>
            ) : (
                    <div style={{textAlign:'center',fontSize:'20px',fontWeight:'900'}}>
                        <img src='images/Empty cart.svg' style={{ height: '100%', width: '90%', display: 'flex', justifyContent: 'center', maxHeight: '400px' }} />
                        Empty cart
                    </div>
            )}
        </div>
    )
};

export default Cart