/**
 * Alike Activity Correction Logic (Updated)
 * منطق التصحيح: الكلمة بـ 0.5، المجموع النهائي من 5، بدون تقريب، بدون حد أدنى.
 */

const ALIKE_ANSWERS_KEY = {
    "1": ["to", "too", "son", "sun", "here", "hear", "sea", "see", "no", "know"],
    "2": ["two", "too", "son", "sun", "i", "eye", "be", "bee", "by", "buy"],
    "3": ["flour", "flower", "peace", "piece", "knight", "night", "sun", "son", "tail", "tale"],
    "4": ["main", "mane", "steel", "steal", "root", "route", "whole", "hole", "son", "sun"],
    "5": ["horse", "hoarse", "one", "won", "stair", "stare", "bare", "bear", "hair", "hare"],
    "6": ["past", "passed", "place", "plaice", "rain", "reign", "key", "quay", "not", "knot"],
    "7": ["allowed", "aloud", "check", "cheque", "mail", "male", "sea", "see", "wait", "weight"],
    "8": ["desert", "dessert", "dual", "duel", "flea", "flee", "gate", "gait", "week", "weak"],
    "9": ["hero", "heroin", "hymn", "him", "idle", "idol", "lead", "led", "hair", "hare"],
    "10": ["brake", "break", "scent", "sent", "band", "banned", "sight", "site", "meat", "meet"]
};

// وظيفة التحقق من تشابه الكلمات (تسمح بخطأ حرف واحد)
function checkSimilarity(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return true;
    if (Math.abs(s1.length - s2.length) > 1) return false;
    let longer = s1.length >= s2.length ? s1 : s2;
    let shorter = s1.length < s2.length ? s1 : s2;
    let diffs = 0, sIdx = 0;
    for (let lIdx = 0; lIdx < longer.length; lIdx++) {
        if (longer[lIdx] !== shorter[sIdx]) {
            diffs++;
            if (longer.length === shorter.length) sIdx++;
        } else { sIdx++; }
    }
    return diffs <= 1;
}

async function evaluateMission(iframe) {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const studentAnswer = doc.querySelector('textarea')?.value || doc.querySelector('input')?.value || "";
    const currentMNum = new URLSearchParams(window.location.search).get('m') || '1';
    
    const answers = ALIKE_ANSWERS_KEY[currentMNum];
    if (!answers) return { isCorrect: false, points: 0, answerText: studentAnswer };

    // تنظيف نص الطالب وتحويله لمصفوفة كلمات
    const studentWords = studentAnswer.toLowerCase().split(/[\s,.-]+/).filter(w => w.length > 0);
    
    let correctCount = 0;
    let tempAnswers = [...answers];

    studentWords.forEach(word => {
        const index = tempAnswers.findIndex(target => checkSimilarity(word, target));
        if (index !== -1) {
            correctCount++;
            tempAnswers.splice(index, 1); // حذف الإجابة لعدم تكرار احتسابها
        }
    });

    // --- منطق الحساب المحدث ---
    // 1. كل كلمة صحيحة بـ 0.5 درجة
    // 2. المجموع النهائي هو عدد الكلمات الصحيحة مضروباً في 0.5 (الحد الأقصى 5 درجات لـ 10 كلمات)
    let finalPoints = correctCount * 0.5;

    return {
        isCorrect: correctCount > 0, 
        points: finalPoints, 
        answerText: studentAnswer
    };
}
