/**
 * AX.js - محرك تصحيح AlikeX
 * تصميم: جي (Ge) لمستر عز
 */

function gradeMission(data) {
    const studentChoices = data.answers; // مصفوفة الاختيارات الـ 5
    const taskNum = data.missionNum;

    // بنك الإجابات الصحيحة لكل مهمة (مستخرج من كود الصفحة)
    const answerKey = {
        "1": ["Complement", "Principles", "Stationary", "Counsel", "Aisle"],
        "2": ["Discreet", "Adverse", "Elicit", "Flair", "Hoard"],
        "3": ["Affect", "Faint", "Cede", "Flail", "Sight"],
        "4": ["Pestle", "Bode", "Canvass", "Taut", "Foreword"],
        "5": ["Waive", "Vellum", "Elude", "Reign", "Palette"],
        "6": ["Waist", "Furl", "Peak", "Swallow", "Ordinance"]
    };

    const correctAnswers = answerKey[taskNum] || [];
    let correctCount = 0;

    // مقارنة الاختيارات (مطابقة دقيقة لأنها MCQs)
    studentChoices.forEach((choice, index) => {
        if (choice && correctAnswers[index] && choice.trim() === correctAnswers[index]) {
            correctCount++;
        }
    });

    /**
     * حساب الدرجة النهائية:
     * - كل جملة صحيحة بـ 1 درجة (المجموع الكلي 5)
     * - الحد الأدنى للدرجة هو 1 (طالما دخل الطالب النشاط)
     */
    let finalScore = correctCount;

    // تطبيق مبدأ الحد الأدنى 1
    if (finalScore < 1) finalScore = 1;

    // ضمان عدم تجاوز الدرجة لـ 5
    finalScore = Math.min(5, finalScore);

    return finalScore;
}
