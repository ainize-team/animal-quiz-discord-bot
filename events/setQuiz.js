import cron from 'node-cron';
const quizChannelId = '1001379949514592348'; // 디스코드 앱에서 채널 우클릭 후 링크 복사하기를 통해 알아낼 수 있음
const styleQuizChannelId = '1004673582963630152';
let quizHandleCounter = 0;
const quizInterval = 1;
const totalInterval = quizInterval * 2;

const name = 'ready';
const once = true;
const execute = function (client) {
  cron.schedule('* * * * *', () => {
    quizHandleCounter = (quizHandleCounter += 1) % totalInterval;
    let channel;
    let mode;
    if (quizHandleCounter == 0) {
      channel = client.channels.cache.get(quizChannelId);
      mode = 'normal';
    } else if (quizHandleCounter == quizInterval) {
      channel = client.channels.cache.get(styleQuizChannelId);
      mode = 'style';
    }
    console.log(mode + ' quiz scheduler test');
    channel.send(mode + ' quiz scheduler test');
  });
};

export { name, once, execute };
