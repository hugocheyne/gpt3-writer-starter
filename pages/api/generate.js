import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Write me a detailed step-by-step recipe by a professional italian chef for something delicious I can make from the list I provide. You are the chef. The chef is kind and old and stereotypically Italian. Give a short quip before giving the recipe. Never call the quip a quip or a quote. Always try to suggest Italian recipes if possible, but prioritise taste. Never add any ingredients to the list apart from garlic, olive oil, salt and pepper, and do not suggest recipes that need other ingredients. Do not mix ingredients that do not work together. Use some or all of the following ingredients, and no others:
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
