# Weather App 🌦️
### Fetches weather data of valid locations using openweather API 
<h4>
  Live preview can be found <a href="https://fatrixienicolieopetina.github.io/weather-app/">here</a>
</h4>
Entry to TOP weather app project

### WIL/Thoughts 🤔
The most important thing I learned in this exercise is the basics of asynchronous JS, specifically callbacks and promises. I wrote my basic understanding of it in a [dev.to post](https://dev.to/pat_the99/basics-of-callbacks-and-promises-in-javascript-4cj7). I also got acquainted with async and await but I am still to get comfortable of using these keywords.

📌 async

This tells the JS engine that the function is asynchronous. Functions with the `async` keyword automatically returns a promise. It is said that async is just a syntactical sugar for promises 😆 . 

📌 await

This keyword can only be used inside a function prefixed with `async`. When used, it tells JS to wait for the value of the asynchronous function called. In promises, the `then` method is called on the function object returning a promise. By using `await`, you just need to assign the return object of an async function and treat the result just like any other variable.

📌 Cross-Origin Resource Sharing

When I tried working with the open-weather and giphy API, I encountered an error related to CORS. WIL was, browsers, by default do not allow HTTP requests to outside resources. Cross-origin requests are requests sent to another domain/protocol/port and they require special headers from the remote side. This is for security purposes. We would not want a script from a hacker site to access our twitter credentials (XD as to what I understood so far).  The CORS request header would contain an Origin. If the server accepts the request, a special header `Access-Control-Allow-Origin` would be added in the response. The response would also contain the allowed origin(the requester URL) or probably a star, denoting all. The CORS request also have two types, safe and unsafe. Safe requests can be sent on the fly while unsafe requests need some `"preflight"` to check if the server permits the request.
