import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={458}
        viewBox="0 0 280 458"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="262" rx="3" ry="3" width="280" height="23" />
        <rect x="0" y="307" rx="7" ry="7" width="280" height="74" />
        <circle cx="137" cy="120" r="115" />
        <rect x="6" y="409" rx="4" ry="4" width="104" height="24" />
        <rect x="160" y="399" rx="30" ry="30" width="116" height="43" />
    </ContentLoader>
);

export default Skeleton;
