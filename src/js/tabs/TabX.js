import React from 'react';
import PropTypes from 'prop-types'

class TabX extends React.Component {

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
        
        const next = event.target.dataset.switch;
        const previous = this.state.activeSwitch;

        if( next === undefined || next !== next ) return;

        this.indicator.children[ previous ].style.backgroundColor = this.props.switchBg;
        event.target.style.backgroundColor = "inherit";
       
        this.setState( { activeSwitch: next } );
    }

    render(){
        
        const { activeSwitch } = this.state;
        /* const { titles, children = [], switchBg, translate = "-" } = this.props; */
        /* const direction = translate === "-" ? `translate-x${activeSwitch}` : `translate-rx${activeSwitch}`; */

        return <div className="tab-x" onClick={ this.onClick }>
            <div className="tab-x-indicator" ref={ indicator => this.indicator = indicator }>
                {
                    this.titles.map( ( title, index ) => {
                        return <label key={`tab-x-switch-${index}`} data-switch={ index } style={{ backgroundColor: ( index === 0 ? "inherit" : this.switchBg ) }} >
                            { title }
                        </label>;
                    })
                }
            </div>
            <div className="tab-x-container" style={{ flexFlow: this.flexFlow }} >
                {
                    this.children.map( ( child, index ) => {
                        return <section key={`tab-x-item-${index}`} className={`tab-x-item translate-${this.direction}-${activeSwitch}`} >
                            { child }
                        </section>;
                    })
                }
            </div>
       </div>;
    }
}

TabX.propTypes = {
    titles: PropTypes.array.isRequired,
    children: PropTypes.array,
    switchBg: PropTypes.string,
    translate: PropTypes.string
}

TabX.defaultProps = {
    children: [],
    switchBg: "",
    translate: "-"
}

export default TabX;
