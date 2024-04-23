// @ts-ignore
import lastUpdated from '/public/files/lastUpdated.json';
import EasyTable from '@components/EasyTable/EasyTable.tsx';

const RecentlyUpdated = () => {
 const recentUpdates = lastUpdated
  .slice(0, 10)
  .map((data) => [
   <a href={data.url}>{data.name}</a>,
   data.location,
   data.lastUpdated,
  ]);

 return (
  <EasyTable header={['Page', 'Location', 'Updated On']} data={recentUpdates} />
 );
};

export default RecentlyUpdated;
