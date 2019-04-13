import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/User';
import '../../content/css/login.css'
import logo from '../../content/images/login/rad.png';
import PropTypes from "prop-types"
import { setLanguage } from "redux-i18n"
import { BasicInfo_action } from "../../_actions";
import Loader from 'react-loader-advanced';



class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.languages = ["fa", "en"];
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.GetCompanyInfo(false);
    }


    dispatchLanguage = e => {
        localStorage.setItem("lang", e.target.value);
        this.props.setLanguage(e.target.value);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        document.title = this.context.t("SoftWare_Name")
        const { loggingIn, alert, lang, CompanyName, loading } = this.props;
        const { username, password, submitted } = this.state;
        const loaddddd = <div className="loader-wrapper">
            <div className="loader">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <h4>لطفا صبر کنید</h4>
            </div>
        </div>;
        const _Config =JSON.parse(localStorage.getItem("_Config"));
        return (



            <div className="r-login">
                <div className="r-login__company">
                    <div className="r-login__company-title">{CompanyName}</div>
                    <div className="r-login__company-ver">ورژن {_Config.Ver_Web} مطابق با ورژن {_Config.Ver_Win} ویندوز</div>
                    <div className="r-login__company-date">{_Config.Ver_Date}</div>
                </div>
                <Loader show={loading === undefined ? false : loading} message={loaddddd} >
                </Loader>
                <div className="r-login__wrapper">
                    <div className="r-login__signin">
                        <div className="r-login__header">
                            <h3>{this.context.t("SoftWare_Name")}</h3>
                            <img src={logo} />
                            <select value={lang} onChange={this.dispatchLanguage.bind(this)}>
                                {this.languages.map(lang => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <form className="r-login__body" name="form" id="login_form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="r-login__icon r-login__icon--username"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="username" placeholder={this.context.t("username")} autoComplete="off" value={username} onChange={this.handleChange} />

                                </div>
                                {submitted && !username &&
                                    <div className="form-control-feedback text-danger mt-2">{this.context.t("required_username")}</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="r-login__icon r-login__icon--password"></i></span>
                                    </div>
                                    <input className="form-control" type="password" name="password" placeholder={this.context.t("password")} autoComplete="off" value={password} onChange={this.handleChange} />
                                </div>
                                {submitted && !password &&
                                    <div className="form-control-feedback text-danger mt-2">{this.context.t("required_password")}</div>
                                }
                            </div>
                            <div className="r-login__action">
                                <button className="btn btn-primary">{this.context.t("login")}</button>
                                {loggingIn && <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
                            </div>
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

LoginPage.contextTypes = {
    t: PropTypes.func.isRequired
}
function mapStateToProps(state) {

    const { loading } = state.loading;
    const { loggingIn } = state.authentication;
    const { alert } = state;
    const { CompanyName } = state.BasicInfo;
    const { lang, translations } = state.i18nState;
    localStorage.setItem("lang", lang);
    return {
        loggingIn,
        loading,
        alert,
        lang,
        translations,
        CompanyName
    };
}


const mapDispatchToProps = dispatch => ({
    GetCompanyInfo: (login) => {
        dispatch(BasicInfo_action.GetCompanyInfo(login))
    },
    logout: () => {
        dispatch(userActions.logout())
    },
    setLanguage: (param) => {
        dispatch(setLanguage(param))
    },
    login: (username, password) =>
        dispatch(userActions.login(username, password))


});


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
