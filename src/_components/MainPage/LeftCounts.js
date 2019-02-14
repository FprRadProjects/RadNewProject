import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

class LeftCounts extends Component {
    componentDidMount() {
        const {GetCounts,Params} = this.props;
        GetCounts(Params)
    }

    render() {
        const{Counts}=this.props;
        return (
            <div className="col-lg-3">
                <div>
                    Cheque:{Counts!==undefined? Counts.Cheque:0}
                </div>
                <div>
                    Email:{Counts!==undefined? Counts.Email:0}
                </div>
                <div>
                    Message:{Counts!==undefined? Counts.Message:0}
                </div>
                <div>
                    Note:{Counts!==undefined? Counts.Note:0}
                </div>
                <div>
                    Secretariat:{Counts!==undefined? Counts.Secretariat:0}
                </div>
                <div>
                    Work:{Counts!==undefined? Counts.Work:0}
                </div>
                <div>
                    Sms:{Counts!==undefined? Counts.Sms:0}
                </div>
            </div>
        );
    }
}




function mapStateToProps(state) {
    const { Counts} = state.MainPage;
    return {
        Counts
    };
}

const connectedLeftCounts = connect(mapStateToProps, null)(LeftCounts);
export { connectedLeftCounts as LeftCounts };