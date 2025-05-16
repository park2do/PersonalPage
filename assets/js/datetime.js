function digitToKorean(digit) {
    const digitMap = ['공', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    return digitMap[digit];
}

function numberToKoreanDigits(num) {
    return String(num).split('').map(d => digitToKorean(Number(d))).join('');
}

function numberToKorean(num) {
    const digit = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const unit = ['', '십', '백', '천'];
    if (num === 0) return '영';
    let result = '';
    const numStr = String(num);
    const len = numStr.length;
    for (let i = 0; i < len; i++) {
            const n = parseInt(numStr[i]);
        if (n !== 0) {
            if (n === 1 && (len - i - 1) === 1) {
            result += unit[len - i - 1];
            } else {
            result += digit[n] + unit[len - i - 1];
            }
        }
    }
    return result;
}

    // 바뀐 글자만 highlight
function highlightDiff(currentStr, prevStr, label) {
    let result = '';
    for (let i = 0; i < currentStr.length; i++) {
        const currChar = currentStr[i];
        const prevChar = prevStr[i] || '';
        if (currChar !== prevChar) {
            result += `<span class="highlight">${currChar}</span>`;
        } else {
        result += currChar;
        }
    }
    return result + label;
}

    // 이전 한글 값 저장
let prevKorean = {
    year: numberToKoreanDigits(new Date().getFullYear()),
    month: numberToKorean(new Date().getMonth() + 1),
    day: numberToKorean(new Date().getDate()),
    hour: numberToKorean(new Date().getHours()),
    minute: numberToKorean(new Date().getMinutes()),
    second: numberToKorean(new Date().getSeconds())
};

function updateDateTime() {
    const now = new Date();

    const currKorean = {
        year: numberToKoreanDigits(now.getFullYear()),
        month: numberToKorean(now.getMonth() + 1),
        day: numberToKorean(now.getDate()),
        hour: numberToKorean(now.getHours()),
        minute: numberToKorean(now.getMinutes()),
        second: numberToKorean(now.getSeconds())
    };

    const year = highlightDiff(currKorean.year, prevKorean.year, '년');
    const month = highlightDiff(currKorean.month, prevKorean.month, '월');
    const day = highlightDiff(currKorean.day, prevKorean.day, '일');
    const hour = highlightDiff(currKorean.hour, prevKorean.hour, '시');
    const minute = highlightDiff(currKorean.minute, prevKorean.minute, '분');
    const second = highlightDiff(currKorean.second, prevKorean.second, '초');

    document.getElementById('datetime').innerHTML =
        `${year} ${month} ${day} <br> ${hour} ${minute} ${second}`;

    prevKorean = { ...currKorean };
}

    updateDateTime();
    setInterval(updateDateTime, 1000);