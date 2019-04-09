import d3 from 'd3'
import {onClick} from './on-click'
import {renderLines} from './render-lines'
import { wrapText } from '../utils/wrap-text'
import {  helpers }  from '../utils/helpers'
import {toggleColorAll} from "../includeToggle"
const iconLink = require('./components/icon-link')
const CHART_NODE_CLASS = 'org-chart-node'
const PERSON_LINK_CLASS = 'org-chart-person-link'
const PERSON_NAME_CLASS = 'org-chart-person-name'
const PERSON_TITLE_CLASS = 'org-chart-person-title'
const PERSON_DEPARTMENT_CLASS = 'org-chart-person-dept'
const PERSON_REPORTS_CLASS = 'org-chart-person-reports'

export function renders(config) {
    const {
        svgroot,
        svg,
        tree,
        animationDuration,
        nodeWidth,
        nodeHeight,
        nodePaddingX,
        nodePaddingY,
        nodeBorderRadius,
        backgroundColor,
        nameColor,
        titleColor,
        reportsColor,
        borderColor,
        avatarWidth,
        lineDepthY,
        treeData,
        sourceNode,
        onPersonLinkClick
    } = config

    // Compute the new tree layout.
    const nodes = tree.nodes(treeData).reverse()
    const links = tree.links(nodes)

    config.links = links
    config.nodes = nodes

    // Normalize for fixed-depth.
    nodes.forEach(function(d) {
        d.y = d.depth * lineDepthY
    })

    // Update the nodes
    const node = svg
        .selectAll('g.' + CHART_NODE_CLASS)
        .data(nodes.filter(d => d.id), d => d.id)
    const parentNode = sourceNode || treeData


    const toggleColor = function(x,id ){
setTimeout(()=>{ d3.select('rect.box'+id).attr("stroke", x);},100)
            d3.select('rect.box'+id).attr("stroke", x);
    }




    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
        .enter()
        .insert('g')
        .attr('class', CHART_NODE_CLASS)
        .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)

        .on('mouseup',d=>toggleColor('red',d.id))
        .on('click',onClick(config))




    // Person Card Shadow
    nodeEnter
        .append('rect')
        .attr('width', nodeWidth)
        .attr('height', nodeHeight)
        .attr('stroke', borderColor)
        .attr("stroke-width", 5)
        .attr('rx', nodeBorderRadius)
        .attr('ry', nodeBorderRadius)
        .attr('fill-opacity', 0.05)
        .attr('stroke-opacity', 0.025)
        .attr('filter', 'url(#boxShadow)')


    // Person Card Container
    // nodeEnter
    //     .append('rect')
    //     .attr('width', nodeWidth)
    //     .attr('height', nodeHeight)
    //     .attr('id', d => d.id)
    //     .attr('fill', d => d.WorkInfo.color)
    //     .attr('stroke', borderColor)
    //     .attr("stroke-width", 2.5)
    //     .attr('rx', nodeBorderRadius)
    //     .attr('ry', nodeBorderRadius)
    //     .style('cursor', helpers.getCursorForNode)
    //     .attr('class', d=> 'dibox box'+d.id )

    // Person Card Container
    // Person Card Container
    // nodeEnter
    //     .append('circle')
    //     .attr('cx',48.661513 )
    //     .attr('cy', 27.05917399 )
    //     .attr("r", "35")
    //
    //     .attr("dy", ".35em")
    //     .attr('width', nodeWidth)
    //     .attr('height', nodeHeight)
    //     .attr('id', d => d.id)
    //     .attr('fill', d => d.WorkInfo.color)
    //     .attr('stroke', borderColor)
    //     .attr("stroke-width", 2.5)
    //
    //     .style('cursor', helpers.getCursorForNode)
    //     .attr('class', d=> 'dibox box'+d.id )

    nodeEnter
        .append("path")

        .attr("d", "M5 32 L50 62 L93 32 L50 2 Z")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "1,0")
        .style("fill", "red")
        .style("stroke", "black");



    const namePos = {
        x: nodePaddingX * 2  ,
        y: nodePaddingY * 1.9
    }

    const WidthForTitle = 45 // getHeightForText(d.person.title)
    // Person's Name
    nodeEnter
        .append('text')
        .text(d => d.WorkInfo.title)
        .attr('class', PERSON_NAME_CLASS)
        .attr('x', namePos.x+WidthForTitle)
        .attr('y', namePos.y)
        .style('cursor', 'pointer')
        .style('fill',titleColor)
        .style("font-size", function(d) { return Math.min(2 * 20, (2 * 20 - 8) / this.getComputedTextLength() * 24) + "px"; })
        .attr("dy", ".35em");



    // // Person's Title
    // nodeEnter
    //     .append('text')
    //     .attr('class', PERSON_TITLE_CLASS + ' unedited')
    //     .attr('x', namePos.x)
    //     .attr('y', namePos.y + nodePaddingY * 1.2)
    //     .attr('dy', '0.1em')
    //     .style('font-size', 7)
    //     .style('cursor', 'pointer')
    //     .style('fill', titleColor)
    //     .text(d => d.person.title)

    const heightForTitle = 10 // getHeightForText(d.person.title)


    // Person's Reports
    nodeEnter
        .append('text')
        .attr('class', PERSON_REPORTS_CLASS)
        .attr('x', namePos.x + WidthForTitle - 16 )
        .attr('y', namePos.y + heightForTitle )
        .attr('dy', '.9em')
        .style('font-size', 7)
        .style('font-weight', 500)
        .style('cursor', 'pointer')
        .style('fill', reportsColor)
        .text(helpers.getTextForTitle)


    // Person's Avatar
    // nodeEnter
    //     .append('image')
    //     .attr('width', avatarWidth)
    //     .attr('height', avatarWidth)
    //     .attr('x', nodePaddingX)
    //     .attr('y', nodePaddingY)
    //     .attr('stroke', borderColor)
    //     .attr('src', d => d.person.avatar)
    //     .attr('xlink:href', d => d.person.avatar)
    //     .attr('clip-path', 'url(#avatarClip)')

    // Person's Department
    nodeEnter
        .append('text')
        .attr('class', getDepartmentClass)
        .attr('x', 34)
        .attr('y', avatarWidth + nodePaddingY * 1.2)
        .attr('dy', '.9em')
        .style('cursor', 'pointer')
        .style('fill', titleColor)
        .style('font-weight', 600)
        .style('font-size', 8)
        .attr('text-anchor', 'middle')
        .text(helpers.getTextForDepartment)

    // Person's Link
    // const nodeLink = nodeEnter
    //     .append('a')
    //     .attr('class', PERSON_LINK_CLASS)
    //     .attr('xlink:href', d => d.person.link || 'https://lattice.com')
    //     .on('click', datum => {
    //         d3.event.stopPropagation()
    //         // TODO: fire link click handler
    //         if (onPersonLinkClick) {
    //             onPersonLinkClick(datum, d3.event)
    //         }
    //     })
    //
    // iconLink({
    //     svg: nodeLink,
    //     x: nodeWidth - 28,
    //     y: nodeHeight - 28
    // })

    // Transition nodes to their new position.
    const nodeUpdate = node
        .transition()
        .duration(animationDuration)
        .attr('transform', d => `translate(${d.x},${d.y})`)

    nodeUpdate
        .select('rect.box')
        .attr('stroke', borderColor)


    // Transition exiting nodes to the parent's new position.
    const nodeExit = node
        .exit()
        .transition()
        .duration(animationDuration)
        .attr('transform', d => `translate(${parentNode.x},${parentNode.y})`)
        .remove()

    // Update the links
    const link = svg.selectAll('path.link').data(links, d => d.target.id)

    // Wrap the title texts
    const wrapWidth = 140

    svg.selectAll('text.unedited.' + PERSON_TITLE_CLASS).call(wrapText, wrapWidth)

    // Render lines connecting nodes
    renderLines(config)

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x
        d.y0 = d.y
    })





}

function getDepartmentClass(d) {
    const { WorkInfo } = d
    const deptClass = WorkInfo.title ? WorkInfo.title.toLowerCase() : ''

    return [PERSON_DEPARTMENT_CLASS, deptClass].join(' ')
}




