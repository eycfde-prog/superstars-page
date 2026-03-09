/* File: L1S1_Grammar.js
   System: EYC Veto Program - WOLF Edition
   Status: Ready for Iframe Injection - Visual Focus Optimized
*/

var grammarData = {
    metadata: {
        level: "Level 1",
        session: "Session 1",
        topic: "Subject & Object Pronouns",
        header: {
            logo: "EYC_LOGO_URL", // رابط اللوجو الخاص بك
            text: "Level 1 - Session 1 - Subject & Object Pronouns"
        },
        footer: "EYC - Veto Program"
    },
    slides: [
        // --- Slide 1: Main Title ---
        {
            type: "explanation",
            title: "SUBJECT PRONOUNS",
            fontSize: "huge", // إشارة للمحرك بتكبير الخط
            content: [
                { term: "I", desc: "" },
                { term: "HE", desc: "" },
                { term: "SHE", desc: "" },
                { term: "IT", desc: "" },
                { term: "WE", desc: "" },
                { term: "YOU", desc: "" },
                { term: "THEY", desc: "" }
            ]
        },

        // --- Slide 2: Subject Practice (Font Size Max) ---
        {
            type: "practice",
            title: "SUBJECTS CHALLENGE",
            layout: "large-text",
            questions: [
                {
                    q: "....... is a clever doctor. (Ahmed)",
                    options: ["He", "She", "It", "They"],
                    correct: "He"
                },
                {
                    q: "....... are playing football now.",
                    options: ["I", "We", "He", "She"],
                    correct: "We"
                },
                {
                    q: "The cat is hungry. ....... wants some milk.",
                    options: ["He", "She", "It", "You"],
                    correct: "It"
                },
                {
                    q: "Sara is my friend. ....... lives in Cairo.",
                    options: ["He", "They", "We", "She"],
                    correct: "She"
                },
                {
                    q: "My parents are kind. ....... love me.",
                    options: ["He", "They", "I", "We"],
                    correct: "They"
                }
            ]
        },

        // --- Slide 3: Object Pronouns ---
        {
            type: "explanation",
            title: "OBJECT PRONOUNS",
            fontSize: "huge",
            content: [
                { term: "ME", desc: "" },
                { term: "HIM", desc: "" },
                { term: "HER", desc: "" },
                { term: "IT", desc: "" },
                { term: "US", desc: "" },
                { term: "YOU", desc: "" },
                { term: "THEM", desc: "" }
            ]
        },

        // --- Slide 4: Dual Column Comparison (Grid Layout) ---
        {
            type: "comparison", // نوع شريحة جديد للمقارنة جنباً لجنب
            title: "SUBJECT vs OBJECT",
            layout: "two-columns",
            leftColumn: ["I", "He", "She", "It", "We", "You", "They"],
            rightColumn: ["Me", "Him", "Her", "It", "Us", "You", "Them"]
        },

        // --- Slide 5: Object Practice (Font Size Max) ---
        {
            type: "practice",
            title: "OBJECTS CHALLENGE",
            layout: "large-text",
            questions: [
                {
                    q: "Help ....... , please! I can't carry this.",
                    options: ["him", "me", "her", "us"],
                    correct: "me"
                },
                {
                    q: "I saw Ahmed and gave ....... the book.",
                    options: ["him", "her", "me", "them"],
                    correct: "him"
                },
                {
                    q: "Our teacher loves ....... because we are good.",
                    options: ["me", "them", "us", "him"],
                    correct: "us"
                },
                {
                    q: "Where is Mona? I want to talk to .......",
                    options: ["him", "her", "it", "me"],
                    correct: "her"
                },
                {
                    q: "Look at the stars! Can you see .......?",
                    options: ["it", "them", "us", "her"],
                    correct: "them"
                }
            ]
        }
    ]
};
