/**
 * VETO ONLINE | Student Tasks Database (Homework Edition)
 * التعديل: تم ضبط المفاتيح لتطابق النظام القديم "Level-Session"
 */

const sessionData = {
// --- LEVEL 1 ---
  "1-1": ["Listening 1", "Grammar 1"],
  "1-2": ["Listening 2", "Grammar", "Vocabulary 1"],
  "1-3": ["Listening 3", "Grammar", "Vocabulary 2"],
  "1-4": ["Listening 4", "Grammar 4", "Reading 1"],

// --- LEVEL 2 ---
  "2-1": ["One Shot", "Listening", "Grammar", "Reading"],
  "2-2": ["Listening", "Vocabulary", "Reading"],
  "2-3": ["One Shot", "Listening", "Vocabulary", "Reading"],
  "2-4": ["Listening", "Grammar", "Reading", "Tongue Twister"],

// --- LEVEL 3 ---
  "3-1": ["One Shot", "Listening", "Grammar", "Reading", "Tongue Twister"],
  "3-2": ["Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "3-3": ["One Shot", "Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "3-4": ["Listening", "Grammar", "Reading", "Tongue Twister", "Squeezer"],

// --- LEVEL 4 ---
  "4-1": ["One Shot", "Listening", "Grammar", "Reading", "Tongue Twister"],
  "4-2": ["Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "4-3": ["One Shot", "Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "4-4": ["Listening", "Grammar", "Reading", "Tongue Twister", "Squeezer"],

// --- LEVEL 5 ---
  "5-1": ["One Shot", "Listening", "Grammar", "Reading", "Tongue Twister"],
  "5-2": ["Listening", "Vocabulary", "Reading", "Tongue Twister", "DMT"],
  "5-3": ["One Shot", "Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "5-4": ["Listening", "Grammar", "Reading", "Tongue Twister", "Squeezer"],

// --- LEVEL 6 ---
  "6-1": ["One Shot", "Listening", "Grammar", "Reading", "Tongue Twister"],
  "6-2": ["Listening", "Vocabulary", "Reading", "Tongue Twister", "Wish"],
  "6-3": ["One Shot", "Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "6-4": ["Listening", "Grammar", "Reading", "Tongue Twister", "Squeezer"],

// --- LEVEL 7 ---
  "7-1": ["One Shot", "Listening", "Grammar", "Reading", "Tongue Twister"],
  "7-2": ["Listening", "Vocabulary", "Reading", "Tongue Twister", "DMT"],
  "7-3": ["One Shot", "Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "7-4": ["Listening", "Grammar", "Reading", "Tongue Twister", "Squeezer"],

// --- LEVEL 8 ---
  "8-1": ["One Shot", "Listening", "Grammar", "Reading", "Tongue Twister"],
  "8-2": ["Listening", "Vocabulary", "Reading", "Tongue Twister", "Project"],
  "8-3": ["One Shot", "Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "8-4": ["Listening", "Reading", "Tongue Twister", "Squeezer"],

// --- LEVEL 9 ---
  "9-1": ["One Shot", "Listening", "Reading", "Tongue Twister"],
  "9-2": ["Listening", "Vocabulary", "Reading", "Tongue Twister", "Wish"],
  "9-3": ["One Shot", "Listening", "Vocabulary", "Reading", "Tongue Twister"],
  "9-4": ["Listening", "Reading", "Tongue Twister"],

// --- LEVEL 10 ---
  "10-1": ["One Shot", "Listening", "Reading", "Tongue Twister"],
  "10-2": ["Listening", "Reading", "Tongue Twister", "DMT"],
  "10-3": ["One Shot", "Listening", "Reading", "Tongue Twister"],
  "10-4": ["Listening", "Reading", "Tongue Twister"],

// --- LEVEL 11 ---
  "11-1": ["One Shot", "Listening", "Reading", "Tongue Twister", "Graduation Project"],
  "11-2": ["Listening", "Reading", "Tongue Twister", "Graduation Project"],
  "11-3": ["One Shot", "Listening", "Reading", "Tongue Twister", "Graduation Project"],
  "11-4": ["Listening", "Reading", "Tongue Twister", "Graduation Project"],

// --- LEVEL 12 ---
  "12-1": ["Listening", "Reading", "Tongue Twister", "Graduation Project"],
  "12-2": ["Listening", "Reading", "Tongue Twister", "Graduation Project"],
  "12-3": ["Listening", "Graduation Project"],
  "12-4": ["Graduation Project"],
};
/**
 * دالة استخراج أسماء الملفات - مطابقة تماماً للملف الأصلي لضمان عمل الصفحة
 */
function getActivityFilename(level, session, activityName) {
  const isTest = activityName.toLowerCase().includes("test");
  const firstWord = activityName.split(/[\s:]/)[0].replace(/[^a-zA-Z]/g, "");
  const prefix = firstWord.substring(0, 3);
  const suffix = isTest ? prefix + "t" : prefix;
  return `L-${level}-S-${session}-${suffix}.js`;
}

function getSessionActivities(level, session) {
  const key = `${level}-${session}`;
  const activities = sessionData[key] || [];
  return activities.map(name => ({
    name,
    filename: getActivityFilename(level, session, name)
  }));
}

if (typeof module !== "undefined") {
  module.exports = { sessionData, getActivityFilename, getSessionActivities };
}
