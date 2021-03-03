import './product.css'
import { MdAddShoppingCart } from 'react-icons/all'
import NumberFormat from 'react-number-format'
import { BiRupee } from 'react-icons/all'
import { Link } from 'react-router-dom';

const Product = ({ id, product,AddToCart }) => {
    return (
        <div className="card" id={id} key={id}>
            <Link to={`/product-details/${id}`} style={{color:'black',textDecoration:'none'}}>
            <div className="images" style={{ background: `url(${product.images[0]})`, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
            <div className="card_data">
                <div className="title_price">
                    <div className="title" style={{ fontWeight: '800', fontSize: '20px', textTransform: 'capitalize' }}>
                        {product.details.title}
                    </div>
                    <div className="price">
                        <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} /> <BiRupee />
                    </div>
                </div>
            </div></Link>
            <div className="addToCartButton" onClick={() => AddToCart(id)}><MdAddShoppingCart /></div>
        </div>
    )
}

export default Product