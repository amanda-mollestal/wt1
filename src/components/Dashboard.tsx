import React, { useState } from 'react'
import Profile from '@/components/Profile'
import Groups from '@/components/Groups'
import Activites from '@/components/Activites'
import { gitlabDataObject } from '@/interfaces/gitlabDataObject'
import { useRouter } from 'next/router'


type Props = {
  data: gitlabDataObject
}


const Dashboard = ({ data }: Props) => {

  const handleTabClick = async (tabName: string) => {
    setActiveTab(tabName)
  }

  const router = useRouter()
  const handleLogOut = async () => {
    fetch('/api/logout')
    router.push('/loading')
  }

  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className='dashboard-container'>
      <h1>{data.user.username.toUpperCase()} GITLAB DASHBOARD</h1>
      <div className='dashboard-tabs'>
        <button onClick={() => handleTabClick("profile")}>Profile</button>
        <button onClick={() => handleTabClick("activites")}>101 Activites</button>
        <button onClick={() => handleTabClick("groups")}>Groups & Projects</button>
        <button onClick={() => handleLogOut()}>Log out</button>
      </div>
      <div className='dashboard-content'>
        {activeTab === "profile" && <Profile userData={data.user} />}
        {activeTab === "activites" && <Activites eventsData={data.events} />}
        {activeTab === "groups" && <Groups groupsData={data.groups} />}
      </div>
    </div>
  )
}

export default Dashboard