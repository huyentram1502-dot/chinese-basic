
import { curriculum, stages } from './curriculum.js'

import {
  isLessonUnlocked,
  isLessonCompleted,
  getLessonScore,
  getLessonProgress
} from './progress.js'

const HSK_LEVELS = [1, 2, 3, 4, 5, 6]

export function renderRoadmap(
  onSelectLesson,
  target = document.querySelector('#app')
) {
  if (!target) return

  target.innerHTML = `
    <div class="panda-world">

      <header class="panda-world-header">
        <div>
          <span>🐼 PANDA WORLD</span>
          <h1>Vương quốc Gấu Trúc</h1>
          <p>Cuộc phiêu lưu chinh phục tiếng Trung bắt đầu!</p>
        </div>
        <div class="panda-header-mascot">🐼</div>
      </header>

      <nav class="panda-hsk-selector">
        ${HSK_LEVELS.map((number) => `
          <button
            class="panda-hsk-button ${number === 1 ? 'active' : ''}"
            data-level="HSK ${number}"
          >
            🐼 HSK ${number}
          </button>
        `).join('')}
      </nav>

      <main id="panda-level-content"></main>

    </div>
  `

  const content = target.querySelector('#panda-level-content')
  const buttons = target.querySelectorAll('.panda-hsk-button')

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(item => item.classList.remove('active'))
      button.classList.add('active')

      renderPandaLevel(
        button.dataset.level,
        onSelectLesson,
        content
      )
    })
  })

  renderPandaLevel('HSK 1', onSelectLesson, content)
}

function renderPandaLevel(level, onSelectLesson, container) {
  if (!container) return

  const book = curriculum.find(item => item.level === level)

  if (!book || !book.lessons?.length) {
    container.innerHTML = `
      <section class="panda-coming-soon">
        <div>🏡</div>
        <h2>${level} – Vùng đất bí ẩn</h2>
        <p>Vùng đất này đang được xây dựng. Hãy quay lại sau nhé!</p>
        <span>🎋 🐼 🎋</span>
      </section>
    `
    return
  }

  const lessons = book.lessons

  const completedCount = lessons.filter(lesson =>
    isLessonCompleted(level, lesson.id)
  ).length

  const progress = Math.round(
    completedCount / lessons.length * 100
  )

  const currentLesson = lessons.find(lesson =>
    isLessonUnlocked(level, lesson.id) &&
    !isLessonCompleted(level, lesson.id)
  )

  const nodes = lessons.map((lesson, index) => {
    const unlocked = isLessonUnlocked(level, lesson.id)
    const completed = isLessonCompleted(level, lesson.id)
    const current = currentLesson?.id === lesson.id

    const score = getLessonScore(level, lesson.id)
    const lessonProgress = getLessonProgress(level, lesson.id)

    const position = index % 2 === 0 ? 'left' : 'right'

    let icon = '🔒'
    let status = 'Chưa mở khóa'

    if (completed) {
      icon = '⭐'
      status = `${score}/100 điểm`
    } else if (current) {
      icon = '🐼'
      status = 'Bắt đầu khám phá!'
    } else if (unlocked) {
      icon = '🎋'
      status = `${lessonProgress.completedStages}/${stages.length} chặng`
    }

    return `
      <div class="panda-path-row ${position}">

        <div class="panda-path-node-area">

          <div class="panda-node-decoration">
            ${current ? '🐼' : completed ? '✨' : '🎋'}
          </div>

          <button
            type="button"
            class="panda-candy-node
              ${completed ? 'completed' : ''}
              ${current ? 'current' : ''}
              ${!unlocked ? 'locked' : ''}"
            data-lesson="${lesson.id}"
            ${!unlocked ? 'disabled' : ''}
            aria-label="Bài ${index + 1}: ${lesson.vietnamese}"
          >
            <span class="panda-candy-icon">${icon}</span>
            <strong>${String(index + 1).padStart(2, '0')}</strong>
          </button>

          <div class="panda-candy-label">
            <strong>${lesson.vietnamese}</strong>
            <small>${status}</small>
          </div>

        </div>

        ${index < lessons.length - 1
          ? `<div class="panda-path-bridge bridge-${index % 4}"></div>`
          : ''
        }

      </div>
    `
  }).join('')

  container.innerHTML = `
    <section class="panda-level-house">

      <div class="panda-house-icon">🏡</div>

      <div class="panda-house-info">
        <span>WELCOME TO BAMBOO VILLAGE</span>
        <h2>${level} – Làng Tre Xanh</h2>
        <p>${book.book || 'Hành trình học tiếng Trung'}</p>
      </div>

      <div class="panda-progress-card">
        <div>
          <span>🌱 Tiến độ học tập</span>
          <strong>${completedCount}/${lessons.length} bài</strong>
        </div>

        <div class="panda-progress-bar">
          <span style="width:${progress}%"></span>
        </div>

        <small>${progress}% hành trình đã hoàn thành</small>
      </div>

    </section>

    <section class="panda-adventure-map">

      <div class="panda-map-sky">
        <span>☁️</span>
        <span>🌤️</span>
        <span>☁️</span>
      </div>

      <div class="panda-map-section-title">
        <span>🎋</span>
        <div>
          <strong>HÀNH TRÌNH CHINH PHỤC HSK</strong>
          <small>Mỗi nút là một bài học mới!</small>
        </div>
        <span>🎋</span>
      </div>

      <div class="panda-adventure-path">
        ${nodes}
      </div>

      <div class="panda-finish-house">
        <div>🏯</div>
        <strong>PANDA CASTLE</strong>
        <span>Chinh phục ${lessons.length} bài học để đến lâu đài!</span>
      </div>

      <div class="panda-map-forest">
        🎋 🌸 🎋 🌿 🎋 🌸 🎋
      </div>

    </section>

    <div class="panda-map-guide">
      <span>⭐ Đã hoàn thành</span>
      <span>🐼 Bài hiện tại</span>
      <span>🎋 Đã mở khóa</span>
      <span>🔒 Chưa mở khóa</span>
    </div>
  `

  container.querySelectorAll('.panda-candy-node:not(:disabled)')
    .forEach(button => {
      button.addEventListener('click', () => {
        const lessonId = Number(button.dataset.lesson)

        if (typeof onSelectLesson === 'function') {
          onSelectLesson(level, lessonId)
        }
      })
    })
}
