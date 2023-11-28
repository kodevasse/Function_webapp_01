const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
const Vipps = require("@vippsno/vipps-sdk").default;

const { v4: uuidv4 } = require("uuid");

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
/// VIPPS
exports.createVippsPaymentSession = functions
  .region("europe-west2")
  .https.onCall(async (data, context) => {
    const accessTokenUrl = "https://apitest.vipps.no/accesstoken/get";
    const paymentUrl = "https://apitest.vipps.no/epayment/v1/payments";
    const clientId = "41295971-a331-4527-9baa-d9b838b697c7";
    const clientSecret = "LmG8Q~qiKYyjQP0KmjQM2A7sbTFl-esa6kF41ctU";
    const subscriptionKey = "7970948dcb3f403ea9cdf020760b0c2c";
    const merchantSerialNumber = "318388";

    try {
      // Step 1: Retrieve Access Token
      const tokenResponse = await axios.post(
        accessTokenUrl,
        {},
        {
          headers: {
            client_id: clientId,
            client_secret: clientSecret,
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Merchant-Serial-Number": merchantSerialNumber,
          },
        }
      );
      const accessToken = tokenResponse.data.access_token;

      // Step 2: Create Payment
      const idempotencyKey = uuidv4(); // Generate a unique UUID
      const paymentRequest = {
        amount: {
          value: data.amount, // Assuming amount is passed in the request body
          currency: "NOK", // Set your currency
        },
        reference: "your-unique-reference", // Set your reference
        userFlow: "WEB_REDIRECT", // Assuming web redirect flow
        // Add other fields as necessary
      };

      const paymentResponse = await axios.post(paymentUrl, paymentRequest, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Idempotency-Key": idempotencyKey,
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          "Merchant-Serial-Number": merchantSerialNumber,
          // Add other headers as necessary
        },
      });

      // Send payment response back to the client
      return { paymentUrl: paymentResponse.data.paymentUrl };
    } catch (error) {
      // Proper error handling for callable functions
      throw new functions.https.HttpsError(
        "unknown",
        "Error in payment process",
        error
      );
    }
  });
// exports.createVippsPaymentSession = functions
//   .region("europe-west2")
//   .https.onCall(async (data, context) => {
//     const vipps = new Vipps({
//       pluginName: "YourPluginName",
//       pluginVersion: "1.0.0",
//       clientId: "41295971-a331-4527-9baa-d9b838b697c7",
//       clientSecret: "LmG8Q~qiKYyjQP0KmjQM2A7sbTFl-esa6kF41ctU",
//       subscriptionKey: "7970948dcb3f403ea9cdf020760b0c2c",
//       merchantSerialNumber: "318388",
//     });

//     try {
//       const vippsCheckoutSession = await vipps.checkout.createSession({
//         merchantInfo: {
//           callbackUrl: "https://example.com/vipps/payment-callback",
//           returnUrl: "https://example.com/vipps",
//           callbackAuthorizationToken: "YOUR_CALLBACK_AUTH_TOKEN",
//         },
//         transaction: {
//           amount: {
//             currency: "NOK",
//             value: data.amount, // Amount in øre
//           },
//           reference: data.reference, // e.g., 'order-id-123'
//         },
//         logistics: {
//           // Add logistics details here if necessary
//         },
//       });

//       return { success: true, session: vippsCheckoutSession };
//     } catch (error) {
//       console.error("Error creating Vipps payment session:", error);
//       return { success: false, error: error.message };
//     }
//   });

// exports.createVippsPayment = functions
//   .region("europe-west2")
//   .https.onCall(async (data, context) => {
//     // Your Vipps API credentials
//     const clientId = "41295971-a331-4527-9baa-d9b838b697c7";
//     const clientSecret = "LmG8Q~qiKYyjQP0KmjQM2A7sbTFl-esa6kF41ctU";
//     const subscriptionKey = "7970948dcb3f403ea9cdf020760b0c2c"; // Replace with your actual subscription key
//     const merchantSerialNumber = "318388";
//     try {
//       // Get Vipps Access Token
//       const tokenResponse = await axios.post(
//         "https://apitest.vipps.no/accessToken/get",
//         {
//           client_id: clientId,
//           client_secret: clientSecret,
//           Ocp_Apim_Subscription_Key: subscriptionKey,
//         }
//       );
//       const accessToken = tokenResponse.data.access_token;

//       // Create a payment
//       const paymentResponse = await axios.post(
//         "https://apitest.vipps.no/epayment/v1/payments",
//         {
//           amount: {
//             currency: "NOK",
//             value: data.amount,
//           },
//           paymentMethod: {
//             type: "WALLET",
//           },
//           customer: {
//             phoneNumber: data.phoneNumber,
//           },
//           reference: "acme-shop-123-order123abc",
//           returnUrl: data.returnUrl,
//           userFlow: "WEB_REDIRECT",
//           paymentDescription: "One pair of socks",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Ocp-Apim-Subscription-Key": subscriptionKey,
//             "Merchant-Serial-Number": merchantSerialNumber,
//             "Content-Type": "application/json",
//             // Additional headers as required
//           },
//         }
//       );

//       return { paymentUrl: paymentResponse.data.url };
//     } catch (error) {
//       console.error("Error creating Vipps payment:", error);
//       throw new functions.https.HttpsError(
//         "internal",
//         "Failed to create Vipps payment"
//       );
//     }
//   });
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
