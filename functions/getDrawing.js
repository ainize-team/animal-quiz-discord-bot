const url =
  'https://hf.space/embed/multimodalart/latentdiffusion/+/api/predict/';

import axios from 'axios';

async function getDrawing(text) {
  try {
    const response = await axios.post(url, {
      data: [text, 50, '256', '384', 2, 5],
    });

    if (typeof response['data']['data'] === undefined) {
      console.log(response);
      return false;
    }

    const base64Data = response['data']['data'][0];
    const base64DataOnly = base64Data.replace(/^data:image\/png;base64,/, '');
    return base64DataOnly;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { getDrawing };
