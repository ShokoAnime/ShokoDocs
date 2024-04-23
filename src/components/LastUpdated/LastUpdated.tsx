// @ts-ignore
import lastUpdated from '/public/files/last-updated.json';
import EasyTable from '@components/EasyTable/EasyTable.tsx';

const LastUpdated = () => {
 const recentUpdates = lastUpdated
  .slice(0, 10)
  .map((data) => [
   <a href={data.url}>{data.name}</a>,
   data.location,
   data.lastUpdated,
  ]);

 return (
  <EasyTable
   header={['Page', 'Location', 'Updated On']}
   data={recentUpdates}
   lineOnly={true}
  />
 );
};

export default LastUpdated;
