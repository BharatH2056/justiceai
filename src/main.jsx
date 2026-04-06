import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import SamplesPage from './pages/SamplesPage.jsx'
import DocumentsPage from './pages/DocumentsPage.jsx'
import RightsPage from './pages/RightsPage.jsx'
import EstimatorPage from './pages/EstimatorPage.jsx'
import DemoOne from './pages/DemoOne'
import AuthDemo from './pages/AuthDemo'
import SidebarDemo from './pages/SidebarDemo'
import CommandPalette from './components/ui/CommandPalette'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div className="grain-overlay" aria-hidden="true" />
      <CommandPalette />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/rights" element={<RightsPage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
        <Route path="/auth" element={<AuthDemo />} />
        <Route path="/sidebar-demo" element={<SidebarDemo />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/samples" element={<SamplesPage />} />
        <Route path="/demo" element={<DemoOne />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
