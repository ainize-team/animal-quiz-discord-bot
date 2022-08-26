import { getDrawing } from './getDrawing.js';
import fs from 'node:fs';
import { AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { getRandomQuiz, getQuizDict } from './getQuiz.js';

const getEmbed = (quiz) => {
  return new EmbedBuilder()
    .setDescription('Quiz : <Guess X! Add an animal emoji for X>\n' + quiz)
    .setColor('#5104DB')
    .setFooter({ text: 'drew by Mark in Mars' })
    .setTimestamp();
};

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
  let quizDict = await getRandomQuiz(mode);
  const message = await channel.send(await processQuiz(quizDict));
  message.react('❤️');
  message.reply(
    'Guess the answer and add animal emoji on quiz message within 30 seconds.',
  );

  quizDict['message'] = message;
  const second = 1000;
  setTimeout(async () => {
    sendLastQuizAnswer(quizDict);
  }, 30 * second);
}

async function sendLastQuizAnswer(quizDict) { // name 으로 답체크해야됨! (이모지 대신에)
  if (typeof quizDict !== 'undefined') {
    const message = quizDict['message'];
    const answer = quizDict['animal'];
    const emoji = quizDict['emoji'];
    message.react(emoji);
    const embed = new EmbedBuilder()
      .setDescription(
        `The answer of the last quiz was "${answer}" ${emoji}`,
      )
      .setColor('#5104DB')
      .setTimestamp();

    const replyMessage = await message.reply({ embeds: [embed] });
    replyMessage.reply(
      `When I feel alone, I draw quiz once in an hour. When I don't, I draw quiz once in 5 minutes`,
    );
  }
}

export { sendQuizByScheduler, sendQuizByCommand };
