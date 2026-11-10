// ======================================================
// ULTIMATE BEST FRIEND QUIZ V2
// Part 1 - Setup
// ======================================================

// -------------------------
// SUPABASE
// -------------------------

const SUPABASE_URL = "https://szcluamocpvhhvwsqikb.supabase.co";
const SUPABASE_KEY = "sb_publishable_dQreDZwBnfH097vZQ7tm9g_T17NyJxT";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// -------------------------
// ELEMENTS
// -------------------------

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const playerNameInput = document.getElementById("playerName");

const startBtn = document.getElementById("startQuiz");
const submitBtn = document.getElementById("submitAnswer");
const playAgainBtn = document.getElementById("playAgain");

const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");

const progressFill = document.getElementById("progressFill");

const scoreDisplay = document.getElementById("scoreDisplay");
const finalScore = document.getElementById("finalScore");

const questionNumber = document.getElementById("questionNumber");

const feedback = document.getElementById("feedbackMessage");

const timerElement = document.getElementById("timer");

const bestScoreElement = document.getElementById("bestScore");

const certificateName = document.getElementById("certificateName");
const certificateScore = document.getElementById("certificateScore");

const friendRank = document.getElementById("friendRank");

const accuracyResult = document.getElementById("accuracyResult");

const timeTaken = document.getElementById("timeTaken");

const leaderboardBody = document.getElementById("leaderboardBody");

const themeBtn = document.getElementById("themeBtn");

// -------------------------
// QUESTIONS
// -------------------------

const questions = [

"What's my favourite colour?",

"What's my favourite subject?",

"What's my favourite food?",

"What do I drink the most?",

"What game do I play the most?",

"Favourite animal?",

"What do I like doing the most?",

"My favourite season?",

"My favourite festival?",

"My favourite place?",

"My favourite street food?",

"What do I say the most?",

"What do I overthink the most?",

"If I had one superpower, what would I choose?",

"What do I always say about myself?"

];

// -------------------------
// ANSWERS
// -------------------------

const answers = [

["orange"],

["maths","math"],

["aloo ki sabzi","aloo curry"],

["water"],

["rivals"],

["cat"],

["playing roblox","roblox"],

["summer"],

["holi"],

["home"],

["momos"],

["nonsense"],

["everything"],

["time manipulation"],

["i always top in class"]

];

// -------------------------
// QUIZ VARIABLES
// -------------------------

let currentQuestion = 0;

let score = 0;

let playerName = "";

let seconds = 0;

let timer = null;

// -------------------------
// FUNNY MESSAGES
// -------------------------

const correctMessages = [

"🔥 Nailed it!",

"😎 Easy one!",

"🧠 You're actually smart.",

"👏 Nice!",

"💯 Correct!"

];

const wrongMessages = [

"😂 Nope!",

"💀 That's wild.",

"😭 Try harder.",

"🤦 I can't believe you guessed that.",

"😅 Not even close."

];

// -------------------------
// LOAD BEST SCORE
// -------------------------

let bestScore = Number(localStorage.getItem("bestFriendHighScore")) || 0;

bestScoreElement.textContent = `${bestScore} / 15`;

// ======================================================
// PART 2 - QUIZ ENGINE
// ======================================================

// -------------------------
// START QUIZ
// -------------------------

startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    playerName = playerNameInput.value.trim();

    if (playerName === "") {
        alert("Please enter your name!");
        return;
    }

    welcomeScreen.classList.remove("active");
    quizScreen.classList.add("active");

    currentQuestion = 0;
    score = 0;
    seconds = 0;

    scoreDisplay.textContent = "0";

    startTimer();

    showQuestion();
}

// -------------------------
// TIMER
// -------------------------

function startTimer() {

    clearInterval(timer);

    timer = setInterval(() => {

        seconds++;

        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");

        const secs = (seconds % 60)
            .toString()
            .padStart(2, "0");

        timerElement.textContent = `${mins}:${secs}`;

    }, 1000);

}

// -------------------------
// SHOW QUESTION
// -------------------------

function showQuestion() {

    questionText.textContent = questions[currentQuestion];

    questionNumber.textContent = currentQuestion + 1;

    progressFill.style.width =
        ((currentQuestion) / questions.length) * 100 + "%";

    answerInput.value = "";

    answerInput.focus();

    feedback.textContent = "";

    feedback.className = "feedback";

}

// -------------------------
// SUBMIT
// -------------------------

submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        checkAnswer();

    }

});

// -------------------------
// NEXT QUESTION
// -------------------------

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        finishQuiz();

        return;

    }

    showQuestion();

}

// ======================================================
// PART 3 - SMART ANSWER CHECKING
// ======================================================

// Normalize text
function normalize(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/[.,!?]/g, "")
        .replace(/\s+/g, " ");

}

// Levenshtein Distance
function levenshtein(a, b) {

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {

        for (let j = 1; j <= a.length; j++) {

            if (b.charAt(i - 1) === a.charAt(j - 1)) {

                matrix[i][j] = matrix[i - 1][j - 1];

            } else {

                matrix[i][j] = Math.min(

                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1

                );

            }

        }

    }

    return matrix[b.length][a.length];

}

// Smart Match
function isCorrect(userAnswer, acceptedAnswers) {

    userAnswer = normalize(userAnswer);

    // Convert a single answer into an array
    if (!Array.isArray(acceptedAnswers)) {
        acceptedAnswers = [acceptedAnswers];
    }

    for (let answer of acceptedAnswers) {

        answer = normalize(answer);

        if (userAnswer === answer)
            return true;

        if (userAnswer.includes(answer))
            return true;

        if (levenshtein(userAnswer, answer) <= 2)
            return true;
    }

    return false;
}

// Check Answer
function checkAnswer() {

    const userAnswer = answerInput.value.trim();

    if (userAnswer === "")
        return;

    if (isCorrect(userAnswer, answers[currentQuestion])) {

        score++;

        scoreDisplay.textContent = score;

        feedback.className = "feedback correct";

        feedback.textContent =
            correctMessages[
                Math.floor(Math.random() * correctMessages.length)
            ];

    } else {

        feedback.className = "feedback wrong";

        feedback.textContent =
            wrongMessages[
                Math.floor(Math.random() * wrongMessages.length)
            ];

    }

    setTimeout(() => {

        nextQuestion();

    }, 1200);

}

// ======================================================
// PART 4 - RESULTS
// ======================================================

// Finish Quiz
function finishQuiz() {

    clearInterval(timer);

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent = score;

    certificateName.textContent = playerName;
    certificateScore.textContent = `${score} / ${questions.length}`;

    // Accuracy
    const accuracy = Math.round(
        (score / questions.length) * 100
    );

    accuracyResult.textContent = accuracy + "%";

    // Time
    const mins = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");

    const secs = (seconds % 60)
        .toString()
        .padStart(2, "0");

    timeTaken.textContent = `${mins}:${secs}`;

    // Save High Score
    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem(
            "bestFriendHighScore",
            bestScore
        );

    }

    bestScoreElement.textContent =
        `${bestScore} / ${questions.length}`;

    document.getElementById("highestScoreResult").textContent =
        `${bestScore} / ${questions.length}`;

    // Friendship Rank
    let title = "";
    let message = "";

    if (score === 15) {

        title = "👑 Ultimate Best Friend";
        message = "You know literally everything about me!";

    } else if (score >= 13) {

        title = "🏆 Best Friend";
        message = "That's seriously impressive!";

    } else if (score >= 10) {

        title = "😎 Great Friend";
        message = "You know me pretty well.";

    } else if (score >= 7) {

        title = "🙂 Good Friend";
        message = "Not bad, but you can do better!";

    } else {

        title = "😂 Stranger";
        message = "Do we even know each other?";

    }

    friendRank.textContent = title;

    document.getElementById("scoreMessage").textContent = message;

    document.getElementById("playerGreeting").textContent =
        `Well done, ${playerName}!`;

    // Celebration
    if (score >= 14) {

        launchConfetti();

    }

    // Leaderboard (Part 5)
    saveScore();

    loadLeaderboard();

}

// ======================================================
// PLAY AGAIN
// ======================================================

playAgainBtn.addEventListener("click", () => {

    resultScreen.classList.remove("active");

    welcomeScreen.classList.add("active");

    answerInput.value = "";

    playerNameInput.value = "";

    progressFill.style.width = "0%";

});

// ======================================================
// CONFETTI
// ======================================================

function launchConfetti() {

    const container =
        document.getElementById("confettiContainer");

    for (let i = 0; i < 180; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            `hsl(${Math.random()*360},90%,60%)`;

        piece.style.animationDelay =
            Math.random() * 2 + "s";

        piece.style.width =
            (6 + Math.random() * 10) + "px";

        piece.style.height =
            piece.style.width;

        container.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}

// ======================================================
// DOWNLOAD CERTIFICATE
// ======================================================

document
.getElementById("downloadCertificate")
.addEventListener("click", async () => {

    const canvas =
        await html2canvas(
            document.getElementById("certificate")
        );

    const link =
        document.createElement("a");

    link.download =
        `${playerName}-certificate.png`;

    link.href =
        canvas.toDataURL();

    link.click();

});

// ======================================================
// PART 5 - SUPABASE LEADERBOARD
// ======================================================

window.saveScore = async function () {
    const accuracy = Math.round((score / questions.length) * 100);

    const { error } = await supabaseClient
        .from("leaderboard")
        .insert([{
            name: playerName,
            score: score,
            accuracy: accuracy
        }]);

    if (error) {
        console.error("Leaderboard save error:", error);
    }
};

window.loadLeaderboard = async function () {
    const { data, error } = await supabaseClient
        .from("leaderboard")
        .select("name, score, accuracy")
        .order("score", { ascending: false })
        .limit(20);

    if (error) {
        console.error("Leaderboard load error:", error);
        leaderboardBody.innerHTML =
            "<tr><td colspan='3'>Could not load leaderboard.</td></tr>";
        return;
    }

    leaderboardBody.innerHTML = "";

    data.forEach((entry, index) => {
        const row = document.createElement("tr");

        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = entry.name;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = `${entry.score}/15`;

        row.append(rankCell, nameCell, scoreCell);
        leaderboardBody.appendChild(row);
    });
};