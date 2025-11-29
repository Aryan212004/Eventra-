import { useState } from 'react'
import CreateEvent from './CreateEvent.jsx'

export default function OrganizerDashboard({ user, onLogout }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'AI & ML Bootcamp',
      date: '2024-12-15',
      time: '10:00 AM',
      endTime: '12:00 PM',
      location: 'Main Campus',
      category: 'Workshop',
      registrations: 45,
      status: 'Active',
      image: '🤖',
      hasCustomImage: false,
      description: 'Learn AI and Machine Learning fundamentals'
    },
    {
      id: 2,
      title: 'National Robotics Championship',
      date: '2024-12-20',
      time: '2:00 PM',
      endTime: '5:00 PM',
      location: 'Sports Complex',
      category: 'Competition',
      registrations: 32,
      status: 'Active',
      image: '🤖',
      hasCustomImage: false,
      description: 'Annual robotics competition for all institutions'
    },
    {
      id: 3,
      title: 'Photography Workshop',
      date: '2024-12-10',
      time: '3:00 PM',
      endTime: '5:00 PM',
      location: 'Art Building',
      category: 'Workshop',
      registrations: 28,
      status: 'Completed',
      image: '📷',
      hasCustomImage: false,
      description: 'Professional photography techniques and tips'
    }
  ])

  const [showCreateEvent, setShowCreateEvent] = useState(false)

  // Copy Organization ID to clipboard
  const copyOrgIdToClipboard = () => {
    if (user.organizerId) {
      navigator.clipboard.writeText(user.organizerId)
      alert('Organization ID copied to clipboard!')
    }
  }

  const handleEventCreated = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: events.length + 1,
      registrations: 0
    }
    setEvents([...events, eventWithId])
    setShowCreateEvent(false)
  }

  const handleDeleteEvent = (eventId) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== eventId))
    }
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
        }

        @media (max-width: 1024px) {
          .dashboard-content {
            padding: 24px;
          }

          .dashboard-header {
            padding: 20px 24px;
          }
        }

        /* Organization ID Box Styling */
        .org-id-info {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border: 2px solid rgba(168, 85, 247, 0.4);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: space-between;
        }

        .org-id-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .org-id-icon {
          font-size: 24px;
        }

        .org-id-text {
          flex: 1;
        }

        .org-id-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 6px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .org-id-value {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 12px;
          border-radius: 8px;
          color: #c4b5fd;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          letter-spacing: 1px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          display: inline-block;
        }

        .copy-org-id-btn {
          background: rgba(168, 85, 247, 0.8);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .copy-org-id-btn:hover {
          background: rgba(147, 51, 234, 1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .copy-org-id-btn:active {
          transform: translateY(0);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        .stat-card h3 {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 8px 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .stat-value {
          color: white;
          font-size: 32px;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .main-content h2 {
          color: white;
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .add-event-btn {
          background: rgba(79, 70, 229, 0.9);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .add-event-btn:hover {
          background: rgba(67, 56, 202, 1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
          grid-template-columns: 280px 1fr auto;
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
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
          overflow: hidden;
          min-height: 280px;
        }

        .event-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .event-card-image.emoji {
          font-size: 80px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
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
          margin-top: 12px;
          line-height: 1.5;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .event-actions {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          justify-content: center;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
        }

        .registrations-count {
          background: rgba(34, 197, 94, 0.2);
          color: #4ade80;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-active {
          background: rgba(34, 197, 94, 0.2);
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .status-completed {
          background: rgba(156, 163, 175, 0.2);
          color: #d1d5db;
          border: 1px solid rgba(209, 213, 219, 0.3);
        }

        .action-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s ease;
          width: 120px;
        }

        .edit-btn {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          border: 1px solid rgba(96, 165, 250, 0.3);
        }

        .edit-btn:hover {
          background: rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
        }

        .delete-btn {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.3);
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.3);
          transform: translateY(-2px);
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
          <h1>Organizer Dashboard</h1>
          <div className="user-info">
            <div className="user-details">
              <div className="user-name">{user?.organizationName || user?.fullName || 'Organizer'}</div>
              <div className="user-email">{user?.email || 'email@example.com'}</div>
            </div>
            <div className="user-avatar">
              {(user?.organizationName || user?.fullName || 'O').charAt(0).toUpperCase()}
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Organization ID Info Box */}
          <div className="org-id-info">
            <div className="org-id-left">
              <div className="org-id-icon">🏢</div>
              <div className="org-id-text">
                <span className="org-id-label">Your Organization ID</span>
                <div className="org-id-value">{user.organizerId}</div>
              </div>
            </div>
            <button 
              className="copy-org-id-btn"
              onClick={copyOrgIdToClipboard}
              title="Copy Organization ID"
            >
              📋 Copy ID
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Events</h3>
              <p className="stat-value">{events.length}</p>
            </div>
            <div className="stat-card">
              <h3>Active Events</h3>
              <p className="stat-value">{events.filter(e => e.status === 'Active').length}</p>
            </div>
            <div className="stat-card">
              <h3>Total Registrations</h3>
              <p className="stat-value">{events.reduce((sum, e) => sum + e.registrations, 0)}</p>
            </div>
          </div>

          <div className="main-content">
            <div className="content-header">
              <h2>Your Events</h2>
              <button className="add-event-btn" onClick={() => setShowCreateEvent(true)}>
                + Create Event
              </button>
            </div>
            <div className="events-grid">
              {events.length > 0 ? (
                events.map(event => (
                  <div key={event.id} className="event-card">
                    <div className={`event-card-image ${event.hasCustomImage ? '' : 'emoji'}`}>
                      {event.hasCustomImage ? (
                        <img src={event.image} alt={event.title} />
                      ) : (
                        event.image
                      )}
                    </div>
                    <div className="event-card-content">
                      <h3>{event.title}</h3>
                      <div className="event-category">{event.category}</div>
                      <div className="event-meta">
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
                        <div className="event-meta-item">
                          <span className="event-meta-icon">👥</span>
                          <span>{event.registrations} registered</span>
                        </div>
                      </div>
                      {event.description && (
                        <p className="event-description">{event.description}</p>
                      )}
                    </div>
                    <div className="event-actions">
                      <span className={`status-badge ${event.status === 'Active' ? 'status-active' : 'status-completed'}`}>
                        {event.status}
                      </span>
                      <div className="registrations-count">
                        {event.registrations} 👥
                      </div>
                      <button className="action-btn edit-btn">Edit</button>
                      <button className="action-btn delete-btn" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📋</div>
                  <p>No events created yet. Click "+ Create Event" to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      <CreateEvent
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        userRole="organizer"
        organizationName={user?.organizationName || 'Your Organization'}
        onEventCreated={handleEventCreated}
      />
    </>
  )
}