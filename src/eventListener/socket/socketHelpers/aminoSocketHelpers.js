
export function randomInt({min, max}) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
}

