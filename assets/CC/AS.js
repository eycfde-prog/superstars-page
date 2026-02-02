/**
 * Alike Activity Correction Logic (AS) - المحدث
 * نظام التصحيح: 5 أزواج لكل مهمة
 */

const ALIKE_ANSWERS_KEY = {
    // المهمة 1: (to/too, son/sun, here/hear, sea/see, no/know)
    "1": ["to", "too", "son", "sun", "here", "hear", "sea", "see", "no", "know"],
    
    // المهمة 2: (two/too, son/sun, i/eye, be/bee, by/buy)
    "2": ["two", "too", "son", "sun", "i", "eye", "be", "bee", "by", "buy"],
    
    // المهمة 3: (flour/flower, peace/piece, knight/night, sun/son, tail/tale)
    "3": ["flour", "flower", "peace", "piece", "knight", "night", "sun", "son", "tail", "tale"],
    
    // المهمة 4: (main/mane, steel/steal, root/route, whole/hole, son/sun)
    "4": ["main", "mane", "steel", "steal", "root", "route", "whole", "hole", "son", "sun"],
    
    // المهمة 5: (horse/hoarse, one/won, stair/stare, bare/bear, hair/hare)
    "5": ["horse", "hoarse", "one", "won", "stair", "stare", "bare", "bear", "hair", "hare"],
    
    // المهمة 6: (past/passed, place/plaice, rain/reign, key/quay, not/knot)
    "6": ["past", "passed", "place", "plaice", "rain", "reign", "key", "quay", "not", "knot"],
    
    // المهمة 7: (allowed/aloud, check/cheque, mail/male, sea/see, wait/weight)
    "7": ["allowed", "aloud", "check", "cheque", "mail", "male", "sea", "see", "wait", "weight"],
    
    // المهمة 8: (desert/dessert, dual/duel, flea/flee, gate/gait, week/weak)
    "8": ["desert", "dessert", "dual", "duel", "flea", "flee", "gate", "gait", "week", "weak"],
    
    // المهمة 9: (hero/heroin, hymn/him, idle/idol, lead/led, hair/hare)
    "9": ["hero", "heroin", "hymn", "him", "idle", "idol", "lead", "led", "hair", "hare"],
    
    // المهمة 10: (brake/break, scent/sent, band/banned, sight/site, meat/meet)
    "10": ["brake", "break", "scent", "sent", "band", "banned", "sight", "site", "meat", "meet"]
};

// خوارزمية قياس التشابه (تسمح بحرف واحد خطأ) - لم نغيرها لضمان سهولة التنفيذ
function checkSimilarity(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return true;
    if (Math.abs(s1.length - s2.length) > 1) return false;

    let longer = s1.length >= s2.length ? s1 : s2;
    let shorter = s1.length < s2.length ? s1 : s2;

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

/**
 * تقييم المهمة
 * @param {string} mNum - رقم المهمة (1-10)
 * @param {string} studentAnswer - النص القادم من الـ Iframe
 */
function evaluateMission(mNum, studentAnswer) {
    const answers = ALIKE_ANSWERS_KEY[mNum];
    if (!answers) return { correct: false, points: 0, found: 0 };

    // تنظيف إجابة الطالب وتقسيمها لكلمات
    const studentWords = studentAnswer.toLowerCase().split(/[\s,.-]+/).filter(w => w.length > 0);
    
    let correctCount = 0;
    let tempAnswers = [...answers];

    studentWords.forEach(word => {
        const index = tempAnswers.findIndex(target => checkSimilarity(word, target));
        if (index !== -1) {
            correctCount++;
            tempAnswers.splice(index, 1); // منع تكرار الكلمة
        }
    });

    // نظام النقاط: كل كلمة بـ 1 توكين (بإجمالي 10 توكينز للمهمة الكاملة)
    // أو يمكنك تعديله ليكون 0.5 كما كان سابقاً
    let finalPoints = correctCount; 

    return {
        isCorrect: correctCount >= 1, // تعتبر صحيحة إذا أجاب كلمة واحدة على الأقل
        points: finalPoints,
        found: correctCount,
        answerText: studentAnswer
    };
}
