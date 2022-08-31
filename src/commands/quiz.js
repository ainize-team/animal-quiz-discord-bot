import { SlashCommandBuilder } from '@discordjs/builders';
import { sendQuizByCommand } from '../functions/sendQuiz.js';
import { isCommandExcluded } from '../functions/excludeChannels.js';
import dotenv from 'dotenv';
dotenv.config();
const botName = process.env.BOT_NAME;
const quizObject = process.env.QUIZ_OBJECT;

const data = new SlashCommandBuilder()
  .setName('quiz')
  .setDescription(
    `Replies with quiz! Write all options. ${botName} will draw it`,
  )
  .addStringOption((option) =>
    option
      .setName(quizObject)
      .setDescription(`Write the name of the ${quizObject} for the quiz.`),
  )
  .addStringOption((option) =>
    option
      .setName('description')
      .setDescription(
        'Write the description of drawing. (ex. shaped lamp shining blue, in stained glass style)',
      ),
  );
const execute = (interaction) => {
  if (isCommandExcluded(interaction, 'create quiz')) {
    return;
  }

  const object = interaction.options.getString(quizObject);
  let description = interaction.options.getString('description');

  if (!object) {
    interaction.reply(
      `Please write ${quizObject} option and description option`,
    );
    return;
  }

  if (!description) {
    interaction.reply('Please write description option');
    return;
  }

  const text = `${object} ${description}`;
  sendQuizByCommand(interaction, text, object);
};
export { data, execute };
