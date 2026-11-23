
const BEST_SCORE_KEY = 'chineseBasicPandaBestScore'

export function mountPandaGame(container) {
  if (!container) return () => {}

  let score = 0
  let timeLeft = 30
  let activeHole = -1
  let running = false
  let timerInterval = null
  let moleInterval = null

  let bestScore = Number(
    localStorage.getItem(BEST_SCORE_KEY) || 0
  )

  container.innerHTML = `
    <section class="panda-game">
      <div class="panda-game-header">
        <div>
          <span class="panda-game-label">MINI GAME</span>
          <h2>🐼 PANDA CATCH</h2>
          <p>Bắt gấu trúc – Nhận tre xanh!</p>
        </div>
        <div class="panda-game-mascot">🎋</div>
      </div>

      <div class="panda-game-stats">
        <div class="panda-stat">
          <span>⭐ ĐIỂM</span>
          <strong id="panda-score">0</strong>
        </div>

        <div class="panda-stat">
          <span>⏱️ THỜI GIAN</span>
          <strong id="panda-time">30s</strong>
        </div>

        <div class="panda-stat">
          <span>🏆 KỶ LỤC</span>
          <strong id="panda-best">${bestScore}</strong>
        </div>
      </div>

      <div class="panda-game-message" id="panda-message">
        Nhấn BẮT ĐẦU để chơi nhé!
      </div>

      <div class="panda-board">
        ${Array.from({ length: 9 }, (_, index) => `
          <button
            class="panda-hole"
            data-hole="${index}"
            aria-label="Bụi tre ${index + 1}"
            type="button"
          >
            <span class="panda-character">🐼</span>
            <span class="bamboo-decoration">🎋</span>
          </button>
        `).join('')}
      </div>

      <div class="panda-game-footer">
        <button class="panda-start-button" id="panda-start">
          🐾 BẮT ĐẦU
        </button>
        <p>Chạm vào gấu trúc khi gấu xuất hiện!</p>
      </div>
    </section>
  `

  const scoreElement = container.querySelector('#panda-score')
  const timeElement = container.querySelector('#panda-time')
  const bestElement = container.querySelector('#panda-best')
  const messageElement = container.querySelector('#panda-message')
  const startButton = container.querySelector('#panda-start')
  const holes = [...container.querySelectorAll('.panda-hole')]

  function updateStats() {
    scoreElement.textContent = score
    timeElement.textContent = `${timeLeft}s`
    bestElement.textContent = bestScore
  }

  function hideAllPandas() {
    holes.forEach(hole => {
      hole.classList.remove('panda-visible')
    })
    activeHole = -1
  }

  function showRandomPanda() {
    hideAllPandas()

    const randomIndex = Math.floor(Math.random() * holes.length)

    activeHole = randomIndex
    holes[randomIndex].classList.add('panda-visible')
  }

  function stopGame() {
    running = false

    clearInterval(timerInterval)
    clearInterval(moleInterval)

    timerInterval = null
    moleInterval = null

    hideAllPandas()

    startButton.textContent = '🔄 CHƠI LẠI'

    if (score > bestScore) {
      bestScore = score
      localStorage.setItem(BEST_SCORE_KEY, String(bestScore))
      messageElement.textContent =
        `🎉 Kỷ lục mới! Bạn đạt ${score} điểm!`
    } else {
      messageElement.textContent =
        `🐼 Hết giờ! Bạn đạt ${score} điểm.`
    }

    updateStats()
  }

  function startGame() {
    if (running) return

    clearInterval(timerInterval)
    clearInterval(moleInterval)

    score = 0
    timeLeft = 30
    running = true

    updateStats()

    messageElement.textContent =
      'Nhanh tay lên! Gấu trúc đang xuất hiện!'

    startButton.textContent = '🎋 ĐANG CHƠI...'

    showRandomPanda()

    moleInterval = setInterval(() => {
      if (running) showRandomPanda()
    }, 850)

    timerInterval = setInterval(() => {
      timeLeft--
      updateStats()

      if (timeLeft <= 0) {
        stopGame()
      }
    }, 1000)
  }

  holes.forEach((hole, index) => {
    hole.addEventListener('click', () => {
      if (!running) return

      if (index === activeHole) {
        score += 10
        hideAllPandas()

        messageElement.textContent =
          '🎉 Bắt được rồi! +10 điểm'

        updateStats()
      }
    })
  })

  startButton.addEventListener('click', startGame)

  updateStats()

  // Dọn bộ đếm khi rời khỏi màn hình trò chơi
  return function destroyPandaGame() {
    running = false
    clearInterval(timerInterval)
    clearInterval(moleInterval)
  }
}
