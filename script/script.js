//data
let MCQS = [
  {
    question: "HTTP stands for?",
    choice1: "Hyper Text Tranport Port",
    choice2: "Hyper Text Transport protocol",
    choice3: "hyper  Text Transfer Protocol",
    choice4: "Hyper Transport Text Protocol",
    answer: 2,
  },
  {
    question: "Which classes are computer threats?",
    choice1: "Dos Attack",
    choice2: "Phishing",
    choice3: "Soliciting",
    choice4: "Both A and C",
    answer: 0,
  },
  {
    question: "Which is unsolicited commercial email?",
    choice1: "Virus",
    choice2: "Malware",
    choice3: "Spam",
    choice4: "All of the above",
    answer: 2,
  },
  {
    question: "Which is used in WiFI hacking?",
    choice1: "Aircrack-ng",
    choice2: "Wireshark",
    choice3: "Norton",
    choice4: "All of the above",
    answer: 0,
  },
  {
    question: "which port and Ip scanner is common?",
    choice1: "Cain and Abel",
    choice2: "Angry IP Scanner",
    choice3: "Snort",
    choice4: "Ettercap",
    answer: 1,
  },
  {
    question: "In cyber security, there are____types of scanning:",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 2,
  },
  {
    question: "Which of the following is not a type of scanning?",
    choice1: "Xmas Tree Scan",
    choice2: "Cloud scan",
    choice3: "Null Scan",
    choice4: "SYN Stealth",
    answer: 1,
  },
  {
    question: " In system hacking, which is the most crucial activity?",
    choice1: "Information gathering",
    choice2: "Covering tracks",
    choice3: "Cracking passwords",
    choice4: "None of the above",
    answer: 2,
  },
  {
    question: "Which of the following are the types of scanning?",
    choice1: "Network, vulnerability, and port scanning",
    choice2: "Port, network, and services",
    choice3: "Client, Server, and network",
    choice4: "None of the above",
    answer: 0,
  },
  {
    question: "Which is considered as the first computer virus?",
    choice1: "Sasser",
    choice2: "Blaster",
    choice3: "Creeper",
    choice4: "Both A and C",
    answer: 2,
  },
];

//Start/end section
let start = document.querySelector("#start");
let end = document.querySelector("#end");

//Instruction section
let instructions = document.querySelector("#instructions");
let exit = document.querySelector("#Exit");
let continueBtn = document.querySelector("#continue");
let reset = document.querySelector("#reset_quiz");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//Quetion section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//multiple choice
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct/nextButton
let totalCorrect = document.querySelector("#total_correct");
let nextQuestion = document.querySelector("#next_question");

//Results
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//mcq choices
let choices = document.querySelectorAll(".choices");

let index = 0;
let timer = 20;
let interval = 0;

//total
let correct = 0;

//store answer value
let userAnswer = undefined;

//"start button"
start.addEventListener("click", () => {
  start.style.display = "none";
  instructions.style.display = "block";
  end.style.display = "none";
});

//"Exit button"
exit.addEventListener("click", () => {
  start.style.display = "block";
  instructions.style.display = "none";
  end.style.display = "none";
});

//"In quiz Exit button"
reset.addEventListener("click", () => {
  location.reload();
});

//"continue button"
continueBtn.addEventListener("click", () => {
  quiz.style.display = "block";
  instructions.style.display = "none";
  end.style.display = "none";

  interval = setInterval(countDown, 1000);
  qData();

  //remove all active class when click
  choices.forEach((removeActive) => {
    removeActive.classList.remove("active");
  });
  //totalCorrect.innerHTML = `${(correct = 0)}/${MCQS.length}`;
});

//Countdown Timer
let countDown = () => {
  if (timer === 0) {
    clearInterval(interval);
    nextQuestion.click();
  } else {
    timer--;
    time.innerText = timer;
  }
};
//setInterval(countDown, 1000);

let qData = () => {
  questionNo.innerText = index + 1 + ". ";
  questionText.innerText = MCQS[index].question;
  option1.innerText = MCQS[index].choice1;
  option2.innerText = MCQS[index].choice2;
  option3.innerText = MCQS[index].choice3;
  option4.innerText = MCQS[index].choice4;

  //timer start
  timer = 20;
};
qData();

//check quetion and answer
choices.forEach((choice, choiceNo) => {
  choice.addEventListener("click", () => {
    choice.classList.add("active");
    //check answer
    if (choiceNo === MCQS[index].answer) {
      correct++;
    } else {
      correct += 0;
    }
    //stop counter
    clearInterval(interval);

    //one choice oonly
    for (i = 0; i <= 3; i++) {
      choices[i].classList.add("disabled");
    }
  });
});

//"Next button"
nextQuestion.addEventListener("click", () => {
  if (index !== MCQS.length - 1) {
    index++;
    choices.forEach((removeActive) => {
      removeActive.classList.remove("active");
    });
    //question
    qData();

    //result
    totalCorrect.style.display = "block";
    totalCorrect.innerHTML = `${correct}/${MCQS.length}`;
    clearInterval(interval);
    interval = setInterval(countDown, 1000);
  } else {
    index = 0;

    //competed quiz
    clearInterval(interval);
    quiz.style.display = "none";
    points.innerHTML = `You got ${correct} out of ${MCQS.length}`;
    result.style.display = "block";
    end.style.display = "none";
  }
  for (i = 0; i <= 3; i++) {
    choices[i].classList.remove("disabled");
  }
});

//start again
startAgain.addEventListener("click", () => {
  location.reload();
});

//"quit Quiz"
quit.addEventListener("click", () => {
  instructions.style.display = "none";
  result.style.display = "none";
  end.style.display = "block";
});
