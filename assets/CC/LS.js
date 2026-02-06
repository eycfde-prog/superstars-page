/**
 * LS.js - محرك تصحيح نشاط Label (LS)
 * تصميم: جي (Ge) لمستر عز
 */

/**
 * 1. خوارزمية المسافة (Fuzzy Matching)
 * للسماح بخطأ حرف واحد فقط في مسمى الصورة
 */
function isNearlyCorrect(studentWord, correctWord) {
    if (!studentWord || !correctWord) return false;
    
    const s = studentWord.toLowerCase().trim().replace(/-/g, ' ');
    const c = correctWord.toLowerCase().trim().replace(/-/g, ' ');
    
    if (s === c) return true;
    if (Math.abs(s.length - c.length) > 1) return false;

    let edits = 0;
    let i = 0, j = 0;

    while (i < s.length && j < c.length) {
        if (s[i] !== c[j]) {
            edits++;
            if (edits > 1) return false; 
            if (s.length > c.length) i++; 
            else if (s.length < c.length) j++; 
            else { i++; j++; } 
        } else {
            i++; j++;
        }
    }
    if (i < s.length || j < c.length) edits++;
    return edits <= 1;
}

/**
 * 2. الدالة الأساسية التي تستدعيها صفحة Hybird
 * @param {Object} data - تحتوي على answers (إجابات الطالب) و modelAnswers (الكلمات الـ 10 الصحيحة)
 */
function gradeMission(data) {
    const studentAnswers = data.answers;
    const modelAnswers = data.modelAnswers;
    
    let correctCount = 0;

    // مقارنة الـ 10 تسميات
    modelAnswers.forEach((correct, index) => {
        if (isNearlyCorrect(studentAnswers[index], correct)) {
            correctCount++;
        }
    });

    /**
     * 3. معادلة مستر عز للدرجات:
     * - كل كلمة صح بـ 0.5 درجة (المجموع الكلي 5)
     * - التقريب لأقرب عدد صحيح (Math.round)
     * - الحد الأدنى 1
     */
    let rawScore = correctCount * 0.5;
    let roundedScore = Math.round(rawScore);
    
    // ضمان ألا تقل الدرجة عن 1 وألا تزيد عن 5
    let finalScore = Math.max(1, Math.min(5, roundedScore));

    return finalScore;
}
