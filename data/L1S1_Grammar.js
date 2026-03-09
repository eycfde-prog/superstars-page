/* File: L1S1_Grammar.js
   System: EYC Veto Program - WOLF Edition
   Status: Ready for Iframe Injection - Ultra Focus Mode
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
        // --- ضمائر الفاعل: كل واحد في شريحة منفصلة خط عملاق ---
        { type: "explanation", title: "SUBJECT PRONOUN", content: [{ term: "I", desc: "" }] },
        { type: "explanation", title: "SUBJECT PRONOUN", content: [{ term: "HE", desc: "" }] },
        { type: "explanation", title: "SUBJECT PRONOUN", content: [{ term: "SHE", desc: "" }] },
        { type: "explanation", title: "SUBJECT PRONOUN", content: [{ term: "IT", desc: "" }] },
        { type: "explanation", title: "SUBJECT PRONOUN", content: [{ term: "WE", desc: "" }] },
        { type: "explanation", title: "SUBJECT PRONOUN", content: [{ term: "YOU", desc: "" }] },
        { type: "explanation", title: "SUBJECT PRONOUN", content: [{ term: "THEY", desc: "" }] },

        // --- تدريبات الفاعل (جملة واحدة كبيرة في كل شريحة لضمان الرؤية من بعيد) ---
        {
            type: "practice",
            title: "SUBJECTS CHALLENGE",
            questions: [{ q: "....... is a clever doctor. (Ahmed)", options: ["He", "She", "It", "They"], correct: "He" }]
        },
        {
            type: "practice",
            title: "SUBJECTS CHALLENGE",
            questions: [{ q: "....... are playing football now.", options: ["I", "We", "He", "She"], correct: "We" }]
        },
        {
            type: "practice",
            title: "SUBJECTS CHALLENGE",
            questions: [{ q: "The cat is hungry. ....... wants some milk.", options: ["He", "She", "It", "You"], correct: "It" }]
        },

        // --- ضمائر المفعول: كل واحد في شريحة منفصلة ---
        { type: "explanation", title: "OBJECT PRONOUN", content: [{ term: "ME", desc: "" }] },
        { type: "explanation", title: "OBJECT PRONOUN", content: [{ term: "HIM", desc: "" }] },
        { type: "explanation", title: "OBJECT PRONOUN", content: [{ term: "HER", desc: "" }] },
        { type: "explanation", title: "OBJECT PRONOUN", content: [{ term: "IT", desc: "" }] },
        { type: "explanation", title: "OBJECT PRONOUN", content: [{ term: "US", desc: "" }] },
        { type: "explanation", title: "OBJECT PRONOUN", content: [{ term: "YOU", desc: "" }] },
        { type: "explanation", title: "OBJECT PRONOUN", content: [{ term: "THEM", desc: "" }] },

        // --- شريحة المقارنة النهائية (الجدول العمودين) ---
        {
            type: "comparison",
            title: "WRITE & COMPARE",
            layout: "two-columns",
            leftColumn: ["I", "He", "She", "It", "We", "You", "They"],
            rightColumn: ["Me", "Him", "Her", "It", "Us", "You", "Them"]
        },

        // --- تدريبات المفعول (جمل منفصلة) ---
        {
            type: "practice",
            title: "OBJECTS CHALLENGE",
            questions: [{ q: "Help ....... , please! I can't carry this.", options: ["him", "me", "her", "us"], correct: "me" }]
        },
        {
            type: "practice",
            title: "OBJECTS CHALLENGE",
            questions: [{ q: "I saw Ahmed and gave ....... the book.", options: ["him", "her", "me", "them"], correct: "him" }]
        }
    ]
};
