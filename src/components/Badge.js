import React from "react";

const Badge = ({ children, styleInfo }) => {
    const colorKey = {
        Fashion: "primary",
        Travel: "success",
        Fitness: "danger",
        Food: "warning",
        Tech: "info",
        Sports: "dark"
    };

    if (!children) {
        return null;
    }

    return (
        <h5 style={styleInfo}>
            <span className={`badge bg-${colorKey[children.toLowerCase()]}`}>{children}</span>
        </h5>
    );
};

export default Badge;
