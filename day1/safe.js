import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

// const inFile = '/home/gwarren/code/advent-of-code-2025/day1/testData'
const inFile = '/home/gwarren/code/advent-of-code-2025/day1/input'

// copied from: 
// https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
async function processLineByLine() {
    const fileStream = createReadStream(inFile);
    const arr = []

    const rl = createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        // console.log(`${line}`);
        arr.push(line)
    }
    return arr
}

// check result of rotation and account for boundarys (0 - 99)
// did not account for rotations greater than 100...
function rotationResult([curPos, zeroCount], input, safeSize) {
    let result;
    // If L - minus
    // if R - add
    if (!input.includes('L') && !input.includes('R')) {
        // Invalid data
        return [curPos, zeroCount];
    }

    if (input.includes('L')) {
        let num = input.slice(1)
        result = curPos - Number(num)
        if (result < 0) {
            if (result > -safeSize) {
                result = safeSize + result;
            } else {
                // console.log(`result: ${result}`)
                // let mod = (result % safeSize)
                // console.log(`mod: ${mod}`)
                result = safeSize + (result % safeSize);
            }
        }
    } else if (input.includes('R')) {
        let num = input.slice(1)
        result = curPos + Number(num)
        if (result < safeSize) {
            return [result, zeroCount];
        } else { // result larger than safeSize
            result = (result % safeSize)
        }
    }
    if (result == safeSize || result == -safeSize) {
        result = 0;
    }

    if (result == 0) {
        zeroCount++;
    }

    // return result
    return [result, zeroCount]
}

// Init
const startPos = 50;
const safeSize = 100;
const rotationsArr = await processLineByLine();

// Processing
let zeroFound = 0;
let position = [startPos, zeroFound];

for (let line of rotationsArr) {
    // track previous pos (or direction)
    // check direction
    // check if passed zero
    // if passed zero check how many times (how large is number)
    console.log(line)

    position = rotationResult(position, line, safeSize)
    console.log(`AFTER: ${position}`);
}

console.log(`zeros: ${position[1]}`)



