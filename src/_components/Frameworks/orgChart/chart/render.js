import {onClick} from './on-click'
import {renderLines} from './render-lines'
import {wrapText} from '../utils/wrap-text'
import {helpers} from '../utils/helpers'

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
        SquareWidth,
        SquareHeight,
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
        onPersonLinkClick,

    } = config


    // Compute the new tree layout.
    const nodes = tree.nodes(treeData).reverse()
    const links = tree.links(nodes)

    config.links = links
    config.nodes = nodes

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * lineDepthY
    })

    // Update the nodes
    const node = svg
        .selectAll('g.' + CHART_NODE_CLASS)
        .data(nodes.filter(d => d.id), d => d.id)
    const parentNode = sourceNode || treeData


    const toggleColor = function (x, id) {
        setTimeout(() => {
            document.getElementById(id).setAttribute('stroke', x);
            document.getElementById(id).setAttribute('stroke-width', 5);
        }, 100)


    }


    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
        .enter()
        .insert('g')
        .attr('class', CHART_NODE_CLASS)
        .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)

        .on('mouseup', d => toggleColor('#3C69F7', d.id))
        .on('click', onClick(config))


    // Person Card Shadow
    nodeEnter
        .append(d => {

            switch (d.WorkInfo.shape) {

                case "Square" :
                    return document.createElementNS('http://www.w3.org/2000/svg', "rect");

                    break;
                case "HemmedSquare" :
                    return document.createElementNS('http://www.w3.org/2000/svg', "rect");
                    break;
                case "Oval" :
                    return document.createElementNS('http://www.w3.org/2000/svg', "ellipse");
                    break;
                case "Diamond" :
                    return document.createElementNS('http://www.w3.org/2000/svg', "path");
                    break;
                default:

                    return document.createElementNS('http://www.w3.org/2000/svg', "rect");

                    break;
            }
        })
        .attr('x', d => {
            switch (d.WorkInfo.shape) {

                case 'Square' : {
                    return 7
                }
                case 'HemmedSquare' : {
                    return 7
                }
                case 'Oval' : {
                    return 1
                }
                case 'Diamond' : {
                    return 1
                }
            }
        })
        .attr('y', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return 1
                }
                case 'HemmedSquare' : {
                    return 1
                }
                case 'Oval' : {
                    return 1
                }
                case 'Diamond' : {
                    return 1
                }
            }
        })
        .attr('cx',
            d => {
                switch (d.WorkInfo.shape) {
                    case 'Oval' : {
                        return 56.661513
                    }

                    default:
                        return ''
                }
            }
        )
        .attr('cy', d => {
            switch (d.WorkInfo.shape) {
                case 'Oval' : {
                    return 36.05917399
                }

                default:
                    return ''
            }
        })
        .attr("r", d => {
            switch (d.WorkInfo.shape) {
                case 'Oval' : {
                    return 44
                }

                default:
                    return ''
            }
        })
        .attr('width', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return SquareWidth
                }
                case 'HemmedSquare' : {
                    return SquareWidth
                }
                case 'Oval' : {
                    return nodeWidth
                }
                case 'Diamond' : {
                    return nodeWidth
                }
            }
        })
        .attr('height', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return SquareHeight
                }
                case 'HemmedSquare' : {
                    return SquareHeight
                }
                case 'Oval' : {
                    return nodeHeight
                }
                case 'Diamond' : {
                    return nodeHeight
                }
            }
        })
        .attr('stroke', borderColor)
        .attr("stroke-width", 5)
        .attr('rx',
            d => {
                switch (d.WorkInfo.shape) {
                    case 'Square' : {
                        return nodeBorderRadius
                    }
                    case 'HemmedSquare' : {
                        return 20
                    }
                    case 'Oval' : {
                        return 55
                    }
                    default:
                        return ''
                }
            }
        )
        .attr('ry', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return nodeBorderRadius
                }
                case 'HemmedSquare' : {
                    return 20
                }
                case 'Oval' : {
                    return 35
                }
                default:
                    return ''
            }
        })
        .attr('fill-opacity', 0.05)
        .attr('stroke-opacity', 0.025)
        .attr('filter', 'url(#boxShadow)')
        .attr("d",
            d => {
                switch (d.WorkInfo.shape) {

                    case 'Diamond' : {
                        return "M0 32 L57 62 L113 32 L57 2 Z"
                    }
                    default:
                        return ''
                }
            }
        )


    // Person Card Container
    nodeEnter
        .append(d => {

            switch (d.WorkInfo.shape) {

                case "Square" :
                    return document.createElementNS('http://www.w3.org/2000/svg', "rect");

                    break;
                case "HemmedSquare" :
                    return document.createElementNS('http://www.w3.org/2000/svg', "rect");
                    break;
                case "Oval" :
                    return document.createElementNS('http://www.w3.org/2000/svg', "ellipse");
                    break;
                case "Diamond" :
                    return document.createElementNS('http://www.w3.org/2000/svg', "path");
                    break;
                default:

                    return document.createElementNS('http://www.w3.org/2000/svg', "rect");

                    break;
            }
        })
        .attr('cx',
            d => {
                switch (d.WorkInfo.shape) {
                    case 'Oval' : {
                        return 56.661513
                    }

                    default:
                        return ''
                }
            }
        )
        .attr('cy', d => {
            switch (d.WorkInfo.shape) {
                case 'Oval' : {
                    return 36.05917399
                }

                default:
                    return ''
            }
        })
        .attr("r", d => {
            switch (d.WorkInfo.shape) {
                case 'Oval' : {
                    return 44
                }

                default:
                    return ''
            }
        })
        .attr('x', d => {
            switch (d.WorkInfo.shape) {

                case 'Square' : {
                    return 7
                }
                case 'HemmedSquare' : {
                    return 7
                }
                case 'Oval' : {
                    return 1
                }
                case 'Diamond' : {
                    return 1
                }
            }
        })
        .attr('y', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return 1
                }
                case 'HemmedSquare' : {
                    return 1
                }
                case 'Oval' : {
                    return 1
                }
                case 'Diamond' : {
                    return 1
                }
            }
        })

        .attr('width', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return SquareWidth
                }
                case 'HemmedSquare' : {
                    return SquareWidth
                }
                case 'Oval' : {
                    return nodeWidth
                }
                case 'Diamond' : {
                    return nodeWidth
                }
            }
        })
        .attr('height', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return SquareHeight
                }
                case 'HemmedSquare' : {
                    return SquareHeight
                }
                case 'Oval' : {
                    return nodeHeight
                }
                case 'Diamond' : {
                    return nodeHeight
                }
            }
        })
        .attr('id', d => d.id)
        .attr('fill', d => d.WorkInfo.color)
        .attr('stroke', borderColor)
        .attr("stroke-width", 2.5
        )
        .attr('rx', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return nodeBorderRadius
                }
                case 'HemmedSquare' : {
                    return 20
                }
                case 'Oval' : {
                    return 55
                }
                case 'Diamond' : {
                    return nodeBorderRadius
                }
            }
        })
        .attr('ry', d => {
            switch (d.WorkInfo.shape) {
                case 'Square' : {
                    return nodeBorderRadius
                }
                case 'HemmedSquare' : {
                    return 20
                }
                case 'Oval' : {
                    return 35
                }
                case 'Diamond' : {
                    return nodeBorderRadius
                }
            }
        })
        .style('cursor', helpers.getCursorForNode)
        .attr('class', d => 'dibox box' + d.id)
        .attr("d", "")
        .style("stroke-dasharray", "1,0")
        .attr("d",
            d => {
                switch (d.WorkInfo.shape) {

                    case 'Diamond' : {
                        return "M0 32 L57 62 L113 32 L57 2 Z"
                    }
                    default:
                        return ''
                }
            }
        )

    nodeEnter
        .append("path")
        .attr("d",
            d => {
                switch (d.WorkInfo.done) {
                    case true:
                        return "M 15.476562 7.660156 L 9.292969 13.867188 C 9.175781 13.984375 8.992188 13.984375 8.878906 13.867188 L 7.222656 12.214844 C 7.039062 12.027344 6.761719 12.027344 6.578125 12.214844 C 6.394531 12.394531 6.394531 12.671875 6.578125 12.859375 L 8.234375 14.511719 C 8.460938 14.742188 8.789062 14.859375 9.085938 14.859375 C 9.382812 14.859375 9.707031 14.742188 9.933594 14.511719 L 16.121094 8.324219 C 16.308594 8.140625 16.308594 7.867188 16.121094 7.683594 C 15.960938 7.496094 15.664062 7.496094 15.476562 7.660156 Z M 15.476562 7.660156 "
                        break
                    case false:
                        return "M 13.527344 5.527344 L 10 9.058594 L 6.472656 5.527344 L 5.527344 6.472656 L 9.058594 10 L 5.527344 13.527344 L 6.472656 14.472656 L 10 10.941406 L 13.527344 14.472656 L 14.472656 13.527344 L 10.941406 10 L 14.472656 6.472656 Z M 13.527344 5.527344 "
                        break
                    default:
                        return ""
                        break
                }

            }
        )
        .style("stroke-dasharray", "1,0")
        .style("stroke",
            d => {
                switch (d.WorkInfo.done) {
                    case true:
                        return "#7AEA45"
                        break
                    case false:
                        return "#F23C34"
                        break
                    default:
                        return ""
                        break
                }

            }

           )
        .attr("transform", "translate(47,4)")
        .attr('fill', "#ffffff")
        .attr("stroke-width",1.5)

    // // Person Card Shadow
    // nodeEnter
    //     .append('rect')
    //     .attr('y', 8)
    //     .attr('width', nodeWidth)
    //     .attr('height', nodeHeight)
    //     .attr('stroke', borderColor)
    //     .attr("stroke-width", 5)
    //     .attr('rx', nodeBorderRadius)
    //     .attr('ry', nodeBorderRadius)
    //     .attr('fill-opacity', 0.05)
    //     .attr('stroke-opacity', 0.025)
    //     .attr('filter', 'url(#boxShadow)')
    //
    //
    // // Person Card Container
    // nodeEnter
    //     .append('rect')
    //     .attr('y', 8)
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
    //
    // nodeEnter


    const namePos = {
        x: nodePaddingX * 2.8,
        y: nodePaddingY * 1.9
    }

    const WidthForTitle = 14 // getHeightForText(d.person.title)
    // Person's Name
    nodeEnter
        .append('text')
        .text(d => d.WorkInfo.title)
        .attr('class', PERSON_NAME_CLASS)
        .attr('x', namePos.x + WidthForTitle)
        .attr('y', namePos.y)
        .style('cursor', 'pointer')
        .style('fill', titleColor)
        .style("font-size", function (d) {
            const size = Math.min(2 * 25, (2 * 25 - 8) / this.getComputedTextLength() * 24)

            return size >= 16 ? 15 + "px" : size + "px";

        })
        .style("text-anchor", "middle")
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

    const heightForReport = 22 // getHeightForText(d.person.title)
    const widthForReport = 23 // getHeightForText(d.person.title)


    // Person's Reports
    nodeEnter
        .append('text')
        .attr('class', PERSON_REPORTS_CLASS)
        .attr('x', namePos.x + widthForReport)
        .attr('y', namePos.y + heightForReport)
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
    nodes.forEach(function (d) {
        d.x0 = d.x
        d.y0 = d.y
    })


}

function getDepartmentClass(d) {
    const {WorkInfo} = d
    const deptClass = WorkInfo.title ? WorkInfo.title.toLowerCase() : ''

    return [PERSON_DEPARTMENT_CLASS, deptClass].join(' ')
}





