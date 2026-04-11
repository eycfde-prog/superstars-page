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
    // LEVEL 1 - 2 (Foundation - No Changes)
    "1-1": ["Grammar Study: Subject & Object", "Listening Intro"],
    "1-2": ["Grammar Study: Poss. Adj & Poss. Pro + Verb Be", "Vocab Part 1 Intro", "Listening Review"],
    "1-3": ["Grammar Study: Indefinite Articles", "Vocab Part 1 Test", "Vocab Part 2 Intro", "Listening Review"],
    "1-4": ["Grammar Study: Plural", "Vocab Part 2 Test", "Reading 1 Intro", "Listening Review"],
    "2-1": ["Grammar Study: Time", "Reading 1 Review", "Reading 2 Intro", "One Shot Intro", "Listening Review"],
    "2-2": ["Reading 2 Review", "Reading 3 Intro", "Vocab Part 3 Intro", "One Shot 1 Test", "Listening Review"],
    "2-3": ["Reading 3 Review", "Reading 4 Intro", "Vocab Part 3 Test", "Vocab Part 4 Intro", "Listening Review"],
    "2-4": ["Grammar Study: Date", "Reading 4 Review", "Reading 5 Intro", "Vocab Part 4 Test", "Tongue Twister 1 Intro", "One Shot 2 Test", "Listening Review"],

    // LEVEL 3
    "3-4": ["Grammar Study: Present Simple", "Reading 8 Review", "Reading 9 Intro", "Vocab Part 6 Test", "One Shot 4 Test", "Squeezer Intro", "Listening Review"],

    // LEVEL 4
    "4-1": ["Grammar Study: Past Simple", "Reading 9 Review", "Reading 10 Intro", "Squeezer 1 Test", "Listening Review"],
    "4-4": ["Grammar Study: Past Continuous", "Reading 12 Review", "Reading 13 Intro", "Vocab Part 8 Test", "DMT Intro", "Listening Review"],

    // LEVEL 5
    "5-1": ["Grammar Study: Future Simple", "Squeezer 2 Review", "DMT 1 Test", "Listening Review"],
    "5-2": ["Reading 14 Review", "Reading 15 Intro", "Vocab Part 9 Intro", "Squeezer 2 Test", "DMT 1 Review", "Listening Review"],
    "5-3": ["Reading 15 Review", "Reading 16 Intro", "Vocab Part 9 Test", "Vocab Part 10 Intro", "DMT 2 Test", "Listening Review"],

    // LEVEL 6
    "6-1": ["Grammar Study: Present Perfect Simple", "ORAL EXAM", "Squeezer 3 Review", "Listening Review"],
    "6-2": ["Reading 18 Review", "Reading 19 Intro", "Vocab Part 11 Intro", "Squeezer 3 Test", "Listening Review"],
    "6-3": ["Reading 19 Review", "Reading 20 Intro", "Vocab Part 11 Test", "Vocab Part 12 Intro", "DMT 2 Review", "Listening Review"],
    "6-4": ["Grammar Study: Present Perfect Continuous", "Reading 20 Review", "Reading 21 Intro", "Vocab Part 12 Test", "DMT 3 Test", "Listening Review"],

    // LEVEL 7
    "7-1": ["Grammar Study: Past Perfect Simple", "Squeezer 4 Review", "Listening Review"],
    "7-2": ["Reading 22 Review", "Reading 23 Intro", "Vocab Part 13 Intro", "Squeezer 4 Test", "DMT 3 Review", "Listening Review"],
    "7-3": ["Reading 23 Review", "Reading 24 Intro", "Vocab Part 13 Test", "Vocab Part 14 Intro", "DMT 4 Test", "Listening Review"],
    "7-4": ["Grammar Study: If Conditions", "Reading 24 Review", "Reading 25 Intro", "Vocab Part 14 Test", "Wish 1 Intro (Review)", "Listening Review"],

    // LEVEL 8
    "8-1": ["Grammar Study: Passives", "Wish 1 Test", "Squeezer 5 Review", "Listening Review"],
    "8-2": ["Reading 26 Review", "Reading 27 Intro", "Vocab Part 15 Intro", "Squeezer 5 Test", "Listening Review"],
    "8-3": ["Reading 27 Review", "Reading 28 Intro", "Vocab Part 15 Test", "Vocab Part 16 Intro", "DMT 4 Review", "Listening Review"],
    "8-4": ["Reading 28 Review", "Reading 29 Intro", "Vocab Part 16 Test", "Project 1 Intro", "DMT 5 Test", "Listening Review"],

    // LEVEL 9
    "9-1": ["Reading 29 Review", "Reading 30 Intro", "Project 1 Test", "Wish 2 Review", "Listening Review"],
    "9-2": ["Reading 30 Review", "Reading 31 Intro", "Vocab Part 17 Intro", "Wish 2 Test", "DMT 5 Review", "Listening Review"],
    "9-3": ["Reading 31 Review", "Reading 32 Intro", "Vocab Part 17 Test", "Vocab Part 18 Intro", "DMT 6 Test", "Listening Review"],
    "9-4": ["Reading 32 Review", "Reading 33 Intro", "Vocab Part 18 Test", "Squeezer 6 Review", "Listening Review"],

    // LEVEL 10
    "10-1": ["Reading 33 Review", "Reading 34 Intro", "Squeezer 6 Test", "Wish 3 Review", "Listening Review"],
    "10-2": ["Reading 34 Review", "Reading 35 Intro", "Vocab Part 19 Intro", "Wish 3 Test", "Listening Review"],
    "10-3": ["Reading 35 Review", "Reading 36 Intro", "Vocab Part 19 Test", "Vocab Part 20 Intro", "DMT 6 Review", "Listening Review"],
    "10-4": ["Reading 36 Review", "Reading 37 Intro", "Vocab Part 20 Test", "Project 2 Intro", "DMT 7 Test", "Listening Review"],

    // LEVEL 11
    "11-1": ["Reading 37 Review", "Reading 38 Intro", "Graduation Project Intro", "Project 2 Test", "Listening Review"],
    "11-2": ["Reading 38 Review", "Reading 39 Intro", "DMT 7 Review", "Graduation Project Review", "Listening Review"],
    "11-3": ["Reading 39 Review", "Reading 40 Intro", "DMT 8 Test", "Wish 4 Test", "Graduation Project Review", "Listening Review"],
    "11-4": ["Reading 40 Review", "Reading 41 Intro", "Graduation Project Review", "Listening Review"],

    // LEVEL 12
    "12-1": ["Reading 41 Review", "Reading 42 Intro", "Graduation Project Review", "Listening Review"],
    "12-2": ["Reading 42 Review", "Reading 43 Intro", "Graduation Project Review", "Listening Review"],
    "12-3": ["Reading 43 Review", "Graduation Project Review", "Listening Review"],
    "12-4": ["GRADUATION PROJECT PRESENTATION"]
};
