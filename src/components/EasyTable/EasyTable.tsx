import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Column {
  name: string;
  header?: string;
  width?: string;
}

interface EasyTableProps {
  columns: Column[];
  data: any[];
}

const renderCellContent = (content: any): React.ReactNode => {
  if (typeof content === 'object' && content !== null) {
    if (content.link && content.title) {
      return <a href={content.link}>{content.title}</a>;
    }
    return JSON.stringify(content);
  }

  if (typeof content === 'string') {
    if (content.startsWith('http')) {
      return <a href={content}>Link</a>;
    }

    // Split the content into paragraphs based on '\n'
    const paragraphs = content.split('\n').filter(p => p.trim() !== '');

    if (paragraphs.length > 1) {
      return (
        <>
          {paragraphs.map((paragraph, index) => <ReactMarkdown key={index}>{paragraph}</ReactMarkdown>)}
        </>
      );
    } else {
      return <ReactMarkdown>{content}</ReactMarkdown>;
    }
  }

  return content;
};

const EasyTable = ({ columns, data }: EasyTableProps) => {
  return (
    <div className="easy-table-wrapper">
      <table className="easy-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.name} style={{ width: column.width }}>
                {column.header || column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.name}>
                  {renderCellContent(row[column.name])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EasyTable;
