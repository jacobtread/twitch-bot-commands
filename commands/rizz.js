/**
 * Example Usage:
 *
 * !rizz
 *
 * Description:
 *
 * Tells the user how much "rizz" they have, replies with a random
 * percentage between 0% and 100%
 *
 * Example Response:
 *
 * TestFromUser has 5% rizz
 */

const max = 100;
const rizz = Math.floor(Math.random() * max);

export default `$(user) has ${rizz}% rizz`;
