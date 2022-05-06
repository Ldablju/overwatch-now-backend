<div id="top"></div>

[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ldablju/overwatch-now-backend">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Overwatch.NOW API</h3>

  <p align="center">
    New project for overwatch community!
    <br />
    <a href="http://overwatch.server916785.nazwa.pl/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://overwatch.server916785.nazwa.pl">View Demo</a>
    ·
    <a href="https://github.com/Ldablju/overwatch-now-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Ldablju/overwatch-now-backend/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Projekt ten został stworzony z myślą o aplikacji z najlepszymi momentami graczy overwatch. Zakładając profil pobierane są dane gracza z api overwatch. Dzięki temu profil użytkownika jest na bieżąco aktualizowany. 

Backend został przygotowany do działania, a wszystkie jego możliwości zostały opisane w dokumentacji `http://overwatch.server916785.nazwa.pl`.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [Mongoose.js](https://mongoosejs.com/)
* [Passport.js](https://www.passportjs.org/)
* [JWT](https://jwt.io/)
* [Bnet](https://develop.battle.net/)
* [Overwatch-api](https://www.npmjs.com/package/overwatch-api)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/ldablju/overwatch-now-backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create and enter your MongoDB connection in `.env`
   ```js
   MONGO_URI = 'YOUR CONNECTIONG URL';
   ```
4. Set your JWT secret key in `.env`
   ```js
   TOKEN_KEY = 'YOUR SECRET KEY';
   ```
5. Enter your Battle.net ID and SECRET in `.env`
   ```js
   BNET_ID = 'YOUR APP ID';
   BNET_SECRET = 'YOUR APP SECRET KEY';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You can use this project to create an application for the overwatch game community. The application supports the most important aspects of operation that will meet the requirements of users.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Alan Adamczyk - [@alan-adamczyk](https://www.linkedin.com/in/alan-adamczyk) - alan.adamczyk45@gmail.com

Project Link: [https://github.com/ldablju/overwatch-now-backend](https://github.com/ldablju/overwatch-now-backend)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/Ldablju/overwatch-now-backend/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/Ldablju/overwatch-now-backend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alan-adamczyk
