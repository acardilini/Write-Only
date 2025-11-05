import { openDB } from 'idb';

const DB_NAME = 'JustWriteDB';
const DB_VERSION = 1;
const SESSIONS_STORE = 'sessions';

/**
 * Initialize and return the IndexedDB database
 */
export async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create sessions object store if it doesn't exist
      if (!db.objectStoreNames.contains(SESSIONS_STORE)) {
        const store = db.createObjectStore(SESSIONS_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });

        // Create indexes for efficient querying
        store.createIndex('timestamp', 'timestamp');
        store.createIndex('date', 'date'); // For grouping by day
      }
    },
  });
}

/**
 * Save a new writing session
 * @param {Object} session - Session object containing text, name, timestamp, etc.
 * @returns {Promise<number>} The ID of the saved session
 */
export async function saveSession(session) {
  const db = await getDB();
  const id = await db.add(SESSIONS_STORE, {
    ...session,
    timestamp: session.timestamp || Date.now(),
    date: session.date || new Date().toDateString(), // For grouping by day
  });
  return id;
}

/**
 * Get all sessions in reverse chronological order
 * @returns {Promise<Array>} Array of all sessions
 */
export async function getAllSessions() {
  const db = await getDB();
  const sessions = await db.getAllFromIndex(SESSIONS_STORE, 'timestamp');
  return sessions.reverse(); // Most recent first
}

/**
 * Get a single session by ID
 * @param {number} id - Session ID
 * @returns {Promise<Object>} Session object
 */
export async function getSession(id) {
  const db = await getDB();
  return db.get(SESSIONS_STORE, id);
}

/**
 * Delete a session by ID
 * @param {number} id - Session ID
 * @returns {Promise<void>}
 */
export async function deleteSession(id) {
  const db = await getDB();
  return db.delete(SESSIONS_STORE, id);
}

/**
 * Get word counts aggregated by date for heatmap
 * @returns {Promise<Object>} Object mapping dates to total word counts
 */
export async function getWordCountsByDate() {
  const db = await getDB();
  const sessions = await db.getAll(SESSIONS_STORE);

  const countsByDate = {};

  sessions.forEach(session => {
    const date = session.date;
    if (!countsByDate[date]) {
      countsByDate[date] = 0;
    }
    countsByDate[date] += session.wordCount || 0;
  });

  return countsByDate;
}

/**
 * Get statistics for a date range
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Promise<Object>} Statistics object
 */
export async function getStats(startDate, endDate) {
  const db = await getDB();
  const sessions = await db.getAll(SESSIONS_STORE);

  const filteredSessions = sessions.filter(session => {
    const sessionDate = new Date(session.timestamp);
    return sessionDate >= startDate && sessionDate <= endDate;
  });

  const totalWordCount = filteredSessions.reduce(
    (sum, session) => sum + (session.wordCount || 0),
    0
  );

  const totalTimeSpent = filteredSessions.reduce(
    (sum, session) => sum + (session.timeSpent || 0),
    0
  );

  return {
    sessionCount: filteredSessions.length,
    totalWordCount,
    totalTimeSpent,
    averageWordCount: filteredSessions.length > 0
      ? Math.round(totalWordCount / filteredSessions.length)
      : 0,
  };
}

/**
 * Export all sessions as JSON
 * @returns {Promise<string>} JSON string of all sessions
 */
export async function exportAllSessions() {
  const sessions = await getAllSessions();
  return JSON.stringify(sessions, null, 2);
}
