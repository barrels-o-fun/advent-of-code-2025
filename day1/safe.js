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
function rotationResult(curPos, input) {
    let result;
    // If L - minus
    // if R - add
    if (input.includes('L')) {
        let clean = input.slice(1)
        result = curPos - Number(clean)
    } else if (input.includes('R')) {
        let clean = input.slice(1)
        result = curPos + Number(clean)
    }
    // Check if past boundary
    if (result < 0) {
        result = 100 + result
    } else if (result > 99) {
        result = result - 100
    }

    // return result
    return result
}

const rotationsArr = await processLineByLine();
let zeroFound = 0;
const startPos = 50
let position = startPos

for (let line of rotationsArr) {
    position = rotationResult(position, line)
    if (position == 0) {
        zeroFound++;
    }
    console.log(position);
}

console.log(`zeros: ${zeroFound}`)



