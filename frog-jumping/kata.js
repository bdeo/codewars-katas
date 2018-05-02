/* https://www.codewars.com/kata/frog-jumping/javascript
 * You have an array of integers and have a frog at the first position
 * 
 * [Frog, int, int, int, ..., int]
 * 
 * The integer itself may tell you the length and the direction of the jump
 * 
 *  For instance:
 *   2 = jump two indices to the right
 *  -3 = jump three indices to the left
 *   0 = stay at the same position
 * Your objective is to find how many jumps are needed to jump out of the array.
 * 
 * Return -1 if Frog can't jump out of the array
 * 
 * Example:
 * array = [1, 2, 1, 5]; 
 * jumps = 3  (1 -> 2 -> 5 -> <jump out>)
 *
 */

const chalk = require('chalk')

const escape = (highway, visited = {}, position = 0, total = 1) => {
    let curr = highway[position];
    const newPosition = position + curr;

    if (newPosition >= highway.length) return total;               // escaped
    if (newPosition < 0) return total;                             // escaped
    if (visited[newPosition]) return -1;                           // circular
    if (Object.keys(visited).length === highway.length) return -1; // trapped

    visited[newPosition] = true;
    return escape(highway, visited, newPosition, total +=1);
};

const solveKata = () => {
    const highways = [
        [1, 2, 1, 5],        // given
        [2, 1, 3],           // success(1)
        [1, 2, 0, -3],       // trapped inside
        [1, -1],             // circular - simple
        [2, 2, -1, -1],      // tried all jumps
        [1, 3, 1, 1, -2],    // circular - simple
        [3, 5, 3, 1, -2, -4] // success (2)
    ];

    const formatOutput = (solution, highway) => {
        const moves = solution === -1 ? chalk.red(solution) : chalk.green(solution)
        console.log(`Jumped out of [${highway}] in ${moves} moves`);

    }
    for (highway of highways) {
        formatOutput(escape(highway), highway);
    }
};

solveKata();
