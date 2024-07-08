import React from "react";

const Pagination = ({ currentPage, pageLimit, loadBlogsData, data, totalBlog }) => {
    const renderPagination = () => {
        if ((currentPage === 0 && data.length < 5) || (totalBlog === pageLimit && currentPage === 0)) return null;
        if (currentPage === 0) {
            return (
                <nav aria-label="Pagination" className="d-flex justify-content-center">
                    <ul className="pagination mb-0">
                        <li className="page-item">
                            <button className="page-link" onClick={() => loadBlogsData(5, 10, 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            );
        } else if (currentPage < pageLimit - 1 && data.length === pageLimit && totalBlog - data.length !== pageLimit) {
            return (
                <nav aria-label="Pagination" className="d-flex justify-content-center">
                    <ul className="pagination mb-0">
                        <li className="page-item">
                            <button className="page-link" onClick={() => loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)}>Previous</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={() => loadBlogsData((currentPage + 1) * 5, (currentPage + 2) * 5, 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            );
        } else {
            return (
                <nav aria-label="Pagination" className="d-flex justify-content-center">
                    <ul className="pagination mb-0">
                        <li className="page-item">
                            <button className="page-link" onClick={() => loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)}>Previous</button>
                        </li>
                    </ul>
                </nav>
            );
        }
    };

    return (
        <div className="mb-4">
            {renderPagination()}
        </div>
    );
};

export default Pagination;
