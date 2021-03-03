import './CartProduct.css'
import { BiRupee,MdRemoveShoppingCart } from 'react-icons/all'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom';

const CartProduct = ({ detail,removeMe,addOneMore,cartItemCount,removeOneMore }) => {
    return (
        <>
            <div className='cart_card' style={{ display: 'flex' }} id={detail.id}>
                <Link to={`/product-details/${detail.id}`} style={{color:'black',textDecoration:'none'}} title='more information'>
                <div className="image" style={{ background: `url(${detail.image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}></div>
                </Link>
            <div className="content">
                <div className='title'>{detail.title}</div>
                <div>
                    <div className='price'><NumberFormat value={detail.price} displayType={'text'} thousandSeparator={true} /> <BiRupee/></div>
                </div>
                <div className="button">
                    <div class="btn-group" role="group" aria-label="Basic example" style={{marginRight:'5px'}}>
                        <button type="button" class="btn btn-primary" onClick={()=>removeOneMore(detail.id)}>-</button>
                            <div class="btn btn-primary"> {cartItemCount[detail.id]} </div>
                        <button type="button" class="btn btn-primary" onClick={()=>addOneMore(detail.id)}>+</button>
                    </div>
                    <button type="button" class="btn btn-danger" onClick={()=>removeMe(detail.id)}> <MdRemoveShoppingCart/> Delete</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default CartProduct