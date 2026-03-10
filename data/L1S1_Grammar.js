/* File: L1S1_Grammar.js 
   System: EYC Veto Program - WOLF Edition */

var grammarData = {
    metadata: {
        level: "Level 1",
        session: "Session 1",
        topic: "Subject & Object Pronouns"
    },
    slides: [
        // --- ضماير الفاعل ---
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "I"" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "HE", desc: "هو (مفرد مذكر)" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "SHE", desc: "هي (مفرد مؤنث)" },
        { type: "explanation", title: "SUBJECT PRONOUN", layout: "big-box", term: "IT", desc: "هو/هي (غير عاقل)" },
        
        {
            type: "practice",
            title: "CHAMPIONS CHALLENGE: SUBJECTS",
            layout: "large-text",
            questions: [
                { q: "....... is a clever doctor. (Ahmed)", options: ["He", "She", "It", "They"], correct: "He" },
                { q: "....... are playing football now.", options: ["I", "We", "He", "She"], correct: "We" }
            ]
        },

        // --- شريحة المقارنة ---
        {
            type: "comparison",
            title: "SUBJECT vs OBJECT",
            layout: "two-columns-giant",
            data: [
                ["I", "ME"], ["HE", "HIM"], ["SHE", "HER"], ["IT", "IT"], ["WE", "US"], ["THEY", "THEM"]
            ]
        }
    ]
};
