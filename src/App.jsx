import { useState } from 'react'
import './App.css'
import StudentDashboard from './StudentDashboard.jsx'
import OrganizerDashboard from './OrganizerDashboard.jsx'
import FacultyDashboard from './FacultyDashboard.jsx'

// API Configuration - use environment variable or default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [userRole, setUserRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [successOrgId, setSuccessOrgId] = useState(null) // Store org ID separately
  const [loggedInUser, setLoggedInUser] = useState(null)
  
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    organizerId: '',
    organizationName: '',
    organizationType: 'school',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
  })

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setUserRole('student')
    setShowAuthModal(true)
    setError('')
    setSuccess('')
    setSuccessOrgId(null)
    setLoading(false)
    setFormData({
      fullName: '',
      email: '',
      password: '',
      organizerId: '',
      organizationName: '',
      organizationType: 'school',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      description: '',
    })
  }

  const handleRoleToggle = (role) => {
    setUserRole(role)
    setError('')
  }

  const handleLogout = () => {
    setLoggedInUser(null)
    setAuthMode('login')
  }

  // Copy Organization ID to clipboard
  const copyOrgIdToClipboard = () => {
    if (successOrgId) {
      navigator.clipboard.writeText(successOrgId)
      alert('Organization ID copied to clipboard!')
    }
  }

  if (loggedInUser && loggedInUser.role === 'student') {
    return <StudentDashboard user={loggedInUser} onLogout={handleLogout} />
  }

  if (loggedInUser && loggedInUser.role === 'organizer') {
    return <OrganizerDashboard user={loggedInUser} onLogout={handleLogout} />
  }

  if (loggedInUser && loggedInUser.role === 'faculty') {
    return <FacultyDashboard user={loggedInUser} onLogout={handleLogout} />
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSuccessOrgId(null)
    setLoading(true)

    try {
      const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup'
      const url = `${API_BASE_URL}${endpoint}`
      
      // Prepare request payload
      const payload = {
        email: formData.email,
        password: formData.password,
        role: userRole,
      }

      // For login, always include organizerId
      if (authMode === 'login') {
        if (!formData.organizerId.trim()) {
          setError('Organization ID is required for login')
          setLoading(false)
          return
        }
        payload.organizerId = formData.organizerId.trim().toUpperCase()
      }

      if (authMode === 'signup') {
        if (!formData.fullName.trim()) {
          setError('Full Name is required')
          setLoading(false)
          return
        }
        payload.fullName = formData.fullName
        
        // Add organizer-specific fields if role is organizer
        if (userRole === 'organizer') {
          if (!formData.organizationName.trim()) {
            setError('Organization Name is required')
            setLoading(false)
            return
          }
          payload.organizationName = formData.organizationName
          payload.organizationType = formData.organizationType
          payload.phone = formData.phone
          payload.address = formData.address
          payload.city = formData.city
          payload.state = formData.state
          payload.zipCode = formData.zipCode
          payload.description = formData.description
        } else {
          // For student and faculty signup, include organizerId
          if (!formData.organizerId.trim()) {
            setError(`Organization ID is required for ${userRole} registration`)
            setLoading(false)
            return
          }
          payload.organizerId = formData.organizerId.trim().toUpperCase()
        }
      }

      console.log('📨 Auth Request Details:')
      console.log('  Mode:', authMode)
      console.log('  URL:', url)
      console.log('  Role:', userRole)
      console.log('  Payload:', payload)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      console.log('📥 Response Status:', response.status)

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned invalid content type: ${contentType}`)
      }

      const data = await response.json()
      console.log('📊 Response Data:', data)

      // Handle non-200 responses
      if (!response.ok) {
        const errorMessage = data.message || data.error || `Server Error: ${response.status}`
        console.error('❌ Request failed:', errorMessage)
        setError(errorMessage)
        setLoading(false)
        return
      }

      // Success: Organizer signup
      if (authMode === 'signup' && userRole === 'organizer') {
        const orgId = data.user.organizerId
        setSuccessOrgId(orgId) // Store org ID for copy button
        setSuccess(`✅ ${data.message}`)
        
        // Log in user after a short delay so they can see the ID
        setTimeout(() => {
          const userData = {
            ...data.user,
            role: userRole
          }
          console.log('✅ Login user:', userData)
          setLoggedInUser(userData)
          setShowAuthModal(false)
        }, 5000)
      } else {
        // Success: Other auth modes
        setSuccess(data.message || 'Success!')
        
        const userData = {
          ...data.user,
          role: userRole
        }
        console.log('✅ Login user:', userData)
        setLoggedInUser(userData)
        setShowAuthModal(false)
      }
      
    } catch (err) {
      console.error('❌ Fetch Error:', err)
      setError(`Error: ${err.message || 'Failed to process request'}`)
      setLoading(false)
    }
  }

  return (
    <>
      {/* ===================== HEADER ===================== */}
      <header className="header">
        <div className="navbar">
          <h1 className="logo">Eventra</h1>
          <div className="auth-buttons">
            <button 
              className="auth-btn login-btn"
              onClick={() => handleAuthClick('login')}
            >
              Login
            </button>
            <button 
              className="auth-btn signup-btn"
              onClick={() => handleAuthClick('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* ===================== MAIN HOME CONTENT ===================== */}
      <main className="main-content">

        {/* HERO SECTION */}
        <section className="hero">
          <h2>Welcome to Eventra</h2>
          <p>Your ultimate platform for discovering and organizing events</p>
        </section>

        {/* WHY EVENTRA */}
        <section className="about-section">
          <h2>Why Eventra?</h2>
          <p>
            Eventra is a modern platform where <strong>organizers</strong> can register 
            their events, <strong>faculty members</strong> can create educational workshops, 
            and <strong>students</strong> can browse, explore and enroll easily.  
            Perfect for colleges, schools, clubs, and professional event teams.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <h3>🏢 Organizations Register</h3>
              <p>Educational institutions and event organizers sign up and receive a unique Organizer ID</p>
            </div>
            <div className="step-card">
              <h3>👨‍🏫 Faculty Creates Workshops</h3>
              <p>Faculty members can design and manage educational events for their institution</p>
            </div>
            <div className="step-card">
              <h3>🎓 Students Discover & Join</h3>
              <p>Students register using their institutional email and Organization ID</p>
            </div>
          </div>
        </section>

        {/* EVENT CATEGORIES */}
        <section className="categories-section">
          <h2>Explore Event Categories</h2>
          <div className="categories-grid">
            <div className="category-card">Workshops</div>
            <div className="category-card">Hackathons</div>
            <div className="category-card">Competitions</div>
            <div className="category-card">Seminars</div>
            <div className="category-card">Cultural Events</div>
            <div className="category-card">Sports Events</div>
          </div>
        </section>

        {/* USER TYPES */}
        <section className="organizer-section">
          <h2>Users on Eventra</h2>
          <p>
            Institutions, organizations, faculty, and students trust Eventra to manage, 
            publish, and promote their events seamlessly.
          </p>

          <div className="organizer-types">
            <div className="org-card">🏢 Organizations</div>
            <div className="org-card">👨‍🏫 Faculty</div>
            <div className="org-card">🎓 Students</div>
            <div className="org-card">🎯 Event Organizers</div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            <div className="event-card">
              <h3>AI & ML Bootcamp</h3>
              <p>Organized by: Tech University</p>
              <button className="event-btn">View Details</button>
            </div>

            <div className="event-card">
              <h3>National Robotics Championship</h3>
              <p>Organized by: Robo Club</p>
              <button className="event-btn">View Details</button>
            </div>

            <div className="event-card">
              <h3>Photography Workshop</h3>
              <p>Organized by: Creative Hub</p>
              <button className="event-btn">View Details</button>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="cta-section">
          <h2>Want to Host an Event?</h2>
          <p>Join Eventra as an organizer or faculty member and publish your event within minutes.</p>
          <button 
            className="cta-btn"
            onClick={() => handleAuthClick('signup')}
          >
            Get Started
          </button>
        </section>

      </main>

      {/* ===================== AUTH MODAL ===================== */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={() => setShowAuthModal(false)}
            >
              ×
            </button>

            <h2 className="modal-title">
              {authMode === 'login' ? 'Login to Eventra' : 'Create Your Eventra Account'}
            </h2>

            <div className="role-toggle">
              <p className="toggle-label">
                {authMode === 'login' ? 'Login as:' : 'Register as:'}
              </p>
              <div className="toggle-buttons">
                <button
                  className={`toggle-btn ${userRole === 'student' ? 'active' : ''}`}
                  onClick={() => handleRoleToggle('student')}
                >
                  Student
                </button>
                <button
                  className={`toggle-btn ${userRole === 'faculty' ? 'active' : ''}`}
                  onClick={() => handleRoleToggle('faculty')}
                >
                  Faculty
                </button>
                <button
                  className={`toggle-btn ${userRole === 'organizer' ? 'active' : ''}`}
                  onClick={() => handleRoleToggle('organizer')}
                >
                  Organizer
                </button>
              </div>
            </div>

            {/* Info messages */}
            {authMode === 'signup' && userRole === 'student' && (
              <div className="info-message">
                ℹ️ You need your Organization ID and institutional email to register
              </div>
            )}

            {authMode === 'signup' && userRole === 'faculty' && (
              <div className="info-message">
                ℹ️ Faculty members can create and manage educational events for your institution
              </div>
            )}

            {authMode === 'signup' && userRole === 'organizer' && (
              <div className="info-message">
                ℹ️ You will receive a unique Organization ID after registration
              </div>
            )}

            {authMode === 'login' && (
              <div className="info-message">
                🆔 Enter your Organization ID to login
              </div>
            )}

            {error && (
              <div className="error-message">
                ❌ {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            {/* Organization ID Display and Copy Button - Only shows for organizer signup */}
            {authMode === 'signup' && userRole === 'organizer' && successOrgId && (
              <div style={{
                backgroundColor: '#e8f5e9',
                border: '2px solid #4caf50',
                borderRadius: '8px',
                padding: '16px',
                marginTop: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  fontSize: '14px',
                  color: '#2e7d32',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  🆔 Your Organization ID:
                </div>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center'
                }}>
                  <input
                    type="text"
                    value={successOrgId}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '10px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      border: '1px solid #4caf50',
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                      color: '#2e7d32',
                      fontFamily: 'monospace',
                      letterSpacing: '1px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={copyOrgIdToClipboard}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
                  >
                    📋 Copy
                  </button>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#2e7d32',
                  marginTop: '8px',
                  fontStyle: 'italic'
                }}>
                  ⚠️ Important: Save this ID - faculty and students will need it to register!
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {authMode === 'signup' && (
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              )}

              <input
                type="email"
                name="email"
                placeholder={userRole === 'student' || userRole === 'faculty' ? 'Institutional Email' : 'Email'}
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-input"
              />

              {/* Organization ID field - shown for login and student/faculty signup */}
              {(authMode === 'login' || (authMode === 'signup' && (userRole === 'student' || userRole === 'faculty'))) && (
                <input
                  type="text"
                  name="organizerId"
                  placeholder="Organization ID (e.g., UNI-ABC123-4567)"
                  value={formData.organizerId}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  style={{ textTransform: 'uppercase' }}
                />
              )}

              {authMode === 'signup' && userRole === 'organizer' && (
                <>
                  <input
                    type="text"
                    name="organizationName"
                    placeholder="Organization Name"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />

                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="school">School</option>
                    <option value="college">College</option>
                    <option value="university">University</option>
                    <option value="private">Private Organizer</option>
                  </select>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                  />

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-input"
                  />

                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="form-input"
                  />

                  <textarea
                    name="description"
                    placeholder="Organization Description (Optional)"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="3"
                  />
                </>
              )}

              <button type="submit" className="submit-btn" disabled={loading || (successOrgId !== null)}>
                {loading ? 'Processing...' : (authMode === 'login' ? 'Login' : 'Sign Up')}
              </button>
            </form>

            <p className="toggle-auth">
              {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                className="link-btn"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login')
                  setError('')
                  setSuccess('')
                  setSuccessOrgId(null)
                }}
              >
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default App