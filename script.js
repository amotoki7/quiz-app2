const questions = [
  {
    question: '日本で最も高い山はどれですか？',
    choices: ['北岳', '槍ヶ岳', '富士山', '奥穂高岳'],
    correct: 2,
  },
  {
    question: '世界で最も面積が大きい国はどこですか？',
    choices: ['アメリカ', 'カナダ', '中国', 'ロシア'],
    correct: 3,
  },
  {
    question: '人体の血液を全身に送り出す臓器はどれですか？',
    choices: ['肺', '肝臓', '心臓', '腎臓'],
    correct: 2,
  },
  {
    question: '光が1秒間に進む距離として最も近いものはどれですか？',
    choices: ['約3万km', '約30万km', '約300万km', '約3000万km'],
    correct: 1,
  },
  {
    question: '日本の国会議事堂が建っている都道府県はどこですか？',
    choices: ['神奈川県', '埼玉県', '千葉県', '東京都'],
    correct: 3,
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const quizScreen   = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const progressBar  = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const questionEl   = document.getElementById('question');
const choicesEl    = document.getElementById('choices');
const feedbackEl   = document.getElementById('feedback');
const nextBtn      = document.getElementById('next-btn');
const scoreEl      = document.getElementById('score');
const commentEl    = document.getElementById('result-comment');
const retryBtn     = document.getElementById('retry-btn');

function renderQuestion() {
  answered = false;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  nextBtn.style.display = 'none';

  const q = questions[currentIndex];
  const total = questions.length;

  progressBar.style.width = `${(currentIndex / total) * 100}%`;
  progressText.textContent = `${currentIndex + 1} / ${total}`;
  questionEl.textContent = `Q${currentIndex + 1}. ${q.question}`;

  choicesEl.innerHTML = '';
  q.choices.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = text;
    btn.addEventListener('click', () => handleAnswer(i));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll('.choice-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
  });

  if (selectedIndex === q.correct) {
    score++;
    feedbackEl.textContent = '正解！';
    feedbackEl.classList.add('correct');
  } else {
    buttons[selectedIndex].classList.add('incorrect');
    feedbackEl.textContent = `不正解… 正解は「${q.choices[q.correct]}」です。`;
    feedbackEl.classList.add('incorrect');
  }

  const isLast = currentIndex === questions.length - 1;
  nextBtn.textContent = isLast ? '結果を見る' : '次の問題へ';
  nextBtn.style.display = 'block';
}

function showResult() {
  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  const total = questions.length;
  scoreEl.textContent = `${total}問中 ${score}問正解`;

  const ratio = score / total;
  if (ratio === 1)        commentEl.textContent = '全問正解！素晴らしい！';
  else if (ratio >= 0.8)  commentEl.textContent = 'あと少し！惜しかったですね。';
  else if (ratio >= 0.6)  commentEl.textContent = 'まずまずの結果です。復習してみましょう！';
  else                    commentEl.textContent = 'もう一度チャレンジしてみましょう！';
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

retryBtn.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  resultScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  renderQuestion();
});

renderQuestion();
