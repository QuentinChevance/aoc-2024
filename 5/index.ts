
const text = await Deno.readTextFile("data.txt");
const parseInput = () => {
    let emptyLinePassed = false;
    return text.split('\n').reduce((prev, line) => {
        if (line === '') {
            emptyLinePassed = true;
            return prev;
        }
        if (!emptyLinePassed) {
            const [left,right] = line.split('|').map(Number);
            return {
                ...prev,
                pairs: {
                    ...prev.pairs,
                    [left]: [...(prev.pairs[left] || []), right]
                }
            }
        }
        return {
            ...prev,
            updates: [
                ...prev.updates,
                line.split(',').map(Number)
            ]
        };
    }, {pairs: {}, updates: []} as  {pairs: {[key: number]: number[]}, updates: number[][]});
}

const part1 = () => {
    const start = performance.now();
    const {pairs, updates} = parseInput();
    let res = 0;
    for (let i = 0; i < updates.length; i++) {
        const currentRule = updates[i];
        let isWrongUpdate = false;
        for (let j = currentRule.length - 1; j >= 0; j--) {
            const pagesAfterPage = pairs[currentRule[j]]
            if (new Set(currentRule.slice(0, j)).intersection(new Set(pagesAfterPage)).size > 0) {
                isWrongUpdate = true;
                break;
            }
        }
        if (!isWrongUpdate) {
            res += currentRule[Math.round(currentRule.length / 2)-1]
        }
    }
    const end = performance.now();
    console.log('Part 1')
    console.table({'Time (ms)': end - start, Result: res});
}

const part2 = () => {
    const start = performance.now();
    const {pairs, updates} = parseInput();
    const wrongUpdated = [];
    for (let i = 0; i < updates.length; i++) {
        const currentRule = updates[i];
        for (let j = currentRule.length - 1; j >= 0; j--) {
            const pagesAfterPage = pairs[currentRule[j]]
            const isRuleWrong = new Set(currentRule.slice(0, j)).intersection(new Set(pagesAfterPage)).size > 0;
            if (isRuleWrong) {
                wrongUpdated.push(currentRule.sort((a,b) => {
                    if (pairs[a].includes(b)) {
                        return -1
                    }
                    return 1
                }))
                break;
            }
        }
    }
    const res = wrongUpdated.reduce((prev, curr) => 
        prev + curr[Math.round(curr.length / 2)-1]
    , 0)
    const end = performance.now();
    console.log('Part 2')
    console.table({'Time (ms)': end - start, Result: res});
}

part1();
part2();
