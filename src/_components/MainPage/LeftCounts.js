import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types"

class LeftCounts extends Component {
    clicked(event) {
        //if(event.target!=undefined)
        //alert(event.target)
    }
    componentDidMount() {
        const { GetCounts, Params } = this.props;
        GetCounts(Params)
    }

    render() {
        const {Counts} = this.props;

        return (
            <ul className="nav main-menu">
                <li className="task-email" id="Email_li">
                    <a href="#" onClick={this.clicked.bind(this)}>
                        <i className="icon" element="Email_li"  ></i>
                        <label className="title" id="Emails" element="Email_li" >
                            {this.context.t("Emails")}</label>
                        <span className="badge pull-right" element="Email_li"
                        >{Counts !== undefined ? Counts.Email : 0}</span></a>
                </li>
                <li className="task-letter" id="Secretariat_li">

                    <a href="#" onClick={this.clicked.bind(this)} >
                        <i className="icon" element="Secretariat_li" ></i>
                        <label className="title" id="Secretariat" element="Secretariat_li">
                            {this.context.t("Secretariat")}
                        </label>
                        <span className="badge pull-right" element="Secretariat_li">{Counts !== undefined ? Counts.Secretariat : 0}</span></a>

                </li>
                    <li className="task-message" id="Messages_li">
                    <a href="#" onClick={this.clicked.bind(this)}>
                        <i className="icon" element="Messages_li" ></i>
                        <label className="title" element="Messages_li" id="Messages">
                            {this.context.t("Messages")}
                        </label>
                        <span className="badge pull-right" element="Messages_li">{Counts !== undefined ? Counts.Message : 0}</span></a>
                </li>
                   <li className="task-sms" id="SMS_li">

                    <a href="#">
                        <i className="icon" element="SMS_li"></i>
                        <label className="title" id="SMS" element="SMS_li">
                            {this.context.t("SMS")}
                        </label>
                        <span className="badge pull-right" >{Counts !== undefined ? Counts.Sms : 0}</span></a>
                </li>
                <li className="task-check" id="Cheques_li">
                    <a href="#">
                        <i className="icon" element="Cheques_li" ></i>
                        <label className="title" id="Cheques" element="Cheques_li">
                            {this.context.t("Cheques")}
                        </label>
                        <span className="badge pull-right" element="Cheques_li">{Counts !== undefined ? Counts.Cheque : 0}</span></a>
                </li>

                <li className="task-note" id="Notes_li">
                    <a href="#">
                        <i className="icon" element="Notes_li" ></i>
                        <label className="title" id="Notes" element="Notes_li">
                            {this.context.t("Notes")}
                        </label>
                        <span className="badge pull-right" >{Counts !== undefined ? Counts.Note : 0}</span></a>
                </li>
                <li className="task-work" id="Works_li">

                    <a href="#">
                        <i className="icon" element="Works_li" ></i>
                        <label className="title" id="Works" element="Works_li">
                            {this.context.t("Works")}
                        </label>
                        <span className="badge pull-right" element="Works_li">{Counts !== undefined ? Counts.Work : 0}</span></a>

                </li>
            </ul>
        );
    }
}


LeftCounts.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { Counts } = state.MainPage;
    const { lang } = state.i18nState;
    return {
        lang,
        Counts
    };
}

const connectedLeftCounts = connect(mapStateToProps, null)(LeftCounts);
export { connectedLeftCounts as LeftCounts };