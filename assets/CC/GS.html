/**
 * GS.js - محرك تصحيح نشاط Grammar
 * متوافق مع نظام الـ MIF والـ Hybird
 */

/**
 * دالة التصحيح الأساسية
 * @param {Object} data - تحتوي على answers (إجابات الطالب) و modelAnswers (الإجابات الصحيحة)
 */
function gradeMission(data) {
    const studentAnswers = data.answers; // مصفوفة الـ 10 كلمات التي أدخلها الطالب
    const modelAnswers = data.modelAnswers; // مصفوفة الـ 10 كلمات الصحيحة من ملف النشاط
    
    let correctCount = 0;

    // 1. منطق التصحيح: مطابقة دقيقة للكلمات مع إهمال المسافات الزائدة وحالة الأحرف
    modelAnswers.forEach((correct, index) => {
        if (studentAnswers[index]) {
            const studentWord = studentAnswers[index].toLowerCase().trim();
            const correctWord = correct.toLowerCase().trim();
            
            if (studentWord === correctWord) {
                correctCount++;
            }
        }
    });

    /**
     * 2. حساب الدرجة بناءً على طلب مستر عز:
     * - الدرجة الكلية من 5 (كل كلمة صح بـ 0.5 درجة)
     * - التقريب لأقرب عدد صحيح (Math.round)
     * - الحد الأدنى للدرجة هو 1
     */
    
    // حساب الدرجة الخام (مثلاً 7 صح تعطي 3.5)
    let rawScore = correctCount * 0.5;
    
    // التقريب لأقرب عدد صحيح (3.5 تصبح 4، و 3.4 تصبح 3)
    let roundedScore = Math.round(rawScore);
    
    // ضمان ألا تقل الدرجة عن 1 وألا تزيد عن 5
    let finalScore = Math.max(1, Math.min(5, roundedScore));

    // إرجاع النتيجة النهائية ليتم إرسالها لـ Apps Script
    return finalScore;
}
