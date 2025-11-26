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
      const updated = registeredEvents.filter(e => e.id !== event.id)
      setRegisteredEvents(updated)
    } else {
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
          background-image: url('/src/assets/College.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          position: relative;
        }

        .dashboard-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 0;
        }

        .dashboard-container > * {
          position: relative;
          z-index: 1;
        }

        .dashboard-header {
          background: rgba(31, 41, 55, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 20px 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
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
          padding: 10px 24px;
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
          padding: 40px 48px;
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 32px;
          align-items: start;
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
          background: rgba(255, 255, 255, 0.08);
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        .sidebar h2 {
          color: white;
          margin: 0 0 24px 0;
          font-size: 20px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .registered-event-item {
          background: rgba(255, 255, 255, 0.12);
          padding: 18px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .registered-event-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .registered-event-item h4 {
          margin: 0 0 8px 0;
          color: white;
          font-size: 15px;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .registered-event-item p {
          margin: 0 0 4px 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .registered-event-item p:last-child {
          margin-bottom: 0;
        }

        .main-content {
          background: rgba(255, 255, 255, 0.08);
          padding: 32px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        .main-content h2 {
          color: white;
          margin: 0 0 28px 0;
          font-size: 20px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .events-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .event-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.25);
          display: grid;
          grid-template-columns: 200px 1fr;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .event-card:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .event-card {
            grid-template-columns: 1fr;
          }
        }

        .event-card-image {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
        }

        .event-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .event-card-content h3 {
          margin: 0 0 12px 0;
          color: white;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.3;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .event-category {
          display: inline-block;
          background: rgba(255, 255, 255, 0.25);
          color: white;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
          width: fit-content;
          border: 1px solid rgba(255, 255, 255, 0.3);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .event-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .event-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 14px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .event-meta-icon {
          font-size: 16px;
        }

        .event-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin-bottom: 20px;
          line-height: 1.6;
          flex: 1;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .register-btn {
          width: 200px;
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .register-btn.not-registered {
          background: rgba(79, 70, 229, 0.9);
          color: white;
        }

        .register-btn.not-registered:hover {
          background: rgba(67, 56, 202, 1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .register-btn.registered {
          background: rgba(34, 197, 94, 0.9);
          color: white;
        }

        .register-btn.registered:hover {
          background: rgba(22, 163, 74, 1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .empty-state {
          text-align: center;
          padding: 48px 20px;
          color: rgba(255, 255, 255, 0.8);
        }

        .empty-state-icon {
          font-size: 56px;
          margin-bottom: 16px;
          opacity: 0.7;
        }

        .empty-state p {
          font-size: 14px;
          margin: 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="dashboard-container">
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

        <div className="dashboard-content">
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

          <div className="main-content">
            <h2>Upcoming Events</h2>
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