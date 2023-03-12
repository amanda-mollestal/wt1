import { groupsObject } from '@/interfaces/groupsObject';
import React from 'react'
import Group from './Group';

type Props = {
  groupsData: groupsObject
};

const Groups = ({ groupsData }: Props) => {
  return (
    <div className='groups'>
      {groupsData.groups.map((group: any) => (
        <Group data={group} key={group.fullName} />
      ))}
      {groupsData.groupCount > 3 ? (
        <div>
          <a href='https://gitlab.lnu.se/dashboard/groups' >Find more groups at gitlab...</a>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Groups