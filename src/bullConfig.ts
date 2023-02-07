import Queue from 'bull';

const { REDIS_URL } = process.env;

// Initiating the Queue with a redis instance
export const sendMailQueue = new Queue('sendMail', String(REDIS_URL));
export const SchduleQueue = new Queue('Schdule', String(REDIS_URL));

sendMailQueue.process((job, done) => {
    done();
});


SchduleQueue.process((job, done) => {
    console.log(job.data);
    done();
});
// export default { sendMailQueue, SchduleQueue };