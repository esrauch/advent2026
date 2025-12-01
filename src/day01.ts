import { open } from 'fs/promises';

async function* f(): AsyncGenerator<number> {
  const file = await open('./day01-small.txt');
  for await (const line of file.readLines()) {
    const first = line[0];
    let sign;
    if (first === "L") {
      sign = -1;
    } else if (first === "R") {
      sign = 1;
    } else {
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

(async function() {
  let val = 50;
  let numZeroes = 0;
  for await (let rot of f()) {
    console.log(`Current value: ${val}, rotation: ${rot}`);

    const spins = Math.floor(Math.abs(rot) / 100);
    numZeroes += spins;
    rot -= spins * 100 * (rot < 0 ? -1 : 1);

    val += rot;
    
    if (val == 0) {
      numZeroes += 1;
    }
    while (val < 0) { val += 100; numZeroes += 1; }
    while (val >= 100) { val -= 100; numZeroes += 1; }

    console.log(`  NumZeroes: ${numZeroes}`);
    console.log(`  New value: ${val}`);
  }
  console.log(`Number of times value reached zero: ${numZeroes}`);
})();
