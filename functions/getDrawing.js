import axios from 'axios';
import { text2imageInfo as image } from '../const.js';
const url =
  'https://hf.space/embed/multimodalart/latentdiffusion/+/api/predict/';

async function getDrawing(text) {
  try {
    const response = await axios.post(url, {
      data: [
        text,
        image.steps,
        image.width,
        image.height,
        image.count,
        image.diversityScale,
      ],
    });

    const imageData = response['data']['data'];
    if (typeof imageData === 'undefined') {
      console.log('error: fail to get image');
      console.log(response);
      return false;
    }

    const base64Data = imageData[0];
    const base64DataOnly = base64Data.replace(/^data:image\/png;base64,/, '');
    return base64DataOnly;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { getDrawing };
