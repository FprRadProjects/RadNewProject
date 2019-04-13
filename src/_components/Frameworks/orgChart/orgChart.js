import {createElement, PureComponent} from 'react'
import connect from "react-redux/es/connect/connect";
import defaultConfig from "./chart/config";
import {defineBoxShadow} from "./defs/box-shadow";
import {defineAvatarClip} from "./defs/avatar-clip";
import {collapse} from "./utils/collapse";
import {renders} from './chart/render'
import d3 from "d3";


import '../../../content/css/orgChart.css'

var Height = 0;

const CHART_NODE_CLASS = 'org-chart-node'
const PERSON_LINK_CLASS = 'org-chart-person-link'
const PERSON_NAME_CLASS = 'org-chart-person-name'
const PERSON_TITLE_CLASS = 'org-chart-person-title'
const PERSON_DEPARTMENT_CLASS = 'org-chart-person-dept'
const PERSON_REPORTS_CLASS = 'org-chart-person-reports'

// const data = fakeData

class OrgChart extends PureComponent {

    static defaultProps = {
        id: 'react-org-chart'
    }


    renderUpdate({svg}) {
        return () => {
            svg.attr(
                'transform',
                `translate(${d3.event.translate})
     scale(${d3.event.scale.toFixed(1)})`
            )
        }
    }


    init(options) {
        // Merge options with the default config
        const config = {
            ...defaultConfig,
            ...options,
            treeData: options.data
        }

        if (!config.id) {
            console.error('react-org-chart: missing id for svg root')
            return
        }

        const {
            id,
            treeData,
            lineType,
            margin,
            nodeWidth,
            nodeHeight,
            nodeSpacing,
            shouldResize
        } = config



            // Calculate how many pixel nodes to be spaced based on the
            // type of line that needs to be rendered
            if (lineType == 'angle') {
                config.lineDepthY = nodeHeight + 40
            } else {
                config.lineDepthY = nodeHeight + 60
            }

            // Get the root element

            const elem = document.body.querySelector(id)
            if (!elem) {
                console.error(`react-org-chart: svg root DOM node not found (id: ${id})`)
                return
            }

            // Reset in case there's any existing DOM
            elem.innerHTML = ''

            const elemWidth = elem.offsetWidth
            const elemHeight = Height


            // Setup the d3 tree layout
            config.tree = d3.layout
                .tree()
                .nodeSize([nodeWidth + nodeSpacing, nodeHeight + nodeSpacing])

            if (treeData.children === undefined) {
                treeData.children = treeData._children
                treeData._children = null
            }
        var childrenWidth=1;
        if (treeData.children !== undefined) {
            // Calculate width of a node with expanded children
              childrenWidth = parseInt(treeData.children.length * nodeWidth / 2)
        }
            // Add svg root for d3
            const svgroot = d3
                .select(id)
                .append('svg')
                .attr('width', elemWidth)
                .attr('height', "100vh")

            // Add our base svg group to transform when a user zooms/pans
            const svg = svgroot
                .append('g')
                .attr(
                    'transform',
                    'translate(' +
                    parseInt(
                        childrenWidth + (elemWidth - childrenWidth * 2) / 2 - margin.left / 2
                    ) +
                    ',' +
                    20 +
                    ')'
                )

            // Define box shadow and avatar border radius
            defineBoxShadow(svgroot, 'boxShadow')
            defineAvatarClip(svgroot, 'avatarClip', {
                borderRadius: 40
            })

            // Center the viewport on initial load
            treeData.x0 = 0
            treeData.y0 = elemHeight / 2

            // Collapse all of the children on initial load
        if (treeData.children !== undefined) {
            treeData.children.forEach(collapse)
        }
            // Connect core variables to config so that they can be
            // used in internal rendering functions
            config.svg = svg
            config.svgroot = svgroot
            config.render = renders

            // Defined zoom behavior
            const zoom = d3.behavior
                .zoom()
                // Define the [zoomOutBound, zoomInBound]
                .scaleExtent([0.5, 2])
                .duration(50)
                .on('zoom', this.renderUpdate(config))

            // Attach zoom behavior to the svg root
            svgroot.call(zoom)

            // Define the point of origin for zoom transformations
            zoom.translate([
                parseInt(
                    childrenWidth + (elemWidth - childrenWidth * 2) / 2 - margin.left / 2
                ),
                20
            ])

            // Add listener for when the browser or parent node resizes
            const resize = () => {
                if (!elem) {
                    global.removeEventListener('resize', resize)
                    return
                }

                svgroot.attr('width', elem.offsetWidth).attr('height', elem.offsetHeight)
            }

            if (shouldResize) {
                global.addEventListener('resize', resize)
            }

            // Start initial render
            renders(config)

            // Update DOM root height
            d3.select(id).style('height', elemHeight + margin.top + margin.bottom)

    }

    componentDidMount() {
        const {id, data, ...options} = this.props

        this.init({id: `#${id}`, data, lineType: 'angle'})
        // console.log(JSON.stringify(data, null, 4) )
        // setTimeout(()=>        this.init({id: `#${id}`, data, lineType: 'angle'}) ,5000)


    }


    render() {
        const {id} = this.props

        return createElement('div', {
            id
        })
    }

}

const mapStateToProps = state => {
    return {
        Height: state.Diagram.orgChart_Height,
    }
}


const connectedOrgChart = connect(mapStateToProps, null)(OrgChart);
export {connectedOrgChart as OrgChart};
