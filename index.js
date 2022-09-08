import { createClient } from 'redis';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const authentication = process.env.REDIS_USER && process.env.REDIS_USER.trim() != '' ? `${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@` : ``;

const client = createClient({
  url: `redis://${authentication}${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}/0`,
});

client.on('error', (err) => console.log('Redis Client Error', err));

console.log('Trying to get a single job');

await client.connect();

const amount = await client.LLEN(process.env.REDIS_LIST);
if (amount == 0) {
  console.log('Nothing to do');
  process.exit(0);
}
const job = await client.LPOP(process.env.REDIS_LIST);
console.log(`Executing job with ${job}`);
console.time();
await delay(Math.floor(Math.random() * 10) * 1000);
console.log(`Completed`);
console.timeEnd();
process.exit(0);
