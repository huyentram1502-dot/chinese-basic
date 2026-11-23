
import { beginnerLessons } from './beginner-content.js'

// Dùng khóa riêng, không ảnh hưởng tiến độ HSK hiện tại
const STORAGE_KEY = 'pandaBeginnerProgress'

// Đọc dữ liệu tiến độ
function loadBeginnerProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))

    return {
      completedLessons: Array.isArray(saved?.completedLessons)
        ? saved.completedLessons
        : [],
      lessonScores:
        saved?.lessonScores && typeof saved.lessonScores === 'object'
          ? saved.lessonScores
          : {}
    }
  } catch {
    return {
      completedLessons: [],
      lessonScores: {}
    }
  }
}

// Lưu dữ liệu tiến độ
function saveBeginnerProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

// Kiểm tra một bài đã hoàn thành chưa
export function isBeginnerLessonCompleted(lessonId) {
  const progress = loadBeginnerProgress()

  return progress.completedLessons.includes(Number(lessonId))
}

// Kiểm tra bài có được mở khóa không
export function isBeginnerLessonUnlocked(lessonId) {
  const id = Number(lessonId)

  const lessonIndex = beginnerLessons.findIndex(
    lesson => lesson.id === id
  )

  if (lessonIndex === -1) return false

  // Bài đầu tiên luôn mở
  if (lessonIndex === 0) return true

  // Các bài tiếp theo cần hoàn thành bài trước
  const previousLesson = beginnerLessons[lessonIndex - 1]

  return isBeginnerLessonCompleted(previousLesson.id)
}

// Hoàn thành một bài
export function completeBeginnerLesson(lessonId, score = 0) {
  const id = Number(lessonId)
  const numericScore = Number(score)

  if (!Number.isInteger(id) || !Number.isFinite(numericScore)) {
    return false
  }

  if (!isBeginnerLessonUnlocked(id)) {
    return false
  }

  // Điều kiện đạt: từ 80 điểm trở lên
  if (numericScore < 80 || numericScore > 100) {
    return false
  }

  const progress = loadBeginnerProgress()

  if (!progress.completedLessons.includes(id)) {
    progress.completedLessons.push(id)
  }

  progress.lessonScores[id] = numericScore

  saveBeginnerProgress(progress)

  return true
}

// Lấy điểm của một bài
export function getBeginnerLessonScore(lessonId) {
  const progress = loadBeginnerProgress()

  return progress.lessonScores[Number(lessonId)] ?? null
}

// Lấy tổng số bài đã hoàn thành
export function getBeginnerCompletedCount() {
  return loadBeginnerProgress().completedLessons.length
}

// Tính phần trăm tiến độ
export function getBeginnerProgress() {
  const total = beginnerLessons.length
  const completed = getBeginnerCompletedCount()

  return {
    total,
    completed,
    percentage: total === 0
      ? 0
      : Math.round((completed / total) * 100)
  }
}

// Kiểm tra đã hoàn thành toàn bộ chương trình nhập môn chưa
export function isBeginnerCompleted() {
  return beginnerLessons.length > 0 &&
    beginnerLessons.every(lesson =>
      isBeginnerLessonCompleted(lesson.id)
    )
}
