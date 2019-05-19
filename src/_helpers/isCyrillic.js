export function isCyrillic(str) {
    return /[а-я]/i.test(str);
}