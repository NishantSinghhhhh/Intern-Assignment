// Loading.js
import React from 'react';
import './loading.module.css'; // Import the CSS file for styling

const Loading = () => {
  return (
    <div className="container">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  );
};

export default Loading;
