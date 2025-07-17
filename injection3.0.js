const questionLinks = document.querySelectorAll('.ays_questions_nav_question');
const questionIDs = Array.from(questionLinks).map(el => el.dataset.id);
const results = {};

questionIDs.forEach(qid => {
  const encoded = window.quizOptions_2?.[qid];
  if (!encoded) {
    console.warn(`No data found for QID: ${qid}`);
    return;
  }

  try {
    const decoded = JSON.parse(atob(encoded));
    const answers = decoded.question_answer;
    const correctValues = Object.keys(answers).filter(key => answers[key] === "1");

    const answerTexts = correctValues.map(val => {
      const input = document.querySelector(`input[value="${val}"]`);
      if (!input) return "?";
      // Try sibling label or "for" attribute
      const label = input.nextElementSibling?.tagName === "LABEL" 
        ? input.nextElementSibling 
        : document.querySelector(`label[for="${input.id}"]`);
      return label?.textContent.trim() || "?";
    });

    results[qid] = answerTexts.join("; ");
  } catch (e) {
    console.error(`Error decoding QID ${qid}:`, e);
    results[qid] = "DECODE_ERROR";
  }
});

console.log("Correct Answers:", results);
// Copy to clipboard (for easy pasting)
copy(results); // Only works in browsers supporting `copy()`
