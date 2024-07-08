import React from "react";
import { NavLink } from "react-router-dom";

const LatestBlog = ({ imageUrl, title, id }) => {
    return (
        <div>
            <NavLink to={`/blog/${id}`} className="text-decoration-none">
                <div className="card mt-2" style={{ maxWidth: '280px', height: '70px' }}>
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={imageUrl} alt={title} className="card-img rounded-circle" style={{ height: '70px' }} />
                        </div>
                        <div className="col-md-9">
                            <div className="card-body">
                                <p className="card-text text-start latest-title fw-bold">{title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default LatestBlog;
