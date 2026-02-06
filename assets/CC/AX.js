/**
 * ALX.js - محرك تصحيح AlikeX (Phonetic Radar)
 * تصميم: جي (Ge) لمستر عز
 */

function gradeMission(data) {
    const studentAnswers = data.answers; // مصفوفة من 5 إجابات
    const taskNum = data.missionNum;

    // قاعدة البيانات المركزية للإجابات الصحيحة
    const correctKeys = {
        "1": ["Complement", "Principles", "Stationary", "Counsel", "Aisle"],
        "2": ["Discreet", "Adverse", "Elicit", "Flair", "Hoard"],
        "3": ["Affect", "Faint", "Cede", "Flail", "Sight"],
        "4": ["Pestle", "Bode", "Canvass", "Taut", "Foreword"],
        "5": ["Waive", "Vellum", "Elude", "Reign", "Palette"],
        "6": ["Waist", "Furl", "Peak", "Swallow", "Ordinance"],
        "7": ["Pair", "Pair", "Paws", "Scent", "Knead"],
        "8": ["Coarse", "Raze", "Steal", "Stroke", "Load"],
        "9": ["Rays", "Pain", "Principal", "Weather", "Note"],
        "10": ["Quay", "Wade", "Mane", "Sight", "Bin"]
    };

    const modelAnswers = correctKeys[taskNum] || [];
    let score = 0;

    // 1. منطق التصحيح (كل إجابة صحيحة بـ 1 درجة)
    modelAnswers.forEach((correct, index) => {
        if (studentAnswers[index] && studentAnswers[index].trim().toLowerCase() === correct.toLowerCase()) {
            score += 1;
        }
    });

    // 2. تطبيق مبدأ مستر عز: الحد الأدنى 1 درجة (طالما شارك الطالب)
    // نتحقق أولاً إذا كان الطالب قد أجاب على سؤال واحد على الأقل
    const hasParticipated = studentAnswers.some(ans => ans !== "");
    
    let finalScore = score;
    if (hasParticipated && finalScore < 1) {
        finalScore = 1;
    }

    // ضمان أن الدرجة لا تتخطى 5
    finalScore = Math.min(5, finalScore);

    return finalScore;
}
