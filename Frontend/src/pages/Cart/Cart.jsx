import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFormCart, getTotalCartAmount , url} =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0)
            return (
              <div>
                <div key={index} className="cart-item-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFormCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delievry Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 80}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
              ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 80}
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
          <div className="add-more">
            <Link to="/"><button>Add more items</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
