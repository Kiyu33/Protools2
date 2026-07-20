// ===========================
// Pro Tools 四択問題集
// script.js 完全版
// ===========================

// ===========================
// 画面要素
// ===========================
const homeScreen = document.getElementById("home-screen");
const categoryMenu = document.getElementById("beginner-menu");
const quizScreen = document.getElementById("quiz-screen");
const menuTitle = document.getElementById("menu-title");

// ===========================
// ホーム画面のボタン
// ===========================
const beginnerBtn = document.getElementById("beginner-btn");
const intermediateBtn = document.getElementById("intermediate-btn");
const allBtn = document.getElementById("all-btn");
const randomBtn = document.getElementById("random-btn");
const backBtn = document.getElementById("back-btn");

// ===========================
// カテゴリボタン
// ===========================
const categoryButtons = {
    A1: document.getElementById("a1-btn"),
    A2: document.getElementById("a2-btn"),
    B1: document.getElementById("b1-btn"),
    B2: document.getElementById("b2-btn"),
    C1: document.getElementById("c1-btn"),
    C2: document.getElementById("c2-btn"),
    C3: document.getElementById("c3-btn"),
    C4: document.getElementById("c4-btn"),
    D1: document.getElementById("d1-btn"),
    D2: document.getElementById("d2-btn"),
    D3: document.getElementById("d3-btn"),
    D4: document.getElementById("d4-btn")
};

// ===========================
// 問題画面
// ===========================
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const choicesDiv = document.getElementById("choices");
const progressBar = document.getElementById("progress-bar");

const finishBox = document.getElementById("finish");
const finalScore = document.getElementById("final-score");
const finalRate = document.getElementById("final-rate");

const retryBtn = document.getElementById("retry-btn");
const resultHomeBtn = document.getElementById("result-home-btn");

// ===========================
// クイズ用変数
// ===========================
let selectedLevel = "beginner";
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let randomMode = false;

// 回答後の連続クリックを防止
let acceptingAnswer = true;

// ===========================
// 初級カテゴリメニューを開く
// ===========================
beginnerBtn.addEventListener("click", () => {
    selectedLevel = "beginner";

    menuTitle.textContent = "🟢 初級問題";

    homeScreen.classList.add("hidden");
    categoryMenu.classList.remove("hidden");
});

// ===========================
// 中級カテゴリメニューを開く
// ===========================
intermediateBtn.addEventListener("click", () => {
    selectedLevel = "intermediate";

    menuTitle.textContent = "🟡 中級問題";

    homeScreen.classList.add("hidden");
    categoryMenu.classList.remove("hidden");
});

// ===========================
// ホームへ戻る
// ===========================
backBtn.addEventListener("click", () => {
    categoryMenu.classList.add("hidden");
    homeScreen.classList.remove("hidden");
});

// ===========================
// 全問題
// ===========================
allBtn.addEventListener("click", () => {
    randomMode = false;
    quizQuestions = [...questions];

    startQuiz();
});

// ===========================
// ランダムモード
// 問題順と選択肢順をランダムにする
// ===========================
randomBtn.addEventListener("click", () => {
    randomMode = true;

    quizQuestions = shuffleArray([...questions]);

    startQuiz();
});

// ===========================
// カテゴリボタンの設定
// ===========================
Object.entries(categoryButtons).forEach(([category, button]) => {
    button.addEventListener("click", () => {
        startCategoryQuiz(category);
    });
});

// ===========================
// レベル・カテゴリ別に問題を選択
// ===========================
function startCategoryQuiz(category) {
    randomMode = false;

    quizQuestions = questions.filter(question => {
        return (
            question.level === selectedLevel &&
            question.category === category
        );
    });

    if (quizQuestions.length === 0) {
        alert(
            `${selectedLevel === "beginner" ? "初級" : "中級"}の` +
            `${category}には問題が登録されていません。`
        );

        return;
    }

    startQuiz();
}

// ===========================
// クイズ開始
// ===========================
function startQuiz() {
    if (quizQuestions.length === 0) {
        alert("出題できる問題がありません。");
        return;
    }

    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    acceptingAnswer = true;

    homeScreen.classList.add("hidden");
    categoryMenu.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    finishBox.classList.add("hidden");

    const quizBox = document.querySelector(".quiz-box");

    if (quizBox) {
        quizBox.classList.remove("hidden");
    }

    removeOldResultElements();

    progressBar.style.width = "0%";

    showQuestion();
}

// ===========================
// 問題を表示
// ===========================
function showQuestion() {
    acceptingAnswer = true;

    const originalQuestion = quizQuestions[currentQuestion];

    let displayedQuestion;

    if (randomMode) {
        displayedQuestion = createShuffledQuestion(originalQuestion);
        quizQuestions[currentQuestion] = displayedQuestion;
    } else {
        displayedQuestion = originalQuestion;
    }

    questionNumber.textContent =
        `問題 ${currentQuestion + 1} / ${quizQuestions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

    // 前の問題の画像をリセット
    questionImage.src = "";
    questionImage.classList.add("hidden");

    // 今回の問題に画像がある場合だけ表示
    if (displayedQuestion.image) {
        questionImage.src = displayedQuestion.image;
        questionImage.classList.remove("hidden");
    }

    questionText.textContent = displayedQuestion.question;

    choicesDiv.innerHTML = "";

    displayedQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = choice;
        button.classList.add("choice-btn");
        button.dataset.index = index;

        choicesDiv.appendChild(button);
    });
}

// ===========================
// 回答処理
// ===========================
choicesDiv.addEventListener("click", event => {
    const selectedButton = event.target.closest(".choice-btn");

    if (!selectedButton || !acceptingAnswer) {
        return;
    }

    acceptingAnswer = false;

    const buttons = choicesDiv.querySelectorAll(".choice-btn");

    buttons.forEach(button => {
        button.disabled = true;
    });

    const selectedAnswer = Number(selectedButton.dataset.index);
    const correctAnswer = quizQuestions[currentQuestion].answer;

    userAnswers[currentQuestion] = selectedAnswer;

    const isCorrect = selectedAnswer === correctAnswer;

    let displayTime;

    if (isCorrect) {
        score++;

        selectedButton.classList.add("correct-flash");

        displayTime = 400;
    } else {
        selectedButton.classList.add("incorrect-flash");

        if (buttons[correctAnswer]) {
            buttons[correctAnswer].classList.add("correct-flash");
        }

        displayTime = 2000;
    }

    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, displayTime);
});

// ===========================
// 結果画面
// ===========================
function showResult() {
    const quizBox = document.querySelector(".quiz-box");

    if (quizBox) {
        quizBox.classList.add("hidden");
    }

    finishBox.classList.remove("hidden");

    finalScore.textContent =
        `正答数：${score} / ${quizQuestions.length}`;

    const rate = Math.round(
        (score / quizQuestions.length) * 100
    );

    finalRate.textContent = `正答率：${rate}%`;

    showRank(rate);
    createResultList();
}

// ===========================
// ランク表示
// ===========================
function showRank(rate) {
    const oldRank = finishBox.querySelector(".rank");

    if (oldRank) {
        oldRank.remove();
    }

    const rank = document.createElement("h2");

    rank.classList.add("rank");

    if (rate === 100) {
        rank.textContent = "🏆 Sランク（パーフェクト！）";
        rank.style.color = "gold";
    } else if (rate >= 90) {
        rank.textContent = "🥇 Aランク（優秀です！）";
        rank.style.color = "#00ff88";
    } else if (rate >= 80) {
        rank.textContent = "🥈 Bランク（合格ライン突破！）";
        rank.style.color = "#00bfff";
    } else if (rate >= 70) {
        rank.textContent = "🥉 Cランク（もう少し頑張りましょう）";
        rank.style.color = "orange";
    } else {
        rank.textContent = "📚 不合格（もう一度挑戦！）";
        rank.style.color = "#ff5555";
    }

    finalRate.insertAdjacentElement("afterend", rank);
}

// ===========================
// 答え合わせ一覧
// ===========================
function createResultList() {
    const oldResultList = document.getElementById("result-list");

    if (oldResultList) {
        oldResultList.remove();
    }

    const resultList = document.createElement("div");

    resultList.id = "result-list";

    const title = document.createElement("h3");

    title.textContent = "答え合わせ";
    title.style.margin = "30px 0 15px";
    title.style.fontSize = "24px";

    resultList.appendChild(title);

    quizQuestions.forEach((question, index) => {
        const selectedAnswer = userAnswers[index];
        const correctAnswer = question.answer;

        const isCorrect = selectedAnswer === correctAnswer;

        const item = document.createElement("div");

        item.classList.add("answer-item");

        const questionTitle = document.createElement("h4");
        questionTitle.textContent = `問題 ${index + 1}`;

        item.appendChild(questionTitle);

        // 問題画像
        if (question.image) {
            const resultImage = document.createElement("img");

            resultImage.src = question.image;
            resultImage.alt = `問題 ${index + 1}の画像`;

            item.appendChild(resultImage);
        }

        // 問題文
        const questionParagraph = document.createElement("p");

        questionParagraph.textContent = question.question;

        item.appendChild(questionParagraph);

        // 自分の回答
        const userAnswerParagraph = document.createElement("p");
        const userAnswerLabel = document.createTextNode("あなたの回答：");
        const userAnswerSpan = document.createElement("span");

        userAnswerSpan.style.color =
            isCorrect ? "#00ffaa" : "#ff5555";

        const userAnswerStrong = document.createElement("strong");

        if (
            selectedAnswer !== undefined &&
            question.choices[selectedAnswer] !== undefined
        ) {
            userAnswerStrong.textContent =
                question.choices[selectedAnswer];
        } else {
            userAnswerStrong.textContent = "未回答";
        }

        userAnswerSpan.appendChild(userAnswerStrong);
        userAnswerParagraph.appendChild(userAnswerLabel);
        userAnswerParagraph.appendChild(userAnswerSpan);

        item.appendChild(userAnswerParagraph);

        // 正解
        const correctAnswerParagraph = document.createElement("p");
        const correctAnswerLabel = document.createTextNode("正解：");
        const correctAnswerSpan = document.createElement("span");

        correctAnswerSpan.style.color = "#00ffaa";

        const correctAnswerStrong = document.createElement("strong");

        correctAnswerStrong.textContent =
            question.choices[correctAnswer];

        correctAnswerSpan.appendChild(correctAnswerStrong);
        correctAnswerParagraph.appendChild(correctAnswerLabel);
        correctAnswerParagraph.appendChild(correctAnswerSpan);

        item.appendChild(correctAnswerParagraph);

        // 正解・不正解表示
        const resultMark = document.createElement("p");

        resultMark.textContent =
            isCorrect ? "⭕ 正解" : "❌ 不正解";

        resultMark.style.color =
            isCorrect ? "#00ffaa" : "#ff5555";

        resultMark.style.fontSize = "22px";
        resultMark.style.fontWeight = "bold";
        resultMark.style.marginTop = "10px";

        item.appendChild(resultMark);
        resultList.appendChild(item);
    });

    finishBox.appendChild(resultList);
}

// ===========================
// もう一度挑戦
// ===========================
retryBtn.addEventListener("click", () => {
    if (randomMode) {
        quizQuestions = shuffleArray([...quizQuestions]);
    }

    startQuiz();
});

// ===========================
// 結果画面からホームへ戻る
// ===========================
resultHomeBtn.addEventListener("click", () => {
    quizScreen.classList.add("hidden");
    finishBox.classList.add("hidden");
    categoryMenu.classList.add("hidden");
    homeScreen.classList.remove("hidden");

    removeOldResultElements();
});

// ===========================
// 古い結果表示を削除
// ===========================
function removeOldResultElements() {
    const oldRank = finishBox.querySelector(".rank");

    if (oldRank) {
        oldRank.remove();
    }

    const oldResultList = document.getElementById("result-list");

    if (oldResultList) {
        oldResultList.remove();
    }
}

// ===========================
// 配列をシャッフル
// ===========================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[randomIndex]] =
            [array[randomIndex], array[i]];
    }

    return array;
}

// ===========================
// 選択肢をシャッフル
// questions.jsのanswerは0～3を使用
// ===========================
function createShuffledQuestion(question) {
    const choiceData = question.choices.map((choice, index) => {
        return {
            text: choice,
            isCorrect: index === question.answer
        };
    });

    shuffleArray(choiceData);

    const shuffledChoices = choiceData.map(item => item.text);

    const shuffledCorrectAnswer =
        choiceData.findIndex(item => item.isCorrect);

    return {
        ...question,
        choices: shuffledChoices,
        answer: shuffledCorrectAnswer
    };
}
