import React from 'react';
import PropTypes from 'prop-types'

class CarouselY extends React.Component {

    constructor( props ){
        super( props );

        this.state = {
            activeSwitch : 0
        }

        Object.assign( this, this.props );

        this.onClick = this.onClick.bind( this );

        this.direction = this.translate === "-" ? "y" : "ry";
        this.flexFlow = this.translate === "-" ? "column" : "column-reverse";
    }


    onClick( event ){
        event.stopPropagation();
        let index = event.target.dataset.switch;
        switch( index ){
            case "arrow-top":
                index = this.state.activeSwitch === 0 ? this.titles.length - 1 : this.state.activeSwitch - 1;
            break;
            case "arrow-bottom":
                index = this.state.activeSwitch === this.titles.length - 1 ? 0 : this.state.activeSwitch + 1;
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

        return <div className="carousel-y" onClick={ this.onClick } style={{ flexFlow: this.flexFlow }}>
            <div className="carousel-y-indicator" >
            {
                this.titles.map( ( title, index ) => {
                    const data = title.split( ":" );

                    return <label key={`carousel-y-switch-${index}`} data-switch={ index } data-user-guide={ data[1] || "" } data-title={ data[0] || ""  }
                        className={`user-guide title hover ${ activeSwitch === index ? "active" : ""  } ${ nextSwitch === index ? "next" : ""  } `} ></label>;
                })
            }
            </div>
            {
                this.children.map( ( child, index ) => {
                    return <section key={`carousel-y-item-${index}`} className={`carousel-y-item translate-${this.direction}-${activeSwitch}`} >{ child }</section>;
                })
            }
            {
                this.arrow
                ? <div className={ `carousel-y-arrow ${this.arrowPos}` }>
                      <div className="carousel-y-arrow-top">
                          <label data-switch="arrow-top"></label>
                      </div>
                      <div className="carousel-y-arrow-space"></div>
                      <div className="carousel-y-arrow-bottom">
                          <label data-switch="arrow-bottom"></label>
                       </div>
                   </div>
                : ""
            }
        </div>;
    }
}

CarouselY.propTypes = {
    titles: PropTypes.array.isRequired,
    children: PropTypes.array,
    translate: PropTypes.string,
    arrow: PropTypes.bool,
    arrowPos: PropTypes.string
}

CarouselY.defaultProps = {
    children: [],
    translate: "-",
    arrow: false,
    arrowPos: ""
}

export default CarouselY;
