import React from 'react';
import PropTypes from 'prop-types'

class CarouselX extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
            activeSwitch : 0
        }

        Object.assign( this, this.props );

        this.onClick = this.onClick.bind( this );

        this.direction = this.translate === "-" ? "x" : "rx";
        this.flexFlow = this.translate === "-" ? "row" : "row-reverse";
    }


    onClick( event ){
        event.stopPropagation();
        let index = event.target.dataset.switch;
        switch( index ){
            case "arrow-left":
                index = this.state.activeSwitch === 0 ? this.titles.length - 1 : this.state.activeSwitch - 1;
            break;
            case "arrow-right":
                index = this.state.activeSwitch === this.titles.length -1 ?  0 : this.state.activeSwitch + 1;
            break;
            default:
            index = +index;
            if( index === undefined || index !== index ) return;
        }
       this.setState( { activeSwitch: index } );
    }

    render(){
        const { activeSwitch } = this.state;
        const nextSwitch = activeSwitch === this.titles.length - 1 ? 0 : activeSwitch + 1;

        return <div className="carousel-x" onClick={ this.onClick } style={{ flexFlow: this.flexFlow }}>
            <div className="carousel-x-indicator" >
            {
                this.titles.map( ( title, index ) => {
                    return <label key={`carousel-x-switch-${index}`} data-switch={ index } data-user-guide={ title }
                        className={`user-guide hover ${ this.animation ? "animation" : "" } ${ activeSwitch === index ? "active" : ""  } ${ nextSwitch === index ? "next" : ""  } `} ></label>;
                })
            }
            </div>
            {
                this.children.map( ( child, index ) => {
                    return <section key={`carousel-x-item-${index}`} className={`carousel-x-item translate-${this.direction}-${activeSwitch}`} >{ child }</section>;
                })
            }
            {
                this.arrow
                ? <div className={ `carousel-x-arrow ${this.arrowPos}`}>
                      <div className="carousel-x-arrow-left">
                          <label data-switch="arrow-left"></label>
                      </div>
                      <div className="carousel-x-arrow-space"></div>
                      <div className="carousel-x-arrow-right">
                          <label data-switch="arrow-right"></label>
                       </div>
                   </div>
                : ""
            }
        </div>;
    }
}

CarouselX.propTypes = {
    titles: PropTypes.array.isRequired,
    children: PropTypes.array,
    translate: PropTypes.string,
    animation: PropTypes.bool,
    arrow: PropTypes.bool,
    arrowPos: PropTypes.string
}

CarouselX.defaultProps = {
    children: [],
    translate: "-",
    animation: true,
    arrow: false,
    arrowPos: ""
}

export default CarouselX;
