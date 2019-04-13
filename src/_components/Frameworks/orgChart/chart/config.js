const animationDuration = 600
const shouldResize = true

// Nodes
const nodeWidth = 115
const nodeHeight = 60
const nodeSpacing = 6
const nodePaddingX = 16
const nodePaddingY = 16
const avatarWidth = 20
const nodeBorderRadius = 2
const margin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
}

// Lines
const lineType = 'angle'
const lineDepthY = 60 /* Height of the line for child nodes */

// Colors
const backgroundColor = '#fff'
const borderColor = '#76e93e'
const nameColor = '#222d38'
const titleColor = '#617080'
const reportsColor = '#92A0AD'

const config = {
  margin,
  animationDuration,
  nodeWidth,
  nodeHeight,
  nodeSpacing,
  nodePaddingX,
  nodePaddingY,
  nodeBorderRadius,
  avatarWidth,
  lineType,
  lineDepthY,
  backgroundColor,
  borderColor,
  nameColor,
  titleColor,
  reportsColor,
  shouldResize
}

export default config
