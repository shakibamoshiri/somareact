import React from 'react';
import renderer from "react-test-renderer";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { shallow, mount } from 'enzyme';
import CarouselZ from './CarouselZ.js';

const titles = [ "A", "B", "C" ];
const children = [
    <h1>one</h1>,
    <h1>one</h1>,
    <h1>one</h1> 
];

const root = <div id="root"></div>;

let length = -1,
    dom,
    labels;

describe('CarouselZ:', () => {

    dom =  shallow( <CarouselZ titles={ titles } children={ children } /> );
    it( `for  ${titles.length} titles we should have ${titles.length} labels`, () => {
        length = dom.find( ".carousel-z-indicator > label" ).length;
        expect( length ).toBe( titles.length );
    })

    it( `for ${children.length} children we should have ${children.length} sections`, () => {
        length = dom.find( ".carousel-z > section" ).length;
        expect( length ).toBe( children.length );
    })
    
    it( "label's text content should be equal to titles' index", () => {
        labels = dom.find( ".carousel-z-indicator" ).children().map( ( node ) => node.text() );
        expect( labels ).toEqual( titles );
    })

    it( "Initial state.activeSwitch should be 1", () => {
        expect( dom.state( 'activeSwitch' ) ).toBe( 1 );
    })

    it( "label.dataset.switch should be equal to array index", () => {
        dom.find( ".carousel-z-indicator" ).children().forEach( ( label, index ) => {
            expect( +label.prop( "data-switch" ) ).toBe( index );
        });
    })
    
    it( `state.activeSwitch should be between [ 0 - ${titles.length - 1} ]`, () => {
        let event = {
           stopPropagation: function(){},
           target: {
                dataset : {
                    switch: 0
                }
           }  
        };
        let index = -3;
        let max   = titles.length + 3;
        dom.find( ".carousel-z-indicator > label" ).children().forEach( ( child ) => {
            for( ; index < max; ++index ){
                event.target.dataset.switch = index;
                dom.props().onClick( event );
                expect( ( dom.state().activeSwitch >= 0 && dom.state().activeSwitch < titles.length ) ).toBe( true );
            }
        })
    })
});

