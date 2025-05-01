let currentQuestion = 0;
let score = 0;
let questions = [];

// Ambil data dari soal.json
fetch('soal.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(error => {
    console.error("Gagal memuat soal:", error);
    document.getElementById('question-text').innerText = "Gagal memuat soal.";
  });

// Tampilkan soal ke layar
function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById('question-text').innerText = `Soal ${currentQuestion + 1}: ${question.soal}`;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  question.pilihan.forEach(option => {
    const button = document.createElement('button');
    button.className = 'btn btn-outline-primary w-100 my-2';
    button.innerText = option;
    button.onclick = () => selectAnswer(button, option);
    optionsContainer.appendChild(button);
  });
}

// Cek jawaban yang dipilih
function selectAnswer(button, selected) {
  const correct = questions[currentQuestion].jawaban;
  const buttons = document.querySelectorAll('#options button');

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correct) {
      btn.classList.replace('btn-outline-primary', 'btn-success');
    } else if (btn.innerText === selected) {
      btn.classList.replace('btn-outline-primary', 'btn-danger');
    }
  });

  if (selected === correct) {
    score++;
  }
}

// Pindah ke soal berikutnya
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    document.getElementById('quiz-box').style.display = 'none';
    document.getElementById('result').innerText = `Kuis selesai! Skor Anda: ${score} dari ${questions.length}`;
  }
}
