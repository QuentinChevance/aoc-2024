
const text = await Deno.readTextFile("data.txt");
const parseInput = () => {
    return text.split('\n').map(line => line.split(''));
}

const xMaxWords = ([i, j]: [number, number], lines: string[][]) => {
    const topAvailable = i >= 3;
    const bottomAvailable = (lines.length - (i+3) >= 1);
    const leftAvailable = j >= 3;
    const rightAvailable = (lines[i].length - (j+3) >= 1);
    let words = 0;
    if (topAvailable && lines[i-1][j] === 'M' && lines[i-2][j] === 'A' && lines[i-3][j] === 'S') words++;
    if (bottomAvailable && lines[i+1][j] === 'M' && lines[i+2][j] === 'A' && lines[i+3][j] === 'S') words++;
    if (leftAvailable && lines[i][j-1] === 'M' && lines[i][j-2] === 'A' && lines[i][j-3] === 'S') words++;
    if (rightAvailable && lines[i][j+1] === 'M' && lines[i][j+2] === 'A' && lines[i][j+3] === 'S') words++;
    if ((topAvailable && leftAvailable) && lines[i-1][j-1] === 'M' && lines[i-2][j-2] === 'A' && lines[i-3][j-3] === 'S') words++;
    if ((topAvailable && rightAvailable) && lines[i-1][j+1] === 'M' && lines[i-2][j+2] === 'A' && lines[i-3][j+3] === 'S') words++;
    if ((bottomAvailable && rightAvailable) && lines[i+1][j+1] === 'M' && lines[i+2][j+2] === 'A' && lines[i+3][j+3] === 'S') words++;
    if ((bottomAvailable && leftAvailable) && lines[i+1][j-1] === 'M' && lines[i+2][j-2] === 'A' && lines[i+3][j-3] === 'S') words++;
    return words;
}

const isXmasCross = ([i, j]: [number, number], lines: string[][]) => {
    const topAvailable = i >= 1;
    const bottomAvailable = (lines.length - (i+1) >= 1);
    const leftAvailable = j >= 1;
    const rightAvailable = (lines[i].length - (j+1) >= 1);
    if (topAvailable && leftAvailable && bottomAvailable && rightAvailable) {
        if (
            (
                (lines[i-1][j-1] === 'M' && lines[i+1][j+1] === 'S')
                || (lines[i-1][j-1] === 'S' && lines[i+1][j+1] === 'M')
            ) &&
            (
                (lines[i-1][j+1] === 'M' && lines[i+1][j-1] === 'S')
                || (lines[i-1][j+1] === 'S' && lines[i+1][j-1] === 'M')
            )
        ) return 1
    }
    return 0;
}

const part1 = () => {
    const start = performance.now();
    const lines = parseInput();
    let xMasCount = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === 'X' ) {
                xMasCount += xMaxWords([i,j], lines)
            }
        }
    }
    const end = performance.now();
    console.log('Part 1')
    console.table({'Time (ms)': end - start, Result: xMasCount});
}

const part2 = () => {
    const start = performance.now();
    const lines = parseInput();
    let xMasCount = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === 'A' ) {
                xMasCount += isXmasCross([i,j], lines)
            }
        }
    }
    const end = performance.now();
    console.log('Part 2')
    console.table({'Time (ms)': end - start, Result: xMasCount});
}

part1();
part2();
