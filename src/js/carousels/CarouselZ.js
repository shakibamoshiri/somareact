import React from 'react';
import PropTypes from 'prop-types'

class CarouselZ extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
            activeSwitch : 1
        }

        Object.assign( this, this.props );
        
        this.onClick = this.onClick.bind( this );
        this.foreach = Array.prototype.forEach;

        this.direction = this.translate === "-" ? "z" : "rz";
    }


    onClick( event ){
        event.stopPropagation();
        let index = +event.target.dataset.switch;
        ( ++index ) &&
        ( index >= this.titles.length || index < 0 ? this.setState( { activeSwitch: 0 } ) : this.setState( { activeSwitch: index } ) );
    }

    render(){
        
        const { activeSwitch } = this.state;
        const activeItem = activeSwitch === 0 ? this.titles.length - 1 : activeSwitch - 1;

        return <div className="carousel-z" onClick={ this.onClick } >
            <div className="carousel-z-indicator"  >
                {
                    this.titles.map( ( title, index ) => {
                        return <label key={`carousel-z-switch-${index}`} data-switch={ index } className={ ( activeSwitch === index ) ? "active" : "" } >{ title }</label>;
                    })
                }
            </div>
                {
                    this.children.map( ( child, index ) => {
                        return <section key={`carousel-z-item-${index}`} className={`carousel-z-item ${activeItem === index ? "active" : "" }`} >{ child }</section>;
                    })
                }
       </div>;
    }
}

CarouselZ.propTypes = {
    titles: PropTypes.array.isRequired,
    children: PropTypes.array
}

CarouselZ.defaultProps = {
    children: []
}

export default CarouselZ;
