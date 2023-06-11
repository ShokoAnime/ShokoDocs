import React from 'react'
import ReactMarkdown from 'react-markdown'

interface EasyTableProps {
  header: string[]
  data: Array<Array<string | React.ReactNode>>
  hideHeader?: boolean
  columnWidths?: { [key: string]: string }
}

const EasyTable: React.FC<EasyTableProps> = ({ header, data, hideHeader = false, columnWidths = {} }) => {
  const renderCell = (cellData: string | React.ReactNode) => {
    if (typeof cellData === 'string') {
      if (cellData.startsWith('<') && cellData.endsWith('>')) {
        return <div dangerouslySetInnerHTML={{ __html: cellData }} />
      } else {
        return <ReactMarkdown>{cellData}</ReactMarkdown>
      }
    }
    return cellData
  }

  return (
    <div>
      {!hideHeader && (
        <div className="easy-header">
          {header.map((column, index) => (
            <div key={index} style={{ width: columnWidths[column] }}>
              {column}
            </div>
          ))}
        </div>
      )}
      {data.map((row, rowIndex) => (
        <div className="easy-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} style={{ width: columnWidths[header[cellIndex]] }}>
              {renderCell(cell)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default EasyTable