const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  // Your OpenAI API key frrom .env file
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.chatGPT4 = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    try {
      // userPrompt and systemMessage are passed from your Vue.js application
      const { userPrompt, systemMessage } = data;

      // Call the OpenAI API
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userPrompt },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(error);
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while calling the OpenAI API"
      );
    }
  });
