import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import Custom404 from './404';
import Custom500 from "./500";

function Error({ statusCode }) {
    
  useEffect(() => {
    
  }, []);
    
  return (
    <div>
      {statusCode ? <Custom500 /> : <Custom404 />}
    </div>
  );
    
}

Error.getInitialProps = ({ res, err }) => {
  console.log(res, err)
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
Error.propTypes = {
  statusCode: PropTypes.number
}
  
export default Error;
