// @ts-ignore
import lastUpdated from '/public/files/last-updated.json';
import EasyTable from '@components/EasyTable/EasyTable.tsx';

const LastUpdated = () => {
  console.log(lastUpdated)
 const recentUpdates = lastUpdated
  .slice(0, 10)
  .map((data) => [
   <a href={data.url}>{data.name}</a>,
   data.location,
   data.lastUpdated,

  <a href={`https://github.com/ShokoAnime/ShokoDocs/commit/${data.commitId}`}>{data.commitId.slice(0,6)}</a>,
  ]);

 return (
  <EasyTable
   header={['Page', 'Location', 'Updated On', 'GitHub Link']}
   data={recentUpdates}
   lineOnly={true}
  />
 );
};

export default LastUpdated;
