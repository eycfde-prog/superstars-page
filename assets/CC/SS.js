/**
 * SS.js - محرك تصحيح نشاط Seeds
 * منطق مستر عز: مكافأة المجهود الشخصي + الالتزام بالكلمات والعدد
 */

function gradeMission(data) {
    const studentStory = data.answers[0] || ""; // نص القصة التي كتبها الطالب
    const missionNum = data.missionNum; // رقم المهمة (1-10) لسنحب منها الكلمات النموذجية
    
    // قائمة الكلمات النموذجية لكل مهمة
    const allModelWords = {
        "1": ["Castle", "Knight", "Dragon", "Sword", "Princess", "Smartphone"],
        "2": ["Ocean", "Dolphin", "Submarine", "Coral", "Anchor", "Pizza"],
        "3": ["Forest", "Wildlife", "Camping", "Backpack", "Compass", "Elevator"],
        "4": ["Hospital", "Doctor", "Surgeon", "Medicine", "Nurse", "Skateboard"],
        "5": ["Desert", "Cactus", "Pyramid", "Camel", "Sandstorm", "Ice-Cream"],
        "6": ["Space", "Astronaut", "Galaxy", "Rocket", "Meteor", "Rubber-Duck"],
        "7": ["School", "Teacher", "Exam", "Library", "Notebook", "Spaceship"],
        "8": ["Airport", "Pilot", "Suitcase", "Runway", "Passport", "Dinosaurs"],
        "9": ["Kitchen", "Recipe", "Chef", "Oven", "Ingredients", "Parachute"],
        "10": ["Underground", "Cave", "Bat", "Crystal", "Tunnel", "Sunglasses"]
    };

    const targetWords = allModelWords[missionNum] || [];
    let finalScore = 0;

    // --- 1. حساب درجة عدد الكلمات (2 درجة) ---
    const wordCount = studentStory.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount >= 100 && wordCount <= 180) {
        finalScore += 2;
    }

    // --- 2. حساب درجة المجهود الشخصي/الأخطاء (1 درجة) ---
    // المنطق: إذا كان النص "مثالياً" بدون خطأ واحد، نشك في الذكاء الاصطناعي فلا يأخذ الدرجة.
    // سنبحث عن أخطاء شائعة أو عدم تنسيق بنكيتويشن أو أخطاء إملائية بسيطة.
    if (detectHumanErrors(studentStory)) {
        finalScore += 1;
    }

    // --- 3. حساب درجة استخدام الكلمات الستة (2 درجة) ---
    let usedWordsCount = 0;
    targetWords.forEach(word => {
        // البحث عن الكلمة داخل النص بمرونة (حتى لو أضيف لها حروف مثل s للجمع أو ing)
        const regex = new RegExp(word.toLowerCase().replace('-', ''), "i"); 
        const cleanStory = studentStory.toLowerCase().replace('-', '');
        if (regex.test(cleanStory)) {
            usedWordsCount++;
        }
    });

    if (usedWordsCount === 6) {
        finalScore += 2;
    } else if (usedWordsCount >= 1 && usedWordsCount < 6) {
        finalScore += 1;
    }

    // ضمان الحد الأدنى 1 والحد الأقصى 5
    return Math.max(1, Math.min(5, finalScore));
}

/**
 * دالة ذكية لاكتشاف هل النص مكتوب بشرياً أم منسوخ من AI
 * تعتمد على وجود أي خطأ نحوي بسيط أو إملائي أو فقدان علامة ترقيم
 */
function detectHumanErrors(text) {
    if (!text) return false;
    
    // 1. فحص علامات الترقيم (البنكيتويشن)
    // إذا كان الطالب ينسى مسافة بعد النقطة أو يستخدم حروف صغيرة بعد النقطة
    const punctuationIssue = /[.!?][a-z]/.test(text) || !/[.!?]/.test(text);

    // 2. فحص الأخطاء الإملائية الشائعة (بسيط جداً)
    // AI غالباً لا يخطئ في الكلمات الشائعة، الطالب قد يخطئ
    const commonTypos = /\b(teh|recieve|truely|untill|comming)\b/i.test(text);

    // 3. فحص "مثالية" النص
    // إذا كان النص طويلاً جداً ولا يحتوي على أي خطأ في البنكيتويشن، نعتبره AI (لا يأخذ الدرجة)
    // أما إذا وجدنا "نقص" في المثالية، فهذا دليل بشري ويأخذ الدرجة.
    return punctuationIssue || commonTypos || text.includes("  "); // مسافات مزدوجة مثلاً
}
