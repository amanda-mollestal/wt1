import Redis from 'ioredis';


setTimeout(() => {

}, 1000);

const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL as string);


export default redis;
