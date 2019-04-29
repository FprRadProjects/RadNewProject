import React, { Component } from 'react';
import { L10n } from '@syncfusion/ej2-base';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-inputs/styles/material.css";
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
// import Select from "./Select";



var archiveIds = [];
class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.customButtonText = {
      browse: "انتخاب فایل",
      clear: "حذف همه فایل ها",
      upload: "آپلود فایلها"
    };
    this.asyncSettings = {
      chunkSize: 10000000,
      saveUrl: 'http://192.168.1.54:2535/AddChunkAttachment',
      removeUrl: 'http://192.168.1.54:2535/RemoveFile'
    };
  }


  addHeaders(args) {
    const { peygir_id } = this.props;
    args.customFormData = [{ 'peygir_id': peygir_id }, { 'From': 'AddFile' }];
    args.currentRequest.setRequestHeader("Authorization", "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6Itix2KfYryIsIlBhc3NXb3JkIjoiLz8iLCJpYXQiOiIyMDE5LTA0LTI4VDA2OjEyOjMxLjcwMzM1NTlaIn0.sE_x_wS_ol9VfGJxKW5GoHdUO6Ae4lf9Bt2O0vTygZg")
    args.currentRequest.setRequestHeader("lang", "fa");
  }
  onSuccess(args) {
    var archiveId = { archiveId: JSON.parse(args.response.Data).data.ArchiveId, type: "new" }
    archiveIds.push(archiveId);
    console.log(archiveIds)
  }
  onChunkSuccess(args) {
    console.log(JSON.parse(args.response.Data))
  }
  onChunkUploading(args) {
    if (args.currentChunkIndex !== 0) {
      const { peygir_id } = this.props;
      args.customFormData = [{ 'peygir_id': peygir_id }, { 'From': 'AddFile' }];
      args.customFormData = [{ 'From': 'AddFile' }];
      args.currentRequest.setRequestHeader("Authorization", "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6Itix2KfYryIsIlBhc3NXb3JkIjoiLz8iLCJpYXQiOiIyMDE5LTA0LTI4VDA2OjEyOjMxLjcwMzM1NTlaIn0.sE_x_wS_ol9VfGJxKW5GoHdUO6Ae4lf9Bt2O0vTygZg")
      args.currentRequest.setRequestHeader("lang", "fa");
    }
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
          "invalidMinFileSize": "فایل نباید کمتر از 250 کیلوبایت باشد",
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
        minFileSize={10000}
        maxFileSize={10000000000}
      />
    </div>;
  }
}

export default UploadFile;
