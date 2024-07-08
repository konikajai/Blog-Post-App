import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Badge from "../components/Badge";
import { toast } from "react-toastify";

const Blog = () => {
    const [blog, setBlog] = useState(null);
    const [relatedPost, setRelatedPost] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const blogResponse = await axios.get(`http://localhost:5000/blogs/${id}`);
                const relatedPostResponse = await axios.get(`http://localhost:5000/blogs?category=${blogResponse.data.category}&_start=0&_end=3`);

                if (blogResponse.status === 200 && relatedPostResponse.status === 200) {
                    setBlog(blogResponse.data);
                    setRelatedPost(relatedPostResponse.data.filter(item => item.id !== id));
                } else {
                    toast.error("Failed to fetch data");
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        };

        if (id) {
            fetchBlogData();
        }
    }, [id]);

    const excerpt = (str) => {
        if (str.length > 60) {
            return str.substring(0, 60) + " ... ";
        }
        return str;
    };

    const styleInfo = {
        display: "inline",
        marginLeft: "5px",
        float: "right",
        marginTop: "7px"
    };

    const linkStyle = {
        textDecoration: "none",
        color: "black"
    };

    return (
        <div className="container mb-2" style={{ border: "1px solid #d1ebe8", marginTop: '20px' }}>
            <NavLink to="/" className="mt-3" style={{ float: "left", ...linkStyle }}>
                <strong>Go Back</strong>
            </NavLink>
            <h2 className="text-muted mt-2">{blog && blog.title}</h2>
            <img src={blog && blog.imageUrl} className="img-fluid rounded" alt={blog && blog.title} style={{ width: "100%", maxHeight: '600px' }} />
            <div style={{ marginTop: '20px' }}>
                <div className="card bg-light">
                    <div className="card-body">
                        <i className="far fa-calendar-alt" style={{ marginRight: '10px' }}></i>
                        <strong>{blog && blog.date}</strong>
                        <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
                    </div>
                </div>
                <p className="lead mt-3">{blog && blog.description}</p>
            </div>
            {relatedPost && relatedPost.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    {relatedPost.length > 1 && <h2>Related Posts</h2>}
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {relatedPost.map((item, index) => (
                            <div className="col" key={index}>
                                <div className="card">
                                    <NavLink to={`/blog/${item.id}`}>
                                        <img src={item.imageUrl} className="card-img-top" alt={item.title} />
                                    </NavLink>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{excerpt(item.description)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
