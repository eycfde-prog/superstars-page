/**
 * Alike Activity Correction Logic (AS) - Enhanced Version
 */
const ALIKE_ANSWERS_KEY = {
    "1": ["to", "too", "son", "sun", "here", "hear", "sea", "see", "no", "know"],
    // ... بقية المفاتيح كما هي
};

function checkSimilarity(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return true;
    
    // حماية الكلمات القصيرة جداً (كلمتين أو أقل يجب أن تطابق تماماً)
    if (s2.length <= 2) return s1 === s2;

    if (Math.abs(s1.length - s2.length) > 1) return false;
    let longer = s1.length >= s2.length ? s1 : s2;
    let shorter = s1.length < s2.length ? s1 : s2;
    let diffs = 0; let sIdx = 0;
    for (let lIdx = 0; lIdx < longer.length; lIdx++) {
        if (longer[lIdx] !== shorter[sIdx]) {
            diffs++;
            if (longer.length === shorter.length) sIdx++;
        } else { sIdx++; }
    }
    return diffs <= 1;
}

function evaluateMission(mNum, studentAnswersArray) {
    const taskKey = String(mNum).replace(/[^0-9]/g, '');
    const correctAnswers = ALIKE_ANSWERS_KEY[taskKey];
    
    if (!correctAnswers) return { isCorrect: false, points: 0, detailedResults: [] };

    let points = 0;
    // مصفوفة تخزن true/false لكل مدخل لتلوينه لاحقاً
    let detailedResults = [];

    studentAnswersArray.forEach((word, index) => {
        // التحقق من الإجابة مقابل الكلمة الصحيحة في نفس الترتيب
        // (أو يمكنك البحث في المصفوفة كاملة إذا كان الترتيب غير مهم)
        const isRight = checkSimilarity(word, correctAnswers[index]);
        if (isRight) {
            points++;
            detailedResults.push(true);
        } else {
            detailedResults.push(false);
        }
    });

    return {
        isCorrect: points > 0,
        points: points,
        detailedResults: detailedResults,
        found: points
    };
}
