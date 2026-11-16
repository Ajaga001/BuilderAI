import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BuilderAI from './BuilderAI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BuilderAI />
  </StrictMode>,
)
