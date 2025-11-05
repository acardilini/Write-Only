import { useState, useEffect } from 'react';
import { getAllSessions, getWordCountsByDate } from '../utils/db';
import SessionViewer from './SessionViewer';
import './ReflectionSpace.css';

export default function ReflectionSpace() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalWords: 0,
    totalTime: 0,
  });

  // Load sessions on component mount
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const allSessions = await getAllSessions();
      setSessions(allSessions);

      // Calculate stats
      const totalWords = allSessions.reduce((sum, s) => sum + (s.wordCount || 0), 0);
      const totalTime = allSessions.reduce((sum, s) => sum + (s.timeSpent || 0), 0);

      setStats({
        totalSessions: allSessions.length,
        totalWords,
        totalTime,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading sessions:', error);
      setLoading(false);
    }
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
  };

  const handleCloseViewer = () => {
    setSelectedSession(null);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
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
      return `${remainingSeconds}s`;
    } else if (remainingSeconds === 0) {
      return `${minutes}m`;
    } else {
      return `${minutes}m ${remainingSeconds}s`;
    }
  };

  if (loading) {
    return (
      <div className="reflection-space">
        <div className="loading">Loading your sessions...</div>
      </div>
    );
  }

  return (
    <div className="reflection-space">
      <div className="reflection-header">
        <h1>Your Writing Journey</h1>

        <div className="data-warning">
          <p>
            ⚠️ Your data is stored locally in your browser.
            Clearing your browser cache will delete all sessions.
          </p>
        </div>

        {sessions.length > 0 && (
          <div className="stats-overview">
            <div className="stat-item">
              <div className="stat-value">{stats.totalSessions}</div>
              <div className="stat-label">Sessions</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalWords.toLocaleString()}</div>
              <div className="stat-label">Total Words</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{Math.floor(stats.totalTime / 60)}</div>
              <div className="stat-label">Minutes</div>
            </div>
          </div>
        )}
      </div>

      <div className="sessions-container">
        <h2>Session Log</h2>

        {sessions.length === 0 ? (
          <div className="empty-state">
            <p>No sessions yet. Start writing to see your work here!</p>
          </div>
        ) : (
          <div className="sessions-list">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="session-card"
                onClick={() => handleSessionClick(session)}
              >
                <div className="session-header">
                  <h3 className="session-name">
                    {session.name || 'Untitled Session'}
                  </h3>
                  <div className="session-date">
                    {formatDate(session.timestamp)}
                  </div>
                </div>

                <div className="session-preview">
                  {session.text.substring(0, 150)}
                  {session.text.length > 150 && '...'}
                </div>

                <div className="session-meta">
                  <span className="meta-item">
                    {session.wordCount} {session.wordCount === 1 ? 'word' : 'words'}
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">
                    {formatDuration(session.timeSpent)}
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">
                    {formatTime(session.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedSession && (
        <SessionViewer
          session={selectedSession}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
}
