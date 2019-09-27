import React, { Component } from 'react';
import Timer from './Timer';

class Layout extends Component {
    render() {
        return(
            <div>
                <Timer></Timer>
                {this.props.children}
            </div>
        );
    }
};

export default Layout;

