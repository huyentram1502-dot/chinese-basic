
import { curriculum, stages } from './curriculum.js'

import {
  isLessonUnlocked,
  isLessonCompleted,
  getLessonScore,
  getLessonProgress
} from './progress.js'

const HSK_LEVELS = [1, 2, 3, 4, 5, 6]

// Hiển thị bản đồ bên trong khu vực được chỉ định
export function renderRoadmap(
  onSelectLesson,
  target = document.querySelector('#app')
) {
  const container = target

  if (!container) return

  container.innerHTML = `
    <div class="roadmap-page panda-world">

      <header class="roadmap-header panda-world-header">
        <div>
          <span class="roadmap-label">🐼 PANDA WORLD</span>
          <h1>Vương quốc Gấu Trúc</h1>
          <p>Khám phá thế giới tiếng Trung qua từng chặng học!</p>
        </div>
        <div class="roadmap-mascot">🐼</div>
      </header>

      <section class="roadmap-levels">
        ${HSK_LEVELS.map(number => `
          <button
            class="level-tab ${number === 1 ? 'active' : ''}"
            data-level="HSK ${number}"
          >
            🐼 HSK ${number}
          </button>
        `).join('')}
      </section>

      <section id="roadmap-content"></section>

    </div>
  `

  const contentContainer = container.querySelector('#roadmap-content')
  const levelButtons = container.querySelectorAll('.level-tab')

  levelButtons.forEach(button => {
    button.addEventListener('click', () => {
      levelButtons.forEach(item => item.classList.remove('active'))
      button.classList.add('active')

      renderLevel(
        button.dataset.level,
        onSelectLesson,
        contentContainer
      )
    })
  })

  renderLevel('HSK 1', onSelectLesson, contentContainer)
}

// Hiển thị bản đồ bài học theo cấp HSK
function renderLevel(level, onSelectLesson, container) {
  if (!container) return

  const book = curriculum.find(item => item.level === level)

  if (!book) {
    container.innerHTML = `
      <div class="roadmap-empty panda-empty">
        <div class="empty-icon">🐼</div>
        <h2>${level} – Vùng đất đang được khám phá</h2>
        <p>Chúng ta sẽ bổ sung giáo trình và bản đồ vùng đất này trong phiên bản tiếp theo.</p>
      </div>
    `
    return
  }

  const totalLessons = book.lessons.length

  const completedLessons = book.lessons.filter(
    lesson => isLessonCompleted(level, lesson.id)
  ).length

  const percentage = totalLessons
    ? Math.round(completedLessons / totalLessons * 100)
    : 0

  const currentLesson = book.lessons.find(
    lesson =>
      isLessonUnlocked(level, lesson.id) &&
      !isLessonCompleted(level, lesson.id)
  )

  const currentLessonId = currentLesson?.id

  const lessonNodes = book.lessons.map((lesson, index) => {
    const unlocked = isLessonUnlocked(level, lesson.id)
    const completed = isLessonCompleted(level, lesson.id)
    const isCurrent = lesson.id === currentLessonId
    const score = getLessonScore(level, lesson.id)
    const lessonProgress = getLessonProgress(level, lesson.id)

    const nodeClass = [
      'panda-map-node',
      completed ? 'node-completed' : '',
      isCurrent ? 'node-current' : '',
      !unlocked ? 'node-locked' : ''
    ].filter(Boolean).join(' ')

    const nodeIcon = completed
      ? '⭐'
      : !unlocked
        ? '🔒'
        : isCurrent
          ? '🐼'
          : '🎋'

    const statusText = completed
      ? `⭐ ${score}/100 điểm`
      : !unlocked
        ? '🔒 Chưa mở khóa'
        : `${lessonProgress.completedStages}/${stages.length} chặng học`

    return `
      <div class="panda-map-step step-${index % 4}">

        <div class="panda-node-content">

          <div class="panda-node-character">
            ${isCurrent ? '🐼' : ''}
          </div>

          <button
            type="button"
            class="${nodeClass}"
            data-lesson="${lesson.id}"
            ${!unlocked ? 'disabled' : ''}
            aria-label="Bài ${index + 1}: ${lesson.vietnamese}"
          >
            <span class="node-icon">${nodeIcon}</span>
            <strong>${index + 1}</strong>
          </button>

          <div class="panda-node-label">
            <span>BÀI ${String(index + 1).padStart(2, '0')}</span>
            <strong>${lesson.vietnamese}</strong>
            <small>${statusText}</small>
          </div>

        </div>

        ${index < totalLessons - 1
          ? '<div class="panda-map-connector"></div>'
          : ''
        }

      </div>
    `
  }).join('')

  container.innerHTML = `
    <section class="panda-level-summary">

      <div class="panda-summary-heading">
        <div>
          <span class="roadmap-label">${book.book}</span>
          <h2>🎋 ${level} – Bamboo Village</h2>
          <p>Hãy hoàn thành từng chặng để khám phá vùng đất mới.</p>
        </div>
        <div class="panda-summary-icon">🏡</div>
      </div>

      <div class="panda-progress-info">
        <span>🌱 Tiến độ hành trình</span>
        <strong>${completedLessons}/${totalLessons} bài học</strong>
      </div>

      <div class="panda-progress-track">
        <div style="width: ${percentage}%"></div>
      </div>

      <div class="panda-progress-bottom">
        <span>${percentage}% hoàn thành</span>
        <span>⭐ ${completedLessons} bài đã chinh phục</span>
      </div>

    </section>

    <section class="panda-map-world">

      <div class="panda-world-scenery scenery-top">
        <span>🎋</span>
        <span>☁️</span>
        <span>🎋</span>
      </div>

      <div class="panda-map-title">
        <span>🌳</span>
        <div>
          <strong>CON ĐƯỜNG CHINH PHỤC HSK</strong>
          <small>Chạm vào một nút để khám phá bài học</small>
        </div>
        <span>🌳</span>
      </div>

      <div class="panda-map-path">
        ${lessonNodes}
      </div>

      <div class="panda-map-finish">
        <span>🏯</span>
        <strong>ĐÍCH ĐẾN – PANDA CASTLE</strong>
        <small>Hoàn thành toàn bộ ${totalLessons} bài để chinh phục vùng đất!</small>
      </div>

      <div class="panda-world-scenery scenery-bottom">
        <span>🎋</span>
        <span>🌸</span>
        <span>🎋</span>
      </div>

    </section>

    <div class="panda-map-legend">
      <span>⭐ Đã hoàn thành</span>
      <span>🐼 Bài hiện tại</span>
      <span>🎋 Bài đã mở</span>
      <span>🔒 Bài bị khóa</span>
    </div>
  `

  // Xử lý chọn bài học
  container.querySelectorAll('.panda-map-node:not(:disabled)')
    .forEach(button => {
      button.addEventListener('click', () => {
        const lessonId = Number(button.dataset.lesson)

        if (typeof onSelectLesson === 'function') {
          onSelectLesson(level, lessonId)
        }
      })
    })
}
