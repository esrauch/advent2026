import { open } from 'fs/promises';
async function* f() {
    const file = await open('./day01.txt');
    for await (const line of file.readLines()) {
        const first = line[0];
        let sign;
        if (first === "L") {
            sign = -1;
        }
        else if (first === "R") {
            sign = 1;
        }
        else {
            throw new Error(`Unexpected direction: ${first}`);
        }
        const number = parseInt(line.slice(1), 10);
        if (isNaN(number)) {
            throw new Error(`Invalid number in line: ${line}`);
        }
        yield sign * number;
    }
    await file.close();
}
(async function () {
    let val = 50;
    let numZeroes = 0;
    for await (let rot of f()) {
        console.log(`Before: ${val} Rotation: ${rot}`);
        while (rot <= -100) {
            rot += 100;
            numZeroes += 1;
        }
        while (rot >= 100) {
            rot -= 100;
            numZeroes += 1;
        }
        const next = val + rot;
        if (val < 0 && next > 0) {
            numZeroes += 1;
        }
        if (val > 0 && (next < 0 || next > 100)) {
            numZeroes += 1;
        }
        val = ((next % 100) + 100) % 100;
        if (val === 0) {
            numZeroes += 1;
        }
        console.log(`  NumZeroes: ${numZeroes}`);
        console.log(`  New value: ${val}`);
    }
    console.log(`Number of times value reached zero: ${numZeroes}`);
})();
//# sourceMappingURL=day01.js.map