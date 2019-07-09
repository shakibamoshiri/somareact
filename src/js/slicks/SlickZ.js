import React from 'react';
import PropTypes from 'prop-types'

class SlickZ extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
            activeSwitch : 1
        }

        Object.assign( this, this.props );
        
        this.onClick = this.onClick.bind( this );
    }


    onClick( event ){
        event.stopPropagation();
        let index = +event.target.dataset.switch;
        if( index !== index ) return;

        index = ( index === this.titles.length - 1 ) ? 0 : index + 1;

        this.setState( { activeSwitch: index } );
    }

    render(){
        
        const { activeSwitch } = this.state;
        const activeItem = activeSwitch === 0 ? this.titles.length - 1 : activeSwitch - 1;

        return <div className="slick-z" onClick={ this.onClick } >
            <div className="slick-z-indicator" >
                {
                    this.titles.map( ( title, index ) => {
                        return <label key={`slick-z-switch-${index}`} data-switch={ index } className={ ( activeSwitch === index ) ? "active" : "" } ></label>;
                    })
                }
            </div>
                {
                    this.children.map( ( child, index ) => {
                        return <section key={`slick-z-item-${index}`} className={`slick-z-item ${activeItem === index ? "active" : "" }`} >{ child }</section>;
                    })
                }
       </div>;
    }
}

SlickZ.propTypes = {
    titles: PropTypes.array.isRequired,
    children: PropTypes.array
}

SlickZ.defaultProps = {
    children: []
}

export default SlickZ;





