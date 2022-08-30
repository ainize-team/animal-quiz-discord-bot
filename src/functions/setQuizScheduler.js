import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();
import { sendQuizByScheduler } from './sendQuiz.js';
const quizChannelId = process.env.QUIZ_CHANNEL_ID;

import {
  quizInterval,
  longTermQuizInterval,
  extendIntervalAfter,
} from '../../data/const.js';
let lastUserTimestamp = Date.now();

function setQuiz(client) {
  let quizHandleCounter = 0;
  let longTermCounter = 0;
  cron.schedule(`*/${quizInterval} * * * *`, async () => {
    // this function will be called every quizInterval minutes
    longTermCounter =
      (longTermCounter + 1) % (longTermQuizInterval / quizInterval);
    if (!timeToSendQuiz(longTermCounter)) return;
    quizHandleCounter = (quizHandleCounter + 1) % 2;
    const channel = client.channels.cache.get(quizChannelId);
    if (quizHandleCounter === 0) {
      sendQuizByScheduler(channel, 'drawing');
    } else if (quizHandleCounter === 1) {
      sendQuizByScheduler(channel, 'style');
    }
  });
}

function timeToSendQuiz(longTermCounter) {
  if (longTermCounter === 0) {
    return true;
  } else {
    return Date.now() - lastUserTimestamp < extendIntervalAfter;
  }
}

function logLastUserTimestamp() {
  lastUserTimestamp = Date.now();
}

export { setQuiz, logLastUserTimestamp };
