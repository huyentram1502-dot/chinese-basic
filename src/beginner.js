
import {
  beginnerLessons,
  initials,
  finals,
  tones,
  pinyinExercises,
  beginnerConversations
} from './beginner-content.js'

import {
  isBeginnerLessonCompleted,
  isBeginnerLessonUnlocked,
  completeBeginnerLesson,
  getBeginnerLessonScore,
  getBeginnerProgress
} from './beginner-progress.js'

// ==========================================
// PANDA BEGINNER
// ==========================================

let currentLessonId = 1
let currentActivity = 'map'
let currentQuestionIndex = 0
let currentScore = 0
let selectedAnswer = null
let answered = false

const beginnerQuiz = [
  {
    question: 'Pinyin dùng để làm gì?',
    options: [
      'Ghi âm cách đọc tiếng Trung bằng chữ Latin',
      'Thay thế hoàn toàn chữ Hán',
      'Dịch tiếng Trung sang tiếng Việt'
    ],
    answer: 0
  },
  {
    question: 'Âm nào là thanh mẫu?',
    options: ['ā', 'b', 'ǎo'],
    answer: 1
  },
  {
    question: 'Vận mẫu đơn nào có cách đọc gần với âm “a”?',
    options: ['i', 'u', 'a'],
    answer: 2
  },
  {
    question: 'Âm nào biểu thị thanh 4?',
    options: ['ā', 'á', 'à'],
    answer: 2
  },
  {
    question: 'Pinyin của 你好 là gì?',
    options: ['Nǐ hǎo', 'Xièxie', 'Zàijiàn'],
    answer: 0
  }
]

function speakChinese(text) {
  if (!('speechSynthesis' in window)) {
    alert('Trình duyệt này chưa hỗ trợ đọc văn bản.')
    return
  }

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  utterance.rate = 0.75
  utterance.pitch = 1

  const voices = window.speechSynthesis.getVoices()
  const chineseVoice = voices.find(voice =>
    voice.lang.toLowerCase().startsWith('zh')
  )

  if (chineseVoice) {
    utterance.voice = chineseVoice
  }

  window.speechSynthesis.speak(utterance)
}

function getLesson(id) {
  return beginnerLessons.find(lesson => lesson.id === id)
}

function renderLessonMap() {
  const progress = getBeginnerProgress()

  return `
    <section class="beginner-map">
      <div class="beginner-map-heading">
        <div>
          <span class="beginner-eyebrow">PANDA WORLD · START HERE</span>
          <h2>Hành trình khám phá tiếng Trung</h2>
          <p>Hoàn thành từng bài để mở khóa chặng tiếp theo nhé!</p>
        </div>

        <div class="beginner-progress-circle">
          <strong>${progress.percentage}%</strong>
          <span>Hoàn thành</span>
        </div>
      </div>

      <div class="beginner-progress-track">
        <div style="width:${progress.percentage}%"></div>
      </div>

      <div class="beginner-progress-label">
        <span>${progress.completed}/${progress.total} bài học</span>
        <span>80 điểm để vượt qua mỗi bài</span>
      </div>

      <div class="beginner-lesson-grid">
        ${beginnerLessons.map((lesson, index) => {
          const unlocked = isBeginnerLessonUnlocked(lesson.id)
          const completed = isBeginnerLessonCompleted(lesson.id)
          const score = getBeginnerLessonScore(lesson.id)

          return `
            <button
              class="beginner-lesson-card ${completed ? 'is-completed' : ''} ${!unlocked ? 'is-locked' : ''}"
              data-beginner-lesson="${lesson.id}"
              ${!unlocked ? 'disabled' : ''}
            >
              <span class="beginner-lesson-number">
                ${String(index + 1).padStart(2, '0')}
              </span>

              <span class="beginner-lesson-icon">
                ${completed ? '🏆' : unlocked ? lesson.icon : '🔒'}
              </span>

              <strong>${lesson.title}</strong>
              <small>${lesson.description}</small>

              <span class="beginner-lesson-status">
                ${completed ? `Đã hoàn thành · ${score}/100` : unlocked ? 'Bắt đầu học →' : 'Chưa mở khóa'}
              </span>
            </button>
          `
        }).join('')}
      </div>
    </section>
  `
}

function renderOverview() {
  const lesson = getLesson(currentLessonId)

  return `
    <section class="beginner-activity">
      <button class="beginner-back" data-beginner-action="map">
        ← Quay lại lộ trình
      </button>

      <div class="beginner-activity-header">
        <span class="beginner-eyebrow">BÀI ${lesson.id} / 10</span>
        <h2>${lesson.icon} ${lesson.title}</h2>
        <p>${lesson.description}</p>
      </div>

      <div class="beginner-activity-menu">
        <button data-beginner-action="learn">
          <span>📖</span>
          <strong>Khám phá kiến thức</strong>
          <small>Học nội dung và cách phát âm</small>
        </button>

        <button data-beginner-action="practice">
          <span>🎧</span>
          <strong>Luyện tập</strong>
          <small>Nghe, nhận diện và ghép âm</small>
        </button>

        <button data-beginner-action="quiz">
          <span>🏆</span>
          <strong>Kiểm tra</strong>
          <small>5 câu hỏi · Đạt từ 80 điểm</small>
        </button>
      </div>
    </section>
  `
}

function renderInitials() {
  return `
    <div class="beginner-learning-content">
      <h3>21 thanh mẫu tiếng Trung</h3>
      <p>Chọn từng âm để nghe và xem hướng dẫn phát âm.</p>

      <div class="beginner-sound-grid">
        ${initials.map(item => `
          <button class="beginner-sound-card" data-speak="${item.example}">
            <strong>${item.hanzi}</strong>
            <span>${item.example}</span>
            <small>${item.guide}</small>
            <span>🔊 Nghe</span>
          </button>
        `).join('')}
      </div>
    </div>
  `
}

function renderFinals() {
  return `
    <div class="beginner-learning-content">
      <h3>Khám phá vận mẫu</h3>
      <p>Vận mẫu là phần nguyên âm trong một âm tiết Pinyin.</p>

      ${finals.map(group => `
        <section class="beginner-sound-group">
          <h4>${group.group}</h4>

          <div class="beginner-sound-grid">
            ${group.items.map(item => `
              <button class="beginner-sound-card" data-speak="${item.example}">
                <strong>${item.pinyin}</strong>
                <span>${item.example}</span>
                <small>${item.guide}</small>
                <span>🔊 Nghe</span>
              </button>
            `).join('')}
          </div>
        </section>
      `).join('')}
    </div>
  `
}

function renderTones() {
  return `
    <div class="beginner-learning-content">
      <h3>Năm thanh điệu tiếng Trung</h3>
      <p>Cùng một âm tiết có thể mang ý nghĩa khác nhau khi thay đổi thanh điệu.</p>

      <div class="beginner-tone-list">
        ${tones.map(tone => `
          <button class="beginner-tone-card" data-speak="${tone.example}">
            <strong>${tone.symbol}</strong>
            <span>${tone.name}</span>
            <small>${tone.description}</small>
            <small>Ví dụ: ${tone.example} · ${tone.meaning}</small>
            <span>🔊 Nghe phát âm</span>
          </button>
        `).join('')}
      </div>
    </div>
  `
}

function renderBlending() {
  return `
    <div class="beginner-learning-content">
      <h3>Luyện ghép âm Pinyin</h3>
      <p>Ghép thanh mẫu và vận mẫu để tạo thành âm tiết hoàn chỉnh.</p>

      <div class="beginner-blending-list">
        ${pinyinExercises.map(item => `
          <button class="beginner-blending-card" data-speak="${item.answer}">
            <span>${item.initial}</span>
            <span>+</span>
            <span>${item.final}</span>
            <span>=</span>
            <strong>${item.answer}</strong>
            <small>${item.meaning}</small>
            🔊
          </button>
        `).join('')}
      </div>
    </div>
  `
}

function renderConversation() {
  return `
    <div class="beginner-learning-content">
      <h3>Những câu giao tiếp đầu tiên</h3>

      ${beginnerConversations.map(item => `
        <div class="beginner-conversation-card">
          <div>
            <strong>${item.hanzi}</strong>
            <span>${item.pinyin}</span>
            <small>${item.meaning}</small>
            <button data-speak="${item.hanzi}">🔊 Nghe câu</button>
          </div>

          <div>
            <strong>${item.reply}</strong>
            <span>${item.replyPinyin}</span>
            <small>${item.replyMeaning}</small>
            <button data-speak="${item.reply}">🔊 Nghe trả lời</button>
          </div>
        </div>
      `).join('')}
    </div>
  `
}

function renderLearning() {
  const lesson = getLesson(currentLessonId)

  let content = ''

  switch (lesson.type) {
    case 'intro':
      content = `
        <div class="beginner-learning-content">
          <h3>Pinyin là gì?</h3>
          <p>Pinyin (拼音) là hệ thống phiên âm dùng chữ cái Latin để biểu thị cách phát âm tiếng Phổ thông Trung Quốc.</p>

          <div class="beginner-explanation-card">
            <strong>Ví dụ: 你好</strong>
            <h2>Nǐ hǎo</h2>
            <p>Xin chào</p>
            <button data-speak="你好">🔊 Nghe mẫu</button>
          </div>

          <h4>Một âm tiết Pinyin thường gồm:</h4>
          <div class="beginner-pinyin-structure">
            <span>Thanh mẫu</span>
            <b>+</b>
            <span>Vận mẫu</span>
            <b>+</b>
            <span>Thanh điệu</span>
          </div>

          <p>Ví dụ: b + a + thanh 1 = bā</p>
          <p>Lưu ý: Một số âm tiết không có thanh mẫu, được gọi là âm tiết bắt đầu bằng thanh mẫu zero.</p>
        </div>
      `
      break

    case 'initials':
      content = renderInitials()
      break

    case 'finals':
      content = renderFinals()
      break

    case 'tones':
      content = renderTones()
      break

    case 'blending':
      content = renderBlending()
      break

    case 'listening':
      content = `
        <div class="beginner-learning-content">
          <h3>Nghe và nhận diện âm</h3>
          <p>Nghe âm mẫu, sau đó chọn Pinyin tương ứng trong phần kiểm tra.</p>
          <div class="beginner-explanation-card">
            <h2>🎧</h2>
            <p>Hãy luyện nghe từng âm thật chậm và chú ý thanh điệu.</p>
            <button data-speak="mā má mǎ mà">🔊 Nghe bốn thanh điệu</button>
          </div>
        </div>
      `
      break

    case 'hanzi':
      content = `
        <div class="beginner-learning-content">
          <h3>Làm quen với chữ Hán</h3>
          <p>Bắt đầu nhận biết những chữ Hán đơn giản và thường gặp.</p>
          <div class="beginner-hanzi-grid">
            ${[
              ['人', 'rén', 'Người'],
              ['口', 'kǒu', 'Miệng'],
              ['日', 'rì', 'Mặt trời, ngày'],
              ['月', 'yuè', 'Mặt trăng, tháng'],
              ['山', 'shān', 'Núi'],
              ['水', 'shuǐ', 'Nước']
            ].map(item => `
              <button class="beginner-hanzi-card" data-speak="${item[0]}">
                <strong>${item[0]}</strong>
                <span>${item[1]}</span>
                <small>${item[2]}</small>
                🔊
              </button>
            `).join('')}
          </div>
        </div>
      `
      break

    case 'conversation':
      content = renderConversation()
      break

    default:
      content = renderInitials()
  }

  return `
    <section class="beginner-activity">
      <button class="beginner-back" data-beginner-action="overview">
        ← Quay lại bài học
      </button>

      <div class="beginner-activity-header">
        <span class="beginner-eyebrow">PANDA BEGINNER</span>
        <h2>${lesson.title}</h2>
      </div>

      ${content}

      <div class="beginner-bottom-actions">
        <button data-beginner-action="overview">Quay lại</button>
        <button class="beginner-primary-button" data-beginner-action="practice">
          Tiếp tục luyện tập →
        </button>
      </div>
    </section>
  `
}

function renderPractice() {
  return `
    <section class="beginner-activity">
      <button class="beginner-back" data-beginner-action="overview">
        ← Quay lại bài học
      </button>

      <div class="beginner-activity-header">
        <span class="beginner-eyebrow">PRACTICE TIME</span>
        <h2>🎧 Luyện tập Pinyin</h2>
        <p>Nghe lại âm mẫu và luyện đọc theo.</p>
      </div>

      <div class="beginner-practice-card">
        <h3>Nghe và đọc theo</h3>
        <button class="beginner-audio-button" data-speak="nǐ hǎo mā má mǎ mà">
          🔊 Phát âm mẫu
        </button>
        <p>Hãy đọc theo từng âm và chú ý sự khác nhau giữa các thanh điệu.</p>
        <small>Phiên bản hiện tại sử dụng giọng đọc có sẵn trên thiết bị, chưa chấm điểm phát âm bằng micro.</small>
      </div>

      <button class="beginner-primary-button" data-beginner-action="quiz">
        Bắt đầu kiểm tra →
      </button>
    </section>
  `
}

function renderQuiz() {
  const question = beginnerQuiz[currentQuestionIndex]

  if (!question) return ''

  return `
    <section class="beginner-activity">
      <div class="beginner-quiz-header">
        <span class="beginner-eyebrow">KIỂM TRA NHẬP MÔN</span>
        <h2>Câu ${currentQuestionIndex + 1}/${beginnerQuiz.length}</h2>
        <div class="beginner-progress-track">
          <div style="width:${((currentQuestionIndex + 1) / beginnerQuiz.length) * 100}%"></div>
        </div>
      </div>

      <div class="beginner-quiz-card">
        <h3>${question.question}</h3>

        <div class="beginner-answer-list">
          ${question.options.map((option, index) => `
            <button
              class="beginner-answer-option ${
                answered && index === question.answer ? 'is-correct' : ''
              } ${
                answered && selectedAnswer === index && index !== question.answer
                  ? 'is-wrong'
                  : ''
              }"
              data-beginner-answer="${index}"
              ${answered ? 'disabled' : ''}
            >
              ${option}
            </button>
          `).join('')}
        </div>

        ${answered ? `
          <p class="beginner-answer-feedback">
            ${selectedAnswer === question.answer ? '🎉 Chính xác!' : `Chưa chính xác. Đáp án đúng: ${question.options[question.answer]}`}
          </p>

          <button class="beginner-primary-button" data-beginner-action="next-question">
            ${currentQuestionIndex === beginnerQuiz.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo →'}
          </button>
        ` : ''}
      </div>
    </section>
  `
}

function renderResult() {
  const score = Math.round(currentScore / beginnerQuiz.length * 100)
  const passed = score >= 80

  return `
    <section class="beginner-activity beginner-result">
      <div class="beginner-result-icon">${passed ? '🏆' : '🐼'}</div>
      <span class="beginner-eyebrow">KẾT QUẢ BÀI HỌC</span>
      <h2>${passed ? 'Tuyệt vời! Bạn đã hoàn thành!' : 'Cố gắng thêm một chút nhé!'}</h2>
      <strong class="beginner-result-score">${score}/100</strong>
      <p>${passed ? 'Bạn đã vượt qua bài học này.' : 'Bạn cần đạt ít nhất 80 điểm. Hãy ôn tập và thử lại nhé!'}</p>

      <div class="beginner-result-actions">
        ${passed ? `
          <button class="beginner-primary-button" data-beginner-action="map">
            Quay lại lộ trình
          </button>
        ` : `
          <button class="beginner-primary-button" data-beginner-action="retry">
            Làm lại bài kiểm tra
          </button>
        `}
      </div>
    </section>
  `
}

function renderCurrentView() {
  if (currentActivity === 'overview') return renderOverview()
  if (currentActivity === 'learn') return renderLearning()
  if (currentActivity === 'practice') return renderPractice()
  if (currentActivity === 'quiz') return renderQuiz()
  if (currentActivity === 'result') return renderResult()

  return renderOverview()
}

// Hàm render chính, có thể gắn vào một vùng riêng trong ứng dụng
export function renderBeginner(target = document.querySelector('#app')) {
  if (!target) return

  target.innerHTML = `
    <div class="beginner-world">
      <header class="beginner-hero">
        <div>
          <span class="beginner-eyebrow">WELCOME TO PANDA WORLD</span>
          <h1>🐼 Panda Beginner</h1>
          <p>Khởi đầu hành trình chinh phục tiếng Trung từ những âm đầu tiên!</p>
        </div>
        <div class="beginner-hero-mascot">🐼</div>
      </header>

      ${currentActivity === 'map'
        ? renderLessonMap()
        : renderCurrentView()}
    </div>
  `

  target.querySelectorAll('[data-beginner-lesson]').forEach(button => {
    button.addEventListener('click', () => {
      currentLessonId = Number(button.dataset.beginnerLesson)
      currentActivity = 'overview'
      currentQuestionIndex = 0
      currentScore = 0
      selectedAnswer = null
      answered = false
      renderBeginner(target)
    })
  })

  target.querySelectorAll('[data-beginner-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.beginnerAction

      if (action === 'map') {
        currentActivity = 'map'
      } else if (action === 'overview') {
        currentActivity = 'overview'
      } else if (action === 'learn' || action === 'practice' || action === 'quiz') {
        currentActivity = action

        if (action === 'quiz') {
          currentQuestionIndex = 0
          currentScore = 0
          selectedAnswer = null
          answered = false
        }
      } else if (action === 'next-question') {
        if (selectedAnswer === beginnerQuiz[currentQuestionIndex].answer) {
          currentScore++
        }

        currentQuestionIndex++
        selectedAnswer = null
        answered = false

        if (currentQuestionIndex >= beginnerQuiz.length) {
          const score = Math.round(currentScore / beginnerQuiz.length * 100)
          completeBeginnerLesson(currentLessonId, score)
          currentActivity = 'result'
        }
      } else if (action === 'retry') {
        currentQuestionIndex = 0
        currentScore = 0
        selectedAnswer = null
        answered = false
        currentActivity = 'quiz'
      }

      renderBeginner(target)
    })
  })

  target.querySelectorAll('[data-beginner-answer]').forEach(button => {
    button.addEventListener('click', () => {
      if (answered) return

      selectedAnswer = Number(button.dataset.beginnerAnswer)
      answered = true
      renderBeginner(target)
    })
  })

  target.querySelectorAll('[data-speak]').forEach(button => {
    button.addEventListener('click', () => {
      speakChinese(button.dataset.speak)
    })
  })
}

// Trả về giao diện bản đồ ngay khi mở chương trình
export function showBeginnerMap(target = document.querySelector('#app')) {
  currentActivity = 'map'
  renderBeginner(target)
}
