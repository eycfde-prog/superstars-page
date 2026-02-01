// CC.js - محرك التصحيح العالمي
const MissionAnswers = {
    // مثال لنشاط Alike (AS)
    "AS": {
        "m1": ["apple", "fruit", "red", "sweet"], // المهام 1 تحتوي على هذه الكلمات الصحيحة
        "m2": ["dog", "animal", "pet", "bark"],
        // استكمل الـ 10 مهام...
    },
    // مثال لنشاط Golden Ear X (GEX) بمستويات
    "GEX": {
        "m1A": ["hello", "world"],
        "m1B": ["welcome", "home"],
        "m1C": ["universal", "terminal"]
    },
    "DX": {
        "type": "manual" // الأنشطة التي تحتاج مراجعة يدوية
    }
};

/**
 * دالة التصحيح الرئيسية
 * @param {string} code - كود النشاط (GES, AS...)
 * @param {string} mNum - رقم المهمة (1, 2...)
 * @param {string} level - المستوى (A, B, C)
 * @param {string} studentAnswer - إجابة الطالب النصية
 */
function evaluateMission(code, mNum, level, studentAnswer) {
    const cleanAnswer = studentAnswer.toLowerCase().trim();
    const activity = MissionAnswers[code];

    if (!activity) return { correct: false, points: 0, status: "No Reference" };
    if (activity.type === "manual") return { correct: true, points: 10, status: "Pending Manual Review" };

    // تحديد المفتاح (مهمة عادية أم مهمة بمستوى)
    const key = MissionAnswers[code][`m${mNum}${level}`] ? `m${mNum}${level}` : `m${mNum}`;
    const correctAnswers = activity[key];

    if (!correctAnswers) return { correct: false, points: 0, status: "Task Not Found" };

    // منطق التصحيح: هل الإجابة تحتوي على أي من الكلمات النموذجية؟
    // يمكنك تطوير هذا المنطق ليصبح (Exact Match) أو (Includes)
    const isCorrect = correctAnswers.some(correct => cleanAnswer.includes(correct.toLowerCase()));

    return {
        correct: isCorrect,
        points: isCorrect ? 5 : 0, // يمكنك تغيير النقاط بناءً على المصفوفة التي أرسلتها سابقاً
        status: isCorrect ? "Excellent" : "Try Again"
    };
}
