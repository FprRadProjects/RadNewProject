import React from 'react';
import {connect} from 'react-redux';
import {LoadScript} from '../LoadExternal';
import '../../../content/css/stimulsoft.viewer.office2013.whiteblue.css';


class ReportView extends React.Component {


    componentDidMount(){
        console.log('Loading Viewer view');

        console.log('Creating the report viewer with default options');
        var viewer = new window.Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);

        console.log('Creating a new report instance');
        var report = new window.Stimulsoft.Report.StiReport();

        // window.Stimulsoft.Base.Localization.StiLocalization.addLocalizationFile("localizations/fa.xml", false, "Persian");
        // window.Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("localizations/fa.xml", true);

        console.log('Load report from url');
        report.loadFile('reports/RadReport.mrt');

        console.log('Assigning report to the viewer, the report will be built automatically after rendering the viewer');
        viewer.report = report;

        console.log('Rendering the viewer to selected element');




        viewer.renderHtml('viewer');
    }



    render() {

        return (


            <div>
                <div id="viewer"></div>

            </div>
        )


    }

}


const connectedReportView =  ReportView ;
export {connectedReportView as ReportView};
