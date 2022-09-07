import { createClient } from 'redis';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const client = createClient({
  database: process.env.REDIS_DB,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
});

client.on('error', (err) => console.log('Redis Client Error', err));

console.log('Trying to get a single job');

await client.connect();

const amount = await client.LLEN(REDIS_QUEUE);
if (amount == 0) {
  console.log('Nothing to do');
  process.exit(0);
}
const job = client.LPOP(offboarding);
console.log(`Executing job with ${job}`);
await delay(Math.floor(Math.random() * 10) * 1000);
console.log(`Completed`);
