import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";


const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, addPurchasedCourse } = useAuth();
  const course = location.state?.course;

  useEffect(() => {
    if (!course) {
      navigate("/");
    }
  }, [course, navigate]);

  if (!course) return null;

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      // Free checkout: directly persist purchase (server endpoint is /api/courses/purchase via AuthContext)
      await addPurchasedCourse(course);
      navigate("/purchase-success");
    } catch (e) {
      console.error('Buy error:', e);
      alert(e?.message || 'Failed to complete purchase');
    }
  };

  return (
    <div className="order-summary-container">
      <button className="go-back" onClick={() => navigate(-1)}>⬅ GO BACK</button>
      <h2 className="title">Order Summary</h2>

      <div className="main-content">
        {/* Left: Course Summary */}
        <div className="cart-section">
          <h3>Items in Cart</h3>
          <div className="cart-item">
            <img src={course.image} alt={course.title} />
            <div className="item-info">
              <p>{course.title}</p>
              <div className="price">
                ₹ {course.price}{" "}
                {course.originalPrice && (
                  <span className="striked">₹ {course.originalPrice}</span>
                )}
              </div>
              <p className="discount">{course.discount}</p>
            </div>
          </div>
        </div>

        {/* Right: Payment Summary */}
        <div className="summary-sidebar">
          <div className="coupon-section">
            <p>Apply Code/Coupon</p>
            <input type="text" placeholder="Apply Coupon Code" />
            <button className="apply-btn">Apply</button>
          </div>

          <div className="donation">
            <label>
              <input type="checkbox" /> Donate ₹10 to PW Foundation
            </label>
          </div>

          <div className="payment-summary">
            <h4>Payment Summary</h4>
            <div className="summary-item">
              <span>Price (1 item)</span>
              <span>₹ {course.originalPrice || course.price}</span>
            </div>
            {course.originalPrice && (
              <div className="summary-item">
                <span>Discount</span>
                <span className="green">- ₹ {course.originalPrice - course.price}</span>
              </div>
            )}
            <div className="summary-item">
              <span>Delivery Charges</span>
              <span>₹ 0</span>
            </div>
            <div className="summary-item">
              <span>Coupon Disc.</span>
              <span>- ₹ 0</span>
            </div>
            <div className="total">
              <span>Total Amount</span>
              <span>₹ {course.price}</span>
            </div>
          </div>

          <button className="proceed-btn" onClick={handleBuyNow}>
            Confirm Purchase
          </button>

          <div className="bottom-cart">
            <p>You are buying (1) item</p>
            <div className="small-cart-item">
              <p>{course.title}</p>
              <p>₹ {course.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
