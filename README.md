# 🧠 Quiz Answer Extractor

This guide helps you extract **correct answers** from a JavaScript-based quiz interface directly through the browser’s **DevTools Console**.

---

## 📋 How It Works

The quiz stores answers in a global object like:


window.quizOptions_2 = {
  '60': 'eyJxdWVzdGlvbl9hbnN3ZXIiOnsiMjI1IjoiMCIsIjIyNiI6IjAiLCIyMjMiOiIxIiwiMjI0IjoiMCJ9fQ==',

Each entry is:

A question ID (60)

A Base64-encoded JSON string showing which answer is correct

This script:

Extracts all question IDs from the quiz navigation.

Decodes the Base64 strings.

Finds the correct answer.

Pulls the matching text from the DOM.

⚙️ How to Use
Step 1: Open the Console
Press F12 or Ctrl + Shift + I

Go to the Console tab

Step 2: Paste & Run the Script
js
Copy
Edit
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
✅ Output
You’ll get an object mapping each question ID to the correct answer text:

js
Copy
Edit
{
  "60": "Talk to users, sketch an MVP, and share publicly for feedback",
  "34": "Correct answer for Q34",
  ...
}
🧩 Troubleshooting
If nothing appears in the console:

Confirm that window.quizOptions_2 exists.

Make sure the quiz page is fully loaded.

Some questions might not render labels directly — check the DOM structure.

⚠️ Disclaimer
This tool is for educational and ethical use only. Do not use it to cheat, violate academic integrity, or break terms of service of any website.

