import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAllProducts } from "./redux/reducers/products.reducer";
import CartCard from "./components/CartCard";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((store) => store.products.products);

  useEffect(() => {
    fetch("https://arrow-reduxpricecard.netlify.app/products.json")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.products)) {
          dispatch(saveAllProducts(result.products));
        } else {
          console.error('Fetch error: Expected an array of products, received:', result);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [dispatch]);

  const delivery = 50;
  const total = productData.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const subtotal = total + delivery; // Modify this if needed for additional charges/discounts.

  return (
    <div className="d-flex">
      <div className="d-flex flex-column gap-4 w-75 p-4">
        {productData.length > 0 ? (
          productData.map((product) => (
            <CartCard key={product.id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
      <div className="border w-25 m-2 p-3 fs-6">
        <div className="d-flex justify-content-between"><span className="fw-bold fs-5">Total:</span> ₹{total.toFixed(2)}</div>
        <div className="d-flex justify-content-between"><span className="fw-bold fs-5">Delivery Charge:</span> ₹{delivery.toFixed(2)}</div>
        <hr />
        <div className="d-flex justify-content-between"><span className="fw-bold fs-5">Subtotal:</span> ₹{subtotal.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default App;
