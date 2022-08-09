import cron from 'node-cron';
import config from '../config.json' assert { type: 'json' };

const quizChannelId = config['quizChannelId']; // 디스코드 앱에서 채널 우클릭 후 링크 복사하기를 통해 알아낼 수 있음
let quizHandleCounter = 0;
const quizInterval = 1;
const totalInterval = quizInterval * 2;


const name = 'ready';
const once = true;
const execute = function (client) {
  cron.schedule('* * * * *', () => {
    quizHandleCounter = (quizHandleCounter += 1) % totalInterval;
    const channel = client.channels.cache.get(quizChannelId);
    let mode;
    if (quizHandleCounter == 0) {
      mode = 'drawing';
    } else if (quizHandleCounter == quizInterval) {
      mode = 'style';
    }
    console.log(mode + ' quiz scheduler test');
    channel.send(mode + ' quiz scheduler test');
  });
};

export { name, once, execute };
