// Imports
import React from 'react'
import Lodash from 'lodash'
import { program, typeColor } from './Changelog.utils'

export default function Changelog(props) {
  interface releaseInfo {
    changes: object
    date: string
    link: string
    version: string
  }

  const releaseInfo = Lodash.map(program(props.name), ({ changes, date, link, version }: releaseInfo) => {
    return {
      changes: Lodash.groupBy(changes, 'type'),
      date: date,
      link: link,
      version: version,
    }
  })

  const BuildChanges = (release) =>
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

  return Lodash.map(releaseInfo, (info, infoKey) => (
    <div className='changelog-wrapper' key={infoKey}>
      <div className='changelog-left'>{BuildChanges({ info })}</div>
      <div className='changelog-right'>
        <div className='changelog-version'>Version {info.version}</div>
        <div className='changelog-date'>{info.date}</div>
        {info.link !== 'NA' ? (
          <a className='changelog-link' href={info.link} target='_blank'>
            View Release Notes
          </a>
        ) : null}
      </div>
    </div>
  ))
}
