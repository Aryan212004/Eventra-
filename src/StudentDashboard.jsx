import { useState } from 'react'

export default function StudentDashboard({ user, onLogout }) {
  const [registeredEvents, setRegisteredEvents] = useState([])

  // Mock upcoming events data
  const allEvents = [
    {
      id: 1,
      title: 'AI & ML Bootcamp',
      organizer: 'Tech University',
      date: '2024-12-15',
      time: '10:00 AM',
      location: 'Main Campus',
      category: 'Workshop',
      description: 'Learn AI and Machine Learning from industry experts',
      image: '🤖'
    },
    {
      id: 2,
      title: 'National Robotics Championship',
      organizer: 'Robo Club',
      date: '2024-12-20',
      time: '2:00 PM',
      location: 'Sports Complex',
      category: 'Competition',
      description: 'Compete with teams from across the country',
      image: '🤖'
    },
    {
      id: 3,
      title: 'Photography Workshop',
      organizer: 'Creative Hub',
      date: '2024-12-10',
      time: '3:00 PM',
      location: 'Art Building',
      category: 'Workshop',
      description: 'Master photography techniques with professionals',
      image: '📷'
    },
    {
      id: 4,
      title: 'Web Development Hackathon',
      organizer: 'Code Club',
      date: '2024-12-25',
      time: '9:00 AM',
      location: 'Tech Lab',
      category: 'Hackathon',
      description: '24-hour coding challenge with amazing prizes',
      image: '💻'
    },
    {
      id: 5,
      title: 'Startup Summit',
      organizer: 'Entrepreneurship Cell',
      date: '2024-12-28',
      time: '11:00 AM',
      location: 'Conference Hall',
      category: 'Seminar',
      description: 'Network with successful entrepreneurs and investors',
      image: '🚀'
    },
    {
      id: 6,
      title: 'Annual Sports Fest',
      organizer: 'Sports Department',
      date: '2025-01-05',
      time: '7:00 AM',
      location: 'Sports Ground',
      category: 'Sports',
      description: 'Inter-college sports competition across multiple events',
      image: '⚽'
    },
  ]

  const handleRegisterEvent = (event) => {
    const isAlreadyRegistered = registeredEvents.some(e => e.id === event.id)
    
    if (isAlreadyRegistered) {
      // Unregister
      const updated = registeredEvents.filter(e => e.id !== event.id)
      setRegisteredEvents(updated)
    } else {
      // Register
      const updated = [...registeredEvents, event]
      setRegisteredEvents(updated)
    }
  }

  const isRegistered = (eventId) => {
    return registeredEvents.some(e => e.id === eventId)
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .dashboard-container {
          min-height: 100vh;
          background: url('/src/assets/College.png') center/cover no-repeat fixed;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          position: relative;
        }

        .dashboard-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
          pointer-events: none;
        }

        .dashboard-container > * {
          position: relative;
          z-index: 2;
        }

        .dashboard-header {
          background: #1f2937;
          padding: 24px 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .dashboard-header h1 {
          margin: 0;
          color: #818cf8;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-details {
          text-align: right;
        }

        .user-name {
          color: white;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .user-email {
          color: #9ca3af;
          font-size: 13px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        .logout-btn {
          background: transparent;
          color: #fca5a5;
          border: 2px solid #fca5a5;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(252, 165, 165, 0.1);
          border-color: #f87171;
          color: #f87171;
          transform: translateY(-2px);
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 48px;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 32px;
        }

        @media (max-width: 1024px) {
          .dashboard-content {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .dashboard-header {
            padding: 20px 24px;
          }
        }

        .sidebar {
          background: rgba(255, 255, 255, 0.15);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          height: fit-content;
          position: sticky;
          top: 120px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .sidebar h2 {
          color: white;
          margin: 0 0 20px 0;
          font-size: 18px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .registered-event-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 16px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.3s ease;
        }

        .registered-event-item:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateX(4px);
        }

        .registered-event-item h4 {
          margin: 0 0 8px 0;
          color: white;
          font-size: 14px;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .registered-event-item p {
          margin: 0 0 4px 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .registered-event-item p:last-child {
          margin-bottom: 0;
        }

        .main-content {
          background: rgba(255, 255, 255, 0.15);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .main-content h2 {
          color: white;
          margin: 0 0 24px 0;
          font-size: 18px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .event-card {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .event-card:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
          transform: translateY(-4px);
        }

        .event-card-image {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          padding: 32px;
          text-align: center;
          font-size: 56px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .event-card-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .event-card-content h3 {
          margin: 0 0 12px 0;
          color: white;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.3;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .event-category {
          display: inline-block;
          background: rgba(255, 255, 255, 0.25);
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
          width: fit-content;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .event-meta {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          margin-bottom: 16px;
          line-height: 1.8;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .event-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .event-meta-icon {
          width: 16px;
          text-align: center;
        }

        .event-description {
          color: rgba(255, 255, 255, 0.85);
          font-size: 14px;
          margin-bottom: 20px;
          line-height: 1.6;
          flex: 1;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .register-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          font-size: 14px;
        }

        .register-btn.not-registered {
          background: rgba(79, 70, 229, 0.8);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .register-btn.not-registered:hover {
          background: rgba(67, 56, 202, 0.9);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .register-btn.registered {
          background: rgba(34, 197, 94, 0.8);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .register-btn.registered:hover {
          background: rgba(22, 163, 74, 0.9);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .empty-state {
          text-align: center;
          padding: 48px 20px;
          color: rgba(255, 255, 255, 0.7);
        }

        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.6;
        }

        .empty-state p {
          font-size: 14px;
          margin: 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <div className="user-info">
            <div className="user-details">
              <div className="user-name">{user.fullName}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <div className="user-avatar">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Sidebar - Registered Events */}
          <div className="sidebar">
            <h2>My Registrations</h2>
            {registeredEvents.length > 0 ? (
              registeredEvents.map(event => (
                <div key={event.id} className="registered-event-item">
                  <h4>{event.title}</h4>
                  <p>{event.date} • {event.time}</p>
                  <p>{event.location}</p>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <p>No events registered yet</p>
              </div>
            )}
          </div>

          {/* Main - All Events */}
          <div className="main-content">
            <h2>EVENTS</h2>
            <div className="events-grid">
              {allEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-card-image">
                    {event.image}
                  </div>
                  <div className="event-card-content">
                    <h3>{event.title}</h3>
                    <div className="event-category">{event.category}</div>
                    <div className="event-meta">
                      <div className="event-meta-item">
                        <span className="event-meta-icon">👤</span>
                        <span>{event.organizer}</span>
                      </div>
                      <div className="event-meta-item">
                        <span className="event-meta-icon">📅</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="event-meta-item">
                        <span className="event-meta-icon">⏰</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="event-meta-item">
                        <span className="event-meta-icon">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <button
                      className={`register-btn ${isRegistered(event.id) ? 'registered' : 'not-registered'}`}
                      onClick={() => handleRegisterEvent(event)}
                    >
                      {isRegistered(event.id) ? '✓ Registered' : 'Register Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}