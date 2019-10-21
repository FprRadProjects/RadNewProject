import React, { Component } from 'react';
import { connect } from "react-redux"
import { L10n } from '@syncfusion/ej2-base';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-inputs/styles/material.css";
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { toast } from 'react-toastify';
import PropTypes from "prop-types"

var newArchive = {};
class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.customButtonText = {
      browse: "انتخاب فایل",
      clear: "حذف همه فایل ها",
      upload: "آپلود فایلها"
    };
    const _Config = JSON.parse(localStorage.getItem("_Config"));
    this.asyncSettings = {
      chunkSize: 10000000,
      saveUrl: _Config.BaseUrl + '/AddChunkAttachment'
    };
  }


  addHeaders(args) {
    if (args.currentRequest !== undefined) {
      const _user = JSON.parse(localStorage.getItem("user"));
      const _lang = localStorage.getItem("lang");
      const { peygir_id } = this.props;
      args.customFormData = [{ 'peygir_id': peygir_id }, { 'From': 'AddFile' }];
      args.currentRequest.setRequestHeader("Authorization", _user.Authorization)
      args.currentRequest.setRequestHeader("lang", _lang);
    }
  }
  onSuccess(args) {
    const { EditAttachment, AllowAttach } = this.props;
    if (AllowAttach) {
      if (JSON.parse(args.response.Data).status) {
        var archiveId = JSON.parse(args.response.Data).data.archiveId;
        var fileName = JSON.parse(args.response.Data).data.fileName;
        newArchive = { archiveId: archiveId, fromParent: false, fileName: fileName };
        EditAttachment(newArchive);
      }
      else
        toast.error(JSON.parse(args.response.Data).error);
    }
    else
      toast.error(this.context.t("msg_Lacks_Access_To_ADD_Attachments"));

  }

  onChunkUploading(args) {
    const { AllowAttach } = this.props;
    if (AllowAttach) {
      if (args.currentRequest !== undefined) {
        const _user = JSON.parse(localStorage.getItem("user"));
        const _lang = localStorage.getItem("lang");
        if (args.currentChunkIndex !== 0) {
          const { peygir_id } = this.props;
          args.customFormData = [{ 'peygir_id': peygir_id }, { 'From': 'AddFile' }];
          args.customFormData = [{ 'From': 'AddFile' }];
          args.currentRequest.setRequestHeader("Authorization", _user.Authorization)
          args.currentRequest.setRequestHeader("lang", _lang);
        }
      }
    }
    else
      toast.error(this.context.t("msg_Lacks_Access_To_ADD_Attachments"));
  }

  componentWillMount() {
    L10n.load({
      "fa-IR": {
        "uploader": {
          "Browse": "انتخاب فایل",
          "Clear": "حذف",
          "Upload": "آپلود",
          "cancel": "انصراف",
          "delete": "حذف",
          "dropFilesHint": "فایل مورد نظر را در این قسمت رها کنید",
          "inProgress": "در حال پردازش",
          "invalidFileType": "فایل معتبر نمی باشد",
          "invalidMaxFileSize": "فایل انتخابی نباید بیشتر از  10 گیگابایت باشد",
          "invalidMinFileSize": "فایل نباید کمتر از 1 کیلوبایت باشد",
          "readyToUploadMessage": "آماده برای آپلود",
          "remove": "حذف",
          "removedFailedMessage": "حذف با مشکل مواجه شد",
          "removedSuccessMessage": "حذف با موفقیت انجام شد",
          "uploadFailedMessage": "آپلود با مشکل مواجه شد",
          "uploadSuccessMessage": "آپلود با موفقیت انجام شد",
        }
      }
    })
  }

  render() {

    return <div>
      <UploaderComponent autoUpload={false}
        allowedExtensions='.jpg, .jpeg, .png, .gif, .pdf,.zip,.rar, .doc, .docx, .xls, .xlsx'
        enableRtl={true}
        success={this.onSuccess.bind(this)}
        buttons={this.customButtonText}
        asyncSettings={this.asyncSettings}
        uploading={this.addHeaders.bind(this)}
        removing={this.addHeaders.bind(this)}
        chunkUploading={this.onChunkUploading.bind(this)}
        locale='fa-IR'
        minFileSize={1000}
        maxFileSize={10000000000}
      />
    </div>;
  }
}
UploadFile.contextTypes = {
  t: PropTypes.func.isRequired
}
function mapStateToProps(state) {

  const { alert } = state;
  const { loading } = state.loading;
  const { lang } = state.i18nState
  return {
      alert,
      loading,
      lang,
  };
}

const connectedUploadFile = connect(mapStateToProps, null)(UploadFile);
export { connectedUploadFile as UploadFile };