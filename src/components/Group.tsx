
import React from 'react'
import Project from './Project';



type Props = {
  data: any;
};

const Group = ({ data }: Props) => {
  return (
    <div className='group'>
      <h2>Group name: {data.fullName} </h2>
      <p>Path: {data.fullPath} </p>
      <div>
        <a href={data.webUrl}>Link to group</a>
      </div>
      {data.projects.map((project: any) => (
        <Project data={project} key={project.name} />
      ))}
      {data.count > 5 ? (
        <div>
          <a href={data.webUrl} >Find more projects at gitlab...</a>
        </div>
      ) : (
        <></>
      )}

    </div>
  )
}

export default Group