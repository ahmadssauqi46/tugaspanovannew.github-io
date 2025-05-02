let currentQuestion = 0;
let score = 0;
let questions = [];

// Ambil data soal dari JSON
fetch('soal.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
  })
  .catch(error => {
    console.error("Gagal memuat soal:", error);
    document.getElementById('question-text').innerText = "Gagal memuat soal.";
  });

// Fungsi mulai kuis
function startQuiz() {
  document.getElementById('start-screen').classList.add('d-none');
  document.getElementById('quiz-box').classList.remove('d-none');
  showQuestion();
}

// Tampilkan soal
function showQuestion() {
  const questionBox = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const question = questions[currentQuestion];

  if (!question) {
    questionBox.innerText = "Soal tidak tersedia.";
    return;
  }

  questionBox.innerText = question.soal;
  optionsContainer.innerHTML = '';

  question.pilihan.forEach(option => {
    const button = document.createElement('button');
    button.className = 'btn btn-outline-warning w-100 my-2 option-btn';
    button.innerText = option;
    button.onclick = () => selectAnswer(button, option);
    optionsContainer.appendChild(button);
  });
}

// Pilih jawaban
function selectAnswer(button, selected) {
  const correct = questions[currentQuestion].jawaban;
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correct) {
      btn.classList.replace('btn-outline-warning', 'btn-success');
    } else if (btn.innerText === selected) {
      btn.classList.replace('btn-outline-warning', 'btn-danger');
    }
  });

  if (selected === correct) {
    score++;
  }
}

// Tombol berikutnya
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    document.getElementById('quiz-box').innerHTML = `
      <h2 class="text-warning">Kuis Selesai!</h2>
      <p class="fs-4">Skor Anda: ${score} dari ${questions.length}</p>
      <button class="btn btn-outline-light mt-3" onclick="location.reload()">Coba Lagi</button>
    `;
  }
}

//tombol sebelum
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}
