// ===========================
// Pro Tools 四択問題集
// script.js Part1
// ===========================

// ---------- ホーム ----------
const homeScreen = document.getElementById("home-screen");
const beginnerMenu = document.getElementById("beginner-menu");
const quizScreen = document.getElementById("quiz-screen");

// ---------- ボタン ----------
const beginnerBtn = document.getElementById("beginner-btn");
const intermediateBtn = document.getElementById("intermediate-btn");
const allBtn = document.getElementById("all-btn");
const randomBtn = document.getElementById("random-btn");
const backBtn = document.getElementById("back-btn");

// ---------- A～D ----------
const a1Btn = document.getElementById("a1-btn");
const a2Btn = document.getElementById("a2-btn");

const b1Btn = document.getElementById("b1-btn");
const b2Btn = document.getElementById("b2-btn");

const c1Btn = document.getElementById("c1-btn");
const c2Btn = document.getElementById("c2-btn");
const c3Btn = document.getElementById("c3-btn");
const c4Btn = document.getElementById("c4-btn");

const d1Btn = document.getElementById("d1-btn");
const d2Btn = document.getElementById("d2-btn");
const d3Btn = document.getElementById("d3-btn");
const d4Btn = document.getElementById("d4-btn");

// ---------- 問題画面 ----------
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const choicesDiv = document.getElementById("choices");

const progressBar = document.getElementById("progress-bar");

const finishBox = document.getElementById("finish");
const finalScore = document.getElementById("final-score");
const finalRate = document.getElementById("final-rate");

// ===========================
// 変数
// ===========================

let quizQuestions = [];

let currentQuestion = 0;

let score = 0;

let userAnswers = [];

let randomMode = false;

// ===========================
// ホーム画面
// ===========================

// 初級を押す
beginnerBtn.addEventListener("click", () => {

    homeScreen.classList.add("hidden");

    beginnerMenu.classList.remove("hidden");

});

// 戻る
backBtn.addEventListener("click", () => {

    beginnerMenu.classList.add("hidden");

    homeScreen.classList.remove("hidden");

});

// 中級
intermediateBtn.addEventListener("click", () => {

    randomMode = false;

    quizQuestions =
        questions.filter(q => q.level === "intermediate");

    startQuiz();

});

// 全問題
allBtn.addEventListener("click", () => {

    randomMode = false;

    quizQuestions = [...questions];

    startQuiz();

});

// ランダム
randomBtn.addEventListener("click", () => {

    randomMode = true;

    quizQuestions = [...questions];

    startQuiz();

});
// ===========================
// A1～D4 ボタン
// ===========================

a1Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "A1");
    randomMode = false;
    startQuiz();
});

a2Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "A2");
    randomMode = false;
    startQuiz();
});

b1Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "B1");
    randomMode = false;
    startQuiz();
});

b2Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "B2");
    randomMode = false;
    startQuiz();
});

c1Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "C1");
    randomMode = false;
    startQuiz();
});

c2Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "C2");
    randomMode = false;
    startQuiz();
});

c3Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "C3");
    randomMode = false;
    startQuiz();
});

c4Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "C4");
    randomMode = false;
    startQuiz();
});

d1Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "D1");
    randomMode = false;
    startQuiz();
});

d2Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "D2");
    randomMode = false;
    startQuiz();
});

d3Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "D3");
    randomMode = false;
    startQuiz();
});

d4Btn.addEventListener("click", () => {
    quizQuestions = questions.filter(q => q.category === "D4");
    randomMode = false;
    startQuiz();
});

// ===========================
// クイズ開始
// ===========================

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    beginnerMenu.classList.add("hidden");
    homeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    finishBox.classList.add("hidden");

    document
        .querySelector(".quiz-box")
        .classList.remove("hidden");

    progressBar.style.width = "0%";

    showQuestion();

}
// ===========================
// 選択肢シャッフル
// （ランダムモード用）
// ===========================

function shuffleChoices(question) {

    const choices = [...question.choices];

    const correctChoice = choices[question.answer];

    for (let i = choices.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [choices[i], choices[j]] =
        [choices[j], choices[i]];

    }

    return {

        level: question.level,

        category: question.category,

        image: question.image,

        question: question.question,

        choices: choices,

        answer: choices.indexOf(correctChoice)

    };

}

// ===========================
// 問題表示
// ===========================

function showQuestion() {

    let q = quizQuestions[currentQuestion];

    // ランダムモードなら選択肢をシャッフル
    if (randomMode) {

        q = shuffleChoices(q);

        quizQuestions[currentQuestion] = q;

    }

    // 問題番号
    questionNumber.textContent =
        `問題 ${currentQuestion + 1} / ${quizQuestions.length}`;

    // プログレスバー
    progressBar.style.width =
        ((currentQuestion + 1) / quizQuestions.length) * 100 + "%";

    // ===========================
    // 問題画像
    // ===========================

    if (q.image) {

        questionImage.src = q.image;

        questionImage.classList.remove("hidden");

    } else {

        questionImage.src = "";

        questionImage.classList.add("hidden");

    }

    // 問題文
    questionText.textContent = q.question;

    // 選択肢をリセット
    choicesDiv.innerHTML = "";

    // 選択肢作成
    q.choices.forEach((choice, index) => {

        const button = document.createElement("button");

        button.textContent = choice;

        button.classList.add("choice-btn");

        button.dataset.index = index;

        choicesDiv.appendChild(button);

    });

}
// ===========================
// 回答処理
// ===========================

choicesDiv.addEventListener("click", (event) => {

    if (!event.target.classList.contains("choice-btn")) {
        return;
    }

    const buttons =
        document.querySelectorAll(".choice-btn");

    buttons.forEach(button => {

        button.disabled = true;

    });

    const selected =
        Number(event.target.dataset.index);

    userAnswers[currentQuestion] = selected;

    if (selected === quizQuestions[currentQuestion].answer) {

        score++;

    }

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {

            showQuestion();

        } else {

            showResult();

        }

    }, 300);

});

// ===========================
// 結果画面
// ===========================

function showResult() {

    document
        .querySelector(".quiz-box")
        .classList.add("hidden");

    finishBox.classList.remove("hidden");

    finalScore.textContent =
        `正答数：${score} / ${quizQuestions.length}`;

    const rate =
        Math.round(score / quizQuestions.length * 100);

    finalRate.textContent =
        `正答率：${rate}%`;

    // ランク表示
    const rank =
        document.createElement("h2");

    rank.classList.add("rank");

    if (rate === 100) {

        rank.textContent = "🏆 Sランク";
        rank.style.color = "gold";

    } else if (rate >= 90) {

        rank.textContent = "🥇 Aランク";
        rank.style.color = "#00ff88";

    } else if (rate >= 80) {

        rank.textContent = "🥈 Bランク";
        rank.style.color = "#00bfff";

    } else if (rate >= 70) {

        rank.textContent = "🥉 Cランク";
        rank.style.color = "orange";

    } else {

        rank.textContent = "📚 もう一度挑戦！";
        rank.style.color = "#ff5555";

    }

    finishBox.appendChild(rank);

    // ===========================
    // 答え合わせ
    // ===========================

    const resultList =
        document.createElement("div");

    resultList.id = "result-list";

    const title =
        document.createElement("h3");

    title.textContent = "答え合わせ";

    resultList.appendChild(title);

    quizQuestions.forEach((q, index) => {

        const item =
            document.createElement("div");

        item.classList.add("answer-item");

        const correct =
            userAnswers[index] === q.answer;

        item.innerHTML = `

            <h4>問題 ${index + 1}</h4>

            ${q.image ? `
                <img src="${q.image}"
                style="
                    max-width:300px;
                    width:100%;
                    display:block;
                    margin:15px auto;
                    border-radius:10px;
                ">
            ` : ""}

            <p>${q.question}</p>

            <p>
                あなたの回答：
                <strong>
                ${q.choices[userAnswers[index]]}
                </strong>
            </p>

            <p>
                正解：
                <strong>
                ${q.choices[q.answer]}
                </strong>
            </p>

            <p style="
                color:${correct ? "#00ff88" : "#ff5555"};
                font-size:22px;
                font-weight:bold;
            ">
                ${correct ? "⭕ 正解" : "❌ 不正解"}
            </p>

            <hr>

        `;

        resultList.appendChild(item);

    });

    finishBox.appendChild(resultList);

}