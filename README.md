<div align="center">
  <h1 align="center">Example of how to secure endpoints</h1>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

I created this project for learning to secure endpoints in a express server. The idea is to use JWT and give a permission level to each endpoint, so regular users can only access to a few endpoints

### Built With

- [![Express][express.js]][express-url]
- [![MongoDB][mongo.db]][mongo-url]

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- You'll need a MongoDB Atlas cluster, they offer a free tier

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Sabmus/node-secure-server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your Mongo credentials in `.env` file
   1. Also make sure that you'r IP address is added in "Network" tab inside MongoDB Dashboard
4. Enter `keys` folder and create a new set of keys with (note that `AAA` must be replaced with a number of days in which the cert and key will be valid):
   ```sh
   openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days AAA
   ```

<!-- USAGE EXAMPLES -->

## Usage

Create users with different permission levels and try each endpoint

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

[Sabmus](https://www.linkedin.com/in/sabmus/)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [This Awesome Template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[express.js]: https://img.shields.io/badge/Express-express.js-blue
[express-url]: https://expressjs.com/
[mongo.db]: https://img.shields.io/badge/MongoDB-mongoose-blue
[mongo-url]: https://www.mongodb.com/
