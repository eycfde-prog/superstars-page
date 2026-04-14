/**
 * VETO ONLINE | Student Tasks Database (Homework Edition)
 * Teacher: Mr. Ezz
 * Developed by: Veto Architect
 */

const studentTasksData = {
  // --- LEVEL 1 ---
  "1-1": ["Grammar Test: Subject & Object", "Listening"],
  "1-2": ["Grammar Test: Possessives & Verb Be", "Vocabulary", "Listening"],
  "1-3": ["Grammar Test: Indefinite Articles", "Vocabulary", "Listening"],
  "1-4": ["Grammar Test: Plural", "Reading", "Listening"],

  // --- LEVEL 2 ---
  "2-1": ["Grammar Test: Time", "Reading", "One Shot", "Listening"], // One Shot added for 2-2 Test
  "2-2": ["Reading", "Vocabulary", "Listening"],
  "2-3": ["Reading", "Vocabulary", "Listening"],
  "2-4": ["Grammar Test: Date", "Reading", "T.T", "One Shot", "Listening"],

  // --- LEVEL 3 ---
  "3-1": ["Grammar Test: Present Continuous", "Reading", "T.T", "Listening"],
  "3-2": ["Reading", "Vocabulary", "T.T", "Listening"],
  "3-3": ["Reading", "Vocabulary", "T.T", "Listening"],
  "3-4": ["Grammar Test: Present Simple", "Reading", "One Shot", "Squeezer", "Listening"],

  // --- LEVEL 4 ---
  "4-1": ["Grammar Test: Past Simple", "Reading", "One Shot", "Listening"],
  "4-2": ["Reading", "Vocabulary", "T.T", "Listening"],
  "4-3": ["Reading", "Vocabulary", "T.T", "Listening"],
  "4-4": ["Grammar Test: Past Continuous", "Reading", "DMT", "Listening"],

  // --- LEVEL 5 ---
  "5-1": ["Grammar Test: Future Simple", "Squeezer", "DMT", "Listening"],
  "5-2": ["Reading", "Vocabulary", "Squeezer", "DMT", "Listening"],
  "5-3": ["Reading", "Vocabulary", "DMT", "Listening"],
  "5-4": ["Grammar Test: Future Continuous", "Reading", "T.T", "One Shot", "Listening"],

  // --- LEVEL 6 ---
  "6-1": ["Grammar Test: Present Perfect Simple", "Squeezer", "Listening"],
  "6-2": ["Reading", "Vocabulary", "Squeezer", "Listening"],
  "6-3": ["Reading", "Vocabulary", "DMT", "Listening"],
  "6-4": ["Grammar Test: Present Perfect Continuous", "Reading", "DMT", "Listening"],

  // --- LEVEL 7 ---
  "7-1": ["Grammar Test: Past Perfect Simple", "Squeezer", "Listening"],
  "7-2": ["Reading", "Vocabulary", "Squeezer", "DMT", "Listening"],
  "7-3": ["Reading", "Vocabulary", "DMT", "Listening"],
  "7-4": ["Grammar Test: If Conditions", "Reading", "Wish", "Listening"],

  // --- LEVEL 8 ---
  "8-1": ["Grammar Test: Passives", "Squeezer", "Listening"],
  "8-2": ["Reading", "Vocabulary", "Squeezer", "Listening"],
  "8-3": ["Reading", "Vocabulary", "DMT", "Listening"],
  "8-4": ["Reading", "Project", "DMT", "Listening"],

  // --- LEVEL 9 ---
  "9-1": ["Reading", "Project", "Wish", "Listening"],
  "9-2": ["Reading", "Vocabulary", "DMT", "Listening"],
  "9-3": ["Reading", "Vocabulary", "DMT", "Listening"],
  "9-4": ["Reading", "Squeezer", "Listening"],

  // --- LEVEL 10 ---
  "10-1": ["Reading", "Squeezer", "Wish", "Listening"],
  "10-2": ["Reading", "Vocabulary", "Listening"],
  "10-3": ["Reading", "Vocabulary", "DMT", "Listening"],
  "10-4": ["Reading", "Project", "DMT", "Listening"],

  // --- LEVEL 11 ---
  "11-1": ["Reading", "Graduation Project", "Listening"],
  "11-2": ["Reading", "DMT", "Graduation Project", "Listening"],
  "11-3": ["Reading", "DMT", "Graduation Project", "Listening"],
  "11-4": ["Reading", "Graduation Project", "Listening"],

  // --- LEVEL 12 ---
  "12-1": ["Reading", "Graduation Project", "Listening"],
  "12-2": ["Reading", "Graduation Project", "Listening"],
  "12-3": ["Graduation Project", "Listening"],
  "12-4": ["GRADUATION PROJECT PRESENTATION"]
};

/**
 * Helper function to fetch tasks with structured filenames for Student UI
 */
function getStudentTaskFile(level, session, taskName) {
  const cleanName = taskName.split(":")[0].trim().substring(0, 3).toLowerCase();
  return `STUDENT-L${level}-S${session}-${cleanName}.js`;
}

if (typeof module !== "undefined") {
  module.exports = { studentTasksData, getStudentTaskFile };
}
