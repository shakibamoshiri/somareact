import React from 'react';
import PropTypes from 'prop-types'
  
function SlickX( { children = [] } ){
    return <div className="slick-x">
        {
            children.map( ( child, index ) => {
                return <div key={`slick-x-item-${index}`} className="slick-x-item"  >{ child }</div>;
            })
        }
    </div>;
}

SlickX.propTypes = {
    children: PropTypes.array
}

export default SlickX;





