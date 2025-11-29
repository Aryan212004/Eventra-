import { useState } from 'react'

export default function CreateEvent({ isOpen, onClose, userRole, organizationName, onEventCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    category: 'workshop',
    capacity: '',
    image: '📌',
    imageFile: null,
    imagePreview: null,
    isOnline: false,
    meetingLink: '',
    prerequisites: '',
    tags: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const categories = [
    'Workshop',
    'Seminar',
    'Competition',
    'Conference',
    'Hackathon',
    'Webinar',
    'Cultural Event',
    'Sports Event',
    'Training',
    'Lecture',
    'Panel Discussion',
    'Networking Event'
  ]

  const eventIcons = {
    workshop: '🛠️',
    seminar: '📚',
    competition: '🏆',
    conference: '🎤',
    hackathon: '💻',
    webinar: '📹',
    'cultural event': '🎭',
    'sports event': '⚽',
    training: '🎓',
    lecture: '👨‍🏫',
    'panel discussion': '🗣️',
    'networking event': '🤝'
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file')
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result
        }))
        setError('')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: null
    }))
  }

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      category: category,
      image: eventIcons[category.toLowerCase()] || '📌'
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // Validation
      if (!formData.title.trim()) {
        setError('Event title is required')
        setLoading(false)
        return
      }

      if (!formData.date) {
        setError('Event date is required')
        setLoading(false)
        return
      }

      if (!formData.time) {
        setError('Event time is required')
        setLoading(false)
        return
      }

      if (!formData.location && !formData.isOnline) {
        setError('Event location or online meeting link is required')
        setLoading(false)
        return
      }

      if (formData.isOnline && !formData.meetingLink.trim()) {
        setError('Meeting link is required for online events')
        setLoading(false)
        return
      }

      if (formData.capacity && isNaN(formData.capacity)) {
        setError('Capacity must be a valid number')
        setLoading(false)
        return
      }

      // Create event object
      const newEvent = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        endTime: formData.endTime,
        location: formData.location,
        category: formData.category,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        image: formData.imagePreview || formData.image, // Use uploaded image or emoji
        isOnline: formData.isOnline,
        meetingLink: formData.meetingLink,
        prerequisites: formData.prerequisites,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        status: 'Active',
        totalParticipants: 0,
        createdAt: new Date().toISOString(),
        hasCustomImage: !!formData.imagePreview
      }

      console.log('📨 Creating event:', newEvent)

      // In production, this would call your backend API
      // const response = await fetch('/api/events', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newEvent)
      // })

      // For now, show success and call callback
      setSuccess('✅ Event created successfully!')
      
      // Call parent callback
      if (onEventCreated) {
        onEventCreated(newEvent)
      }

      // Reset form
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          endTime: '',
          location: '',
          category: 'workshop',
          capacity: '',
          image: '📌',
          imageFile: null,
          imagePreview: null,
          isOnline: false,
          meetingLink: '',
          prerequisites: '',
          tags: ''
        })
        setSuccess('')
        onClose()
      }, 2000)

    } catch (err) {
      console.error('❌ Error creating event:', err)
      setError(`Error: ${err.message || 'Failed to create event'}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <style>{`
        .create-event-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .create-event-modal {
          background: rgba(31, 41, 55, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 32px;
          max-width: 700px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .create-event-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .create-event-header h2 {
          color: white;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .close-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 28px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .form-section {
          margin-bottom: 24px;
        }

        .form-section-title {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
          display: block;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-row.full {
          grid-template-columns: 1fr;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .form-label.required::after {
          content: ' *';
          color: #f87171;
        }

        .form-input,
        .form-textarea,
        .form-select {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(99, 102, 241, 0.6);
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
          font-family: inherit;
        }

        /* Image Upload Styles */
        .image-upload-section {
          background: rgba(255, 255, 255, 0.08);
          border: 2px dashed rgba(99, 102, 241, 0.4);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .image-upload-section:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(99, 102, 241, 0.8);
        }

        .image-upload-section.active {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.8);
        }

        .image-upload-input {
          display: none;
        }

        .image-upload-label {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .image-upload-icon {
          font-size: 48px;
          opacity: 0.8;
        }

        .image-upload-text {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .image-upload-hint {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          margin-top: 8px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        .image-preview-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-height: 300px;
          margin-bottom: 16px;
        }

        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-preview-container:hover .image-preview-overlay {
          opacity: 1;
        }

        .image-preview-actions {
          display: flex;
          gap: 12px;
        }

        .image-action-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .image-action-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 8px;
        }

        .category-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.8);
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-align: center;
        }

        .category-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(99, 102, 241, 0.4);
        }

        .category-btn.active {
          background: rgba(99, 102, 241, 0.6);
          border-color: rgba(99, 102, 241, 0.8);
          color: white;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #6366f1;
        }

        .checkbox-label {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          cursor: pointer;
          flex: 1;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          border-radius: 8px;
          padding: 12px 16px;
          color: #fca5a5;
          font-size: 13px;
          margin-bottom: 16px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .success-message {
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 8px;
          padding: 12px 16px;
          color: #86efac;
          font-size: 13px;
          margin-bottom: 16px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .form-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-cancel,
        .btn-create {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .btn-cancel {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-cancel:hover {
          background: rgba(255, 255, 255, 0.12);
          color: white;
        }

        .btn-create {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(79, 70, 229, 0.9) 100%);
          color: white;
        }

        .btn-create:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(99, 102, 241, 1) 0%, rgba(67, 56, 202, 1) 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .btn-create:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .icon-preview {
          font-size: 48px;
          text-align: center;
          margin-bottom: 12px;
        }

        .location-toggle {
          display: flex;
          gap: 8px;
          align-items: center;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .helper-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          margin-top: 6px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .create-event-modal {
            max-width: 100%;
            max-height: 90vh;
            padding: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .category-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }

          .form-actions {
            grid-template-columns: 1fr;
          }

          .image-upload-section {
            padding: 16px;
          }
        }
      `}</style>

      <div className="create-event-overlay" onClick={onClose}>
        <div className="create-event-modal" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="create-event-header">
            <h2>Create New Event</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">❌ {error}</div>}

          {/* Success Message */}
          {success && <div className="success-message">✅ {success}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Event Poster/Image */}
            <label className="form-section-title">🖼️ Event Poster (Image)</label>
            <div className="form-section">
              {formData.imagePreview ? (
                <>
                  <div className="image-preview-container">
                    <img src={formData.imagePreview} alt="Event poster preview" className="image-preview" />
                    <div className="image-preview-overlay">
                      <div className="image-preview-actions">
                        <label htmlFor="image-input" className="image-action-btn">
                          📝 Change
                        </label>
                        <button 
                          type="button" 
                          className="image-action-btn"
                          onClick={handleRemoveImage}
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="image-upload-section">
                  <label htmlFor="image-input" className="image-upload-label">
                    <div className="image-upload-icon">📸</div>
                    <div className="image-upload-text">Upload Event Poster</div>
                    <div className="image-upload-hint">Click to select image or drag and drop</div>
                  </label>
                  <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    className="image-upload-input"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
              <p className="helper-text">
                📌 Recommended: 1200×630px, JPG or PNG, max 5MB
              </p>
            </div>

            {/* Basic Information */}
            <label className="form-section-title">📝 Basic Information</label>
            <div className="form-section">
              <div className="form-group">
                <label className="form-label required">Event Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="e.g., AI & ML Bootcamp"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  placeholder="Describe your event, what participants will learn, etc..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Category Selection */}
            <label className="form-section-title">🏷️ Category</label>
            <div className="form-section">
              <div className="icon-preview">{formData.image}</div>
              <div className="category-grid">
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className={`category-btn ${formData.category === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <label className="form-section-title">⏰ Date & Time</label>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label required">Start Time</label>
                  <input
                    type="time"
                    name="time"
                    className="form-input"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  className="form-input"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Location */}
            <label className="form-section-title">📍 Location</label>
            <div className="form-section">
              <div className="location-toggle">
                <input
                  type="checkbox"
                  id="isOnline"
                  name="isOnline"
                  className="checkbox"
                  checked={formData.isOnline}
                  onChange={handleInputChange}
                />
                <label htmlFor="isOnline" className="checkbox-label">
                  This is an online event
                </label>
              </div>

              {formData.isOnline ? (
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label required">Meeting Link</label>
                  <input
                    type="url"
                    name="meetingLink"
                    className="form-input"
                    placeholder="e.g., https://zoom.us/j/..."
                    value={formData.meetingLink}
                    onChange={handleInputChange}
                  />
                  <p className="helper-text">
                    Provide Zoom, Google Meet, or other meeting platform link
                  </p>
                </div>
              ) : (
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label required">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-input"
                    placeholder="e.g., Main Campus, Lab 101"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            {/* Capacity & Prerequisites */}
            <label className="form-section-title">👥 Capacity & Requirements</label>
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Max Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    className="form-input"
                    placeholder="e.g., 50"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    min="1"
                  />
                  <p className="helper-text">Leave empty for unlimited</p>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label">Prerequisites</label>
                <textarea
                  name="prerequisites"
                  className="form-textarea"
                  placeholder="e.g., Basic programming knowledge required..."
                  style={{ minHeight: '80px' }}
                  value={formData.prerequisites}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Tags */}
            <label className="form-section-title">🏷️ Tags</label>
            <div className="form-section">
              <div className="form-group">
                <label className="form-label">Event Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  className="form-input"
                  placeholder="e.g., Python, Machine Learning, Beginners"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
                <p className="helper-text">
                  Separate multiple tags with commas
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-create"
                disabled={loading}
              >
                {loading ? '🔄 Creating...' : '✅ Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}