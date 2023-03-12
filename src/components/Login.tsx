import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Loading from './Loading'
import { container } from '@/config/bootstrap'

type Props = {
  redirectUrl: string
}

const Login = ({ redirectUrl }: Props) => {

  const router = useRouter()
  const handleClick = () => {
    router.push(redirectUrl)
  }

  try {
    return (
      <div>
        <button className='login-button' onClick={handleClick}>
          PRESS TO LOG IN WITH GITLAB
        </button>
      </div>
    )
  } catch (error) {
    return (
    <div className='error-component'>
      <h1>Something went wrong when logging in to gitlab </h1>
    </div>
    )
  }
}

export default Login;

