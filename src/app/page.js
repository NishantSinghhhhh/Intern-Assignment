// Homepage.js
"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '@/Redux/Cartslice';
import Loading from './loading'; // Import the Loading component
import styles from './page.module.css'; // Import the CSS file for the page

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <Loading />; // Show the Loading component while loading
  }

  return (
    <div className={styles.productsWrapper}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.productImg}>
            <img src={product.thumbnail} alt='Product' className={styles.image} />
          </div>
          <div className={styles.productInfo}>
            <h4 className={styles.title}>{formatTitle(product.title)}</h4>
            <p className={styles.description}>
              {product.description.length > 100
                ? `${product.description.substring(0, 100)}...`
                : product.description}
            </p>
            <div className={styles.priceDiscount}>
              <span className={styles.price}>${product.price}</span>
              <span className={styles.discount}>{product.discountPercentage}% off</span>
            </div>
            <div className={styles.rating}>
              {[...Array(5)].map((_, index) => (
                <span key={index} className={`${styles.star} ${index < Math.round(product.rating) ? styles.filled : ''}`}>
                  &#9733;
                </span>
              ))}
            </div>
            <button className={styles.button} onClick={() => handleAdd(product)}>
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Function to limit the title to 3 words
const formatTitle = (title) => {
  const words = title.split(' ');
  return words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');
};

export default Homepage;
