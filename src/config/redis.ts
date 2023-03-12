import Redis from 'ioredis';


setTimeout(() => {

}, 1000);

const redis = new Redis(process.env.REDIS_URL as string);


export default redis;
