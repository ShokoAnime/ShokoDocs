// @ts-ignore
import lastUpdated from '/public/files/last-updated.json';
import EasyTable from '@components/EasyTable/EasyTable.tsx';

const LastUpdated = () => {
  const recentUpdates = lastUpdated.slice(0, 10).map((data) => ({
    Page: {
      link: data.url,
      title: data.name,
    },
    Location: data.location,
    UpdatedOn: data.lastUpdated,
    GitHubLink: {
      link: `https://github.com/ShokoAnime/ShokoDocs/commit/${data.commitId}`,
      title: data.commitId.slice(0, 6),
    },
  }));

  return (
    <EasyTable
      columns={[
        { name: 'Page', header: 'Page' },
        { name: 'Location', header: 'Location' },
        { name: 'UpdatedOn', header: 'Updated On' },
        { name: 'GitHubLink', header: 'GitHub Link' },
      ]}
      data={recentUpdates}
    />
  );
};

export default LastUpdated;
