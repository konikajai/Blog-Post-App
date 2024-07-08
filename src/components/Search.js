import React from "react";

const Search = ({ handleSearch, searchValue, onInputChange }) => {
    return (
        <div className="searchForm d-flex justify-content-center align-items-center mt-3"> 
            <form className="d-flex" onSubmit={handleSearch} style={{ maxWidth: '550px', width: '100%' }}> 
                <input
                    type="search"
                    className="form-control me-2"
                    placeholder="Search Blog ..."
                    value={searchValue}
                    onChange={onInputChange}
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
        </div>
    );
};

export default Search;
