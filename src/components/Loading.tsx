import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='loading'>
      <div className='spinner'></div>
      <div className='text'>Loading...</div>
    </div>
  );
};

export default Loading;