/* File: L1S1_Grammar.js
   System: EYC Veto Program - WOLF Edition
   Status: Ready for Iframe Injection
*/

// استخدمنا var لضمان التعرف عليه داخل الـ Iframe Scope
var grammarData = {
    metadata: {
        level: "Level 1",
        session: "Session 1",
        topic: "Subject & Object Pronouns"
    },
    slides: [
        // --- الجزء الأول: العنوان الفاعل ---
        {
            type: "explanation",
            title: "SUBJECT PRONOUNS",
            // الوصف سيظهر تحت العنوان
            content: [
                { term: "INFO", desc: "ضمائر الفاعل: تأتي دائمًا (قبل) الفعل." },
                { term: "I", desc: "أنا" },
                { term: "He", desc: "هو (للمفرد المذكر)" },
                { term: "She", desc: "هي (للمفرد المؤنث)" },
                { term: "It", desc: "هو/هي (لغير العاقل)" },
                { term: "We", desc: "نحن" },
                { term: "You", desc: "أنت / أنتم" },
                { term: "They", desc: "هم" }
            ]
        },

        // --- الجزء الثاني: تدريبات الفاعل ---
        {
            type: "practice",
            title: "CHAMPIONS CHALLENGE: SUBJECTS",
            questions: [
                {
                    q: "....... is a clever doctor. (Ahmed)",
                    options: ["He", "She", "It", "They"],
                    correct: "He" // جعلنا التصحيح بالكلمة ليتوافق مع دالة checkAnswer
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

        // --- الجزء الثالث: مفعول به ---
        {
            type: "explanation",
            title: "OBJECT PRONOUNS",
            content: [
                { term: "INFO", desc: "ضمائر المفعول: تأتي بعد الفعل أو حرف الجر." },
                { term: "Me", desc: "ني (يعود عليّ)" },
                { term: "Him", desc: "ـه (يعود عليه)" },
                { term: "Her", desc: "ـها (يعود عليها)" },
                { term: "It", desc: "ـه/ـها (لغير العاقل)" },
                { term: "Us", desc: "ـنا (يعود علينا)" },
                { term: "You", desc: "ـك / ـكم" },
                { term: "Them", desc: "ـهم (يعود عليهم)" }
            ]
        },

        // --- الجزء الرابع: مقارنة الفاعل والمفعول ---
        {
            type: "explanation",
            title: "WRITE & COMPARE",
            content: [
                { term: "I -> Me", desc: "أنا" },
                { term: "He -> Him", desc: "هو" },
                { term: "She -> Her", desc: "هي" },
                { term: "It -> It", desc: "غير عاقل" },
                { term: "We -> Us", desc: "نحن" },
                { term: "You -> You", desc: "أنت" },
                { term: "They -> Them", desc: "هم" }
            ]
        },

        // --- الجزء الخامس: تدريبات المفعول ---
        {
            type: "practice",
            title: "CHAMPIONS CHALLENGE: OBJECTS",
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
