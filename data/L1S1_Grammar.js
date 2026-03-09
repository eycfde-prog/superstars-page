/* File: L1S1_Grammar.js
   System: EYC Veto Program - WOLF Edition
   Status: Ready for Iframe Injection - Single Item Focus
*/

var grammarData = {
    metadata: {
        level: "Level 1",
        session: "Session 1",
        topic: "Subject & Object Pronouns",
        header: {
            logo: "EYC_LOGO_URL", 
            text: "Level 1 - Session 1 - Subject & Object Pronouns"
        },
        footer: "EYC - Veto Program"
    },
    slides: [
        // --- ضماير الفاعل (كل واحد في شريحة مستقلة) ---
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "I" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "HE" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "SHE" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "IT" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "WE" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "YOU" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "THEY" },

        // --- تدريبات الفاعل (كبيرة الحجم) ---
        {
            type: "practice",
            title: "CHAMPIONS CHALLENGE: SUBJECTS",
            layout: "large-text",
            questions: [
                { q: "....... is a clever doctor. (Ahmed)", options: ["He", "She", "It", "They"], correct: "He" },
                { q: "....... are playing football now.", options: ["I", "We", "He", "She"], correct: "We" },
                { q: "The cat is hungry. ....... wants some milk.", options: ["He", "She", "It", "You"], correct: "It" },
                { q: "Sara is my friend. ....... lives in Cairo.", options: ["He", "They", "We", "She"], correct: "She" },
                { q: "My parents are kind. ....... love me.", options: ["He", "They", "I", "We"], correct: "They" }
            ]
        },

        // --- ضماير المفعول (كل واحد في شريحة مستقلة) ---
        { type: "explanation", title: "OBJECT PRONOUN", layout: "big-box", term: "ME" },
        { type: "explanation", title: "OBJECT PRONOUN", layout: "big-box", term: "HIM" },
        { type: "explanation", title: "OBJECT PRONOUN", layout: "big-box", term: "HER" },
        { type: "explanation", title: "OBJECT PRONOUN", layout: "big-box", term: "IT" },
        { type: "explanation", title: "OBJECT PRONOUN", layout: "big-box", term: "US" },
        { type: "explanation", title: "OBJECT PRONOUN", layout: "big-box", term: "YOU" },
        { type: "explanation", title: "OBJECT PRONOUN", layout: "big-box", term: "THEM" },

        // --- شريحة المقارنة (الجدول الضخم) ---
        {
            type: "comparison",
            title: "SUBJECT vs OBJECT",
            layout: "two-columns-giant",
            data: [
                ["I", "ME"],
                ["HE", "HIM"],
                ["SHE", "HER"],
                ["IT", "IT"],
                ["WE", "US"],
                ["YOU", "YOU"],
                ["THEY", "THEM"]
            ]
        },

        // --- تدريبات المفعول (كبيرة الحجم) ---
        {
            type: "practice",
            title: "CHAMPIONS CHALLENGE: OBJECTS",
            layout: "large-text",
            questions: [
                { q: "Help ....... , please! I can't carry this.", options: ["him", "me", "her", "us"], correct: "me" },
                { q: "I saw Ahmed and gave ....... the book.", options: ["him", "her", "me", "them"], correct: "him" },
                { q: "Our teacher loves ....... because we are good.", options: ["me", "them", "us", "him"], correct: "us" },
                { q: "Where is Mona? I want to talk to .......", options: ["him", "her", "it", "me"], correct: "her" },
                { q: "Look at the stars! Can you see .......?", options: ["it", "them", "us", "her"], correct: "them" }
            ]
        }
    ]
};
