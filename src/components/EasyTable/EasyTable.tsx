import React from 'react';
import ReactMarkdown from 'react-markdown';

interface EasyTableProps {
  header: string[];
  data: Array<Array<string | React.ReactNode>>;
  columnWidths?: { [key: string]: string };
  center?: boolean;
  lineOnly?: boolean;
}

const EasyTable = ({
  header,
  data,
  center = false,
  columnWidths = {},
  lineOnly = false,
}: EasyTableProps) => {
  const getColumnWidthStyle = (columnName: string) => ({
    width: columnWidths[columnName] || '100%',
  });

  const renderCellContent = (cellData: any) => {
    if (typeof cellData.props?.href !== 'undefined') {
      return <a href={cellData.props.href}>{cellData.props.children}</a>;
    }

    if (typeof cellData === 'object') {
      return <a href={cellData.link}>{cellData.title}</a>;
    }

    if (typeof cellData === 'string') {
      if (cellData.startsWith('http')) {
        return <a href={cellData}>Website</a>;
      }
      if (cellData.includes('\n')) {
        const lines = cellData.split('\n');
        return lines.map((line, index) => (
          <div key={index} className={index < lines.length - 1 ? 'easy-cell-line' : 'easy-cell-line-last'}>
            <ReactMarkdown>{line}</ReactMarkdown>
          </div>
        ));
      }
      return <ReactMarkdown>{cellData}</ReactMarkdown>;
    }
    return cellData;
  };

  return (
    <div className={`easy-wrapper ${center ? 'easy-center' : ''}`}>
      <div
        className="easy-header"
        style={{
          background: lineOnly ? 'none' : undefined,
          borderBottom: lineOnly ? 'none' : undefined,
        }}
      >
        {header.map((column, index) => (
          <div key={index} style={getColumnWidthStyle(column)}>
            {column}
          </div>
        ))}
      </div>
      {data.map((row, rowIndex) => (
        <div
          className="easy-row"
          key={rowIndex}
          style={{
            background: lineOnly ? 'none' : undefined,
            borderTop: lineOnly ? '2px solid var(--sl-color-hairline)' : undefined,
          }}
        >
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} style={getColumnWidthStyle(header[cellIndex])}>
              {renderCellContent(cell)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EasyTable;
