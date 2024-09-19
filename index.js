// import { generateRandomNumber, celciusToFahrenheit } from './utils.js';

// console.log(`Random Number: ${generateRandomNumber()}`);

// console.log(`Celcius to fahrenhiet: ${celciusToFahrenheit(0)}`);
import getPosts, { getPostsLength } from "./postController.js";

console.log(getPosts());

console.log(`Posts Length: ${getPostsLength()}`);
