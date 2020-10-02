import React from "react";
export default ({ item }) => (
    <div className='card'>
        <img
            style={{ maxWidth: '100%' }}
            alt={item._id}
            src={`/${item.image}`}
        />
        <div className="card-body">
            <div className="card-title">
                {item.title}
            </div >
            <div className="card-text">
                {item.description}
            </div >
        </div>
    </div>
)