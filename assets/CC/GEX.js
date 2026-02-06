/**
 * GEX.js - محرك تصحيح Golden Ear X
 * يعتمد على مطابقة الأفكار الأساسية (Core Ideas) لكل مهمة
 */

function gradeMission(data) {
    const studentSentences = data.answers; // المصفوفة [s1, s2, s3]
    const taskNum = data.missionNum;

    // قاموس الكلمات المفتاحية لكل قصة (التي تدل على الفهم)
    const storyKeys = {
        "1": ["map", "attic", "waterfall", "cave", "crystals", "letters", "treasure", "history"],
        "2": ["robot", "beach", "eco", "trash", "nature", "clean", "environment", "plastic"],
        "3": ["baking", "deaf", "smell", "competition", "cake", "victory", "won", "bakery"],
        "4": ["mars", "astronaut", "storm", "space", "dust", "landed", "pilot", "red planet"],
        "5": ["amazon", "rainforest", "city", "white stone", "gold bird", "statue", "marble"],
        "6": ["clock", "watch", "backward", "past", "market", "spinning", "time travel"],
        "7": ["submarine", "ocean", "ship", "coral", "jar", "seeds", "extinct", "biologist"],
        "8": ["aero", "robot", "study", "solar storm", "books", "grandfather", "brain"],
        "9": ["animals", "understand", "forest", "fire", "birds", "village", "secret"],
        "10": ["mountain", "climb", "wish", "slow", "steps", "path", "hero"]
    };

    const coreKeys = storyKeys[taskNum] || [];
    let matchCount = 0;
    const combinedStudentText = studentSentences.join(" ").toLowerCase();

    // فحص مدى تواجد الكلمات المفتاحية في إجابة الطالب (تغاضي عن السبلنج البسيط)
    coreKeys.forEach(key => {
        if (combinedStudentText.includes(key.toLowerCase())) {
            matchCount++;
        }
    });

    /**
     * حساب النسبة المئوية للفهم:
     * نفترض أن وجود 4 كلمات مفتاحية من القصة في 3 جمل يعني فهم كامل (100%)
     */
    let coverage = (matchCount / 4) * 100; 
    if (coverage > 100) coverage = 100;

    // تحويل النسبة لدرجة من 5
    let rawScore = (coverage / 100) * 5;
    
    // تطبيق مبادئ مستر عز:
    // 1. التقريب لأقرب عدد صحيح
    let roundedScore = Math.round(rawScore);
    
    // 2. الحد الأدنى 1 (طالما كتب شيئاً)
    let finalScore = Math.max(1, Math.min(5, roundedScore));

    // إذا كانت الخانات فارغة تماماً، نعطيه 0 أو 1 حسب رغبتك (هنا سنعطي 1 لو كتب أي كلمة)
    if (combinedStudentText.trim().length < 5) return 0; 

    return finalScore;
}
