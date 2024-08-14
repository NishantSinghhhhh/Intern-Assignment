"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '@/Redux/Cartslice'; // Import the Redux action to add products to the cart
import styles from './page.module.css'; // Import your CSS module for styling
import Loading from './loading'; // Import the Loading component for displaying a loading state

const Homepage = () => {
  const [products, setProducts] = useState([]); // State to hold the list of products
  const [animatedProductId, setAnimatedProductId] = useState(null); // State to manage the animation for added products
  const [loading, setLoading] = useState(true); // State to manage the loading state
  const [imagesLoaded, setImagesLoaded] = useState(false); // State to track image loading
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Function to fetch products from an API
  const getProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products"); // Fetch data from API
      const data = await res.json(); // Parse the JSON response
      setProducts(data.products); // Update the products state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error); // Log any errors that occur during the fetch
    }
  };

  // Function to handle adding a product to the cart
  const handleAdd = (product) => {
    dispatch(add(product)); // Dispatch the add action to add the product to the cart
    setAnimatedProductId(product.id); // Set the animated product ID to trigger animation

    // Reset animation state after a short delay
    setTimeout(() => {
      setAnimatedProductId(null); // Clear the animated product ID
    }, 2000); // Duration of the animation
  };

  // Function to format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value); // Format the value as USD currency
  };

  // Function to limit the title to 3 words
  const formatTitle = (title) => {
    const words = title.split(' '); // Split the title into words
    return words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : ''); // Return the first 3 words with ellipsis if needed
  };

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle image load events
  const handleImageLoad = () => {
    setImagesLoaded(true); // Update state when an image is loaded
  };

  // Set a minimum display time for the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after 5 seconds
    }, 5000); // 5 seconds

    // Clean up timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Hide loader when all images are loaded
  useEffect(() => {
    if (imagesLoaded) {
      setLoading(false); // Hide loader when images are loaded
    }
  }, [imagesLoaded]);

  return (
    <div className={styles.productsWrapper}>
      {loading ? (
        <Loading /> // Show loader while loading products
      ) : (
        products.map((product) => {
          const discountedPrice = product.price - (product.price * (product.discountPercentage / 100)); // Calculate discounted price

          return (
            
            <div key={product.id} className={styles.card}>
              <div className={styles.productImg}>
                <img 
                  src={product.thumbnail} 
                  alt='Product' 
                  className={styles.image} 
                  onLoad={handleImageLoad} // Handle image load
                />
              </div>
              <div className={styles.productInfo}>
                <h4 className={styles.title}>{formatTitle(product.title)}</h4> {/* Display formatted product title */}
                <p className={styles.description}>
                  {product.description} {/* Display product description */}
                </p>
                <div className={styles.priceDiscount}>
                  <span className={styles.originalPrice}>
                    {formatCurrency(product.price)} {/* Display original price */}
                  </span>
                  <span className={styles.discountedPrice}>
                    {formatCurrency(discountedPrice)} {/* Display discounted price */}
                  </span>
                  <span className={styles.discount}>
                    {product.discountPercentage}% off {/* Display discount percentage */}
                  </span>
                </div>
                <div className={styles.shippingInformation}>
                  <p>Shipping Cost: Free</p> {/* Display shipping information */}
                </div>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={`${styles.star} ${index < Math.round(product.rating) ? styles.filled : ''}`}>
                      &#9733; {/* Display star rating */}
                    </span>
                  ))}
                </div>
                <button 
                  className={`${styles.addToCartButton} ${animatedProductId === product.id ? styles.added : ''}`}
                  onClick={() => handleAdd(product)}
                >
                  <svg className={styles.cartIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <svg className={styles.tick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path fill="#ffffff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"/>
                  </svg>
                  <span className={styles.addToCart}>Add to cart</span>
                  <span className={styles.addedToCart}>Added to cart</span>
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Homepage;
