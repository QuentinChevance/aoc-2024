
const text = await Deno.readTextFile("data.txt");
const parseInput = () => {
    const lines = text.split('\n');
    const {leftNumbers, rightNumbers} = lines.reduce((prev, line) => {
        const [leftNumber, rightNumber] =  line.split('   ').map(Number);
        return {
            leftNumbers: [...prev.leftNumbers, leftNumber],
            rightNumbers: [...prev.rightNumbers, rightNumber]
        }
    }, ({leftNumbers: [], rightNumbers: []} as {leftNumbers: number[], rightNumbers: number[]}))
    return {leftNumbers: leftNumbers.sort((a,b )=> a - b), rightNumbers: rightNumbers.sort((a,b )=> a - b)}
}


const part1 = () => {
    const start = performance.now();
    const numbers = parseInput();
    const {leftNumbers, rightNumbers} = numbers;
    const distances = leftNumbers.reduce((prev, curr, index) => prev + (Math.abs(curr - rightNumbers[index])), 0)
    const end = performance.now();
    console.log('Part 1')
    console.table({'Time (ms)': end - start, Result: distances});
}

const part2 = () => {
    const start = performance.now();
    const numbers = parseInput();
    const {leftNumbers, rightNumbers} = numbers;
    const similarityScore = leftNumbers.reduce((prev, leftNumber) => {
        let occurences = 0;
        for (let i = rightNumbers.indexOf(leftNumber); i <= rightNumbers.length; i++) {
            if (rightNumbers[i] === leftNumber) {
                ++occurences;
            } else {
                break;
            }
        }
        return prev + occurences * leftNumber
    }, 0)
    const end = performance.now();
    console.log('Part 2')
    console.table({'Time (ms)': end - start, Result: similarityScore});
}

part1();
part2();
