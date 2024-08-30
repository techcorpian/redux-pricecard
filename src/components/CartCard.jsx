import React from 'react';
import { useDispatch } from 'react-redux';
import { updateProductQuantity } from '../redux/reducers/products.reducer';

const CartCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    dispatch(updateProductQuantity(product.id, parseInt(e.target.value, 10)));
  };

  return (
    <div className='d-flex justify-content-between border-bottom border-top py-4' key={product.id}>
      <div className='d-flex gap-4'>
        <div>
          <img src={product.thumbnail} alt={product.title} width='200px' className='border' />
        </div>
        <div className='' style={{ width: '25%' }}>
          <h2>{product.title}</h2>
          <p className='word-wrap'>{product.description}</p>
        </div>
      </div>
      <div className='d-flex flex-column align-items-end'>
        <p>${product.price}</p>
        <select name="" id="" className='bg-secondary px-2 py-2 text-white' value={product.quantity} onChange={handleQuantityChange}>
          {[...Array(product.stock).keys()].map(i => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        {/* <div className='py-2 font-sm font-color-blue'>Remove</div> */}
      </div>
    </div>
  );
}

export default CartCard;
