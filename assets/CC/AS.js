/**
 * AS.js - محرك تصحيح نشاط Alike
 * تصميم: جي (Ge) لمستر عز
 */

const AlikeCorrectionEngine = {
    
    // 1. خوارزمية المسافة (Fuzzy Matching) - للسماح بخطأ حرف واحد
    isNearlyCorrect: function(studentWord, correctWord) {
        if (!studentWord || !correctWord) return false;
        
        const s = studentWord.toLowerCase().trim();
        const c = correctWord.toLowerCase().trim();
        
        // لو الكلمة متطابقة تماماً
        if (s === c) return true;

        // لو الفرق في الطول أكثر من حرف واحد، نعتبرها خطأ فوراً
        if (Math.abs(s.length - c.length) > 1) return false;

        let edits = 0;
        let i = 0, j = 0;

        while (i < s.length && j < c.length) {
            if (s[i] !== c[j]) {
                edits++;
                if (edits > 1) return false; // أكثر من حرف خطأ
                
                if (s.length > c.length) i++; // الطالب زوّد حرف
                else if (s.length < c.length) j++; // الطالب نقّص حرف
                else { i++; j++; } // الطالب بدّل حرف مكان حرف
            } else {
                i++; j++;
            }
        }
        // معالجة الحرف الأخير إذا كان الفرق في الطول في نهاية الكلمة
        if (i < s.length || j < c.length) edits++;
        
        return edits <= 1;
    },

    // 2. الدالة الأساسية لحساب النتيجة النهائية
    processScore: function(studentAnswers, modelAnswers) {
        let correctCount = 0;
        let detailedResults = []; // لتلوين الـ inputs لاحقاً (صح/غلط)

        // مقارنة الـ 10 كلمات (5 أزواج)
        modelAnswers.forEach((correct, index) => {
            const isCorrect = this.isNearlyCorrect(studentAnswers[index], correct);
            if (isCorrect) {
                correctCount++;
            }
            detailedResults.push(isCorrect);
        });

        /**
         * 3. معادلة مستر عز للدرجات (من 1 لـ 5)
         * المعادلة: (عدد الصح * 0.4) + 1
         * 10 صح -> (10 * 0.4) + 1 = 5
         * 0 صح  -> (0 * 0.4) + 1 = 1
         */
        let finalScore = (correctCount * 0.4) + 1;
        
        // التأكد أن الدرجة لا تقل عن 1 ولا تزيد عن 5
        finalScore = Math.min(5, Math.max(1, parseFloat(finalScore.toFixed(1))));

        return {
            score: finalScore,
            correctCount: correctCount,
            details: detailedResults, // مصفوفة فيها true/false لكل كلمة
            status: finalScore >= 3.5 ? "Excellent" : "Needs Review"
        };
    }
};

// جعل المحرك متاحاً عالمياً للاستدعاء
window.AlikeCorrectionEngine = AlikeCorrectionEngine;
