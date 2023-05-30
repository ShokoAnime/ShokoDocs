import React from 'react';

const EasyTable = ({ headers, data }) => {
	const renderHeaders = () => {
		return (
			<div className='easy-header'>
				{headers.map((header, index) => (
					<div className='easy-header-item' key={index}>{header}</div>
				))}
			</div>
		);
	};

	const renderRows = () => {
		return data.map((row, rowIndex) => (
			<div className='easy-row' key={rowIndex}>
				{headers.map((header, columnIndex) => {
					if (header === 'Link') {
						console.log(row.link.label)
						return (
							row.link.label === 'None' ?
								<div className='easy-row-item' key={columnIndex}>
									{row.link.label}
								</div> :
								<div className='easy-row-item' key={columnIndex}>
									<a href={row.link.url}>{row.link.label}</a>
								</div>
						);
					} else {
						return <div className='easy-row-item' key={columnIndex}>{row[header.toLowerCase()]}</div>;
					}
				})}
			</div>
		));
	};

	return (
		<div>
			{renderHeaders()}
			{renderRows()}
		</div>
	);
};

export default EasyTable;