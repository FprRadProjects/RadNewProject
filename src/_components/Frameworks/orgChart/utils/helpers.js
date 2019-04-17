export const helpers={
    getTextForTitle,getTextForDepartment,getCursorForNode
}

export function getTextForTitle(datum) {
  if (!datum.WorkInfo || !datum.WorkInfo.totalReports) {
    return ''
  }

  const { WorkInfo: { totalReports } } = datum
  // const pluralEnding = totalReports > 1 ? 's' : ''

  return `${totalReports} شاخه  `
}

const departmentAbbrMap = {
  Marketing: 'mktg',
  Operations: 'ops',
  Growth: 'gwth',
  Branding: 'brand',
  Assurance: 'fin',
  Data: 'data',
  Design: 'design',
  Communications: 'comms',
  Product: 'prod',
  People: 'people',
  Sales: 'sales'
}

export   function getTextForDepartment(datum) {
  if (!datum.WorkInfo.worker) {
    return ''
  }

  const { worker } = datum.WorkInfo

  if (departmentAbbrMap[worker]) {
    return departmentAbbrMap[worker].toUpperCase()
  }

  return datum.WorkInfo.worker.substring(0, 3).toUpperCase()
}

export  function getCursorForNode(datum) {
  return datum.children || datum._children || datum.hasChild
    ? 'pointer'
    : 'default'
}
