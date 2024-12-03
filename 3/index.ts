
const text = await Deno.readTextFile("data.txt");
const parseInput = () => {
    return text;
}

const part1 = () => {
    const start = performance.now();
    const text = parseInput();
    
    const matches = text.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
    const result = matches.reduce((prev, match) => {
        const [leftOperand, rightOperand] = match[0].matchAll(/\d{1,3}/g);
        const res = Number(leftOperand[0]) * Number(rightOperand[0])
        return prev + res;
    }, 0)
    const end = performance.now();
    console.log('Part 1')
    console.table({'Time (ms)': end - start, Result: result});
}

const part2 = () => {
    const start = performance.now();
    const text = parseInput();
    const matchesMul = text.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
    const matchesDosOrDonts = text.matchAll(/(don't\(\))|(do\(\))/g);
    const arrMatchesDosOrDonts = Array.from(matchesDosOrDonts);
    const result = matchesMul.reduce((prev, match) => {
        const [leftOperand, rightOperand] = match[0].matchAll(/\d{1,3}/g);
        const mulIndex = match.index;
        let shouldDoOperation = true;
        for (let i = 0; i <= arrMatchesDosOrDonts.length - 1; i++) {
            if (arrMatchesDosOrDonts[i].index < mulIndex) {
                if (arrMatchesDosOrDonts[i][0].includes("don't")) {
                    shouldDoOperation = false;
                } else {
                    shouldDoOperation = true;
                }
            }
        }
        const res = shouldDoOperation ? Number(leftOperand[0]) * Number(rightOperand[0]) : 0;
        return prev + res;
    }, 0)
    const end = performance.now();
    console.log('Part 2')
    console.table({'Time (ms)': end - start, Result: result});
}

part1();
part2();
