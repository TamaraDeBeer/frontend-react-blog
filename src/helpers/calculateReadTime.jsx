function calculateReadTime(text) {
    const amountOfWords = text.split(" ").length;
    return Math.round(amountOfWords / 10 * 0.1);
    // adjusted the calculation in order to show at least 1 minute reading time.
}

export default calculateReadTime;