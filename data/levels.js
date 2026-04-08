/**
 * VETO PROGRAM | Session Content Database
 * Updated by: WOLF (Senior Backend Developer)
 * Logic: Sequential Listening Reviews from 1-2 up to 12-3.
 */

const sessionData = {
    // LEVEL 1
    "1-1": ["Grammar 1 Study", "Listening 1 Intro"],
    "1-2": ["Grammar 2 Study", "Vocab 1 Review", "Listening 1 Review"],
    "1-3": ["Grammar 3 Study", "Vocab 1 Test", "Vocab 2 Review", "Listening 2 Review"],
    "1-4": ["Grammar 4 Study", "Vocab 2 Test", "Reading 1 Review", "Listening 3 Review"],

    // LEVEL 2
    "2-1": ["Grammar 5 Study", "Reading 2 Review", "One Shot intro", "Listening 4 Review"],
    "2-2": ["Reading 3 Review", "Vocab 3 Review", "One Shot 1 Test", "Listening 5 Review"],
    "2-3": ["Reading 4 Review", "Vocab 3 Test", "Vocab 4 Review", "Listening 6 Review"],
    "2-4": ["Grammar 6 Study", "Reading 5 Review", "One Shot 2 Test", "Vocab 4 Test", "Tongue Twister 1 Intro", "Listening 7 Review"],

    // LEVEL 3
    "3-1": ["Grammar 7 Study", "Reading 6 Review", "Tongue Twister 2 Review", "Listening 8 Review"],
    "3-2": ["Reading 7 Review", "Tongue Twister 3 Review", "Vocab 5 Review", "One Shot 3 Test", "Listening 9 Review"],
    "3-3": ["Reading 8 Review", "Tongue Twister 4 Review", "Vocab 5 Test", "Vocab 6 Review", "Listening 10 Review"],
    "3-4": ["Grammar 8 Study", "Reading 9 Review", "Tongue Twister 5 Review", "One Shot 4 Test", "Vocab 6 Test", "Squeezer 1 Rev", "Listening 11 Review"],

    // LEVEL 4 (يستمر التسلسل...)
    "4-1": ["Grammar 9 Study", "Reading 10 Review", "Squeezer 1 test", "Tongue Twister 6 Review", "Listening 12 Review"],
    "4-2": ["Reading 11 Review", "Tongue Twister 7 Review", "Vocab 7 Review", "One Shot 5 Test", "Listening 13 Review"],
    "4-3": ["Reading 12 Review", "Tongue Twister 8 Review", "Vocab 7 Test", "Vocab 8 Review", "Listening 14 Review"],
    "4-4": ["Grammar 10 Study", "Reading 13 Review", "Tongue Twister 9 Review", "One Shot 6 Test", "Vocab 8 Test", "DMT 1 Intro", "Listening 15 Review"],

    // LEVEL 5
    "5-1": ["Grammar 11 Study", "Reading 14 Review", "Squeezer 2 Rev", "DMT 1 test", "Tongue Twister 10 Review", "Listening 16 Review"],
    "5-2": ["Reading 15 Review", "Tongue Twister 11 Review", "Vocab 9 Review", "One Shot 7 Test", "Squeezer 2 test", "Listening 17 Review"],
    "5-3": ["Reading 16 Review", "Tongue Twister 12 Review", "Vocab 9 Test", "Vocab 10 Review", "Listening 18 Review"],
    "5-4": ["Grammar 12 Study", "Reading 17 Review", "Tongue Twister 13 Review", "One Shot 8 Test", "Vocab 10 Test", "Listening 19 Review"],

    // LEVEL 6
    "6-1": ["Grammar 13 Study", "Reading 18 Review", "DMT 2 Rev", "Tongue Twister 14 Review", "Listening 20 Review"],
    "6-2": ["Reading 19 Review", "Tongue Twister 15 Review", "Vocab 11 Review", "One Shot 9 Test", "DMT 2 test", "Job Interview intro", "Listening 21 Review"],
    "6-3": ["Reading 20 Review", "Tongue Twister 16 Review", "Vocab 11 Test", "Vocab 12 Review", "Listening 22 Review"],
    "6-4": ["Grammar 14 Study", "Reading 21 Review", "Tongue Twister 17 Review", "One Shot 10 Test", "Vocab 12 Test", "Job Interview Role Play", "Wish 1 intro", "Wish 1 Rev", "Listening 23 Review"],

    // LEVEL 7
    "7-1": ["Grammar 15 Study", "Reading 22 Review", "DMT 3 Rev", "Wish 1 Test", "Tongue Twister 18 Review", "Listening 24 Review"],
    "7-2": ["Reading 23 Review", "Tongue Twister 19 Review", "Vocab 13 Review", "One Shot 11 Test", "DMT 3 test", "Listening 25 Review"],
    "7-3": ["Reading 24 Review", "Tongue Twister 20 Review", "Vocab 13 Test", "Vocab 14 Review", "Listening 26 Review"],
    "7-4": ["Grammar 16 Study", "Reading 25 Review", "Tongue Twister 21 Review", "One Shot 12 Test", "Vocab 14 Test", "Wish 2 Rev", "Listening 27 Review"],

    // LEVEL 8
    "8-1": ["Grammar 17 Study", "Reading 26 Review", "Squeezer 3 Rev", "Wish 2 Test", "Tongue Twister 22 Review", "Listening 28 Review"],
    "8-2": ["Reading 27 Review", "Tongue Twister 23 Review", "Vocab 15 Review", "One Shot 13 Test", "Squeezer 3 test", "Listening 29 Review"],
    "8-3": ["Reading 28 Review", "Tongue Twister 24 Review", "Vocab 15 Test", "Vocab 16 Review", "Listening 30 Review"],
    "8-4": ["Grammar 18 Study", "Reading 29 Review", "Tongue Twister 25 Review", "One Shot 14 Test", "Vocab 16 Test", "Project 1 Intro", "Listening 31 Review"],

    // LEVEL 9
    "9-1": ["Grammar 19 Study", "Reading 30 Review", "Squeezer 4 Rev", "Project 1 Test", "Tongue Twister 26 Review", "Listening 32 Review"],
    "9-2": ["Reading 31 Review", "Tongue Twister 27 Review", "Vocab 17 Review", "One Shot 15 Test", "Squeezer 4 test", "Listening 33 Review"],
    "9-3": ["Reading 32 Review", "Tongue Twister 28 Review", "Vocab 17 Test", "Vocab 18 Review", "Listening 34 Review"],
    "9-4": ["Grammar 20 Study", "Reading 33 Review", "Tongue Twister 29 Review", "One Shot 16 Test", "Vocab 18 Test", "DMT 4 Rev", "Listening 35 Review"],

    // LEVEL 10
    "10-1": ["Reading 34 Review", "Squeezer 5 Rev", "DMT 4 test", "Tongue Twister 30 Review", "Listening 36 Review"],
    "10-2": ["Reading 35 Review", "Tongue Twister 31 Review", "Vocab 19 Review", "One Shot 17 Test", "Squeezer 5 test", "Listening 37 Review"],
    "10-3": ["Reading 36 Review", "Tongue Twister 32 Review", "Vocab 19 Test", "Vocab 20 Review", "One Shot 3 Test", "Listening 38 Review"],
    "10-4": ["Reading 37 Review", "Tongue Twister 33 Review", "One Shot 18 Test", "Vocab 20 Test", "DMT 5 Rev", "Project 2 Rev", "Listening 39 Review"],

    // LEVEL 11
    "11-1": ["GP Intro", "Reading 38 Review", "Wish 3 Rev", "Project 2 Test", "Tongue Twister 34 Review", "Listening 40 Review"],
    "11-2": ["DMT 5 Test", "Reading 39 Rev", "Tongue Twister 35 Review", "Wish 3 Test", "DMT 5 Rev", "One Shot 19 Test", "Listening 41 Review"],
    "11-3": ["Reading 40 Review", "Tongue Twister 36 Review", "Squeezer 6 Rev", "DMT 5 test", "Listening 42 Review"],
    "11-4": ["Reading 41 Review", "Tongue Twister 37 Review", "Squeezer 6 Test", "GP Review", "One Shot 20 Test", "Listening 43 Review"],

    // LEVEL 12
    "12-1": ["GP Review", "Reading 42 Review", "Listening 44 Review", "Tongue Twister 38"],
    "12-2": ["GP Review", "Reading 43 Review", "Listening 45 Review", "Tongue Twister 39"],
    "12-3": ["GP Review", "Listening 46 Review"],
    "12-4": ["GP Viewing"]
};
