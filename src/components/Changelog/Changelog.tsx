// Imports
import React from "react";
import Lodash from "Lodash"
import { program, typeColor } from "./Changelog.utils"

export default function Changelog(props) {

	const releaseInfo = Lodash.map(program(props.name), release => {
		return {
			date: release.date,
			version: release.version,
			link: release.link,
			changes: Lodash.groupBy(release.changes, "type")
		}
	})

	const BuildChanges = (release) => (
		Lodash.map(release.info.changes, (changeGroupMap, changeGroupKey) => (
			<div className='changelog-type-wrapper' key={changeGroupKey}>
				<div className={typeColor(changeGroupKey)}>{changeGroupKey}</div>
				<div className='changelog-item-wrapper'>
					{Lodash.map(changeGroupMap, (changeItemMap, changeItemKey) => (
						<div key={changeItemKey}>- {changeItemMap.text}</div>
					))}
				</div>
			</div>
		))
	)

	return (
		Lodash.map(releaseInfo, (info, infoKey) => (
			<div className='changelog-wrapper' key={infoKey}>
				<div className='changelog-header'>
					<div>Version {info.version}</div>
					<span>|</span>
					<div>{info.date}</div>
					<span>|</span>
					{info.link !== 'NA' ? <a href={info.link} target='_blank'>View Release Notes</a> : 'Release Notes Not Available'}
				</div>
				{BuildChanges({info})}
			</div>
		))
	)
}

