
# Vue.js 3 AI SaaS Boilerplate

This project is a Vue.js 3 boilerplate for building web applications that use generative AI to create various SaaS platforms. 
It includes a robust set of features and built-in integrations to help get your SaaS up and running in no time.


## 🚀 Technology Stack

This boilerplate project uses the following technologies:

- **Vue.js 3 Composition API** - The Progressive JavaScript Framework.
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS + DaisyUI** - A utility-first CSS framework for rapidly building custom user interfaces.
- **Pinia Store and VueUse** - Used for state management in Vue.
- **Firebase and Firebase Functions** - For the backend and serverless functions.
- **Google Auth** - For user authentication.
- **Stripe Payment** - Integrated solution for payments.

_Coming Soon_:
- _**OpenAI API** - Specifically using ChatGPT-4, DALE-E, and Stable Diffusion for various AI features._
- _**Vipps Payment Solution** - Integrated Norwegian payment solution._


## 🎈 Getting Started

To get started with this boilerplate, you will need Node.js and npm installed on your machine.

1. Clone this repository
    ```sh
    git clone https://github.com/kodevasse/Function_webapp_01.git
    cd Function_webapp_01
    ```

2. Install the dependencies
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and populate it with your own Firebase and OpenAI keys, Stripe and Vipps credentials:

    ```sh
    VUE_APP_FIREBASE_API_KEY=YOUR_API_KEY
    VUE_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    VUE_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    VUE_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    VUE_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
    VUE_APP_FIREBASE_APP_ID=YOUR_APP_ID
    VUE_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
   OPENAI_API_KEY=YOUR_OPENAI_API_KEY

    
    _Coming Soon_:
    STRIPE_API_KEY=YOUR_STRIPE_API_KEY
    VIPPS_MERCHANT_SERIAL_NUMBER=YOUR_MERCHANT_SERIAL_NUMBER
    VIPPS_CLIENT_ID=YOUR_CLIENT_ID
    VIPPS_CLIENT_SECRET=YOUR_CLIENT_SECRET
    ```

4. Run the application in the development mode
    ```sh
    npm run dev - Development
    npm run build - Production
    ```
5. Firebase functions API key init and deploy
   ```sh
   firebase functions:config:set openai.key="your-openai-api-key"
   firebase deploy --only functions
   ```

## 🙏 Contributing

We are open to contributions! Please make sure to follow the guidelines below.

- Fork the project
- Create your feature branch (`git checkout -b feature/YourFeature`)
- Commit your changes (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/YourFeature`)
- Open a pull request


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 💬 Contact

If you have any questions, please open an issue or submit a pull request.

## 🎉 Acknowledgments

We want to thank all the contributors and the whole Vue.js and AI community. . Thank you!

