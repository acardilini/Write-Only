import { useEffect } from 'react';
import './SessionViewer.css';

export default function SessionViewer({ session, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds} seconds`;
    } else if (remainingSeconds === 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    } else {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} and ${remainingSeconds} seconds`;
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="session-viewer-backdrop" onClick={handleBackdropClick}>
      <div className="session-viewer">
        <div className="viewer-header">
          <div className="viewer-title">
            <h2>{session.name || 'Untitled Session'}</h2>
            <div className="viewer-meta">
              <span>{formatDate(session.timestamp)}</span>
              <span className="meta-separator">•</span>
              <span>{formatTime(session.timestamp)}</span>
            </div>
          </div>

          <button className="close-button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="viewer-stats">
          <div className="stat">
            <span className="stat-value">{session.wordCount}</span>
            <span className="stat-label">words</span>
          </div>
          <div className="stat">
            <span className="stat-value">{formatDuration(session.timeSpent)}</span>
            <span className="stat-label">writing time</span>
          </div>
        </div>

        <div className="viewer-content">
          <div className="session-text">
            {session.text}
          </div>
        </div>

        <div className="viewer-footer">
          <button className="export-button" disabled>
            Export to Google Drive (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
