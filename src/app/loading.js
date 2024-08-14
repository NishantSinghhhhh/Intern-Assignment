// loading.js
import React from 'react';
import styles from './loading.module.css'; // Import CSS module for styling

const Loading = () => {
  return (
    <div className={styles.container}> {/* Container for the loading animation */}
      <div className={styles.newtonsCradle}> {/* Container for the Newton's Cradle animation */}
        {/* Individual dots representing the balls in the Newton's Cradle */}
        <div className={styles.newtonsCradleDot}></div>
        <div className={styles.newtonsCradleDot}></div>
        <div className={styles.newtonsCradleDot}></div>
        <div className={styles.newtonsCradleDot}></div>
      </div>
    </div>
  );
};

export default Loading; // Export the Loading component for use in other parts of the application
