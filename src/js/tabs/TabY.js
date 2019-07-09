import React from 'react';
import PropTypes from 'prop-types'

class TabY extends React.Component {

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
        
        const next = event.target.dataset.switch;
        const previous = this.state.activeSwitch;
        
        if( next === undefined || next !== next ) return;
        
        this.indicator.children[ previous ].style.backgroundColor = this.props.switchBg;
        event.target.style.backgroundColor = "inherit";
        
        this.setState( { activeSwitch: next } );
    }

    render(){
        const { activeSwitch } = this.state;

        return <div className="tab-y" onClick={ this.onClick }>
            <div className="tab-y-indicator" ref={ indicator => this.indicator = indicator }>
                {
                    this.titles.map( ( title, index ) => {
                        return <label key={`tab-y-switch-${index}`} data-switch={ index } style={{ backgroundColor: ( index === 0 ? "inherit" : this.switchBg ) }} >
                            { title }
                        </label>;
                    })
                }
            </div>
            <div className="tab-y-container" style={{ flexFlow: this.flexFlow }} >
                {
                    this.children.map( ( child, index ) => {
                        return <section key={`tab-y-item-${index}`} className={`tab-y-item translate-${this.direction}-${activeSwitch}`} >
                            { child }
                        </section>;
                    })
                }
            </div>
       </div>;
    }
}

TabY.propTypes = {
    titles: PropTypes.array.isRequired,
    children: PropTypes.array,
    switchBg: PropTypes.string,
    translate: PropTypes.string
}

TabY.defaultProps = {
    children: [],
    switchBg: "",
    translate: "-"
}

export default TabY;
