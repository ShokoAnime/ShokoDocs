interface ContributeProps {
	editUrl: string;
	lastUpdated: string;
}

export const Contribute = ({editUrl, lastUpdated}: ContributeProps) => {
	const newDateString = new Date(lastUpdated).toLocaleDateString('en-us', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	return (
		<div className="toc-contribute-wrapper">
			<h2 className="toc-contribute-header">Contribute</h2>
			<div className="toc-items-wrapper">
				<a href={editUrl}>Edit This Page</a>
				<a href={`/../contribute/`}>Help Make Shoko Better</a>
			</div>
			<span className="toc-item-update">Last Updated On {newDateString}</span>
		</div>
	);
};
