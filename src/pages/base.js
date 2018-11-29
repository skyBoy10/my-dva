import { Component } from 'react';
import { is } from 'immutable';

class Base extends Component {
    shouldComponentUpdate(nextProps = {}, nextStates = {}) {
        const thisProps = this.props || {}, thisStates = this.state || {};
        nextProps = nextProps || {}, nextStates = nextStates || {};
        const exclude = ['loading', 'match', 'dispatch', 'location', 'history'];

        if(Object.keys(thisProps).length !== Object.keys(nextProps).length || 
        Object.keys(thisStates).length !== Object.keys(nextStates).length) {
            return true;
        }

        for(const key in nextProps) {
            if(!exclude.includes(key)) {
                for(const prop in nextProps[key]) {
                    console.log(JSON.stringify(nextProps[key][prop])+' - '+JSON.stringify(thisProps[key][prop])+' - '+is(nextProps[key][prop], thisProps[key][prop]))
                    if(!is(nextProps[key][prop], thisProps[key][prop])) {
                        return true;
                    }
                }
            }

            return false;
        }

        for(const key in nextStates) {
            if(!is(nextStates[key], thisStates[key])) {
                return true;
            }
        }

        return false;
    }
}

export default Base;