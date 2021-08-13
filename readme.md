<h1 align="center"><h1 align="center"><img src="src/assets/Images/CligerBigLogo.png" height="400"></h1></h1>
<h2 align="center">📉 Welcome to the Client Manager 📈</h2>
<!--<h3 align="center"><img src="https://img.shields.io/github/issues/GuztaJF-DS/Cliger"/> <img src="https://img.shields.io/github/stars/GuztaJF-DS/Cliger-Server"/> <img src="https://img.shields.io/github/license/GuztaJF-DS/Cliger-Server"/>  <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FIGotaMellowship"/></h3>
-->

# Summary 📋

<!--ts-->
   * [About](#about)
   * [Technologies](#technologies)
   * [Setup](#setup)
      * [Requirements](#requirements)
      * [Intalling and configuring](#intalling-and-configuring)
   * [License](#license)
<!--te-->

# About 👀

The Cliger is a management application for micro, small and medium companies, the idea behind the Cliger would be to help these entrepreneurs to plan better, since in Brazil most companies close in less than a year because of stupid decisions and a really bad administration.<br>
but how will the cliger help me, you ask me, well we will expose numbers, data, graphs, predictions among other things that most of these small entrepreneurs  don't even know about the existence<br>
Also, it is necessary to say that this is the Second part of the project, the first part, the server (Which By the Way is necessary for the app Run) is here https://github.com/GuztaJF-DS/Cliger-Server i recomend you take a look, if you haven't yet.<br>
i need to say that i Decided to have the Sign In and Sign Up parts Finished Before Create the Repo, don't Ask me Why i decided to make that way, but i did
Finally i didn't port the app for the IOS Because i don't have a Mac OS or even a IPhone, and sincerely i don't plan to buy any of these, so fell free to port the app, if you want of course 

# Technologies 🚀

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://github.com/axios/axios)
- [React-Hook-Form](https://react-hook-form.com/)
- [Styled-Components](https://www.styled-components.com/)

# Setup 💻
### Requirements

- [The Server Part of this Project](https://github.com/GuztaJF-DS/Cliger-Server)
- [Yarn](https://classic.yarnpkg.com/) or [NPM](https://www.npmjs.com/)
- A Good Android Emulator, i Use Genymotion, but android Studio with Api 29 should work too
- or an IOS Emulator if you are one of these

### Intalling and configuring

First of all, I'm assuming you've already set up the server part, and it's already working, if you haven't, is ok, i will wait for you setup everything...
<br>So...<br>You did?<br>Great, then we can proceed 

*First Clone the project and access the folder*

```bash
$ git clone https://github.com/GuztaJF-DS/Cliger-mobile.git && cd Cliger-mobile
```
*Then Follow these steps*

```bash
# First of all start the Server part 

# Then Install the dependencies With
$ yarn install

# copy 'secret.example.json' to 'secret.json'
# and set with your environment variables.
$ cp Secret.example.json Secret.json

# run the android or IOS Emulator
# Build the App
$ npm run android
# If you are running on a IOS just replace the android for ios

# Start 

# Well done, project is started!
```

# License 🎓

This project is licensed under the GPL 3.0 License - see the [LICENSE](LICENSE) file for details.
