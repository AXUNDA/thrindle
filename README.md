# Demo credit

This is a simple Node.js and Express.js demo application that allows users to perform signup ,sign in and transfer money to local bank accounts

[Live url](https://charles-emmanuel-lendsqr-be-test.onrender.com "live url")

This demo app uses flutterwave to initiate transfers ,you can view thier docs [here](https://developer.flutterwave.com/ "here")

## Features

- User Signup: New users can sign up using their name, email and password.
- User Signin: Registered users can sign in using their credentials.

- send Money: Users can send money to local bank accounts

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDb

  create a `.env` file then copy the contents of `.env.example` and replace the various variables with your own variables ,

- Run the Application in the development with `npm run dev`,to create a production build ,run the command ' `npm run build` , to run in production mode run `npm start`

The app will be accessible at `http://localhost:3000`.

## API Endpoints

- `POST /auth`: Register a new user. Requires `name` , `email` and `password` in the request body, and returns a token that is to be passed in the headers in order to access the transfer money endpoint

- `POST /auth/login`: Sign in a user. Requires `email` and `password` in the request body. and return a jwt token

- `POST /wallet/transfer`: Transfer money local bank. Requires ` account_bank` which is the bank code of the local bank , `account_number` ,which is the account number of the recepient, `amount`,which is the amount to be transferred and `narration` which is the purpose of the transfer,for testin purposes flutterwave has provided test bank accounts to be used. [flutterwave test bank accounts](https://developer.flutterwave.com/docs/integration-guides/testing-helpers/ "flutterwave test bank accounts")

- `GET /wallet/transactions`: Get your transaction history
- `GET /wallet/transactions/:account_number`: Get transaction history for a particular account number

## Security Considerations

- **Authentication**: JWT (JSON Web Tokens) is used to protect the transfer and get transaction history enpoints please pass the jwt token received from the login or signup route in the headers inthis format `Authorization : Bearer token` to access these endpoints.

- **Input Validation**: input validation is implemented using [Zod](https://zod.dev/ "Zod").
- **Error Handling**: All errors are handled properly,with an express middleware .

## Disclaimer

This is a demo application and should not be used in production without proper security reviews and enhancements.

## License

This project is licensed under the MIT License
