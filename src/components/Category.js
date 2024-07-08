import React from "react";

const Category = ({ handleCategory, options }) => {
    return (
        <div className="card" style={{ width: '16rem', marginTop: '20px' }}>
            <div className="card-body">
                <h4 className="card-title">Categories</h4>
                <ul className="list-group list-group-flush">
                    {options.map((item, index) => (
                        <li key={index} className="list-group-item" style={{ cursor: 'pointer' }} onClick={() => handleCategory(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Category;
