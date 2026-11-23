
import { curriculum, stages } from './curriculum.js'

const STORAGE_KEY = 'chineseBasicProgress'

// Lấy dữ liệu tiến độ đã lưu
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      completedStages: {},
      completedLessons: [],
      lessonScores: {}
    }
  } catch {
    return {
      completedStages: {},
      completedLessons: [],
      lessonScores: {}
    }
  }
}

// Lưu tiến độ
function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

// Tạo mã riêng cho từng bài
function getLessonKey(level, lessonId) {
  return `${level}-${lessonId}`
}

// Kiểm tra bài học đã hoàn thành chưa
export function isLessonCompleted(level, lessonId) {
  const progress = loadProgress()
  return progress.completedLessons.includes(
    getLessonKey(level, lessonId)
  )
}

// Kiểm tra bài học có được mở khóa không
export function isLessonUnlocked(level, lessonId) {
  const currentBook = curriculum.find(
    item => item.level === level
  )

  if (!currentBook) return false

  const lessonIndex = currentBook.lessons.findIndex(
    lesson => lesson.id === lessonId
  )

  if (lessonIndex === -1) return false

  // Bài 1 của tất cả trình độ HSK 1–6 luôn được mở
  if (lessonIndex === 0) return true

  // Các bài tiếp theo cần hoàn thành bài liền trước
  const previousLesson = currentBook.lessons[lessonIndex - 1]

  return isLessonCompleted(level, previousLesson.id)
}

// Kiểm tra cấp học có được mở không
export function isStageUnlocked(level, lessonId, stageId) {
  if (!isLessonUnlocked(level, lessonId)) return false

  const progress = loadProgress()
  const key = getLessonKey(level, lessonId)
  const completed = progress.completedStages[key] || []

  if (stageId === 1) return true

  return completed.includes(stageId - 1)
}

// Lấy danh sách cấp đã hoàn thành
export function getCompletedStages(level, lessonId) {
  const progress = loadProgress()
  const key = getLessonKey(level, lessonId)

  return progress.completedStages[key] || []
}

// Hoàn thành một cấp học
export function completeStage(level, lessonId, stageId, score = 0) {
  if (!isStageUnlocked(level, lessonId, stageId)) {
    return {
      success: false,
      message: 'Bạn cần hoàn thành cấp học trước đó.'
    }
  }

  const progress = loadProgress()
  const key = getLessonKey(level, lessonId)

  if (!progress.completedStages[key]) {
    progress.completedStages[key] = []
  }

  // Cấp 5 là bài kiểm tra cuối bài
  if (stageId === 5 && score <= 80) {
    return {
      success: false,
      message: 'Bạn cần đạt trên 80 điểm để mở bài tiếp theo.',
      score
    }
  }

  if (!progress.completedStages[key].includes(stageId)) {
    progress.completedStages[key].push(stageId)
  }

  // Nếu đạt cấp 5, hoàn thành bài học
  if (stageId === 5) {
    const lessonKey = getLessonKey(level, lessonId)

    if (!progress.completedLessons.includes(lessonKey)) {
      progress.completedLessons.push(lessonKey)
    }

    progress.lessonScores[lessonKey] = score
  }

  saveProgress(progress)

  return {
    success: true,
    message: stageId === 5
      ? 'Chúc mừng! Bạn đã hoàn thành bài học.'
      : 'Bạn đã hoàn thành cấp học.',
    score
  }
}

// Lấy điểm của một bài
export function getLessonScore(level, lessonId) {
  const progress = loadProgress()
  const key = getLessonKey(level, lessonId)

  return progress.lessonScores[key] ?? null
}

// Lấy tiến độ toàn bộ chương trình
export function getOverallProgress() {
  const progress = loadProgress()

  const totalLessons = curriculum.reduce(
    (sum, book) => sum + book.lessons.length,
    0
  )

  const completedCount = progress.completedLessons.length

  return {
    completed: completedCount,
    total: totalLessons,
    percentage: totalLessons
      ? Math.round(completedCount / totalLessons * 100)
      : 0
  }
}

// Xem tiến độ của một bài
export function getLessonProgress(level, lessonId) {
  const completed = getCompletedStages(level, lessonId)

  return {
    completedStages: completed.length,
    totalStages: stages.length,
    percentage: Math.round(
      completed.length / stages.length * 100
    )
  }
}
