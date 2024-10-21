// src/components/Card.js
import React from 'react';
import './Card.css';

const Card = ({ title, content }) => {
    return (
        <div className="card">
            <div className="card-content">
                <h3>{title}</h3>
                {content}
            </div>
        </div>
    );
};

export default Card;
