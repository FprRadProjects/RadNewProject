import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types"
import {MenuProvider} from "react-contexify";

class LeftCounts extends Component {
    componentDidMount() {
        const {GetCounts, Params} = this.props;
        GetCounts(Params)
    }

    render() {
        const {
            Counts, Design
        } = this.props;
        const {DeletedElements} = Design !== undefined ? Design : {};
        const {EditedElements} = Design !== undefined ? Design : {};
        return (
            <MenuProvider id="menu_id">
            <ul className="nav main-menu">
                <li className="task-email">
                        {(DeletedElements === undefined || DeletedElements["Email_li"] === undefined ||
                            DeletedElements["Email_li"].IsShow
                        ) && <a href="#" id="Email_li">
                            <i className="icon"></i>
                            <label className="title" id="Emails" element="Email_li">
                                {(EditedElements === undefined || EditedElements["Emails"] === undefined) ?
                                    this.context.t("Emails") : EditedElements["Emails"].Title}</label>
                            <span className="badge pull-right" element="Email_li"
                                  id="Emails_Counts">{Counts !== undefined ? Counts.Email : 0}</span></a>}

                </li>
                <li className="task-letter">
                        {(DeletedElements === undefined || DeletedElements["Secretariat_li"] === undefined ||
                            DeletedElements["Secretariat_li"].IsShow
                        ) &&
                        <a href="#" id="Secretariat_li">
                            <i className="icon"></i>
                            <label className="title" id="Secretariat" element="Secretariat_li">
                                {(EditedElements === undefined || EditedElements["Secretariat"] === undefined) ?
                                    this.context.t("Secretariat") : EditedElements["Secretariat"].Title}
                            </label>
                            <span className="badge pull-right" element="Secretariat_li"
                                  id="Secretariat_Counts">{Counts !== undefined ? Counts.Secretariat : 0}</span></a>}

                </li>
                <li className="task-message">
                        {(DeletedElements === undefined || DeletedElements["Messages_li"] === undefined ||
                            DeletedElements["Messages_li"].IsShow
                        ) && <a href="#" id="Messages_li">
                            <i className="icon"></i> <label className="title" element="Messages_li" id="Messages">
                            {(EditedElements === undefined || EditedElements["Messages"] === undefined) ?
                                this.context.t("Messages") : EditedElements["Messages"].Title}
                        </label>
                            <span className="badge pull-right" element="Messages_li"
                                  id="Messages_Counts">{Counts !== undefined ? Counts.Message : 0}</span></a>}
                </li>
                <li className="task-sms">
                        {(DeletedElements === undefined || DeletedElements["SMS_li"] === undefined ||
                            DeletedElements["SMS_li"].IsShow
                        ) &&
                        <a href="#" id="SMS_li">
                            <i className="icon"></i><label className="title" id="SMS" element="SMS_li">
                            {(EditedElements === undefined || EditedElements["SMS"] === undefined) ?
                                this.context.t("SMS") : EditedElements["SMS"].Title}
                        </label>
                            <span className="badge pull-right" element="SMS_li"
                                  id="SMS_Counts">{Counts !== undefined ? Counts.Sms : 0}</span></a>}
                </li>
                <li className="task-check">
                        {(DeletedElements === undefined || DeletedElements["Cheques_li"] === undefined ||
                            DeletedElements["Cheques_li"].IsShow
                        ) &&
                        <a href="#" id="Cheques_li">
                            <i className="icon"></i>
                            <label className="title" id="Cheques" element="Cheques_li">
                                {(EditedElements === undefined || EditedElements["Cheques"] === undefined) ?
                                    this.context.t("Cheques") : EditedElements["Cheques"].Title}
                            </label>
                            <span className="badge pull-right" element="Cheques_li"
                                  id="Cheques_Counts">{Counts !== undefined ? Counts.Cheque : 0}</span></a>}
                </li>

                <li className="task-note">
                        {(DeletedElements === undefined || DeletedElements["Notes_li"] === undefined ||
                            DeletedElements["Notes_li"].IsShow
                        ) && <a href="#" id="Notes_li">
                            <i className="icon"></i>
                            <label className="title" id="Notes" element="Notes_li">
                                {(EditedElements === undefined || EditedElements["Notes"] === undefined) ?
                                    this.context.t("Notes") : EditedElements["Notes"].Title}
                            </label>
                            <span className="badge pull-right" element="Notes_li"
                                  id="Notes_Counts">{Counts !== undefined ? Counts.Note : 0}</span></a>}
                </li>
                <li className="task-work">
                        {(DeletedElements === undefined || DeletedElements["Works_li"] === undefined ||
                            DeletedElements["Works_li"].IsShow
                        ) &&
                        <a href="#" id="Works_li">
                            <i className="icon"></i>
                            <label className="title" id="Works" element="Works_li">
                                {(EditedElements === undefined || EditedElements["Works"] === undefined) ?
                                    this.context.t("Works") : EditedElements["Works"].Title}
                            </label>
                            <span className="badge pull-right" element="Works_li"
                                  id="Works_Counts">{Counts !== undefined ? Counts.Work : 0}</span></a>}

                </li>
            </ul>
            </MenuProvider>
        );
    }
}


LeftCounts.contextTypes = {
    t: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {Counts} = state.MainPage;
    const {lang} = state.i18nState;
    const {Design} = state;
    return {
        lang,
        Counts,
        Design
    };
}

const connectedLeftCounts = connect(mapStateToProps, null)(LeftCounts);
export {connectedLeftCounts as LeftCounts};