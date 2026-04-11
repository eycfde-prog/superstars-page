/**
 * VETO PROGRAM | Session Content Database
 * Updated by: WOLF (Senior Backend Developer)
 * Source: veto_schedule.xlsx — THE VETO PROGRAM English Course Schedule
 * Logic: Sequential Listening Reviews from 1-1 up to 12-4.
 *
 * Grammar topics updated to match Excel schedule.
 * Vocabulary tracking updated (Intro → Test pattern per Part).
 * Extra activities updated per level/class.
 */

const sessionData = {
    // LEVEL 1
    "1-1": ["Grammar Study: Subject & Object", "Listening Intro"],
    "1-2": ["Listening Review", "Grammar Study: Possessive Adj & Pronouns", "Grammar Study: Verb be", "Vocab Part 1 Intro"],
    "1-3": ["Grammar Study: Indefinite Articles", "Vocab Part 1 Test", "Listening Review"],
    "1-4": ["Grammar Study: Plural", "Listening Review", "Reading Story Intro & Review"],

    // LEVEL 2
    "2-1": ["Grammar Study: Present (cont.)", "Reading Story Part Review", "One Shot Intro", "Listening Review"],
    "2-2": ["Reading Story Part Review", "Vocab Part 2 Intro", "One Shot Test", "Listening Review"],
    "2-3": ["Reading Story Part Review", "Vocab Part 2 Test", "Listening Review"],
    "2-4": ["Grammar Study: Present Simple", "Reading Story Part Review", "One Shot Test", "Listening Review"],

    // LEVEL 3
    "3-1": ["Grammar Study: Present Continuous", "Reading Story Part Review", "Tongue Twister Intro", "Listening Review"],
    "3-2": ["Reading Story Part Review", "Vocab Part 3 Intro", "Tongue Twister Test", "One Shot Test", "Listening Review"],
    "3-3": ["Reading Story Part Review", "Vocab Part 3 Test", "Tongue Twister Test", "Listening Review"],
    "3-4": ["Grammar Study: Past Simple", "Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Squeezer Intro", "Listening Review"],

    // LEVEL 4
    "4-1": ["Grammar Study: Past Continuous", "Reading Story Part Review", "Tongue Twister Test", "Squeezer Test", "Listening Review"],
    "4-2": ["Reading Story Part Review", "Vocab Part 4 Intro", "Tongue Twister Test", "One Shot Test", "Listening Review"],
    "4-3": ["Reading Story Part Review", "Vocab Part 4 Test", "Tongue Twister Test", "Listening Review"],
    "4-4": ["Grammar Study: Future (will)", "Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "DMT Intro", "Listening Review"],

    // LEVEL 5
    "5-1": ["Grammar Study: Future (going to)", "Reading Story Part Review", "Tongue Twister Test", "Squeezer Review", "Listening Review"],
    "5-2": ["Reading Story Part Review", "Vocab Part 5 Intro", "Tongue Twister Test", "One Shot Test", "Listening Review"],
    "5-3": ["Reading Story Part Review", "Vocab Part 5 Test", "Tongue Twister Test", "DMT Test", "Listening Review"],
    "5-4": ["Grammar Study: Present Perfect", "Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Listening Review"],

    // LEVEL 6
    "6-1": ["Grammar Study: Past Perfect", "Reading Story Part Review", "Tongue Twister Test", "ORAL EXAM", "Listening Review"],
    "6-2": ["Reading Story Part Review", "Vocab Part 6 Intro", "Tongue Twister Test", "One Shot Test", "Listening Review"],
    "6-3": ["Reading Story Part Review", "Vocab Part 6 Test", "Tongue Twister Test", "DMT Review", "Listening Review"],
    "6-4": ["Grammar Study: Conditionals", "Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Wish Intro (Essay & Present)", "Listening Review"],

    // LEVEL 7
    "7-1": ["Grammar Study: Modal Verbs", "Reading Story Part Review", "Tongue Twister Test", "Squeezer Test", "Listening Review"],
    "7-2": ["Reading Story Part Review", "Vocab Part 7 Intro", "Tongue Twister Test", "One Shot Test", "Wish Test", "Listening Review"],
    "7-3": ["Reading Story Part Review", "Vocab Part 7 Test", "Tongue Twister Test", "DMT Test", "Listening Review"],
    "7-4": ["Grammar Study: Reported Speech", "Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Listening Review"],

    // LEVEL 8
    "8-1": ["Grammar Study: Relative Clauses", "Reading Story Part Review", "Tongue Twister Test", "Squeezer Review", "Listening Review"],
    "8-2": ["Reading Story Part Review", "Vocab Part 8 Intro", "Tongue Twister Test", "One Shot Test", "Wish Review", "Listening Review"],
    "8-3": ["Reading Story Part Review", "Vocab Part 8 Test", "Tongue Twister Test", "DMT Review", "Listening Review"],
    "8-4": ["Grammar Study: Comparatives", "Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Project Intro (Group Work)", "Listening Review"],

    // LEVEL 9
    "9-1": ["Grammar Study: Passive Voice", "Reading Story Part Review", "Tongue Twister Test", "Project Test", "Listening Review"],
    "9-2": ["Reading Story Part Review", "Vocab Part 9 Intro", "Tongue Twister Test", "One Shot Test", "Wish Test", "Listening Review"],
    "9-3": ["Reading Story Part Review", "Vocab Part 9 Test", "Tongue Twister Test", "DMT Test", "Listening Review"],
    "9-4": ["Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Listening Review"],

    // LEVEL 10
    "10-1": ["Reading Story Part Review", "Tongue Twister Test", "Squeezer Test", "Listening Review"],
    "10-2": ["Reading Story Part Review", "Vocab Part 10 Intro", "Tongue Twister Test", "One Shot Test", "Wish Review", "Listening Review"],
    "10-3": ["Reading Story Part Review", "Vocab Part 10 Test", "Tongue Twister Test", "DMT Review", "Listening Review"],
    "10-4": ["Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Project Review", "Listening Review"],

    // LEVEL 11
    "11-1": ["Reading Story Part Review", "Tongue Twister Test", "Graduation Project Intro", "Listening Review"],
    "11-2": ["Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Listening Review"],
    "11-3": ["Reading Story Part Review", "Tongue Twister Test", "DMT Test", "Listening Review"],
    "11-4": ["Reading Story Part Review", "Tongue Twister Test", "One Shot Test", "Listening Review"],

    // LEVEL 12
    "12-1": ["Reading Story Part Review", "Tongue Twister Test", "Listening Review"],
    "12-2": ["Reading Story Part Review", "Tongue Twister Test", "Listening Review"],
    "12-3": ["Graduation Project Review", "Listening Review"],
    "12-4": ["GRADUATION PROJECT PRESENTATION"]
};
