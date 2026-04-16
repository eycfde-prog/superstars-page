/**
 * VETO PROGRAM | Master Session Content Database
 * Architect: Veto A✨
 * Final Balanced Version for Mr. Ezz
 * * --- ACTIVITY LOGIC ---
 * SQUEEZER (6 Parts): Intro(3-4), Tests(4-1, 5-2, 6-2, 7-2, 8-2, 10-1), Reviews(5-1, 6-1, 7-1, 8-1, 9-4)
 * DMT: Intro(4-4), Reviews(5-2, 6-3, 7-2, 8-3, 9-2, 10-3, 11-2), Tests(5-1, 5-3, 6-4, 7-3, 8-4, 9-3, 10-4, 11-3)
 * WISH (3 Parts): Intro/Rev(7-4, 9-1, 10-1), Tests(8-1, 9-2, 10-2, 11-3)
 * PROJECTS: Project 1 (Intro 8-4, Test 9-1) | Project 2 (Intro 10-4, Test 11-1)
 * GRADUATION: Intro(11-1), Reviews(11-2 to 12-3), Final Presentation(12-4)
 */

const sessionData = {
// --- LEVEL 1 ---
  "1-1": ["Grammar 1"],
  "1-2": ["Grammar 2", "Listening 1"],
  "1-3": ["Grammar", "Vocabulary 1", "Listening 2"],
  "1-4": ["Grammar", "Vocabulary 2", "Listening 3"],

// --- LEVEL 2 ---
  "2-1": ["Grammar", "Listening"],
  "2-2": ["One Shot", "Listening", "Reading"],
  "2-3": ["Listening", "Vocabulary", "Reading"],
  "2-4": ["One Shot", "Listening", "Grammar", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 3 ---
  "3-1": ["Listening", "Grammar", "Reading", "Tonge Twister"],
  "3-2": ["One Shot", "Listening", "Reading", "Tonge Twister"],
  "3-3": ["Listening", "Vocabulary", "Reading", "Tonge Twister"],
  "3-4": ["One Shot", "Listening", "Grammar", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 4 ---
  "4-1": ["Listening", "Grammar", "Reading", "Tonge Twister", "Squeezer"],
  "4-2": ["One Shot", "Listening", "Reading", "Tonge Twister"],
  "4-3": ["Listening", "Vocabulary", "Reading", "Tonge Twister"],
  "4-4": ["One Shot", "Listening", "Grammar", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 5 ---
  "5-1": ["Listening", "Grammar", "Reading", "Tonge Twister", "Squeezer"],
  "5-2": ["One Shot", "Listening", "Reading", "Tonge Twister"],
  "5-3": ["Listening", "Vocabulary", "Reading", "Tonge Twister", "DMT"],
  "5-4": ["One Shot", "Listening", "Grammar", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 6 ---
  "6-1": ["Listening", "Grammar", "Reading", "Tonge Twister", "Squeezer"],
  "6-2": ["One Shot", "Listening", "Reading", "Tonge Twister"],
  "6-3": ["Listening", "Vocabulary", "Reading", "Tonge Twister", "Wish"],
  "6-4": ["One Shot", "Listening", "Grammar", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 7 ---
  "7-1": ["Listening", "Grammar", "Reading", "Tonge Twister", "Squeezer"],
  "7-2": ["One Shot", "Listening", "Reading", "Tonge Twister"],
  "7-3": ["Listening", "Vocabulary", "Reading", "Tonge Twister", "DMT"],
  "7-4": ["One Shot", "Listening", "Grammar", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 8 ---
  "8-1": ["Listening", "Grammar", "Reading", "Tonge Twister", "Squeezer"],
  "8-2": ["One Shot", "Listening", "Reading", "Tonge Twister"],
  "8-3": ["Listening", "Vocabulary", "Reading", "Tonge Twister", "Project"],
  "8-4": ["One Shot", "Listening", "Grammar", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 9 ---
  "9-1": ["Listening", "Reading", "Tonge Twister", "Squeezer"],
  "9-2": ["One Shot", "Listening", "Reading", "Tonge Twister"],
  "9-3": ["Listening", "Vocabulary", "Reading", "Tonge Twister", "Wish"],
  "9-4": ["One Shot", "Listening", "Grammar", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 10 ---
  "10-1": ["Listening", "Reading", "Tonge Twister", "Squeezer"],
  "10-2": ["One Shot", "Listening", "Reading", "Tonge Twister"],
  "10-3": ["Listening", "Vocabulary", "Reading", "Tonge Twister", "DMT"],
  "10-4": ["One Shot", "Listening", "Vocabulary", "Reading", "Tonge Twister"],

// --- LEVEL 11 ---
  "11-1": ["Listening", "Reading", "Tonge Twister", "Graduation Project"],
  "11-2": ["One Shot", "Listening", "Reading", "Tonge Twister", "Graduation Project"],
  "11-3": ["Listening", "Reading", "Tonge Twister", "DMT", "Graduation Project"],
  "11-4": ["One Shot", "Listening", "Reading", "Tonge Twister", "Graduation Project"],

// --- LEVEL 12 ---
  "12-1": ["Listening", "Reading", "Tonge Twister", "Graduation Project"],
  "12-2": ["Listening", "Reading", "Tonge Twister", "Graduation Project"],
  "12-3": ["Listening", "Reading", "Tonge Twister", "DMT", "Graduation Project"],
  "12-4": ["Listening", "Reading", "Tonge Twister", "Graduation Project"],
