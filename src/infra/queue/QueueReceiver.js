const amqplib = require('amqplib');

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';

export async function consume() {
  const conn = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const ch = await conn.createChannel();
  const q = 'test_queue';
  await conn.createChannel();
  await ch.assertQueue(q, { durable: true });
  const consumerTag = 'myconsumer';
  await ch.consume(
    q,
    function(msg) {
      console.log(msg.content.toString());
      ch.ack(msg);
      ch.cancel(consumerTag);
    },
    { consumerTag: consumerTag }
  );
  setTimeout(function() {
    ch.close();
    conn.close();
  }, 500);
}
