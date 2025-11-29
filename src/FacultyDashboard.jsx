import { useState } from 'react'
import CreateEvent from './CreateEvent.jsx'

export default function FacultyDashboard({ user, onLogout }) {
  const [createdEvents, setCreatedEvents] = useState([
    {
      id: 1,
      title: 'Advanced Python Programming',
      date: '2024-12-15',
      time: '10:00 AM',
      endTime: '12:00 PM',
      location: 'Lab 101',
      category: 'Workshop',
      description: 'Master advanced Python concepts and best practices',
      totalParticipants: 45,
      capacity: 50,
      status: 'Active',
      image: '🐍'
    },
    {
      id: 2,
      title: 'Data Science Seminar',
      date: '2024-12-20',
      time: '2:00 PM',
      endTime: '4:00 PM',
      location: 'Auditorium',
      category: 'Seminar',
      description: 'Latest trends in Data Science and Machine Learning',
      totalParticipants: 32,
      capacity: 100,
      status: 'Active',
      image: '📊'
    },
    {
      id: 3,
      title: 'Web Development Workshop',
      date: '2024-12-10',
      time: '3:00 PM',
      endTime: '5:00 PM',
      location: 'Computer Lab',
      category: 'Workshop',
      description: 'Build responsive web applications with modern frameworks',
      totalParticipants: 28,
      capacity: 40,
      status: 'Completed',
      image: '🌐'
    },
  ])

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [editingEventId, setEditingEventId] = useState(null)

  // Calendar Functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventDates = () => {
    return createdEvents.map(event => {
      const [year, month, day] = event.date.split('-')
      return parseInt(day)
    })
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleEventCreated = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: createdEvents.length + 1
    }
    setCreatedEvents([...createdEvents, eventWithId])
    setShowCreateEvent(false)
  }

  const handleDeleteEvent = (eventId) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setCreatedEvents(createdEvents.filter(e => e.id !== eventId))
    }
  }

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const eventDates = getEventDates()

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
          background: #a855f7;
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
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar h2 {
          color: white;
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .stats-box {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border: 2px solid rgba(168, 85, 247, 0.4);
          border-radius: 12px;
          padding: 16px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .stat-value {
          background: rgba(168, 85, 247, 0.3);
          color: #d8b4fe;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          border: 1px solid rgba(216, 180, 254, 0.2);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .calendar-container {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 16px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .calendar-title {
          color: white;
          font-size: 16px;
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .calendar-nav {
          display: flex;
          gap: 8px;
        }

        .calendar-btn {
          background: rgba(168, 85, 247, 0.6);
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .calendar-btn:hover {
          background: rgba(168, 85, 247, 1);
          transform: translateY(-1px);
        }

        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 8px;
        }

        .weekday {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 11px;
          font-weight: 600;
          padding: 6px 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .calendar-day.empty {
          background: transparent;
          border: none;
          cursor: default;
        }

        .calendar-day.event {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.6) 0%, rgba(147, 51, 234, 0.6) 100%);
          color: #d8b4fe;
          border: 1px solid rgba(216, 180, 254, 0.4);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .calendar-day.event:hover {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%);
          border-color: rgba(216, 180, 254, 0.8);
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
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

        .create-event-btn {
          background: rgba(168, 85, 247, 0.9);
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

        .create-event-btn:hover {
          background: rgba(147, 51, 234, 1);
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
          grid-template-columns: 200px 1fr auto;
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
          background: linear-gradient(135deg, #a855f7 0%, #d946ef 100%);
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

        .event-actions {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          justify-content: center;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
        }

        .participants-badge {
          background: rgba(168, 85, 247, 0.2);
          color: #d8b4fe;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid rgba(216, 180, 254, 0.3);
          text-align: center;
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
          <h1>Faculty Dashboard</h1>
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
            {/* Stats Box */}
            <div className="stats-box">
              <div className="stat-item">
                <span className="stat-label">📊 Total Events</span>
                <span className="stat-value">{createdEvents.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">🎯 Active Events</span>
                <span className="stat-value">{createdEvents.filter(e => e.status === 'Active').length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">👥 Total Participants</span>
                <span className="stat-value">{createdEvents.reduce((sum, e) => sum + e.totalParticipants, 0)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">✅ Completed</span>
                <span className="stat-value">{createdEvents.filter(e => e.status === 'Completed').length}</span>
              </div>
            </div>

            {/* Calendar */}
            <div className="calendar-container">
              <div className="calendar-header">
                <h2 className="calendar-title">📅 Calendar</h2>
                <div className="calendar-nav">
                  <button className="calendar-btn" onClick={goToPreviousMonth}>←</button>
                  <button className="calendar-btn" onClick={goToNextMonth}>→</button>
                </div>
              </div>
              
              <div className="calendar-title" style={{ textAlign: 'center', marginBottom: '12px', color: 'rgba(255, 255, 255, 0.9)' }}>
                {monthName}
              </div>

              <div className="weekdays">
                <div className="weekday">Sun</div>
                <div className="weekday">Mon</div>
                <div className="weekday">Tue</div>
                <div className="weekday">Wed</div>
                <div className="weekday">Thu</div>
                <div className="weekday">Fri</div>
                <div className="weekday">Sat</div>
              </div>

              <div className="calendar-grid">
                {[...Array(firstDay)].map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-day empty"></div>
                ))}
                
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1
                  const isEvent = eventDates.includes(day)
                  return (
                    <div 
                      key={day} 
                      className={`calendar-day ${isEvent ? 'event' : ''}`}
                      title={isEvent ? 'Event scheduled' : ''}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>

              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.6) 0%, rgba(147, 51, 234, 0.6) 100%)' }}></div>
                  Event Day
                </div>
              </div>
            </div>
          </div>

          <div className="main-content">
            <div className="content-header">
              <h2>My Events</h2>
              <button className="create-event-btn" onClick={() => setShowCreateEvent(true)}>
                + Create Event
              </button>
            </div>
            <div className="events-grid">
              {createdEvents.length > 0 ? (
                createdEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-card-image">
                      {event.image}
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
                          <span>{event.time} - {event.endTime || 'TBD'}</span>
                        </div>
                        <div className="event-meta-item">
                          <span className="event-meta-icon">📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="event-meta-item">
                          <span className="event-meta-icon">👥</span>
                          <span>{event.totalParticipants} / {event.capacity || '∞'}</span>
                        </div>
                      </div>
                      <p className="event-description">{event.description}</p>
                    </div>
                    <div className="event-actions">
                      <span className={`status-badge ${event.status === 'Active' ? 'status-active' : 'status-completed'}`}>
                        {event.status}
                      </span>
                      <div className="participants-badge">
                        {event.totalParticipants} 👥
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
        userRole="faculty"
        organizationName={user.organizationName || 'Your Organization'}
        onEventCreated={handleEventCreated}
      />
    </>
  )
}