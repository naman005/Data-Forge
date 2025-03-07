import { Builder } from 'xml2js'

export function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header]
        if (typeof cell === 'object') {
          cell = JSON.stringify(cell)
        }
        return `"${cell}"`
      }).join(',')
    )
  ]

  return csvRows.join('\n')
}

export function convertToXML(data: any[]): string {
  const builder = new Builder();
  const obj = { root: { item: data } };
  return builder.buildObject(obj);
}

