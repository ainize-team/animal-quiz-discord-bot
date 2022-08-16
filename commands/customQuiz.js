import { SlashCommandBuilder } from '@discordjs/builders';
import { sendQuizByCommand } from '../functions/sendQuiz.js';
import { isCommandExcluded } from '../functions/excludeChannels.js';

const data = new SlashCommandBuilder()
  .setName('custom-quiz')
  .setDescription(
    'Replies with custom-quiz! Write all options. Mark will draw it',
  )
  .addStringOption((option) =>
    option
      .setName('animal')
      .setDescription(
        'Write the name of the animal for the quiz. (ex. elephant)',
      ),
  )
  .addStringOption((option) =>
    option
      .setName('description')
      .setDescription(
        'Write the description of drawing. (ex. shaped lamp shining blue, in stained glass style)',
      ),
  );
const execute = (interaction) => {
  if (isCommandExcluded(interaction.channel['id'], interaction)) {
    return;
  }

  const animal = interaction.options.getString('animal');
  let description = interaction.options.getString('description');

  if (!animal) {
    interaction.reply('Please write animal option and description option');
    return;
  }

  if (!description) {
    interaction.reply('Please write description option');
    return;
  }

  const text = `${animal} ${description}`;
  sendQuizByCommand(interaction, text, animal);
};
export { data, execute };
