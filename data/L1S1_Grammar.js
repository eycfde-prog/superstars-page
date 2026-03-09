/* File: L1S1_Grammar.js
   Content: Subject and Object Pronouns 
   System: EYC Content-to-JS Engine
*/

const grammarData = [
    // --- الجزء الأول: العنوان الفاعل ---
    {
        type: "explanation",
        title: "SUBJECT PRONOUNS",
        description: "ضمائر الفاعل: هي الكلمات التي تحل محل الشخص أو الشيء الذي يقوم بالفعل، وتأتي دائمًا (قبل) الفعل.",
        items: [
            { term: "I", desc: "أنا" },
            { term: "He", desc: "هو (للمفرد المذكر)" },
            { term: "She", desc: "هي (للمفرد المؤنث)" },
            { term: "It", desc: "هو/هي (لغير العاقل)" },
            { term: "We", desc: "نحن" },
            { term: "You", desc: "أنت / أنتم" },
            { term: "They", desc: "هم" }
        ]
    },

    // --- الجزء الثاني: قائمة الضمائر للكتابة ---
    {
        type: "explanation",
        title: "STUDY & WRITE: SUBJECT PRONOUNS",
        description: "سجل هذه الضمائر في كشكولك الآن يا بطل!",
        items: [
            { term: "I - He - She - It", desc: "ضمائر المفرد" },
            { term: "We - You - They", desc: "ضمائر الجمع" }
        ]
    },

    // --- الجزء الثالث: تدريبات الفاعل (10 جمل) ---
    {
        type: "practice",
        title: "CHAMPIONS CHALLENGE: SUBJECTS",
        questions: [
            {
                q: "....... is a clever doctor. (Ahmed)",
                options: ["He", "She", "It", "They"],
                correct: 0
            },
            {
                q: "....... are playing football now.",
                options: ["I", "We", "He", "She"],
                correct: 1
            },
            {
                q: "The cat is hungry. ....... wants some milk.",
                options: ["He", "She", "It", "You"],
                correct: 2
            },
            {
                q: "Sara is my friend. ....... lives in Cairo.",
                options: ["He", "They", "We", "She"],
                correct: 3
            },
            {
                q: "My parents are kind. ....... love me.",
                options: ["He", "They", "I", "We"],
                correct: 1
            },
            {
                q: "....... am a student at EYC Academy.",
                options: ["He", "She", "I", "It"],
                correct: 2
            },
            {
                q: "Mona and I are happy. ....... won the prize.",
                options: ["We", "They", "You", "He"],
                correct: 0
            },
            {
                q: "Ali and Omar are fast. ....... won the race.",
                options: ["He", "She", "They", "I"],
                correct: 2
            },
            {
                q: "Are ....... ready for the exam, boys?",
                options: ["I", "You", "He", "It"],
                correct: 1
            },
            {
                q: "The car is blue. ....... is very fast.",
                options: ["They", "We", "She", "It"],
                correct: 3
            }
        ]
    },

    // --- الجزء الرابع: مفعول به ---
    {
        type: "explanation",
        title: "OBJECT PRONOUNS",
        description: "ضمائر المفعول: تأتي بعد الفعل أو بعد حرف الجر، وهي التي يقع عليها الفعل.",
        items: [
            { term: "Me", desc: "ني (يعود عليّ)" },
            { term: "Him", desc: "ـه (يعود عليه)" },
            { term: "Her", desc: "ـها (يعود عليها)" },
            { term: "It", desc: "ـه/ـها (لغير العاقل)" },
            { term: "Us", desc: "ـنا (يعود علينا)" },
            { term: "You", desc: "ـك / ـكم" },
            { term: "Them", desc: "ـهم (يعود عليهم)" }
        ]
    },

    // --- الجزء الخامس: قائمة المقارنة للكتابة ---
    {
        type: "explanation",
        title: "WRITE & COMPARE",
        description: "اكتب الجدول التالي لتعرف الفرق بين الفاعل والمفعول:",
        items: [
            { term: "I -> Me", desc: "أنا" },
            { term: "He -> Him", desc: "هو" },
            { term: "She -> Her", desc: "هي" },
            { term: "It -> It", desc: "غير عاقل" },
            { term: "We -> Us", desc: "نحن" },
            { term: "You -> You", desc: "أنت" },
            { term: "They -> Them", desc: "هم" }
        ]
    },

    // --- الجزء السادس: تدريبات المفعول (10 جمل) ---
    {
        type: "practice",
        title: "CHAMPIONS CHALLENGE: OBJECTS",
        questions: [
            {
                q: "Help ....... , please! I can't carry this.",
                options: ["him", "me", "her", "us"],
                correct: 1
            },
            {
                q: "I saw Ahmed and gave ....... the book.",
                options: ["him", "her", "me", "them"],
                correct: 0
            },
            {
                q: "Our teacher loves ....... because we are good.",
                options: ["me", "them", "us", "him"],
                correct: 2
            },
            {
                q: "Where is Mona? I want to talk to .......",
                options: ["him", "her", "it", "me"],
                correct: 1
            },
            {
                q: "The homework is easy. I can do .......",
                options: ["them", "him", "it", "us"],
                correct: 2
            },
            {
                q: "I like my friends. I play with ....... every day.",
                options: ["them", "us", "you", "him"],
                correct: 0
            },
            {
                q: "Listen to .......! I am speaking to you.",
                options: ["him", "me", "her", "us"],
                correct: 1
            },
            {
                q: "We are lost. Can you help .......?",
                options: ["me", "them", "us", "her"],
                correct: 2
            },
            {
                q: "This gift is for ......., Sara. (You)",
                options: ["you", "her", "him", "me"],
                correct: 0
            },
            {
                q: "Look at the stars! Can you see .......?",
                options: ["it", "them", "us", "her"],
                correct: 1
            }
        ]
    }
];
