/**
 * VETO ONLINE | Session Content Database
 * Program: Veto Online — EYC Academy
 * Teacher: Mr. Ezz
 * 
 * File Naming Convention:
 *  - Normal activity : L-{level}-S-{session}-{first3letters}.js
 *  - Test activity   : L-{level}-S-{session}-{first3letters}t.js
 *  Example: Grammar in L1-S1  → L-1-S-1-Gra.js
 *           Vocab Test in L1-S3 → L-1-S-3-Voct.js
 */

const sessionData = {
  "1-1": ["Grammar Study: Subject & Object", "Listening Intro"],
  "1-2": ["Grammar Study: Poss. Adj & Poss. Pro + Verb Be", "Vocab Part 1 Intro", "Listening Review"],
  "1-3": ["Grammar Study: Indefinite Articles", "Vocab Part 1 Test", "Vocab Part 2 Intro", "Listening Review"],
  "1-4": ["Grammar Study: Plural", "Vocab Part 2 Test", "Reading 1 Intro", "Listening Review"],

  "2-1": ["Grammar Study: Time", "Reading 1 Review", "Reading 2 Intro", "One Shot Intro", "Listening Review"],
  "2-2": ["Reading 2 Review", "Reading 3 Intro", "Vocab Part 3 Intro", "One Shot 1 Test", "Listening Review"],
  "2-3": ["Reading 3 Review", "Reading 4 Intro", "Vocab Part 3 Test", "Vocab Part 4 Intro", "Listening Review"],
  "2-4": ["Grammar Study: Date", "Reading 4 Review", "Reading 5 Intro", "Vocab Part 4 Test", "Tongue Twister 1 Intro", "One Shot 2 Test", "Listening Review"],

  "3-1": ["Grammar Study: Present Continuous", "Reading 5 Review", "Reading 6 Intro", "Tongue Twister 1 Review", "Tongue Twister 2 Intro", "Listening Review"],
  "3-2": ["Reading 6 Review", "Reading 7 Intro", "Vocab Part 5 Intro", "Tongue Twister 2 Review", "Tongue Twister 3 Intro", "One Shot 3 Test", "Listening Review"],
  "3-3": ["Reading 7 Review", "Reading 8 Intro", "Vocab Part 5 Test", "Vocab Part 6 Intro", "Tongue Twister 3 Review", "Tongue Twister 4 Intro", "Listening Review"],
  "3-4": ["Grammar Study: Present Simple", "Reading 8 Review", "Reading 9 Intro", "Vocab Part 6 Test", "One Shot 4 Test", "Squeezer Intro", "Listening Review"],

  "4-1": ["Grammar Study: Past Simple", "Reading 9 Review", "Reading 10 Intro", "Squeezer 1 Test", "Listening Review"],
  "4-2": ["Reading 10 Review", "Reading 11 Intro", "Vocab Part 7 Intro", "Tongue Twister 6 Review", "Tongue Twister 7 Intro", "One Shot 5 Test", "Listening Review"],
  "4-3": ["Reading 11 Review", "Reading 12 Intro", "Vocab Part 7 Test", "Vocab Part 8 Intro", "Tongue Twister 7 Review", "Tongue Twister 8 Intro", "Listening Review"],
  "4-4": ["Grammar Study: Past Continuous", "Reading 12 Review", "Reading 13 Intro", "Vocab Part 8 Test", "DMT Intro", "Listening Review"],

  "5-1": ["Grammar Study: Future Simple", "Squeezer 2 Review", "DMT 1 Test", "Listening Review"],
  "5-2": ["Reading 14 Review", "Reading 15 Intro", "Vocab Part 9 Intro", "Squeezer 2 Test", "DMT 1 Review", "Listening Review"],
  "5-3": ["Reading 15 Review", "Reading 16 Intro", "Vocab Part 9 Test", "Vocab Part 10 Intro", "DMT 2 Test", "Listening Review"],
  "5-4": ["Grammar Study: Future Continuous", "Reading 16 Review", "Reading 17 Intro", "Vocab Part 10 Test", "Tongue Twister 12 Review", "Tongue Twister 13 Intro", "One Shot 8 Test", "Listening Review"],

  "6-1": ["Grammar Study: Present Perfect Simple", "ORAL EXAM", "Squeezer 3 Review", "Listening Review"],
  "6-2": ["Reading 18 Review", "Reading 19 Intro", "Vocab Part 11 Intro", "Squeezer 3 Test", "Listening Review"],
  "6-3": ["Reading 19 Review", "Reading 20 Intro", "Vocab Part 11 Test", "Vocab Part 12 Intro", "DMT 2 Review", "Listening Review"],
  "6-4": ["Grammar Study: Present Perfect Continuous", "Reading 20 Review", "Reading 21 Intro", "Vocab Part 12 Test", "DMT 3 Test", "Listening Review"],

  "7-1": ["Grammar Study: Past Perfect Simple", "Squeezer 4 Review", "Listening Review"],
  "7-2": ["Reading 22 Review", "Reading 23 Intro", "Vocab Part 13 Intro", "Squeezer 4 Test", "DMT 3 Review", "Listening Review"],
  "7-3": ["Reading 23 Review", "Reading 24 Intro", "Vocab Part 13 Test", "Vocab Part 14 Intro", "DMT 4 Test", "Listening Review"],
  "7-4": ["Grammar Study: If Conditions", "Reading 24 Review", "Reading 25 Intro", "Vocab Part 14 Test", "Wish 1 Intro (Review)", "Listening Review"],

  "8-1": ["Grammar Study: Passives", "Wish 1 Test", "Squeezer 5 Review", "Listening Review"],
  "8-2": ["Reading 26 Review", "Reading 27 Intro", "Vocab Part 15 Intro", "Squeezer 5 Test", "Listening Review"],
  "8-3": ["Reading 27 Review", "Reading 28 Intro", "Vocab Part 15 Test", "Vocab Part 16 Intro", "DMT 4 Review", "Listening Review"],
  "8-4": ["Reading 28 Review", "Reading 29 Intro", "Vocab Part 16 Test", "Project 1 Intro", "DMT 5 Test", "Listening Review"],

  "9-1": ["Reading 29 Review", "Reading 30 Intro", "Project 1 Test", "Wish 2 Review", "Listening Review"],
  "9-2": ["Reading 30 Review", "Reading 31 Intro", "Vocab Part 17 Intro", "Wish 2 Test", "DMT 5 Review", "Listening Review"],
  "9-3": ["Reading 31 Review", "Reading 32 Intro", "Vocab Part 17 Test", "Vocab Part 18 Intro", "DMT 6 Test", "Listening Review"],
  "9-4": ["Reading 32 Review", "Reading 33 Intro", "Vocab Part 18 Test", "Squeezer 6 Review", "Listening Review"],

  "10-1": ["Reading 33 Review", "Reading 34 Intro", "Squeezer 6 Test", "Wish 3 Review", "Listening Review"],
  "10-2": ["Reading 34 Review", "Reading 35 Intro", "Vocab Part 19 Intro", "Wish 3 Test", "Listening Review"],
  "10-3": ["Reading 35 Review", "Reading 36 Intro", "Vocab Part 19 Test", "Vocab Part 20 Intro", "DMT 6 Review", "Listening Review"],
  "10-4": ["Reading 36 Review", "Reading 37 Intro", "Vocab Part 20 Test", "Project 2 Intro", "DMT 7 Test", "Listening Review"],

  "11-1": ["Reading 37 Review", "Reading 38 Intro", "Graduation Project Intro", "Project 2 Test", "Listening Review"],
  "11-2": ["Reading 38 Review", "Reading 39 Intro", "DMT 7 Review", "Graduation Project Review", "Listening Review"],
  "11-3": ["Reading 39 Review", "Reading 40 Intro", "DMT 8 Test", "Wish 4 Test", "Graduation Project Review", "Listening Review"],
  "11-4": ["Reading 40 Review", "Reading 41 Intro", "Graduation Project Review", "Listening Review"],

  "12-1": ["Reading 41 Review", "Reading 42 Intro", "Graduation Project Review", "Listening Review"],
  "12-2": ["Reading 42 Review", "Reading 43 Intro", "Graduation Project Review", "Listening Review"],
  "12-3": ["Reading 43 Review", "Graduation Project Review", "Listening Review"],
  "12-4": ["GRADUATION PROJECT PRESENTATION"]
};

/**
 * Generates the JS filename for a given activity in a session.
 * @param {number} level - Level number (1–12)
 * @param {number} session - Session number (1–4)
 * @param {string} activityName - Full activity name string
 * @returns {string} filename like "L-1-S-1-Gra.js" or "L-1-S-3-Voct.js"
 */
function getActivityFilename(level, session, activityName) {
  const isTest = activityName.toLowerCase().includes("test");
  // Take first word of activity, strip punctuation, first 3 letters
  const firstWord = activityName.split(/[\s:]/)[0].replace(/[^a-zA-Z]/g, "");
  const prefix = firstWord.substring(0, 3);
  const suffix = isTest ? prefix + "t" : prefix;
  return `L-${level}-S-${session}-${suffix}.js`;
}

/**
 * Returns all activities for a session with their filenames.
 * @param {number} level 
 * @param {number} session 
 * @returns {Array} [{name, filename}, ...]
 */
function getSessionActivities(level, session) {
  const key = `${level}-${session}`;
  const activities = sessionData[key] || [];
  return activities.map(name => ({
    name,
    filename: getActivityFilename(level, session, name)
  }));
}

// Export for use in other scripts
if (typeof module !== "undefined") {
  module.exports = { sessionData, getActivityFilename, getSessionActivities };
}