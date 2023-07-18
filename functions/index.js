const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");

// const { Storage } = require("@google-cloud/storage");
// const os = require("os");
// const path = require("path");
// const fetch = require("node-fetch");
// const fs = require("fs").promises;

// const storage = new Storage();

let apiKey;
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  // Your OpenAI API key frrom .env file
  apiKey = process.env.OPENAI_API_KEY;
} else {
  apiKey = functions.config().openai.key;
}
const configuration = new Configuration({
  apiKey: apiKey,
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
exports.createImageFromText = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    const response = await openai.createImage({
      prompt: data.prompt,
      n: data.n || 1,
      size: data.size || "1024x1024",
    });

    return response.data;
  });
// exports.createImageFromText = functions
//   .region("europe-west2")
//   .https.onCall(async (data, context) => {
//     const { textPrompt } = data;

//     try {
//       const response = await openai.createImage({
//         prompt: textPrompt,
//         n: 1,
//         size: "1024x1024",
//       });

//       const url = response.data.data[0].url;

//       // const tempFilePath = path.join(os.tmpdir(), "generatedImage.png");

//       // // Fetch image from OpenAI API and write it to a temporary file
//       // const res = await fetch(openAIUrl);
//       // const fileStream = fs.createWriteStream(tempFilePath);
//       // await new Promise((resolve, reject) => {
//       //   res.body.pipe(fileStream);
//       //   res.body.on("error", reject);
//       //   fileStream.on("finish", resolve);
//       // });

//       // // Upload the file to Google Cloud Storage
//       // const bucket = storage.bucket("vue-boilerplate-firebase.appspot.com");
//       // await bucket.upload(tempFilePath, {
//       //   destination: `path/to/save/image.png`,
//       //   metadata: {
//       //     contentType: "image/png",
//       //   },
//       // });

//       // // Delete the temporary file
//       // await fs.unlink(tempFilePath);

//       // const url = `https://storage.googleapis.com/vue-boilerplate-firebase.appspot.com/path/to/save/image.png`;
//       return url;
//     } catch (error) {
//       console.error(error);
//       throw new functions.https.HttpsError(
//         "internal",
//         "An error occurred while calling the OpenAI API"
//       );
//     }
//   });
// exports.editImage = functions
//   .region("europe-west2")
//   .https.onCall(async (data, context) => {
//     const { imageFile, maskFile, newPrompt } = data;

//     try {
//       const bucket = storage.bucket("vue-boilerplate-firebase.appspot.com");

//       const imageFileStream = bucket.file(imageFile).createReadStream();
//       const maskFileStream = bucket.file(maskFile).createReadStream();

//       const response = await openai.createImageEdit(
//         imageFileStream,
//         maskFileStream,
//         newPrompt,
//         1,
//         "1024x1024"
//       );

//       return response.data.data[0].url;
//     } catch (error) {
//       console.error(error);
//       throw new functions.https.HttpsError(
//         "internal",
//         "An error occurred while calling the OpenAI API"
//       );
//     }
//   });
