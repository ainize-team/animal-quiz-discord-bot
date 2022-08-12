import cron from 'node-cron';
import config from '../config.json' assert { type: 'json' };
import { sendQuizByScheduler } from './sendQuiz.js';
const quizChannelId = config['quizChannelId'];
//const quizChannelId = process.env.CHANNEL_ID // 실제 배포시에 사용할 코드
const quizInterval = 1;
const longTermQuizInterval = 10;
const longTermCount = longTermQuizInterval/quizInterval
const second = 1000;
const minute = 60 * second;
const extendIntervalAfter = 3 * minute;
let quizHandleCounter = 0;
let longTermCounter = 0;
let lastUserTimestamp = Date.now();

function setQuiz(client) {
  cron.schedule(`*/${quizInterval} * * * *`, async () => {
    // this function will be called every minutes
    if (!timeToSendQuiz()) return;
    quizHandleCounter = (quizHandleCounter + 1) % 2;
    const channel = client.channels.cache.get(quizChannelId);
    if (quizHandleCounter == 0) {
      sendQuizByScheduler(channel, 'drawing');
    } else if (quizHandleCounter == 1) {
      sendQuizByScheduler(channel, 'style');
    }
  });
}

function timeToSendQuiz() {
  longTermCounter = (longTermCounter + 1) % longTermCount;
  if (longTermCounter == 0) {
    return true;
  } else {
    return Date.now() - lastUserTimestamp < extendIntervalAfter;
  }
}

function logLastUserTimestamp() {
  lastUserTimestamp = Date.now();
}

export { setQuiz, logLastUserTimestamp};
