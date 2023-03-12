import { eventsObject } from '@/interfaces/eventsObject';

type Props = {
  eventsData: eventsObject[];
};


const Activites = ({ eventsData }: Props)  => {
  return (
    <div className='activites-component'>
      <table>
      <thead>
        <tr>
          <th>Nr</th>
          <th>Activity ID</th>
          <th>Date</th>
          <th>Action</th>
          <th>Project ID</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {eventsData.map((activites) => (
          <tr key={activites.id}>
            <td>{eventsData.indexOf(activites) + 1}</td>
            <td>{activites.id}</td>
            <td> {new Date(activites.date).toLocaleDateString() + ' ' + new Date(activites.date).toLocaleTimeString()} </td>
            <td>{activites.action}</td>
            <td>{activites.project}</td>
            <td>{activites.title || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}; 



export default Activites;