
const text = await Deno.readTextFile("data.txt");
const parseInput = () => {
    return text.split('\n').map(line => line.split(''))
}

type Direction = 'top' | 'bottom' | 'left' | 'right';

const checkInDirection = (map: string[][], currentPos: [number,number], direction: Direction) => {
    const res: {passedThroughIndexes: [number,number][], next: Direction | 'finished', lastIndexes: [number, number]} = {
        passedThroughIndexes: [],
        next: 'finished',
        lastIndexes: currentPos
    } 
    switch(direction) {
        case 'top':
            for (let i = currentPos[0]; i >= 0; i--) {
                if (map[i][currentPos[1]] === '#') {
                    res.next = 'right';
                    return res;
                }
                res.lastIndexes = [i, currentPos[1]]
                res.passedThroughIndexes.push([i, currentPos[1]])
                if (i === 0 && map[i][currentPos[1]] === '.') {
                    res.next === 'finished'
                    return res
                }
            }
            break;
        case 'bottom':
            for (let i = currentPos[0]; i < map.length; i++) {
                if (map[i][currentPos[1]] === '#') {
                    res.next = 'left';
                    return res;
                }
                res.lastIndexes = [i, currentPos[1]]
                res.passedThroughIndexes.push([i, currentPos[1]])
                if (i === map.length - 1 && map[i][currentPos[1]] === '.') {
                    res.next === 'finished'
                    return res
                }
            }
            break;
        case 'left':
            for (let i = currentPos[1]; i >= 0; i--) {
                if (map[currentPos[0]][i] === '#') {
                    res.next = 'top';
                    return res;
                }
                res.lastIndexes = [currentPos[0], i]
                res.passedThroughIndexes.push([currentPos[0], i])
                if (i === 0 && map[i][currentPos[1]] === '.') {
                    res.next === 'finished'
                    return res
                }
            }
            break;
        case 'right':
            for (let i = currentPos[1]; i < map[currentPos[0]].length; i++) {
                if (map[currentPos[0]][i] === '#') {
                    res.next = 'bottom';
                    return res;
                }
                res.lastIndexes = [currentPos[0], i]
                res.passedThroughIndexes.push([currentPos[0], i])
                if (i === map[currentPos[0]].length - 1 && map[i][currentPos[1]] === '.') {
                    res.next === 'finished'
                    return res
                }
            }
            break;
    }
    return res;
}

const part1 = () => {
    const start = performance.now();
    const lines = parseInput();
    const res = new Set<string>()
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '^') {
                let nextStep: Direction | 'finished' = 'top';
                let indexes: [number, number] = [i,j];
                while (nextStep !== 'finished') {
                    const {
                        lastIndexes,
                        next,
                        passedThroughIndexes
                    } = checkInDirection(lines, indexes,nextStep)
                    for (const passedThroughIndex of passedThroughIndexes) {
                        res.add(JSON.stringify(passedThroughIndex))
                    }
                    nextStep = next;
                    indexes = lastIndexes;
                }
                break;
            }
        }
        if (res.size > 0) {
            break;
        }
    }
    const end = performance.now();
    console.log('Part 1')
    console.table({'Time (ms)': end - start, Result: res.size});
}

const part2 = () => {
    const start = performance.now();
    const end = performance.now();
    console.log('Part 2')
    console.table({'Time (ms)': end - start, Result: 0});
}

part1();
part2();
