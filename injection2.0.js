// Extract all question IDs
const questionLinks = document.querySelectorAll('.ays_questions_nav_question');
const questionIDs = Array.from(questionLinks).map(el => el.dataset.id);

// Reference your quiz options variable here
const quizOptions = window.quizOptions_2; // <- Change this if needed

// Store results
const results = {};

questionIDs.forEach(qid => {
  const encoded = quizOptions?.[qid];
  if (!encoded) return;

  try {
    const decoded = JSON.parse(atob(encoded));
    const answers = decoded.question_answer;
    const correctValue = Object.keys(answers).find(k => answers[k] === "1");

    const label = document.querySelector(`input[value="${correctValue}"] + label`);
    const answerText = label ? label.textContent.trim() : `Answer ID: ${correctValue}`;

    results[qid] = answerText;
  } catch (e) {
    results[qid] = 'Decode error';
  }
});

console.log('✅ Extracted Answers:', results);
