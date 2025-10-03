import { useState } from 'react'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>AchieveAtlas: Steam Achievement Hunter</h1>
      <p>Track progress, hunt rares, unlock 'em all!</p>
      <ul>
        <li>Example Achv: Global Elite - 5% unlocked 🔒</li>
        <li>Example Achv: Headshot King - 42% unlocked ✅</li>
      </ul>
      <p>Steam API integration next...</p>
    </div>
  )
}

export default App