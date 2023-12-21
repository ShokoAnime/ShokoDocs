import React from "react";
import ReactMarkdown from "react-markdown";

interface EasyTableProps {
  header: string[];
  data: Array<Array<string | React.ReactNode>>;
  center?: boolean;
  columnWidths?: { [key: string]: string };
}

const EasyTable = ({
  header,
  data,
  center = false,
  columnWidths = {},
}: EasyTableProps) => {
  const renderCell = (cellData: string | React.ReactNode) => {
    if (typeof cellData === "string") {
      if (cellData.startsWith("<") && cellData.endsWith(">")) {
        return <div dangerouslySetInnerHTML={{ __html: cellData }} />;
      } else {
        return <ReactMarkdown>{cellData}</ReactMarkdown>;
      }
    }
    return cellData;
  };

  return (
    <div className="easy-wrapper">
      <div className={`easy-header ${center ? "easy-header-center" : null}`}>
        {header.map((column, index) => (
          <div key={index} style={{ width: columnWidths[column] }}>
            {column}
          </div>
        ))}
      </div>
      {data.map((row, rowIndex) => (
        <div
          className={`easy-row ${center ? "easy-row-center" : null}`}
          key={rowIndex}
        >
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              style={{ width: columnWidths[header[cellIndex]] }}
            >
              {renderCell(cell)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EasyTable;
