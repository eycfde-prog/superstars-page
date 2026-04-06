/**
 * VETO PROGRAM | Session Content Database
 * Updated by: Veto Architect
 * Logic: Keeps only the latest Review for Reading & Tongue Twister.
 */

const sessionData = {
    // LEVEL 1
    "1-1": ["Grammar 1 Study", "Listening 1 Intro"],
    "1-2": ["Grammar 2 Study", "Vocab 1 Review"],
    "1-3": ["Grammar 3 Study", "Vocab 1 Test", "Vocab 2 Review"],
    "1-4": ["Grammar 4 Study", "Vocab 2 Test", "Reading 1 Review"],

    // LEVEL 2
    "2-1": ["Grammar 5 Study", "Reading 2 Review", "One Shot intro"], // تم حذف Reading 1
    "2-2": ["Listening 1 Review", "Reading 3 Review", "Vocab 3 Review", "One Shot 1 Test"], // تم حذف Reading 2
    "2-3": ["Listening 2 Review", "Reading 4 Review", "Vocab 3 Test", "Vocab 4 Review"], // تم حذف Reading 3
    "2-4": ["Grammar 6 Study", "Listening 3 Review", "Reading 5 Review", "One Shot 2 Test", "Vocab 4 Test", "Tongue Twister 1 Intro"],

    // LEVEL 3
    "3-1": ["Grammar 7 Study", "Listening 4 Review", "Reading 6 Review", "Tongue Twister 2 Review"],
    "3-2": ["Listening 5 Review", "Reading 7 Review", "Tongue Twister 3 Review", "Vocab 5 Review", "One Shot 3 Test"],
    "3-3": ["Listening 6 Review", "Reading 8 Review", "Tongue Twister 4 Review", "Vocab 5 Test", "Vocab 6 Review"],
    "3-4": ["Grammar 8 Study", "Listening 7 Review", "Reading 9 Review", "Tongue Twister 5 Review", "One Shot 4 Test", "Vocab 6 Test", "Squeezer 1 Rev"],

    // LEVEL 4
    "4-1": ["Grammar 9 Study", "Listening 8 Review", "Reading 10 Review", "Squeezer 1 test", "Tongue Twister 6 Review"],
    "4-2": ["Listening 9 Review", "Reading 11 Review", "Tongue Twister 7 Review", "Vocab 7 Review", "One Shot 5 Test"],
    "4-3": ["Listening 10 Review", "Reading 12 Review", "Tongue Twister 8 Review", "Vocab 7 Test", "Vocab 8 Review"],
    "4-4": ["Grammar 10 Study", "Listening 11 Review", "Reading 13 Review", "Tongue Twister 9 Review", "One Shot 6 Test", "Vocab 8 Test", "DMT 1 Intro"],

    // LEVEL 5
    "5-1": ["Grammar 11 Study", "Listening 12 Review", "Reading 14 Review", "Squeezer 2 Rev", "DMT 1 test", "Tongue Twister 10 Review"],
    "5-2": ["Listening 13 Review", "Reading 15 Review", "Tongue Twister 11 Review", "Vocab 9 Review", "One Shot 7 Test", "Squeezer 2 test"],
    "5-3": ["Listening 18 Review", "Reading 16 Review", "Tongue Twister 12 Review", "Vocab 9 Test", "Vocab 10 Review"],
    "5-4": ["Grammar 12 Study", "Listening 19 Review", "Reading 17 Review", "Tongue Twister 13 Review", "One Shot 8 Test", "Vocab 10 Test"],

    // LEVEL 6
    "6-1": ["Grammar 13 Study", "Listening 16 Review", "Reading 18 Review", "DMT 2 Rev", "Tongue Twister 14 Review"],
    "6-2": ["Listening 17 Review", "Reading 19 Review", "Tongue Twister 15 Review", "Vocab 11 Review", "One Shot 9 Test", "DMT 2 test", "Job Interview intro"],
    "6-3": ["Listening 18 Review", "Reading 20 Review", "Tongue Twister 16 Review", "Vocab 11 Test", "Vocab 12 Review"],
    "6-4": ["Grammar 14 Study", "Listening 19 Review", "Reading 21 Review", "Tongue Twister 17 Review", "One Shot 10 Test", "Vocab 12 Test", "Job Interview Role Play", "Wish 1 intro", "Wish 1 Rev"],

    // LEVEL 7
    "7-1": ["Grammar 15 Study", "Listening 20 Review", "Reading 22 Review", "DMT 3 Rev", "Wish 1 Test", "Tongue Twister 18 Review"],
    "7-2": ["Listening 21 Review", "Reading 23 Review", "Tongue Twister 19 Review", "Vocab 13 Review", "One Shot 11 Test", "DMT 3 test"],
    "7-3": ["Listening 22 Review", "Reading 24 Review", "Tongue Twister 20 Review", "Vocab 13 Test", "Vocab 14 Review"],
    "7-4": ["Grammar 16 Study", "Listening 23 Review", "Reading 25 Review", "Tongue Twister 21 Review", "One Shot 12 Test", "Vocab 14 Test", "Wish 2 Rev"],

    // LEVEL 8
    "8-1": ["Grammar 17 Study", "Listening 24 Review", "Reading 26 Review", "Squeezer 3 Rev", "Wish 2 Test", "Tongue Twister 22 Review"],
    "8-2": ["Listening 25 Review", "Reading 27 Review", "Tongue Twister 23 Review", "Vocab 15 Review", "One Shot 13 Test", "Squeezer 3 test"],
    "8-3": ["Listening 26 Review", "Reading 28 Review", "Tongue Twister 24 Review", "Vocab 15 Test", "Vocab 16 Review"],
    "8-4": ["Grammar 18 Study", "Listening 27 Review", "Reading 29 Review", "Tongue Twister 25 Review", "One Shot 14 Test", "Vocab 16 Test", "Project 1 Intro"],

    // LEVEL 9
    "9-1": ["Grammar 19 Study", "Listening 28 Review", "Reading 30 Review", "Squeezer 4 Rev", "Project 1 Test", "Tongue Twister 26 Review"],
    "9-2": ["Listening 29 Review", "Reading 31 Review", "Tongue Twister 27 Review", "Vocab 17 Review", "One Shot 15 Test", "Squeezer 4 test"],
    "9-3": ["Listening 30 Review", "Reading 32 Review", "Tongue Twister 28 Review", "Vocab 17 Test", "Vocab 18 Review"],
    "9-4": ["Grammar 20 Study", "Listening 31 Review", "Reading 33 Review", "Tongue Twister 29 Review", "One Shot 16 Test", "Vocab 18 Test", "DMT 4 Rev"],

    // LEVEL 10
    "10-1": ["Listening 32 Review", "Reading 34 Review", "Squeezer 5 Rev", "DMT 4 test", "Tongue Twister 30 Review"],
    "10-2": ["Listening 33 Review", "Reading 35 Review", "Tongue Twister 31 Review", "Vocab 19 Review", "One Shot 17 Test", "Squeezer 5 test", "DMT 4 test"],
    "10-3": ["Listening 34 Review", "Reading 36 Review", "Tongue Twister 32 Review", "Vocab 19 Test", "Vocab 20 Review", "One Shot 3 Test"],
    "10-4": ["Listening 35 Review", "Reading 37 Review", "Tongue Twister 33 Review", "One Shot 18 Test", "Vocab 20 Test", "DMT 4 Review", "Project 2 Rev"],

    // LEVEL 11
    "11-1": ["Listening 36 Review", "GP Intro", "Reading 38 Review", "Wish 3 Rev", "Project 2 Test", "Tongue Twister 34 Review"],
    "11-2": ["DMT 5 Review", "Reading 39 Review", "Tongue Twister 35 Review", "Wish 3 Test", "DMT 5 Rev", "One Shot 19 Test"],
    "11-3": ["Reading 40 Review", "Tongue Twister 36 Review", "Squeezer 6 Rev", "DMT 5 test"],
    "11-4": ["Reading 40 Review", "Tongue Twister 36 Review", "Squeezer 6 Test", "GP Review", "One Shot 20 Test"],

    // LEVEL 12
    "12-1": ["GP Review", "Reading 41 Review"],
    "12-2": ["GP Review", "Reading 42 Review"],
    "12-3": ["GP Review"],
    "12-4": ["GP Viewing"]
};
