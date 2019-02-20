import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

class LeftCounts extends Component {
    componentDidMount() {
        const { GetCounts, Params } = this.props;
        GetCounts(Params)
    }

    render() {
        const { Counts } = this.props;
        return (
            <ul className="nav main-menu">
                <li className="task-email"><a href="#"><span className="title"><i className="icon"></i>ایمیل ها</span> <span className="badge pull-right">{Counts !== undefined ? Counts.Email : 0}</span></a></li>
                <li className="task-letter"><a href="#"><span className="title"><i className="icon"></i>نامه ها</span> <span className="badge pull-right">{Counts !== undefined ? Counts.Secretariat : 0}</span></a></li>
                <li className="task-message"><a href="#"><span className="title"><i className="icon"></i>پیام ها</span> <span className="badge pull-right">{Counts !== undefined ? Counts.Message : 0}</span></a></li>
                <li className="task-sms"><a href="#"><span className="title"><i className="icon"></i>پیام ها</span> <span className="badge pull-right">{Counts !== undefined ? Counts.Sms : 0}</span></a></li>
                <li className="task-check"><a href="#"><span className="title"><i className="icon"></i>چک ها</span> <span className="badge pull-right">{Counts !== undefined ? Counts.Cheque : 0}</span></a></li>
                <li className="task-note"><a href="#"><span className="title"><i className="icon"></i>یادداشت ها</span> <span className="badge pull-right">{Counts !== undefined ? Counts.Note : 0}</span></a></li>
                <li className="task-work"><a href="#"><span className="title"><i className="icon"></i>کارها</span> <span className="badge pull-right">{Counts !== undefined ? Counts.Work : 0}</span></a></li>
            </ul>
        );
    }
}




function mapStateToProps(state) {
    const { Counts } = state.MainPage;
    return {
        Counts
    };
}

const connectedLeftCounts = connect(mapStateToProps, null)(LeftCounts);
export { connectedLeftCounts as LeftCounts };