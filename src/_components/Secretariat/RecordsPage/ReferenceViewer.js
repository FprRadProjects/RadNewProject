import React, {Component} from 'react';
import {connect} from "react-redux"

class ReferenceViewer extends Component {
    render() {
        return (
            <div>
                ReferenceViewer
            </div>
        );
    }
}


const connectedReferenceViewer = connect(null)(ReferenceViewer);
export { connectedReferenceViewer as ReferenceViewer };
