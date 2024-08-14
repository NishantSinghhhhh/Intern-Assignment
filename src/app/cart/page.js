"use client";
import React from 'react';
import { remove, removeOne, addQuantity, decreaseQuantity } from '@/Redux/Cartslice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './page.module.css'; // Import the CSS file

const Cartpage = () => {
    const dispatch = useDispatch();
    const cartitems = useSelector((state) => state.cart);

    // Calculate the total cost
    const totalCost = cartitems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleRemove = (id) => {
        dispatch(remove(id));
    };

    const handleAddQuantity = (id) => {
        dispatch(addQuantity(id));
    };

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id));
    };

    return (
        <div>
            <h3 className={styles.cartPageTitle}>Cart Page</h3>
            <div className={styles.cartWrapper}>
                {cartitems.map((item) => (
                    <div key={item.id} className={styles.cartCard}>
                        <img 
                            src={item.thumbnail || '/placeholder.png'} 
                            alt={item.title || 'Product Image'} 
                            className={styles.cartImage} 
                        />
                        <div className={styles.content}>
                            <h5>{item.title}</h5>
                            <h5>${(item.price * item.quantity).toFixed(2)}</h5>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.btn} onClick={() => handleDecreaseQuantity(item.id)}>
                                -
                            </button>
                            <h5 className={styles.quantity}> {item.quantity}</h5>
                            <button className={styles.btn} onClick={() => handleAddQuantity(item.id)}>
                                +
                            </button>
                            {/* <button className={styles.btn} onClick={() => handleRemove(item.id)}>
                                Remove All
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.totalCost}>
                <h4>Total Cost: ${totalCost.toFixed(2)}</h4>
            </div>
        </div>
    );
};

export default Cartpage;
