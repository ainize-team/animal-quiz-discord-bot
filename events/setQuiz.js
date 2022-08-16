import { setQuiz } from '../functions/setQuizScheduler.js';
const eventName = 'ready';
const executeOnce = true;
const execute = client => {
  setQuiz(client);
};

export { eventName as name, executeOnce as once, execute };
