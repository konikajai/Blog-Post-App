import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: ""
}

const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];

const AddEditBlog = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState(null);
    const [editMode, setEditMode] = useState(false)
    const { title, description, category, imageUrl } = formValue;

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setEditMode(true);
            getSingleBlog(id);
        } else {
            setEditMode(false);
            setFormValue({ ...initialState });
        }
    }, [id]);

    const getSingleBlog = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/blogs/${id}`);
            setFormValue({ ...response.data });
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0");
        let yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) {
            setCategoryErrMsg("Please select a category");
            return;
        }

        try {
            const currentDate = getDate();
            if (!editMode) {
                const updatedBlogData = { ...formValue, date: currentDate };
                const response = await axios.post("http://localhost:5000/blogs", updatedBlogData);
                if (response.status === 201) {
                    toast.success("Blog Created Successfully");
                } else {
                    toast.error("Something went wrong");
                }
            } else {
                const response = await axios.put(`http://localhost:5000/blogs/${id}`, formValue);
                if (response.status === 200) {
                    toast.success("Blog Updated Successfully");
                } else {
                    toast.error("Something went wrong");
                }
            }
            setFormValue(initialState);
            navigate("/");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const onUploadImage = async (e) => {
        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "zrhzxzza");
            const response = await axios.post("http://api.cloudinary.com/v1_1/dpzi20cpt/image/upload", formData);
            toast.info('Image Uploaded Successfully');
            setFormValue({ ...formValue, imageUrl: response.data.url });
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const onCategoryChange = (e) => {
        setCategoryErrMsg(null);
        setFormValue({ ...formValue, category: e.target.value });
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="mt-3">
                        <p className="fs-2 fw-bold text-center mb-4">{editMode ? "Update Blog" : "Add Blog"}</p>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={title}
                                onChange={onInputChange}
                                required
                            />
                            {!title && <div className="invalid-feedback">Please provide a title.</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                                rows={2}
                                style={{ minHeight: '80px' }}
                                required
                            />
                            {!description && <div className="invalid-feedback">Please provide a description.</div>}
                        </div>

                        {!editMode && (
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image Upload</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    onChange={onUploadImage}
                                    required
                                />
                                {!imageUrl && <div className="invalid-feedback">Please provide an image.</div>}
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                className="form-select"
                                id="category"
                                value={category}
                                onChange={onCategoryChange}
                                required
                            >
                                <option value="">Please select a category</option>
                                {options.map((option, index) => (
                                    <option value={option} key={index}>{option}</option>
                                ))}
                            </select>
                            {categoryErrMsg && <div className="categoryErrorMsg">{categoryErrMsg}</div>}
                        </div>

                        <div className="mb-3 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary me-2">{editMode ? "Update" : "Add"}</button>
                            <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>Go Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AddEditBlog;
