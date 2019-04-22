import React from 'react';
import {connect} from 'react-redux';
import {LoadScript} from '../LoadExternal';
import '../../../content/css/stimulsoft.viewer.office2013.whiteblue.css';


class ReportView extends React.Component {

    componentDidMount(){
        console.log('Loading Designer view');

        console.log('Set full screen mode for the designer');
        var options = new window.Stimulsoft.Designer.StiDesignerOptions();
        options.appearance.fullScreenMode = false;

        console.log('Create the report designer with specified options');
        var designer = new window.Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);

        console.log('Create a new report instance');
        var report = new window.Stimulsoft.Report.StiReport();

        console.log('Load report from url');
        report.loadFile('http://localhost:8080/reports/a/RadReport.mrt');

        console.log('Edit report template in the designer');
        designer.report = report;

        designer.renderHtml("designer");
    }



    render() {

        return (


            <div>
                <div id="designer"></div>

            </div>
        )


    }

}


const connectedReportView =  ReportView ;
export {connectedReportView as ReportView};
