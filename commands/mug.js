/**
 * Example Usage:
 *
 * !mug
 *
 * Description:
 *
 * Lets a user pretend to rob someone else
 *
 * Example Response:
 *
 * TestFromUser has mugged TestToUser they swiped $50000
 */

const max = 100000;
const dollars = Math.floor(Math.random() * max);

let msg = `$(user) has mugged $(touser) they swiped $${dollars}`;

if (Math.random() < 0.5) {
  msg = `$(user) got caught and thrown in the dungeon after trying to mug $(touser)`;
}

export default msg;
