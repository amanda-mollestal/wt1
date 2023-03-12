import React from 'react';
import Image from 'next/image';

type Props = {
  data: {
      name: string,
      path: string,
      fullPath: string,
      webUrl: string,
      avatarUrl: string,
      lastActivityAt: string,
      lastCommit: {
        authorEmail: string,
        fullTitle: string,
        authoredDate: string,
        authorName: string,
        authorUsername: string,
        authorAvatarUrl: string,
      }
  }
};

const Project = ({ data }: Props) => {

  return (
    <div className='project'>
      <h4>Project name: {data.name}</h4>
      <p>Path: {data.fullPath} </p>
      <p>Last activity: {new Date(data.lastActivityAt).toLocaleDateString() + ' at ' + new Date(data.lastActivityAt).toLocaleTimeString()}</p>
      <div>
        <a href={data.webUrl}>Link to project</a>
      </div>
  
      <div className='last-commit'>
        {data.lastCommit.authorAvatarUrl.startsWith('https://secure.') ? (
          <Image src={data.lastCommit.authorAvatarUrl} alt={data.lastCommit.authorName} width={100} height={100} />
        ) : (
          <p></p>
        )}
        <div >
          <p> - Last commit - </p>
          <p>{'"' + data.lastCommit.fullTitle + '" by ' + data.lastCommit.authorUsername}</p>
          <p>{data.lastCommit.authorName} </p>
          <p>{data.lastCommit.authorEmail} </p>
          <p>{new Date(data.lastCommit.authoredDate).toLocaleDateString() + ' at ' + new Date(data.lastCommit.authoredDate).toLocaleTimeString()}</p>
        </div>
      </div>
     
      
    </div>
  );
}; 

export default Project;