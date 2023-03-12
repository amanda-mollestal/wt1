import React, { useState } from 'react';
import Image from 'next/image';
import { userObject } from '@/interfaces/userObject';

type Props = {
  userData: userObject
};

const Profile = ({ userData }: Props) => {

  const time = new Date(userData.lastActivityAt)

  return (
    <div className='profile-component'>
      <h2>Profile</h2>
      <p>User id: {userData.id}</p>
      <p>Name: {userData.name}</p>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Last activity: {time.toLocaleDateString()}</p>
      <Image src={userData.avatarUrl} alt={userData.username} width={100} height={100} />
    </div>
  )
}; 



export default Profile;