import React from 'react'
import Dashboard from '@/components/Dashboard'
import { container } from '@/config/bootstrap'
import { gitlabDataObject } from '@/interfaces/gitlabDataObject'

/**
 * Props for the Dashboard component
 * @typedef {Object} Props
 * @property {gitlabDataObject} data - The data object to pass to the Dashboard component
 */
type Props = {
  data: gitlabDataObject
}

/**
 * Get the data from gitlab and pass it to the Dashboard component
 *
 * @param {Object} context -The Next.js context object
 * @return {Object} - The props for the Dashboard component
 */
export async function getServerSideProps(context: any) {
  const authController = container.resolve('AuthController')
  const gitlabController = container.resolve('GitlabController')
  const { req, res } = context

  const isLoggedIn = await authController.userIsLoggedIn(req, res)

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  try {
    const accessToken = await authController.getToken(req, res)
    const data: gitlabDataObject = await gitlabController.getData(accessToken.token as string)
    return {
      props: {
        data
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        data: null,
      }
    }

  }
}


/**
 * The Dashboard page
 * 
 * @param {Props} props - The props for the Dashboard component
 * @returns {JSX.Element} - The Dashboard component
 */
export default function dashboard({ data }: Props) {

  return (

    <div className='dashboard-page'>
      {data == null ? (
        <div className='error-component'>
          <h1>Something went wrong when getting data from gitlab.
            Please try again later. </h1>
        </div>
      ) : (
        <Dashboard data={data} />
      )}
    </div>

  )
}