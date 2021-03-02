import './product.css'
import { MdAddShoppingCart } from 'react-icons/all'

const Product = ({ id, product,AddToCart }) => {
    return (
        <div className="card" id={id} key={id}>
            <div className="images" style={{ background: `url(${product.images[0]})`, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
            <div className="card_data">
                <div className="title_price">
                    <div className="title" style={{ fontWeight: '800', fontSize: '20px', textTransform: 'capitalize' }}>
                        {product.details.title}
                    </div>
                    <div className="price">
                        {product.price} Rs
                                        </div>
                </div>
                <div className="rating">
                    4.5
                                    </div>
            </div>
            <div className="addToCartButton" onClick={() => AddToCart(id)}><MdAddShoppingCart /></div>
        </div>
    )
}

export default Product