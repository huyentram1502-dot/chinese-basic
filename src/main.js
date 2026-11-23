
import './style.css'
import {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  onAuthChange
} from './auth.js'

import { vocabulary, vocabularyCategories } from './vocabulary.js'
import { mountPandaGame } from './panda-game.js'
import { renderRoadmap } from './roadmap.js'
import { curriculum, stages } from './curriculum.js'
import { renderBeginner, showBeginnerMap } from './beginner.js'

import {
  isStageUnlocked,
  getCompletedStages,
  getLessonProgress
} from './progress.js'

// ==============================
// CẤU HÌNH ỨNG DỤNG
// ==============================

const levels = ['nhập môn', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6']

const navItems = [
  { id: 'home', icon: '🏠', label: 'Trang chủ' },
  { id: 'roadmap', icon: '🗺️', label: 'Panda World' },
  { id: 'beginner', icon: '🐼', label: 'Nhập môn' },
  { id: 'vocabulary', icon: '📚', label: 'Từ vựng' },
  { id: 'writing', icon: '✍️', label: 'Luyện viết' },
  { id: 'sentence', icon: '🧩', label: 'Ghép câu' },
  { id: 'grammar', icon: '📖', label: 'Ngữ pháp' },
  { id: 'listening', icon: '🎧', label: 'Nghe – Nói' },
  { id: 'profile', icon: '🏆', label: 'Thành tích' }
]

let currentPage = 'auth'
let currentLevel = 'HSK 1'
let currentLesson = 'all'
let currentTopic = 'Tất cả chủ đề'
let currentCategory = 'all'
let currentIndex = 0
let showMeaning = false

let currentLessonId = 1
let currentStageId = 1

let learned = JSON.parse(localStorage.getItem('learnedWords') || '[]')

const app = document.querySelector('#app')

let destroyPandaGame = null
// Trạng thái tài khoản Panda World
let currentUser = null
let authMode = 'login'
let authMessage = ''
let authLoading = false

// ==============================
// TỪ VỰNG
// ==============================

function getWords() {
  return vocabulary.filter(word =>
    word.level === currentLevel &&
    (currentLesson === 'all' || word.lesson === Number(currentLesson)) &&
    (currentTopic === 'Tất cả chủ đề' || word.topic === currentTopic) &&
    (currentCategory === 'all' || word.category === currentCategory)
  )
}

function speak(text) {
  if (!('speechSynthesis' in window)) {
    alert('Trình duyệt không hỗ trợ phát âm.')
    return
  }

  window.speechSynthesis.cancel()

  const voice = new SpeechSynthesisUtterance(text)
  voice.lang = 'zh-CN'
  voice.rate = 0.85

  window.speechSynthesis.speak(voice)
}

// ==============================
// ĐIỀU HƯỚNG
// ==============================

function changePage(page) {
  currentPage = page
  render()
}

function sidebar() {
  return `
    <aside class="sidebar">

      <div class="logo">CHINESE<span> BASIC</span></div>

      <p class="sidebar-caption">MENU HỌC TẬP</p>

      <nav>
        ${navItems.map(item => `
          <button
            class="nav-item ${currentPage === item.id ? 'active' : ''}"
            data-page="${item.id}"
          >
            <span>${item.icon}</span>
            ${item.label}
          </button>
        `).join('')}
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-tip">
          每天进步一点点 🌱
          <br>
          <small>Mỗi ngày tiến bộ một chút</small>
        </div>
      </div>

    </aside>
  `
}

function bottomNav() {
  const mobileItems = [
    navItems[0],
    navItems[1],
    navItems[2],
    navItems[4],
    navItems[7]
  ]

  return `
    <nav class="mobile-nav">
      ${mobileItems.map(item => `
        <button
          class="${currentPage === item.id ? 'active' : ''}"
          data-page="${item.id}"
        >
          <span>${item.icon}</span>
          <small>${item.label}</small>
        </button>
      `).join('')}
    </nav>
  `
}

// ==============================
// TRANG CHỦ
// ==============================
// DÁN HÀM authPage() VÀO ĐÂY

function authPage() {
  return `
    <section class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">🐼</div>

        <h1>PANDA WORLD</h1>
        <p>Học tiếng Trung mỗi ngày</p>

        <div class="auth-tabs">
          <button
            type="button"
            data-auth-mode="login"
            class="${authMode === 'login' ? 'active' : ''}"
          >
            Đăng nhập
          </button>

          <button
            type="button"
            data-auth-mode="signup"
            class="${authMode === 'signup' ? 'active' : ''}"
          >
            Đăng ký
          </button>
        </div>

        <form id="auth-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email"
            required
          >

          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            placeholder="Ít nhất 6 ký tự"
            minlength="6"
            required
          >

          <button type="submit">
            ${authMode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>
        </form>

        <p class="auth-message">${authMessage}</p>
      </div>
    </section>
  `
}

function homePage() {
  
  const total = vocabulary.length

  const percent = total
    ? Math.min(100, Math.round(learned.length / total * 100))
    : 0

  return `
    <section class="welcome-banner">

      <div>
        <p class="eyebrow">欢迎来到 CHINESE BASIC</p>

        <h1>你好！Xin chào 👋</h1>

        <p>
          Cùng học tiếng Trung mỗi ngày,
          từng bước chinh phục HSK.
        </p>

        <button class="banner-button" data-page="roadmap">
          Khám phá Panda World →
        </button>
      </div>

      <div class="banner-illustration">你好</div>

    </section>

    <section class="stats-grid">

      <div class="stat-card blue">
        <span>📚</span>
        <div>
          <strong>${total}</strong>
          <small>Từ vựng hiện có</small>
        </div>
      </div>

      <div class="stat-card green">
        <span>✅</span>
        <div>
          <strong>${learned.length}</strong>
          <small>Từ đã học</small>
        </div>
      </div>

      <div class="stat-card orange">
        <span>🎯</span>
        <div>
          <strong>${percent}%</strong>
          <small>Tiến độ từ vựng</small>
        </div>
      </div>

    </section>

    <section class="content-section">

      <div class="section-title">
        <div>
          <p class="eyebrow">YOUR LEARNING PATH</p>
          <h2>Khu vực học tập</h2>
        </div>
      </div>

      <div class="feature-grid">

        ${[
          ['roadmap', '🗺️', 'Panda World', 'Khám phá lộ trình HSK', 'feature-blue'],
          ['vocabulary', '📚', 'Từ vựng', 'Học từ mới theo HSK và chủ đề', 'feature-green'],
          ['writing', '✍️', 'Luyện viết', 'Luyện nhớ và viết chữ Hán', 'feature-orange'],
          ['sentence', '🧩', 'Ghép câu', 'Sắp xếp từ thành câu hoàn chỉnh', 'feature-purple'],
          ['grammar', '📖', 'Ngữ pháp', 'Học cấu trúc và ví dụ tiếng Trung', 'feature-pink'],
          ['listening', '🎧', 'Nghe – Nói', 'Luyện nghe và phát âm', 'feature-teal']
        ].map(item => `
          <button class="feature-card ${item[4]}" data-page="${item[0]}">
            <span class="feature-icon">${item[1]}</span>
            <strong>${item[2]}</strong>
            <small>${item[3]}</small>
            <span class="feature-arrow">Khám phá →</span>
          </button>
        `).join('')}

      </div>

    </section>

    <section class="content-section">

      <div class="section-title">
        <div>
          <p class="eyebrow">PANDA ADVENTURE</p>
          <h2>🐼 Góc giải trí – Bắt gấu trúc</h2>
        </div>
      </div>

      <div id="panda-game-home"></div>

    </section>

    <section class="content-section">

      <div class="section-title">
        <div>
          <p class="eyebrow">DAILY GOAL</p>
          <h2>Mục tiêu học tập</h2>
        </div>
      </div>

      <div class="goal-card">

        <div class="goal-icon">🌱</div>

        <div class="goal-info">
          <strong>Học 10 từ mới mỗi ngày</strong>

          <p>Hãy duy trì thói quen học tập của bạn.</p>

          <div class="progress-track">
            <div style="width:${percent}%"></div>
          </div>

          <small>${learned.length} / ${total} từ đã được đánh dấu học</small>
        </div>

      </div>

    </section>
  `
}

// ==============================
// PANDA WORLD
// ==============================

function roadmapPage() {
  return `
    <section class="page-heading">
      <p class="eyebrow">CHINESE BASIC ADVENTURE</p>
      <h1>🐼 Panda World</h1>
      <p>Chọn vùng đất HSK và bắt đầu hành trình học tiếng Trung.</p>
    </section>

    <div id="roadmap-view"></div>
  `
}

// ==============================
// NHÀ GẤU TRÚC – BÀI HỌC
// ==============================

function getCurrentLesson() {
  const book = curriculum.find(item => item.level === currentLevel)

  if (!book) return null

  return book.lessons.find(
    lesson => lesson.id === currentLessonId
  ) || null
}

function lessonPage() {
  const lesson = getCurrentLesson()

  if (!lesson) {
    return `
      <section class="coming-card">
        <div>🐼</div>
        <h2>Không tìm thấy bài học</h2>
        <button class="action-blue" data-page="roadmap">
          Quay lại Panda World
        </button>
      </section>
    `
  }

  const completedStages = getCompletedStages(
    currentLevel,
    currentLessonId
  )

  const lessonProgress = getLessonProgress(
    currentLevel,
    currentLessonId
  )

  return `
    <section class="page-heading">

      <p class="eyebrow">
        PANDA HOUSE · ${currentLevel}
      </p>

      <h1>🏡 Nhà Gấu Trúc</h1>

      <p>${lesson.title} – ${lesson.vietnamese}</p>

      <button class="action-light" data-action="back-roadmap">
        ← Quay lại bản đồ
      </button>

    </section>

    <section class="panda-level-summary">

      <div class="panda-summary-heading">
        <div>
          <span class="roadmap-label">${currentLevel}</span>
          <h2>🐼 ${lesson.vietnamese}</h2>
          <p>Hãy khám phá từng căn phòng để hoàn thành bài học.</p>
        </div>

        <div class="panda-summary-icon">🏡</div>
      </div>

      <div class="panda-progress-info">
        <span>🌱 Tiến độ bài học</span>
        <strong>${lessonProgress.completedStages}/${stages.length} chặng</strong>
      </div>

      <div class="panda-progress-track">
        <div style="width:${Math.round(lessonProgress.completedStages / stages.length * 100)}%"></div>
      </div>

    </section>

    <section class="content-section">

      <div class="section-title">
        <div>
          <p class="eyebrow">EXPLORE THE HOUSE</p>
          <h2>🚪 Khám phá 5 căn phòng học tập</h2>
        </div>
      </div>

      <div class="feature-grid">

        ${stages.map(stage => {
          const unlocked = isStageUnlocked(
            currentLevel,
            currentLessonId,
            stage.id
          )

          const completed = completedStages.includes(stage.id)

          return `
            <button
              class="feature-card ${completed ? 'feature-green' : 'feature-blue'}"
              data-stage="${stage.id}"
              ${!unlocked ? 'disabled' : ''}
              style="${!unlocked ? 'opacity:0.5;cursor:not-allowed;' : ''}"
            >

              <span class="feature-icon">
                ${completed ? '⭐' : unlocked ? stage.icon : '🔒'}
              </span>

              <strong>Chặng ${stage.id}: ${stage.name}</strong>

              <small>${stage.description}</small>

              <span class="feature-arrow">
                ${completed ? 'Đã hoàn thành ✓' : unlocked ? 'Khám phá →' : 'Chưa mở khóa'}
              </span>

            </button>
          `
        }).join('')}

      </div>

    </section>

    <section class="content-section">

      <div class="section-title">
        <div>
          <p class="eyebrow">PANDA ADVENTURE</p>
          <h2>🐼 Trò chơi bắt gấu trúc</h2>
        </div>
      </div>

      <div id="panda-game-lesson"></div>

    </section>
  `
}

// ==============================
// MÀN HÌNH TỪNG CHẶNG
// ==============================

function stagePage() {
  const stage = stages.find(item => item.id === currentStageId)
  const lesson = getCurrentLesson()

  if (!stage || !lesson) {
    return `
      <section class="coming-card">
        <h2>Không tìm thấy nội dung</h2>
        <button class="action-blue" data-action="back-lesson">
          Quay lại Nhà Gấu Trúc
        </button>
      </section>
    `
  }

  return `
    <section class="page-heading">

      <p class="eyebrow">
        ${currentLevel} · BÀI ${currentLessonId}
      </p>

      <h1>${stage.icon} ${stage.name}</h1>

      <p>${lesson.vietnamese}</p>

      <button class="action-light" data-action="back-lesson">
        ← Quay lại Nhà Gấu Trúc
      </button>

    </section>

    <section class="coming-card">

      <div>${stage.icon}</div>

      <h2>${stage.name}</h2>

      <p>${stage.description}</p>

      <p>
        Khu vực bài tập đang được xây dựng.
        Chúng ta sẽ phát triển nội dung tương tác cho chặng này
        ở bước tiếp theo.
      </p>

      <button class="action-blue" data-action="back-lesson">
        Quay lại 5 chặng học
      </button>

    </section>
  `
}

// ==============================
// KHO TỪ VỰNG
// ==============================

function vocabularyPage() {
  const words = getWords()
  const word = words[currentIndex]

  const lessons = [...new Set(
    vocabulary
      .filter(w => w.level === currentLevel)
      .map(w => w.lesson)
  )].sort((a, b) => a - b)

  return `
    <section class="page-heading">
      <p class="eyebrow">VOCABULARY LIBRARY</p>
      <h1>📚 Kho từ vựng</h1>
      <p>Học từ mới theo cấp độ HSK và nhóm chủ đề.</p>
    </section>

    <section class="filter-panel">

      <label>Cấp độ HSK
        <select id="level-select">
          ${levels.map(level => `
            <option ${level === currentLevel ? 'selected' : ''}>
              ${level}
            </option>
          `).join('')}
        </select>
      </label>

      <label>Bài học
        <select id="lesson-select">
          <option value="all">Tất cả bài học</option>

          ${lessons.map(n => `
            <option
              value="${n}"
              ${String(n) === currentLesson ? 'selected' : ''}
            >
              Bài ${n}
            </option>
          `).join('')}
        </select>
      </label>

      <label>Chủ đề bài học
        <select id="topic-select">
          <option>Tất cả chủ đề</option>

          ${[...new Set(vocabulary.map(w => w.topic))].map(topic => `
            <option ${topic === currentTopic ? 'selected' : ''}>
              ${topic}
            </option>
          `).join('')}
        </select>
      </label>

      <label>Nhóm từ vựng
        <select id="category-select">
          <option value="all">Tất cả nhóm từ</option>

          ${vocabularyCategories.map(c => `
            <option
              value="${c.id}"
              ${c.id === currentCategory ? 'selected' : ''}
            >
              ${c.icon} ${c.name}
            </option>
          `).join('')}
        </select>
      </label>

    </section>

    <section class="category-shortcuts">

      ${vocabularyCategories.map(c => `
        <button
          class="category-chip ${currentCategory === c.id ? 'selected' : ''}"
          data-category="${c.id}"
        >
          ${c.icon} ${c.name}
        </button>
      `).join('')}

    </section>

    <section class="vocab-card">

      ${word ? `

        <div class="vocab-topline">
          <span>TỪ VỰNG TIẾNG TRUNG</span>
          <strong>${currentIndex + 1} / ${words.length}</strong>
        </div>

        <div class="vocab-level">
          ${word.level} · Bài ${word.lesson} · ${word.topic}
        </div>

        <div class="vocab-hanzi">${word.hanzi}</div>

        <div class="vocab-pinyin">${word.pinyin}</div>

        <div class="vocab-meaning">
          ${showMeaning ? word.meaning : 'Nghĩa tiếng Việt đang được ẩn'}
        </div>

        <div class="vocab-actions">
          <button class="action-light" data-action="reveal">
            ${showMeaning ? 'Ẩn nghĩa' : 'Hiện nghĩa'}
          </button>

          <button class="action-blue" data-action="speak">
            🔊 Nghe phát âm
          </button>
        </div>

        <div class="vocab-example">
          <small>CÂU VÍ DỤ</small>

          <strong>${word.example || 'Chưa có câu ví dụ'}</strong>

          <span>${word.examplePinyin || ''}</span>

          <p>
            ${showMeaning ? (word.exampleMeaning || '') : 'Hãy thử tự dịch câu này'}
          </p>
        </div>

        <div class="vocab-navigation">
          <button class="action-light" data-action="previous">
            ← Trước
          </button>

          <button class="action-blue" data-action="next">
            Tiếp theo →
          </button>
        </div>

        <button class="learn-button" data-action="learn">
          ${learned.includes(word.id) ? '✓ Đã học từ này' : '✓ Đánh dấu đã học'}
        </button>

      ` : `

        <div class="empty-state">
          <span>📭</span>
          <h3>Chưa có từ vựng trong lựa chọn này</h3>
          <p>Hãy chọn nhóm khác hoặc cấp độ HSK 1 để tiếp tục học.</p>
        </div>

      `}

    </section>
  `
}

// ==============================
// CÁC KHU VỰC ĐANG PHÁT TRIỂN
// ==============================

function placeholderPage(page) {
  const content = {
    writing: [
      '✍️',
      'Luyện viết chữ Hán',
      'Luyện ghi nhớ mặt chữ, Pinyin và cách viết từng từ.'
    ],

    sentence: [
      '🧩',
      'Luyện ghép câu',
      'Sắp xếp các từ tiếng Trung để tạo thành câu hoàn chỉnh.'
    ],

    grammar: [
      '📖',
      'Học ngữ pháp',
      'Học công thức, giải thích tiếng Việt và ví dụ thực tế.'
    ],

    listening: [
      '🎧',
      'Luyện nghe – nói',
      'Luyện nghe phát âm và thực hành hội thoại tiếng Trung.'
    ]
  }[page]

  if (!content) return '<section class="coming-card">Trang đang được xây dựng.</section>'

  return `
    <section class="page-heading">
      <p class="eyebrow">LEARNING CENTER</p>
      <h1>${content[0]} ${content[1]}</h1>
      <p>${content[2]}</p>
    </section>

    <section class="coming-card">
      <div>${content[0]}</div>
      <h2>Khu vực đang được xây dựng</h2>
      <p>Chúng ta sẽ phát triển chức năng này ở phiên bản tiếp theo.</p>
      <button class="action-blue" data-page="vocabulary">
        Quay lại học từ vựng
      </button>
    </section>
  `
}

// ==============================
// THÀNH TÍCH
// ==============================

function profilePage() {
  const total = vocabulary.length

  const percent = total
    ? Math.min(100, Math.round(learned.length / total * 100))
    : 0

  return `
    <section class="page-heading">
      <p class="eyebrow">YOUR LEARNING PROFILE</p>
      <h1>🏆 Thành tích học tập</h1>
      <p>Theo dõi hành trình chinh phục tiếng Trung của bạn.</p>
    </section>

    <section class="profile-card">

      <div class="profile-avatar">👩🏻‍🎓</div>

      <h2>Chinese Learner</h2>
      <p>Học viên CHINESE BASIC</p>

      <div class="profile-stats">
        <div>
          <strong>${learned.length}</strong>
          <small>Từ đã học</small>
        </div>

        <div>
          <strong>${total}</strong>
          <small>Tổng từ hiện có</small>
        </div>

        <div>
          <strong>${percent}%</strong>
          <small>Hoàn thành</small>
        </div>
      </div>

      <div class="progress-track">
        <div style="width:${percent}%"></div>
      </div>

    </section>
  `
}

// ==============================
// HIỂN THỊ ỨNG DỤNG
// ==============================

function render() {
   // Bảo vệ ứng dụng: chưa đăng nhập thì chỉ được xem trang auth
  if (!currentUser) {
    currentPage = 'auth'
  }

  // Dọn trò chơi cũ trước khi chuyển màn hình
  if (typeof destroyPandaGame === 'function') {
    destroyPandaGame()
    destroyPandaGame = null
  }

  const pageContent =
  currentPage === 'auth' ? authPage()
    : currentPage === 'home' ? homePage()
    : currentPage === 'roadmap' ? roadmapPage()
    : currentPage === 'beginner' ? '<div id="beginner-view"></div>'
    : currentPage === 'lesson' ? lessonPage()
    : currentPage === 'stage' ? stagePage()
    : currentPage === 'vocabulary' ? vocabularyPage()
    : currentPage === 'profile' ? profilePage()
    : placeholderPage(currentPage)

  app.innerHTML = `
    <div class="app-layout">

      ${sidebar()}

      <main class="main-area">

        <header class="topbar">
          <div class="mobile-logo">CHINESE<span> BASIC</span></div>

          <div class="topbar-message">
            🌱 每天学习一点中文
          </div>

          <div class="topbar-level">
            当前学习 · ${currentLevel}
          </div>
        <div class="topbar-account">
  <button type="button" data-action="logout">
    Đăng xuất
  </button>
</div>
</header>

        <div class="page-content">
          ${pageContent}
        </div>

        <footer class="app-footer">
          CHINESE BASIC · Học tiếng Trung mỗi ngày
        </footer>

      </main>

      ${bottomNav()}

    </div>
  `

  // Kết nối bản đồ PANDA WORLD
  if (currentPage === 'roadmap') {
    const roadmapContainer = document.querySelector('#roadmap-view')

    renderRoadmap((level, lessonId) => {
      currentLevel = level
      currentLessonId = lessonId
      currentPage = 'lesson'
      render()
    }, roadmapContainer)
  }

  // Khởi tạo game tại trang chủ
  if (currentPage === 'home') {
    const gameContainer = document.querySelector('#panda-game-home')

    if (gameContainer) {
      destroyPandaGame = mountPandaGame(gameContainer)
    }
  }

  // Khởi tạo game tại Nhà Gấu Trúc
  if (currentPage === 'lesson') {
    const gameContainer = document.querySelector('#panda-game-lesson')

    if (gameContainer) {
      destroyPandaGame = mountPandaGame(gameContainer)
    }
  }
// Khởi tạo khu vực PANDA BEGINNER
if (currentPage === 'beginner') {
  const beginnerContainer = document.querySelector('#beginner-view')

  if (beginnerContainer) {
    renderBeginner(beginnerContainer)
  }
}

}

// ==============================
// XỬ LÝ NHẤN CHUỘT
// ==============================

app.addEventListener('click', event => {

   // Chuyển đổi Đăng nhập / Đăng ký
  const authModeButton = event.target.closest('[data-auth-mode]')

  if (authModeButton) {
    authMode = authModeButton.dataset.authMode
    authMessage = ''
    render()
    return
  }

  // Chọn chặng học
  const stageButton = event.target.closest('[data-stage]')

  if (stageButton) {
    currentStageId = Number(stageButton.dataset.stage)

    if (
      !isStageUnlocked(
        currentLevel,
        currentLessonId,
        currentStageId
      )
    ) {
      return
    }

    currentPage = 'stage'
    render()
    return
  }

  // Chọn nhóm từ vựng
  const categoryButton = event.target.closest('[data-category]')

  if (categoryButton) {
    currentCategory = categoryButton.dataset.category
    currentIndex = 0
    showMeaning = false
    render()
    return
  }

  // Các nút thao tác
  
  const actionButton = event.target.closest('[data-action]')

  if (!actionButton) return

  const action = actionButton.dataset.action

  if (action === 'back-roadmap') {
    currentPage = 'roadmap'
    render()
    return
  }

  if (action === 'back-lesson') {
    currentPage = 'lesson'
    render()
    return
  }

  const words = getWords()
  const word = words[currentIndex]

  if (action === 'reveal' && word) {
    showMeaning = !showMeaning
  }

  if (action === 'speak' && word) {
    speak(word.hanzi)
  }

  if (action === 'next' && words.length) {
    currentIndex = (currentIndex + 1) % words.length
    showMeaning = false
  }

  if (action === 'previous' && words.length) {
    currentIndex = (currentIndex - 1 + words.length) % words.length
    showMeaning = false
  }

  if (action === 'learn' && word) {
    if (!learned.includes(word.id)) {
      learned.push(word.id)

      localStorage.setItem(
        'learnedWords',
        JSON.stringify(learned)
      )
    }
  }

  render()
})

// ==============================
// XỬ LÝ BỘ LỌC TỪ VỰNG
// ==============================

app.addEventListener('change', event => {
// Chỉ xử lý thay đổi của các bộ lọc từ vựng
  const filterIds = [
    'level-select',
    'lesson-select',
    'topic-select',
    'category-select'
  ]

  if (!filterIds.includes(event.target.id)) {
    return
  }
  if (event.target.id === 'level-select') {
    currentLevel = event.target.value
    currentLesson = 'all'
    currentTopic = 'Tất cả chủ đề'
    currentCategory = 'all'
  }

  if (event.target.id === 'lesson-select') {
    currentLesson = event.target.value
  }

  if (event.target.id === 'topic-select') {
    currentTopic = event.target.value
  }

  if (event.target.id === 'category-select') {
    currentCategory = event.target.value
  }

  currentIndex = 0
  showMeaning = false

  render()
})
// ==============================
// XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ
// ==============================

app.addEventListener('submit', async event => {
  if (event.target.id !== 'auth-form') return

  event.preventDefault()

  const formData = new FormData(event.target)
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    authLoading = true
    authMessage = 'Đang xử lý...'
    render()

    if (authMode === 'signup') {
      await signUp(email, password)
      authMessage = 'Đăng ký thành công! Hãy kiểm tra email.'
    } else {
      await signIn(email, password)
      currentUser = await getCurrentUser()
      currentPage = 'home'
      authMessage = ''
    }

  } catch (error) {
    authMessage = error.message
  } finally {
    authLoading = false
    render()
  }
})
// ==============================
// KHỞI CHẠY
// ==============================

// ==============================
// KHỞI CHẠY PANDA WORLD
// ==============================

async function initializeApp() {
  try {
    currentUser = await getCurrentUser()
  } catch (error) {
    currentUser = null
  }

  currentPage = currentUser ? 'home' : 'auth'
  render()

  onAuthChange((event, user) => {
    currentUser = user
    currentPage = user ? 'home' : 'auth'
    render()
  })
}

initializeApp()
