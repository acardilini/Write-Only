import { useState, useEffect, useRef } from 'react';
import { saveSession } from '../utils/db';
import './FocusSpace.css';

export default function FocusSpace({ onFinish }) {
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef(null);

  // Track start time when component mounts
  useEffect(() => {
    setStartTime(Date.now());
    // Auto-focus the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Handle keydown events to disable backspace and delete
  const handleKeyDown = (e) => {
    // Disable Backspace (key code 8)
    if (e.key === 'Backspace' || e.keyCode === 8) {
      e.preventDefault();
      return false;
    }

    // Disable Delete (key code 46)
    if (e.key === 'Delete' || e.keyCode === 46) {
      e.preventDefault();
      return false;
    }

    // Also disable Ctrl+X (cut) and Cmd+X
    if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
      e.preventDefault();
      return false;
    }
  };

  // Handle paste events - allow pasting but track it
  const handlePaste = (e) => {
    // Allow paste to work normally
    // The onChange handler will capture the new text
  };

  // Calculate word count
  const getWordCount = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length;
  };

  // Handle finish button click
  const handleFinish = () => {
    if (text.trim().length === 0) {
      alert('Please write something before finishing!');
      return;
    }
    setShowNamePrompt(true);
  };

  // Save the session
  const handleSaveSession = async () => {
    setIsSaving(true);

    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const wordCount = getWordCount(text);

    const session = {
      text: text,
      name: sessionName.trim() || null,
      timestamp: Date.now(),
      date: new Date().toDateString(),
      timeSpent: timeSpent, // in seconds
      wordCount: wordCount,
    };

    try {
      await saveSession(session);
      // Reset the editor
      setText('');
      setSessionName('');
      setShowNamePrompt(false);
      setStartTime(Date.now());
      setIsSaving(false);

      // Call the onFinish callback if provided
      if (onFinish) {
        onFinish();
      }

      // Show success message
      alert(`Session saved! ${wordCount} words in ${Math.floor(timeSpent / 60)} minutes.`);

      // Refocus the textarea
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Error saving session. Please try again.');
      setIsSaving(false);
    }
  };

  // Cancel naming and go back to editing
  const handleCancelNaming = () => {
    setShowNamePrompt(false);
    setSessionName('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Current word count
  const currentWordCount = getWordCount(text);

  return (
    <div className="focus-space">
      {!showNamePrompt ? (
        <>
          <div className="editor-container">
            <textarea
              ref={textareaRef}
              className="write-only-editor"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="Just write. No going back..."
              spellCheck={true}
            />
          </div>

          <div className="editor-footer">
            <div className="word-count">
              {currentWordCount} {currentWordCount === 1 ? 'word' : 'words'}
            </div>
            <button
              className="finish-button"
              onClick={handleFinish}
              disabled={text.trim().length === 0}
            >
              Finish
            </button>
          </div>
        </>
      ) : (
        <div className="name-prompt">
          <h2>Name this session?</h2>
          <p className="prompt-hint">(optional)</p>

          <input
            type="text"
            className="session-name-input"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="e.g., Morning thoughts, Chapter 3..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveSession();
              } else if (e.key === 'Escape') {
                handleCancelNaming();
              }
            }}
          />

          <div className="session-stats">
            <p>{currentWordCount} words written</p>
            <p>{Math.floor((Date.now() - startTime) / 60000)} minutes</p>
          </div>

          <div className="prompt-buttons">
            <button
              className="cancel-button"
              onClick={handleCancelNaming}
              disabled={isSaving}
            >
              Back to Editing
            </button>
            <button
              className="save-button"
              onClick={handleSaveSession}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Session'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
