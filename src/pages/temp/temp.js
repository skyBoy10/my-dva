import React, { Component } from 'react';

const Wraper = ({ children }) => children; // 模仿react16的fragment

class TempCom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wraper>
                <div>hello</div>
                <div>world</div>
            </Wraper>
        );
    }
}

export default TempCom;