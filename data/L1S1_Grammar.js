const grammarData = {
    metadata: {
        level: "Level 1",
        session: "Session 1",
        topic: "Subject & Object Pronouns"
    },
    slides: [
        {
            type: "explanation",
            title: "Subject Pronouns",
            content: [
                { term: "I", desc: "the Speaker" }, // [cite: 5]
                { term: "He", desc: "the male" }, // [cite: 6]
                { term: "She", desc: "the female" }, // [cite: 7]
                { term: "It", desc: "something or animal" }, // [cite: 8]
                { term: "We", desc: "speaker plural" }, // [cite: 9]
                { term: "They", desc: "people or things" }, // [cite: 10]
                { term: "You", desc: "the listener" } // [cite: 11]
            ]
        },
        {
            type: "practice",
            title: "Subject Pronoun Quiz",
            questions: [
                { q: "____ is a girl.", options: ["He", "She", "It"], correct: "She" }, // [cite: 23, 39]
                { q: "____ is a boy.", options: ["He", "She", "It"], correct: "He" }, // [cite: 24, 40]
                { q: "____ am a teacher.", options: ["I", "We", "You"], correct: "I" } // [cite: 28, 35]
            ]
        },
        {
            type: "explanation",
            title: "Object Pronouns",
            content: [
                { term: "me", desc: "the Speaker" }, // [cite: 51]
                { term: "him", desc: "the male" }, // [cite: 52]
                { term: "her", desc: "the female" }, // [cite: 53]
                { term: "us", desc: "speaker plural" }, // [cite: 55]
                { term: "them", desc: "people or things" } // [cite: 56]
            ]
        },
        {
            type: "practice",
            title: "Object Pronoun Practice",
            questions: [
                { q: "She cooked for ____ (we).", options: ["we", "us", "our"], correct: "us" }, // [cite: 78, 79]
                { q: "He visited ____ (they).", options: ["them", "they", "their"], correct: "them" }, // [cite: 80, 81]
                { q: "They invited ____.", options: ["we", "us", "our"], correct: "us" } // [cite: 110, 114]
            ]
        }
    ]
};
