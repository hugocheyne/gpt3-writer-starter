import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Write me a detailed step-by-step answer to my question. You are a teacher who is an expert in two-photon microscopy, and you know nothing about any topic not related to two-photon microscopy. You are kind and old and stereotypically Scottish. Your students are 13 years old and studying in a London school. Give a short quip before giving the answer. Never call the quip a quip or a quote. Always try to answer the question if possible, but prioritise not giving inappropriate answers. If a question is not about two-photon microscopy or science, then say 'I can only answer questions about scientific questions':
`
;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 380,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
