"use client";
import React, { useState, useEffect } from 'react';
import { remove, addQuantity, decreaseQuantity } from '@/Redux/Cartslice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './page.module.css'; // Import the CSS module for styling
import Loading from '../../app/loading'; // Import the Loading component

const Cartpage = () => {
    const [loading, setLoading] = useState(true); // State to manage loading status
    
    const dispatch = useDispatch(); // Get the dispatch function from Redux

    // Retrieve cart items from Redux store
    const cartitems = useSelector((state) => state.cart.items || []); // Ensure cartitems is an array

    // Simulate data fetching with a delay
    useEffect(() => {
        const fetchData = async () => {
            // Simulate a 1-second delay for loading effect
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };

        fetchData();
    }, []);

    // Calculate total cost, original price, and discount
    const totalCost = Array.isArray(cartitems) 
        ? cartitems.reduce((total, item) => 
            total + (item.price - (item.price * (item.discountPercentage / 100))) * item.quantity, 0)
        : 0;

    const totalOriginalPrice = Array.isArray(cartitems) 
        ? cartitems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;

    const totalDiscount = totalOriginalPrice - totalCost;

    // Handlers for cart actions
    const handleRemove = (id) => {
        dispatch(remove(id)); // Remove item from cart
    };

    const handleAddQuantity = (id) => {
        dispatch(addQuantity(id)); // Increase item quantity
    };

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id)); // Decrease item quantity
    };

    return (
        <div>
            {loading ? (
                <Loading /> // Display loading spinner while loading
            ) : (
                <>
                    <h3 className={styles.cartPageTitle}>Cart Page</h3>
                    <div className={styles.cartWrapper}>
                        {cartitems.length === 0 ? (
                            <p className={styles.empty}>Your cart is empty.</p> // Display message if cart is empty
                        ) : (
                            cartitems.map((item) => {
                                // Calculate discounted price
                                const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));

                                return (
                                    <div key={item.id} className={styles.cartCard}>
                                        <img 
                                            src={item.thumbnail || '/placeholder.png'} 
                                            alt={item.title || 'Product Image'} 
                                            className={styles.cartImage} 
                                        />
                                        <div className={styles.content}>
                                            <h5>{item.title}</h5>
                                            <div className={styles.priceContainer}>
                                                <span className={styles.originalPrice}>{formatCurrency(item.price)}</span>
                                                <span className={styles.discountedPrice}>{formatCurrency(discountedPrice)}</span>
                                            </div>
                                            {item.discountPercentage > 0 && (
                                                <div className={styles.discount}>
                                                    {item.discountPercentage}% off
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.buttons}>
                                            <button className={styles.btn} onClick={() => handleDecreaseQuantity(item.id)}>
                                                -
                                            </button>
                                            <h5 className={styles.quantity}> {item.quantity}</h5>
                                            <button className={styles.btn} onClick={() => handleAddQuantity(item.id)}>
                                                +
                                            </button>
                                            <button className={styles.btn} onClick={() => handleRemove(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className={styles.totalCost}>
                        <h4>Total Cost: {formatCurrency(totalCost)}</h4>
                    </div>
                    <div className={styles.priceDetails}>
                        <h4>Price Details</h4>
                        <table className={styles.priceTable}>
                            <tbody>
                                <tr>
                                    <td>Total Original Price:</td>
                                    <td>{formatCurrency(totalOriginalPrice)}</td>
                                </tr>
                                <tr>
                                    <td>Total Discount:</td>
                                    <td>-${formatCurrency(totalDiscount)}</td>
                                </tr>
                                <tr>
                                    <td>Platform Fee:</td>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Amount to Pay:</strong></td>
                                    <td><strong>{formatCurrency(totalCost)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

// Utility function to format currency values
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
};

export default Cartpage;
