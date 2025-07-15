const questionLinks = document.querySelectorAll('.ays_questions_nav_question');
const questionIDs = Array.from(questionLinks).map(el => el.dataset.id);

const results = {};

questionIDs.forEach(qid => {
  const encoded = window.quizOptions_2[qid];
  if (!encoded) return;

  const decoded = JSON.parse(atob(encoded));
  const answers = decoded.question_answer;
  const correctValue = Object.keys(answers).find(key => answers[key] === "1");

  const label = document.querySelector(`input[value="${correctValue}"] + label`);
  const answerText = label ? label.textContent.trim() : 'Label not found';

  results[qid] = answerText;
});

console.log(results);
