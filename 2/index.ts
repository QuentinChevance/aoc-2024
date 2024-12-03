
const text = await Deno.readTextFile("data.txt");
const parseInput = () => {
    const lines = text.split('\n');
    return lines.map(line => line.split(' ').map(Number))
}

const isSafe = (line: number[]) => {
    for (let i = 1; i <= line.length - 1; ++i) {
        if (
            (line[i] > line[i - 1] && line[i] > line[i+1])
            || (line[i] < line[i - 1] && line[i] < line[i+1])
            || (line[i] === line[i-1])
            || (Math.abs(line[i] - line[i - 1]) > 3)
        ) {
            return false;
        }
    }
    return true;
}

const part1 = () => {
    const start = performance.now();
    const lines = parseInput();
    let unsafeReports = 0;
    for (const line of lines) {
        if (!isSafe(line)) {
            unsafeReports++;
        }
    }
    console.log('safeReports', lines.length - unsafeReports)
    const end = performance.now();
    console.log('Part 1')
    console.table({'Time (ms)': end - start, Result: lines.length - unsafeReports});
}

// function isSafe(levels: number[]) {
// 	const differences: number[] = [];

// 	for (let i = 1; i < levels.length; i++) {
// 		differences.push(levels[i] - levels[i - 1]);
// 	}

// 	const increasing = differences.every((d) => d >= 1 && d <= 3);
// 	const decreasing = differences.every((d) => d <= -1 && d >= -3);

// 	return increasing || decreasing;
// }

const part2 = () => {
    const start = performance.now();
    const lines = parseInput();
	let madeSafe = 0;

	for (const line of lines) {
		let tolerable = false;

		for (let i = 0; i < line.length; i++) {
            const removed = [...line]
            removed.splice(i, 1);
			if (isSafe(removed)) {
				tolerable = true;
				break;
			}
		}

		if (isSafe(line) || tolerable) {
            madeSafe++
        };
	}
    // console.log('mightBeUnsafeLineIndexes',mightBeUnsafeLineIndexes)
    // console.log('safeReports', lines.length - unsafeReports)
    const end = performance.now();
    console.log('Part 2')
    console.table({'Time (ms)': end - start, Result: madeSafe});
}

part1();
part2();
