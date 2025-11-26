import { useState, useEffect } from 'react'
import './App.css'
import StudentDashboard from './StudentDashboard.jsx'

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [userRole, setUserRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user')
    if (user) {
      setLoggedInUser(JSON.parse(user))
    }
  }, [])
  
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
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
    setLoading(false)
    setFormData({
      fullName: '',
      email: '',
      password: '',
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
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setLoggedInUser(null)
    setAuthMode('login')
  }

  // If user is logged in and is a student, show dashboard
  if (loggedInUser && loggedInUser.role === 'student') {
    return <StudentDashboard user={loggedInUser} onLogout={handleLogout} />
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
    setLoading(true)

    try {
      const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup'
      
      // Prepare request payload
      const payload = {
        email: formData.email,
        password: formData.password,
        role: userRole,
      }

      if (authMode === 'signup') {
        payload.fullName = formData.fullName
        
        // Add organizer-specific fields if role is organizer
        if (userRole === 'organizer') {
          payload.organizationName = formData.organizationName
          payload.organizationType = formData.organizationType
          payload.phone = formData.phone
          payload.address = formData.address
          payload.city = formData.city
          payload.state = formData.state
          payload.zipCode = formData.zipCode
          payload.description = formData.description
        }
      }

      console.log('📤 Sending request to:', `http://localhost:5000${endpoint}`)
      console.log('📦 Payload:', payload)

      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      console.log('📥 Response status:', response.status)

      const data = await response.json()
      console.log('📊 Response data:', data)

      if (!response.ok) {
        setError(data.message || `Error: ${response.status}`)
        return
      }

      setSuccess(data.message)
      
      // Save token to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      setLoggedInUser(data.user)

      // Close modal after 1 second
      setTimeout(() => {
        setShowAuthModal(false)
        setFormData({
          fullName: '',
          email: '',
          password: '',
          organizationName: '',
          organizationType: 'school',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          description: '',
        })
      }, 2000)
    } catch (err) {
      console.error('❌ Error:', err)
      setError(err.message || 'Network error. Make sure backend is running on http://localhost:5000')
    } finally {
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
            their events and <strong>students</strong> can browse, explore and enroll easily.  
            Perfect for colleges, schools, clubs, and professional event teams.
          </p>
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

        {/* ORGANIZER TYPES */}
        <section className="organizer-section">
          <h2>Organizers on Eventra</h2>
          <p>
            Institutions and organizations trust Eventra to manage, publish, 
            and promote their events seamlessly.
          </p>

          <div className="organizer-types">
            <div className="org-card">Schools</div>
            <div className="org-card">Colleges</div>
            <div className="org-card">Universities</div>
            <div className="org-card">Private Organizers</div>
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
          <p>Join Eventra as an organizer and publish your event within minutes.</p>
          <button 
            className="cta-btn"
            onClick={() => handleAuthClick('signup')}
          >
            Become an Organizer
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
                  className={`toggle-btn ${userRole === 'organizer' ? 'active' : ''}`}
                  onClick={() => handleRoleToggle('organizer')}
                >
                  Organizer
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

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
                placeholder="Email"
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

              {authMode === 'signup' && userRole === 'organizer' && (
                <>
                  <input
                    type="text"
                    name="organizationName"
                    placeholder="Organization Name"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="form-input"
                  />

                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    className="form-input"
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

              <button type="submit" className="submit-btn" disabled={loading}>
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