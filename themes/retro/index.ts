import './styles.css'

if (typeof window !== 'undefined') {
  const scripts = [
    '/scripts/GameGrid.js',
    '/scripts/ConsoleRenderer.js',
    '/scripts/CanvasRenderer.js',
    '/scripts/HtmlRenderer.js',
    '/scripts/MiniGame.js',
  ]

  scripts.forEach(src => {
    const s = document.createElement('script')
    s.src = src
    s.defer = true
    document.head.appendChild(s)
  })
}
