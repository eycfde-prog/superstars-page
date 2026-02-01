/**
 * Alike Activity Correction Logic (AS)
 * Path: assets/CC/AS.js
 */

const ALIKE_ANSWERS_KEY = {
    "1": ["to", "too", "son", "sun", "here", "hear", "sea", "see", "no", "know", "two", "too"],
    "2": ["week", "weak", "hour", "our", "eight", "ate", "new", "knew", "road", "rode", "write", "right", "blue", "blew", "meat", "meet", "one", "won", "hair", "hare"],
    "3": ["flour", "flower", "peace", "piece", "knight", "night", "aloud", "allowed", "rock", "role", "court", "place", "sun", "son", "bored", "board", "tail", "tale", "deer", "dear"],
    "4": ["threw", "through", "main", "mane", "steel", "steal", "root", "route", "outcast", "aloud", "sailor", "sail", "whole", "hole", "son", "sun", "weather", "whether", "berry", "bury"],
    "5": ["hoarse", "horse", "wont", "want", "lake", "one", "stair", "stare", "bare", "bear", "hare", "hair", "heal", "heel", "council", "counsel", "won", "one", "soul", "sole"],
    "6": ["passed", "past", "plaice", "place", "reign", "rain", "quay", "key", "patience", "patients", "prophecy", "prophesy", "muscle", "mussel", "metal", "mettle", "morning", "mourning", "knot", "not"],
    "7": ["allowed", "aloud", "altar", "alter", "ascent", "assent", "check", "cheque", "choir", "quire", "compliment", "complement", "phrase", "frays", "mail", "male", "porter", "port", "master", "muster"],
    "8": ["conscience", "conscious", "desert", "dessert", "drawer", "draw", "dual", "duel", "elicit", "illicit", "ensure", "insure", "flea", "flee", "forte", "forty", "gate", "gait", "guild", "guilt"],
    "9": ["allusive", "elusive", "discreet", "discrete", "eminent", "imminent", "hero", "heroin", "hymn", "him", "idle", "idol", "lead", "led", "hare", "hair", "weak", "week", "loot", "lute"],
    "10": ["brake", "break", "scent", "sent", "banned", "band", "medal", "meddle", "current", "currant", "exercise", "exorcise", "stationary", "stationery", "sight", "site", "principle", "principal", "profit", "prophet"]
};

// خوارزمية قياس التشابه (تسمح بحرف واحد خطأ)
function checkSimilarity(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return true;
    if (Math.abs(s1.length - s2.length) > 1) return false;

    let editDistance = 0;
    let i = 0, j = 0;
    
    // تبسيط للمنطق: التحقق من عدد الحروف المختلفة
    const longer = s1.length >= s2.length ? s1 : s2;
    const shorter = s1.length < s2.length ? s1 : s2;

    let diffs = 0;
    let sIdx = 0;
    for (let lIdx = 0; lIdx < longer.length; lIdx++) {
        if (longer[lIdx] !== shorter[sIdx]) {
            diffs++;
            if (longer.length === shorter.length) sIdx++;
        } else {
            sIdx++;
        }
    }
    return diffs <= 1;
}

// الدالة التي ستستدعيها الصفحة الرئيسية
function evaluateMission(mNum, level, studentAnswer) {
    const answers = ALIKE_ANSWERS_KEY[mNum];
    if (!answers) return { correct: false, points: 0 };

    // تحويل إجابة الطالب لمصفوفة كلمات
    const studentWords = studentAnswer.toLowerCase().split(/[\s,]+/).filter(w => w.length > 0);
    
    let correctCount = 0;
    let tempAnswers = [...answers];

    studentWords.forEach(word => {
        const index = tempAnswers.findIndex(target => checkSimilarity(word, target));
        if (index !== -1) {
            correctCount++;
            tempAnswers.splice(index, 1); // منع تكرار احتساب نفس الكلمة
        }
    });

    // الحساب: كل كلمة = 0.5 توكين
    let rawScore = correctCount * 0.5;
    let finalPoints = Math.round(rawScore); // التقريب لأقرب عدد صحيح (مثلاً 3.5 تصبح 4)

    return {
        correct: finalPoints > 0,
        points: finalPoints,
        found: correctCount
    };
}
