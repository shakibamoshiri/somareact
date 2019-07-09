import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';
import CarouselY from './CarouselY.js';


const titles = [ "A", "B", "C" ];
const children = [
    <h1>one</h1>,
    <h1>one</h1>,
    <h1>one</h1> 
];
let length = -1,
    dom,
    labels,
    _click = jest.fn();

describe('CarouselY Component:', () => {

    dom = shallow( <CarouselY  titles={ titles } children={ children } /> );
    it( `for  ${titles.length} titles we should have ${titles.length} labels`, () => {
        length = dom.find( ".carousel-y-indicator > label" ).length;
        expect( length ).toBe( titles.length );
    })

    it( `for ${children.length} children we should have ${children.length} sections`, () => {
        length = dom.find( ".carousel-y > section" ).length;
        expect( length ).toBe( children.length );
    })
    
    it( "label's text content should be equal to titles' index", () => {
        labels = dom.find( ".carousel-y-indicator" ).children().map( ( label ) => label.prop( "data-title" ) );
        expect( labels ).toEqual( titles );
    })

    it( "Initial state.activeSwitch should be 0", () => {
        expect( dom.state( 'activeSwitch' ) ).toBe( 0 );
    })

    it( "label.dataset.switch should be equal to array index", () => {
        dom.find( ".carousel-y-indicator" ).children().forEach( ( label, index ) => {
            expect( +label.prop( "data-switch" ) ).toBe( index );
        });
    })
});

