

function getRandomQuestions(questionsArray, numberOfQuestions) {
    const suffled = [...questionsArray];

    for (let i = suffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [suffled[i], suffled[j]] = [suffled[j], suffled[i]];
    }

    return suffled.slice(0, numberOfQuestions);
}

module.exports = {
    getRandomQuestions
};