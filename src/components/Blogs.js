import React from "react";
import { NavLink } from "react-router-dom";

const Blogs = ({ title, category, description, id, imageUrl, excerpt, handleDelete }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 mt-2">
                <img src={imageUrl} className="card-img-top" alt={title} style={{ maxWidth: "100%", height: "180px" }} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{excerpt(description)}
                        <NavLink to={`/blog/${id}`} className="btn btn-link text-decoration-none">
                            Read More
                        </NavLink>
                    </p>
                    <span className="badge bg-secondary">{category}</span>
                    <div className="mt-2">
                        <button className="btn btn-danger" onClick={() => handleDelete(id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                        <NavLink to={`/editBlog/${id}`} className="btn btn-primary ms-2">
                            <i className="fas fa-edit"></i>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
