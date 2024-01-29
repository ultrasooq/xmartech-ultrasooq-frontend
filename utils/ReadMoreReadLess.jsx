import ReactReadMoreReadLess from "react-read-more-read-less";
import React from 'react';

const ReadMoreReadLess = (props) => {
    return (
    <div><ReactReadMoreReadLess
            charLimit={50}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
            readMoreClassName="read-more-less--more"
            readLessClassName="read-more-less--less"
        >
        {props && props.text}
    </ReactReadMoreReadLess></div>
    );
    
}
export default ReadMoreReadLess;