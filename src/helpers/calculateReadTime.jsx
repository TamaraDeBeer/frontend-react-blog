function calculateReadTime(text) {
    const amountOfWords = text.split(" ").length;
    return Math.round(amountOfWords / 100 * 0.9);
}

export default calculateReadTime;