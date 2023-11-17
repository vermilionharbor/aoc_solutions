const prog = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -99',
    'acc +1',
    'jmp -4',
    'acc +6'
]

const progSplit = prog.map(x => {
    const terms = x.split(' ');
    return {
        instruction: terms[0],
        param: parseInt(terms[1], 10),
        ran: false
    }
})

console.log(progSplit);

const runProg = (progSplit) => {
    let i = 0;
    let acc = 0;

    while (i < progSplit.length) {
        if (progSplit[i].ran === true) {
            // console.log(`acc ${acc}`);
            break;
        }
        progSplit[i].ran = true;
        switch (progSplit[i].instruction) {
            case 'nop':
                i = i + 1;
                break;
            case 'acc':
                acc = acc + progSplit[i].param;
                i = i + 1;
                break;
            case 'jmp':
                i = i + progSplit[i].param;
                break;
        }
    }

    return [acc, i >= progSplit.length];
}

const answer = runProg(progSplit);
console.log(answer);

const fixProg = (p) => {
    let i=0;
    let answer = null;
    while (i < p.length) {
        // flip an instruction
        if (p[i].instruction === 'acc') {
            // do nothing
        } else if (p[i].instruction === 'nop') {
            const fixedProg = p.map(x => {
                return {
                    instruction: x.instruction,
                    param: x.param,
                    ran: false
                }
            });
            fixedProg[i].instruction = 'jmp';
            const [acc, finished] = runProg(fixedProg);
            if (finished === true) {
                console.log(`program ${i} terminated with acc ${acc}`)
                answer = acc;
                break;
            } else {
                console.log(`program ${i} inf loop`);
            }
        } else if (p[i].instruction === 'jmp') {
            const fixedProg = p.map(x => {
                return {
                    instruction: x.instruction,
                    param: x.param,
                    ran: false
                }
            });
            fixedProg[i].instruction = 'nop';
            const [acc, finished] = runProg(fixedProg);
            if (finished === true) {
                console.log(`program ${i} terminated with acc ${acc}`)
                answer = acc;
                break;
            } else {
                console.log(`program ${i} inf loop`);
            }
        }
        i++;
    }

    return answer;
}

const answer2 = fixProg(progSplit);