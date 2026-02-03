// مكتبة الإجابات النموذجية للمهمات العشر
const answerKeys = {
    "AS1": ["to", "too", "son", "sun", "here", "hear", "sea", "see", "no", "know"],
    "AS2": ["two", "too", "son", "sun", "i", "eye", "be", "bee", "by", "buy"],
    "AS3": ["flour", "flower", "peace", "piece", "knight", "night", "sun", "son", "tail", "tale"],
    "AS4": ["main", "mane", "steel", "steal", "root", "route", "whole", "hole", "son", "sun"],
    "AS5": ["horse", "hoarse", "one", "won", "stair", "stare", "bare", "bear", "hair", "hare"],
    "AS6": ["past", "passed", "place", "plaice", "rain", "reign", "key", "quay", "not", "knot"],
    "AS7": ["allowed", "aloud", "check", "cheque", "mail", "male", "sea", "see", "wait", "weight"],
    "AS8": ["desert", "dessert", "dual", "duel", "flea", "flee", "gate", "gait", "week", "weak"],
    "AS9": ["hero", "heroin", "hymn", "him", "idle", "idol", "lead", "led", "hair", "hare"],
    "AS10": ["brake", "break", "scent", "sent", "band", "banned", "sight", "site", "meat", "meet"]
};

/**
 * دالة قياس مسافة "ليفنشتاين" لتحديد الفرق بين الكلمتين
 * تستخدم للتأكد إذا كان هناك حرف واحد فقط مختلف (زيادة، نقصان، أو تبديل)
 */
function isCloseEnough(str1, str2) {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    
    if (s1 === s2) return true;
    if (Math.abs(s1.length - s2.length) > 1) return false;

    let edits = 0;
    let i = 0, j = 0;

    while (i < s1.length && j < s2.length) {
        if (s1[i] !== s2[j]) {
            edits++;
            if (edits > 1) return false;
            if (s1.length > s2.length) i++;
            else if (s2.length > s1.length) j++;
            else { i++; j++; }
        } else {
            i++; j++;
        }
    }
    edits += (s1.length - i) + (s2.length - j);
    return edits <= 1;
}

/**
 * الدالة الرئيسية للتصحيح
 * @param {string} taskCode - كود المهمة (AS1 to AS10)
 * @param {Array} studentAnswers - مصفوفة بها 10 كلمات مدخلة من الطالب
 */
function gradeActivity(taskCode, studentAnswers) {
    const correctAnswers = answerKeys[taskCode];
    if (!correctAnswers) return "Error: Task code not found";

    let score = 0;

    // تصحيح كل كلمة (كل كلمة بنصف درجة)
    studentAnswers.forEach((ans, index) => {
        if (ans && isCloseEnough(ans, correctAnswers[index])) {
            score += 0.5;
        }
    });

    // تطبيق قاعدة الحد الأدنى (درجة واحدة على الأقل)
    if (score < 1) {
        score = 1;
    }

    // جبر الكسور لأقرب رقم صحيح (3.5 تصبح 4)
    const finalScore = Math.ceil(score);

    // إرسال النتيجة للصفحة الأم (يمكن تعديل طريقة الإرسال حسب حاجتك)
    console.log(`Task: ${taskCode} | Raw Score: ${score} | Final Score: ${finalScore}`);
    return finalScore;
}

// مثال لاستقبال البيانات من الصفحة الأم عبر الـ Window Object
window.addEventListener("message", (event) => {
    const { taskCode, answers } = event.data;
    if (taskCode && answers) {
        const result = gradeActivity(taskCode, answers);
        // إعادة النتيجة للصفحة الأم
        window.parent.postMessage({ type: "GRADING_RESULT", score: result }, "*");
    }
});
