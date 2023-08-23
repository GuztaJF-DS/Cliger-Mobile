<h1 align="center"><h1 align="center"><img src="src/assets/Cliger_Logo.png" height="400"></h1></h1>
<h2 align="center">📉 Welcome to the Client Manager 📈</h2>
<h3 align="center"><img src="https://img.shields.io/github/issues/GuztaJF-DS/Cliger-Server"/> <img src="https://img.shields.io/github/stars/GuztaJF-DS/Cliger-Server"/> <img src="https://img.shields.io/github/license/GuztaJF-DS/Cliger-Server"/>  <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FIGotaMellowship"/></h3>

# Summary 📋

<!--ts-->

-   [About](#about)
-   [Technologies](#technologies)
-   [Setup](#setup)
    -   [Requirements](#requirements)
    -   [Installing and configuring](#installing-and-configuring)
-   [License](#license)
<!--te-->

# About

The Cliger is a management application for micro, small, and medium companies, the idea behind the Cliger would be to help these entrepreneurs to plan better since in Brazil most companies close in less than a year because of stupid decisions and a really bad administration.<br>
But how will the cliger help me, you ask me, well We will expose numbers, data, graphs, and predictions among other things that most of these small entrepreneurs don't even know about the existence<br>
this is the second part of cliger, the app bit, for this to work, you will need to set the [server part](https://github.com/GuztaJF-DS/Cliger-Server), and then set your android/ios emulator + react native itself [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

# Technologies

-   [Node.js ](https://nodejs.org/en/)
-   [MySql](https://www.mysql.com/)
-   [Sequelize](https://sequelize.org/)
-   [Express](https://expressjs.com/pt-br/)
-   [JWT-token](https://jwt.io/)
-   [Bcrypt](https://github.com/kelektiv/node.bcrypt.js/)
-   [Body-parser](https://github.com/expressjs/body-parser)
-   [Dotenv-safe](https://github.com/rolodato/dotenv-safe)

# Setup

### Requirements

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://classic.yarnpkg.com/) or [NPM](https://www.npmjs.com/)
-   You also need to set up a [MySql server](https://www.mysql.com/)

### Installing and configuring

## Step 1: Clone the project and access the folder

```bash
$ git clone git@github.com:GuztaJF-DS/Cliger-Mobile.git && cd Cliger-Server
```
## Step 1: Set your secret.json

you will need to insert your local IP to connect to the node server

For Windows
```bash
$ ipconfig
```

For Linux
```bash
$ hostname -I
```

then replace the ServerIP for the IPv4 Address

## Step 2: Start the Metro Server

First, you will need to install the packages

```bash
# using npm
npm install

# OR using Yarn
yarn
```

then you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

After Metro installed it should appear a list of options for you to run on your device

```bash
# Choose your device
i - run on iOS
a - run on Android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
## Congratulations! :tada:

# License

This project is licensed under the GPL 3.0 License - see the [LICENSE](LICENSE) file for details.
