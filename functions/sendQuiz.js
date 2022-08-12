async function sendQuizByScheduler(channel, mode) {
  channel.send('send ' + mode + ' quiz');
}

export { sendQuizByScheduler };
