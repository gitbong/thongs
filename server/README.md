# 🩴 Thongs
Thongs is a mock server with a fancy dashboard for local development. It is built in Express.js.

## Key Features
- setup several responses for one API
- easy to switch responses for an API call on dashboard
- mock a delay for API call

## Quick start

Step 1: Make a new directory and install the package:
```sh
$ mkdir mock && cd mock
$ npm init
$ npm install thongs
```

Step 2: Create a index.js file and paste the example below:
```javascript
var { default: Thongs } = require("thongs");

const routes = [
  {
    name: "Get all books",
    path: "/v1/books",
    method: "GET",
    handlers: [
      {
        name: "success",
        status: 200,
        handler: (request, response) => {
          return [
              {
                  name: 'Harry Potter 1',
                  author: 'J.K. Rowling',
              },
              {
                  name: 'Harry Potter 2',
                  author: 'J.K. Rowling',
              }
          ];
        },
      },
      {
        name: "fail",
        status: 500,
        handler: (request, response) => {
          return 'Server error';
        },
      },
    ],
  },
];
const port = 3000;
const mockServer = Thongs(routes);
mockServer.start(port);
``` 

Step 3: In the terminal run the command below:
```sh
$ node index.js
> Thongs mock server is running on http://localhost:3000
```
Step 4: Enjoy it. 


---
### ☕
If you feel Thongs is making your life easier, please consider buy me a coffee.

PayPal: [click me](https://www.paypal.com/paypalme/gitbong)


支付宝: gitbong@qq.com