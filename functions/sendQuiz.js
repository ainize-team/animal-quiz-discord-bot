import { getDrawing } from './getDrawing.js';
import fs from 'node:fs';
import { AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { getQuizDict } from './getQuiz.js';

const getEmbed = quiz =>
  new EmbedBuilder()
    .setDescription('Quiz : <Guess X! Add an animal emoji for X>\n' + quiz)
    .setColor('#5104DB')
    .setFooter({ text: 'drew by Mark in Mars' })
    .setTimestamp();

async function processQuiz(quizDict) {
  const description = quizDict['description'];
  const quiz = quizDict['quiz'];
  const base64Data = await getDrawing(description);

  if (base64Data === false) {
    const embed = getEmbed('Sorry, something is wrong with the drawing.');
    return {
      embeds: [embed],
    };
  }

  await fs.promises.writeFile('out.png', base64Data, 'base64');
  const drawing = new AttachmentBuilder('out.png');
  const embed = getEmbed(quiz);
  return {
    files: [drawing],
    embeds: [embed],
  };
}

async function sendQuizByCommand(interaction, text, animal) {
  await interaction.deferReply();
  const quizDict = getQuizDict(text, animal);
  const message = await interaction.followUp(await processQuiz(quizDict));
  message.react('❤️');
}

async function sendQuizByScheduler(channel, mode) {
  channel.send('send ' + mode + ' quiz');
}

export { sendQuizByScheduler, sendQuizByCommand };
