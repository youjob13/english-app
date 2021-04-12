// autofocus
// speech detection
// recopy on React
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const app = document.querySelector(".app");

class TasksGenerate {
  constructor() {
    this.listQuestions =
      JSON.parse(localStorage.getItem("vocabularyList")) || [];
    this.rightAnswers = [];
    this.loseAnswers = [];
    this.skipAnswers = [];
    this.swapsArr = [];
    this.inputValueAnswer = "";
    this.inputValueNewWord = "";
    this.inputValueNewWordTranslation = "";
    this.recognition = new SpeechRecognition();
  }
  digitalRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
  createCloseBtn() {
    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close-btn");
    closeBtn.id = "return-menu";
    return closeBtn;
  }
  openMenu() {
    app.innerHTML = "";
    const menu = document.createElement("div");
    menu.classList.add("main-section", "menu");

    const h2 = document.createElement("h2");
    h2.classList.add("menu-title");
    h2.textContent = "Welcome!";

    const menuButtons = document.createElement("div");
    menuButtons.classList.add("menu-buttons");

    const startBtn = document.createElement("button");
    startBtn.classList.add("menu-btn");
    startBtn.id = "start";
    startBtn.textContent = "Start learning";

    const vocabularyBtn = document.createElement("button");
    vocabularyBtn.classList.add("menu-btn");
    vocabularyBtn.id = "vocabulary";
    vocabularyBtn.textContent = "Vocabulary";

    menuButtons.append(startBtn);
    menuButtons.append(vocabularyBtn);
    menu.append(h2);
    menu.append(menuButtons);
    app.append(menu);
  }
  createListVocabulary(btn = false) {
    const ul = document.createElement("ul");
    ul.classList.add("vocabulary-list");
    ul.append(this.getListContent(this.listQuestions, btn));
    return ul;
  }
  openVocabulary() {
    app.innerHTML = "";

    const vocabularyBlock = document.createElement("div");
    vocabularyBlock.classList.add(`main-section`, `vocabulary-block`);

    const addWordBlock = document.createElement("div");
    addWordBlock.classList.add("vocabulary-add");

    const h3 = document.createElement("h3");
    h3.textContent = "Write the word you would like to learn and add it";

    const labelWord = document.createElement("label");
    labelWord.setAttribute("for", "vocabulary-input_word");
    labelWord.textContent = "Word";

    const labelTranslation = document.createElement("label");
    labelTranslation.setAttribute("for", "vocabulary-input_translation");
    labelTranslation.textContent = "Translation";

    const inputWord = document.createElement("input");
    inputWord.id = "vocabulary-input_word";

    const inputTranslation = document.createElement("input");
    inputTranslation.id = "vocabulary-input_translation";

    const button = document.createElement("button");
    button.id = "add-word";
    button.textContent = "Add word";

    const h3List = document.createElement("h3");
    h3List.textContent = "Added words";

    addWordBlock.append(labelWord);
    addWordBlock.append(inputWord);
    addWordBlock.append(labelTranslation);
    addWordBlock.append(inputTranslation);
    addWordBlock.append(button);

    vocabularyBlock.append(h3);
    vocabularyBlock.append(addWordBlock);
    vocabularyBlock.append(h3List);
    vocabularyBlock.append(this.createListVocabulary(true));
    vocabularyBlock.append(this.createCloseBtn());
    app.append(vocabularyBlock);
  }
  giveResult() {
    this.recognition.interimResults = false;
    app.innerHTML = "";

    const resultBlock = document.createElement("div");
    resultBlock.classList.add("main-section", "result-block");

    const h3 = document.createElement("h3");
    h3.textContent = "Decision result";

    const resultScore = document.createElement("div");
    resultScore.classList.add("result-score");

    const pRight = document.createElement("p");
    pRight.textContent = `Right - ${this.rightAnswers.length}`;

    const pWrong = document.createElement("p");
    pWrong.textContent = `Wrong - ${this.loseAnswers.length}`;

    const pPassed = document.createElement("p");
    pPassed.textContent = `Passed - ${this.skipAnswers.length}`;

    const resultButtons = document.createElement("div");
    resultButtons.classList.add("result-buttons");

    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.id = "try-again";
    tryAgainBtn.textContent = "Try again";

    const showResultBtn = document.createElement("button");
    showResultBtn.id = "show-result";
    showResultBtn.textContent = "Show results";

    const goToMenuBtn = document.createElement("button");
    goToMenuBtn.id = "go-to-menu";
    goToMenuBtn.textContent = "Menu";

    resultButtons.append(tryAgainBtn);
    resultButtons.append(showResultBtn);
    resultButtons.append(goToMenuBtn);

    resultScore.append(pRight);
    resultScore.append(pWrong);
    resultScore.append(pPassed);

    resultBlock.append(h3);
    resultBlock.append(resultScore);
    resultBlock.append(resultButtons);

    app.append(resultBlock);
  }
  askQuestion(question) {
    if (!this.swapsArr[0]) {
      this.giveResult();
    } else {
      app.innerHTML = "";
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("main-section", "question-block");

      const h3 = document.createElement("h3");
      h3.textContent = `${question.word}`;

      const input = document.createElement("input");
      input.type = "text";
      input.setAttribute("autofocus", "autofocus");
      input.id = "field-for-answer";

      const questionButtons = document.createElement("div");
      questionButtons.classList.add("question-buttons");

      const answerBtn = document.createElement("button");
      answerBtn.id = "give";
      answerBtn.textContent = "Give answer";

      const skipBtn = document.createElement("button");
      skipBtn.id = "skip";
      skipBtn.textContent = "Skip question";

      questionButtons.append(answerBtn);
      questionButtons.append(skipBtn);

      questionBlock.append(h3);
      questionBlock.append(input);
      questionBlock.append(questionButtons);

      questionBlock.append(this.createCloseBtn());
      app.append(questionBlock);
    }
  }
  startTask() {
    this.loseAnswers = [];
    this.skipAnswers = [];
    this.rightAnswers = [];
    this.swapsArr = [];

    const cloneArr = [...this.listQuestions];
    this.listQuestions.forEach(() => {
      this.swapsArr.push(
        ...cloneArr.splice(this.digitalRandom(0, cloneArr.length - 1), 1)
      );
    });
    this.askQuestion(this.swapsArr[0]);
  }
  giveAnswer() {
    if (this.inputValueAnswer.trim() === this.swapsArr[0].translation) {
      this.rightAnswers.push(this.swapsArr[0]);
    } else if (!this.inputValueAnswer.trim()) {
      alert("Write something");
      // !!! this.inputValueAnswer <- empty field !!!
      return;
    } else {
      this.loseAnswers.push({
        ...this.swapsArr[0],
        userAnswer: this.inputValueAnswer,
      });
    }

    this.inputValueAnswer = "";
    this.swapsArr.splice(0, 1);
    this.askQuestion(this.swapsArr[0]);
  }
  skipQuestion() {
    this.skipAnswers.push(this.swapsArr[0]);
    this.swapsArr.splice(0, 1);
    this.askQuestion(this.swapsArr[0]);
  }
  getListContent(answers, btn = false) {
    const fragment = new DocumentFragment();
    answers.forEach((answer, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${index + 1}. ${answer.word}</span> <span>${
        answer.translation
      }${
        btn ? `<button class='delete-item ${answer.id}'>-</button></span>` : ""
      }`;
      fragment.append(li);
    });
    return fragment;
  }
  showResults() {
    const results = document.createElement("div");
    results.classList.add("main-section", "extended-results");

    const resultsWrapper = document.createElement("div");
    resultsWrapper.classList.add("extended-results_wrapper");

    const resultsTrue = document.createElement("div");
    resultsTrue.classList.add("result-list");
    const resultsLose = document.createElement("div");
    resultsLose.classList.add("result-list");
    const resultsSkip = document.createElement("div");
    resultsSkip.classList.add("result-list");

    const h3Right = document.createElement("h3");
    const h3Lose = document.createElement("h3");
    const h3Skip = document.createElement("h3");
    h3Right.textContent = "Right";
    h3Lose.textContent = "Wrong";
    h3Skip.textContent = "Passed";

    const ulRight = document.createElement("ul");
    ulRight.append(this.getListContent(this.rightAnswers));
    const ulLose = document.createElement("ul");
    ulLose.append(this.getListContent(this.loseAnswers));
    const ulSkip = document.createElement("ul");
    ulSkip.append(this.getListContent(this.skipAnswers));

    resultsTrue.append(h3Right);
    resultsLose.append(h3Lose);
    resultsSkip.append(h3Skip);

    h3Right.after(ulRight);
    h3Lose.after(ulLose);
    h3Skip.after(ulSkip);

    resultsWrapper.append(resultsTrue);
    resultsWrapper.append(resultsLose);
    resultsWrapper.append(resultsSkip);
    results.append(resultsWrapper);
    results.append(this.createCloseBtn());

    app.append(results);
  }
  addWord() {
    this.listQuestions.push({
      id: Date.now(),
      word: this.inputValueNewWord,
      translation: this.inputValueNewWordTranslation,
    });
    localStorage.setItem("vocabularyList", JSON.stringify(this.listQuestions));
    this.openVocabulary();
  }
  popupConfirm(title = "") {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const popupConfirm = document.createElement("div");
    popupConfirm.classList.add("main-section", "popup-confirm");

    const popupNotice = document.createElement("h3");
    popupNotice.textContent = `${title}`;

    const buttonsBlock = document.createElement("div");
    buttonsBlock.classList.add("popup-confirm_buttons");

    const buttonYes = document.createElement("button");
    buttonYes.id = "yes";
    buttonYes.textContent = "Yes";

    const buttonNo = document.createElement("button");
    buttonNo.id = "no";
    buttonNo.textContent = "No";

    buttonsBlock.append(buttonYes);
    buttonsBlock.append(buttonNo);

    popupConfirm.append(popupNotice);
    popupConfirm.append(buttonsBlock);

    popup.append(popupConfirm);
    app.append(popup);
  }
  createPopup() {
    if (document.querySelector(".question-block")) {
      this.popupConfirm("Your progress will be lost, are you sure?");
    }
    if (document.querySelector(".extended-results")) {
      this.deleteExtendedResults();
    }
    if (document.querySelector(".vocabulary-block")) {
      this.openMenu();
    }
  }
  deleteExtendedResults() {
    document.querySelector(".extended-results").remove();
  }
  deletePopup() {
    document.querySelector(".popup").remove();
  }
  deleteItem(target) {
    this.listQuestions = this.listQuestions.filter(
      (question) => question.id !== +target.className.replace(/\w+-\w+\s+/, "")
    );
    localStorage.removeItem("vocabularyList");
    localStorage.setItem("vocabularyList", JSON.stringify(this.listQuestions));
    this.openVocabulary();
  }
  speechDetection(e) {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    if (transcript.includes("start")) {
      this.startTask();
      this.recognition.interimResults = false;
    }
    // разобраться и переписать
    if (transcript.includes("stop")) {
      this.createPopup();
    }
    if (transcript.includes("yes")) {
      this.openMenu();
    }
    if (transcript.includes("no")) {
      this.deletePopup();
    }
    // разобраться и переписать
    if (transcript.includes("vocabulary")) {
      this.openVocabulary();
    }
    if (transcript.includes("show")) {
      this.showResults();
    }
  }
  eventsListener() {
    this.recognition.interimResults = true;
    this.recognition.addEventListener(
      "result",
      this.speechDetection.bind(this)
    );
    this.recognition.addEventListener("end", this.recognition.start);

    this.recognition.start();

    document.addEventListener("click", (e) => {
      if (e.target.closest("#start") || e.target.closest("#try-again")) {
        this.startTask();
      }
      if (e.target.closest("#skip")) {
        this.skipQuestion();
      }
      if (e.target.closest("#give")) {
        this.giveAnswer();
      }
      if (e.target.closest("#show-result")) {
        this.showResults();
      }
      if (e.target.closest("#go-to-menu")) {
        this.openMenu();
      }
      if (e.target.closest("#vocabulary")) {
        this.openVocabulary();
      }
      if (e.target.closest("#add-word")) {
        this.addWord();
      }
      if (e.target.closest("#return-menu")) {
        this.createPopup();
      }
      if (e.target.closest("#yes")) {
        this.openMenu();
      }
      if (e.target.closest("#no")) {
        this.deletePopup();
      }
      if (e.target.closest(".delete-item")) {
        this.deleteItem(e.target);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (document.getElementById("add-word") && e.key === "Enter") {
        this.addWord();
      }
      if (document.getElementById("give") && e.key === "Enter") {
        this.giveAnswer();
      }
    });

    document.addEventListener("input", (e) => {
      if (e.target.closest("#field-for-answer")) {
        e.target.value = e.target.value.replace(/[\d]/g, "");
        this.inputValueAnswer = e.target.value;
      }
      if (e.target.closest("#vocabulary-input_word")) {
        e.target.value = e.target.value
          .replace(/[^a-z\s]/gi, "")
          .replace(/^[a-z]/, (u) => u.toUpperCase());
        this.inputValueNewWord = e.target.value;
      }
      if (e.target.closest("#vocabulary-input_translation")) {
        e.target.value = e.target.value
          .replace(/[^а-я\s/,]/gi, "")
          .replace(/^[а-я]/, (u) => u.toUpperCase());
        this.inputValueNewWordTranslation = e.target.value;
      }
    });
  }
}

const task = new TasksGenerate();
task.eventsListener();
