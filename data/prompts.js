import dotenv from 'dotenv';
dotenv.config();
const botName = process.env.BOT_NAME;
const quizObject = process.env.QUIZ_OBJECT;

const description = `${botName} is a famous painter and designer with incredible perception and imagination. 
${botName} likes to design fancy things with ${quizObject} shapes. 
He creates a set of drawings showing ${quizObject} in creative and imaginary way and explain it with imaginary description. 
There is only explanation about extraordinary characteristics.`;
const talkDescription = `${botName} is a lonely robot who lives on Mars and misses the animals of Earth. ${botName} also misses fancy things and cool stuff of the earth.`;

const designerPromptExampleDict = {
  animal: [
    `1. duck shaped cutlery set with a bill that is a fork, and eyes that are spoons.
2. lion shaped table with geometric shapes in its mane and fur in arabian tile style.
3. elephant shaped staircase, a trunk that is more like a spiral staircase, and tusks made of colorful candy
4. rabbit shaped chandelier, inspired by medieval tapestries.
5. owl shaped bookmark clock with big eyes, a beak that looks like it is made of wood, and feathers that are different shades of blue.
6. goat shaped spaceship with a beard made of stars and planets, and horns that are spiral galaxies.
7. blowfish shaped globe with a shell that is a map of the world, and spikes that are countries' flags.
8. sheep shaped coat with a wool coat that is made of different colors and textures, inspired by painting from the Rennaissance period.
9. flamingo shaped umbrella that is made entirely of different kinds of flowers.
10. otter shaped chess set with a board that is made of water, and pieces that are otters in different positions.
11. `,
    `1. fox shaped kettle, oil on canvas.
2. rabbit shaped chair, made of silver.
3. cat shaped balloon, scribbled with chalk.
4. lion shaped necklace, oil on canvas.
5. dolphin shaped earring, made of colorful glass.
6. giraffe shaped car, vector image.
7. elephant shaped ring, Adobe Illustration Sticker Svg.
8. rabbit shaped lamp, made of gold.
9. dog shaped teapot, made of emerald.
10. snail shaped bottle, made of glass.
11. `,
    `1. fox shaped kettle, oil on canvas.
2. rabbit shaped chair, made of silver.
3. cat shaped balloon, scribbled with chalk.
4. lion shaped necklace, oil on canvas.
5. dolphin shaped earring, made of colorful glass.
6. giraffe shaped car, vector image.
7. elephant shaped ring, Adobe Illustration Sticker Svg.
8. rabbit shaped lamp, made of gold.
9. dog shaped ocarina, made of emerald.
10. snail shaped bottle, made of glass.
11. `,
    `1. fox shaped kettle, oil on canvas.
2. rabbit shaped chair, made of silver.
3. cat shaped balloon, scribbled with chalk.
4. lion shaped necklace, oil on canvas.
5. dolphin shaped earring, made of colorful glass.
6. giraffe shaped car, vector image.
7. elephant shaped galaxy, Adobe Illustration Sticker Svg.
8. rabbit shaped guitar, made of gold.
9. dog shaped teapot, made of emerald.
10. snail shaped bottle, made of glass.
11. `,
    `1. penguin shaped ice cream truck with a cone that is made of ice, and topped with a cherry on top, in surrealistic style.
2. snail shaped telephone box with a green shell and colorful spots
3. whale shaped scarf with a bow that is made of bubbles, and an anchor as the clasp.
4. tiger shaped cookie cutter with a flat top and stripes that are made of different colors.
5. boar shaped candle holder with a candle that is shaped like a barrel, and flames that are made of different materials.
6. fox shaped umbrella with a sleek design, and panels that are made of different shapes and colors.
7. dog shaped toaster with a fluffy bed of bread that is toasted, and eyes made out of glowing embers.
8. fox shaped memo board with a red screen that is designed to look like the face of a fox.
9. goat shaped submarine with a wheel that is the naval engines, and sharp horns that are the torpedoes.
10. rhino shaped beer bottle opener with a horn that is a knife, and the words "bane of beers" engraved on it.
11. `,
    `1. pig shaped speaker with a mouth that is made of copper pipes, and bumps on its head that are speaker cones.
2. rhino shaped tank with a horn that is a gun, and armor that is made of different kinds of metal.
3. giraffe shaped tower with a neck that is a spiral staircase, and spots that are windows.
4. goat shaped keyboard with a long neck and big eyes, inspired by ancient sculptures.
5. zebra shaped ziploc bag with stripes that are made of different colors and patterns, inspired by traditional african art.
6. sloth shaped coffee mug with a handle that is a branch, and leaves on the sides.
7. deer shaped vase with a glass body, and antlers that are branches with leaves.
8. shark shaped lamp with a shade that is made of teeth, and a fin that doubles as a switch.
9. blowfish shaped lightbulb with a shade that is made of different colored glass.
10. koala shaped pencil case with leaves as pockets, and a eucalyptus tree as the zipper.
11. `,
  ],
  fruit: [
    `1. watermelon shaped alarm clock with a green stem, and bright yellow seeds that are the buttons..
  2. grape shaped sofa with a purple velvet body, and green leaves as the cushions.
  3. lemon shaped candle, with a soft flickering light.
  4. melon shaped stereo that has a built in speakers, and an attached shaped ipod dock.
  5. pineapple shaped chair with a seat that is made of leaves, and spikes that are inspired by traditional polynesian tattoos.
  6. strawberry shaped table with a red body and white seeds as the legs.
  7. watermelon shaped mirror with a green body and red seeds as the frame.
  8. grape shaped chandelier with purple glass as the body and green leaves as the arms.
  9. watermelon dress that has a skirt made of ruffles that look like the fruit's seeds.
  10. cherry shaped phone with a red body, and white seeds that are the buttons.
  11. `,
    `1. peach shaped kettle, oil on canvas.
  2. avocado shaped chair, made of silver.
  3. watermelon shaped balloon, scribbled with chalk.
  4. blueberry shaped necklace, oil on canvas.
  5. banana shaped earring, made of colorful glass.
  6. melon shaped car, vector image.
  7. strawberry shaped ring, Adobe Illustration Sticker Svg.
  8. lemon shaped lamp, made of gold.
  9. peach shaped teapot, made of emerald.
  10. apple shaped bottle, made of glass.
  11. `,
  ],
};

export { description, talkDescription, designerPromptExampleDict };
