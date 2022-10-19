const input4 = document.getElementById('input4');
const input5 = document.getElementById('input5');
const ans4 = document.getElementById('ans4');
const ans5 = document.getElementById('ans5');

const yard = (infix) => {
    let ops = { '+': 1, '-': 1, '*': 2, '/': 2 };
    let peek = (a) => a[a.length - 1];
    let stack = [];

    const infixy = infix.replaceAll(' ', '');

    return infixy
        .split(/(\d+)/g)
        .map((v) => (isNaN(v) ? v.split('') : v))
        .flat()
        .reduce((output, token) => {
            if (parseFloat(token)) {
                output.push(token);
            }

            if (token in ops) {
                while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
                    output.push(stack.pop());
                stack.push(token);
            }

            if (token == '(') {
                stack.push(token);
            }

            if (token == ')') {
                while (peek(stack) != '(') output.push(stack.pop());
                stack.pop();
            }

            return output;
        }, [])
        .concat(stack.reverse())
        .join(' ');
};

const rpn = (ts, s = []) => {
    ts.split(' ').forEach((t) =>
        s.push(t == +t ? t : eval(s.splice(-2, 1)[0] + t + s.pop())),
    );
    return s[0];
};

const parse = (input) => {
    if ((input.match(/[()]/g) || []).length % 2 === 1) return '';
    return rpn(yard(input));
};

input4.addEventListener('input', () => {
    const inp = input4.value;
    if (!inp) {
        ans4.innerHTML = '';
        return;
    }

    let res = parse(inp);
    if (isNaN(res)) {
        res = '';
    } 
    ans4.innerHTML = `${res}`;
});

input5.addEventListener('input', () => {
    const inp = input5.value;
    if (!inp) {
        ans5.innerHTML = '';
        return;
    }

    let res = parse(inp);
    if (isNaN(res)) {
        res = ''
    } 
    ans5.innerHTML = `${res}`;
});
