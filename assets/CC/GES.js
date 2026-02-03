/**
 * Golden Ear Activity Correction Logic (GES.js)
 * المطور: تم دمج منطق الربط الديناميكي مع نماذج الإجابات
 */

const GOLDEN_EAR_ANSWERS = {
    "GES1": [
        "The ability to analyze information objectively and make a reasoned judgment.",
        "Logical fallacies.",
        "Curiosity and a willingness to question assumptions.",
        "In everyday decision-making and academic settings.",
        "Critical thinking."
    ],
    "GES2": [
        "It hosts vast amounts of misinformation.",
        "Responsible, respectful, and safe online.",
        "Learning to evaluate online sources for credibility.",
        "Personal data.",
        "Harnessing its power while minimizing its potential for harm."
    ],
    "GES3": [
        "Repair and consolidation for the body and brain.",
        "Concentration, mood, and judgment.",
        "Turns short-term memories into long-term ones.",
        "Treating sleep as a non-negotiable part of our health routine.",
        "Muscle tissue."
    ],
    "GES4": [
        "Innovation focuses on improving or effectively utilizing existing ideas.",
        "Innovation.",
        "A culture that accepts risk and views failure as a learning opportunity.",
        "They are quickly surpassed by competitors.",
        "Potential."
    ],
    "GES5": [
        "Influence.",
        "Practice, preparation, and shifting focus to the message.",
        "A good speaker connects emotionally with the audience.",
        "The ability to articulate ideas clearly and persuasively.",
        "Mastering the skill of public speaking."
    ],
    "GES6": [
        "The emotions of others.",
        "High Emotional Intelligence (EQ).",
        "Strong emotional skills.",
        "Seeing situations from another person's perspective.",
        "Your triggers and tendencies."
    ],
    "GES7": [
        "To divert waste from landfills and conserve natural resources.",
        "Raw material extraction.",
        "Proper sorting of used materials.",
        "Significant pollution and high energy consumption.",
        "A sustainable economy."
    ],
    "GES8": [
        "Specific, Measurable, Achievable, Relevant, and Time-bound.",
        "It prevents feelings of overwhelm and provides continuous psychological wins.",
        "Direction, increased motivation, and focused effort.",
        "Clear action plans.",
        "Personal and professional priorities."
    ],
    "GES9": [
        "Working smarter, not harder.",
        "Using the Eisenhower Matrix.",
        "Non-essential commitments.",
        "Allocating specific time blocks for deep work and avoiding distractions.",
        "Less stress, better work-life balance, and consistent achievement."
    ],
    "GES10": [
        "Protecting life on our planet by absorbing harmful UV radiation.",
        "Ozone-depleting substances.",
        "Harmful ultraviolet (UV) radiation.",
        "The effectiveness of coordinated international environmental policy.",
        "Severe health and environmental damage."
    ]
};

// دالة التحقق من حالة المهمة (للتوافق مع نظام السيرفر)
async function checkMissionStatus(email, act, m, scriptUrl) {
    try {
        const response = await fetch(`${scriptUrl}?email=${email}&activity=${act}&mission=${m}`);
        const data = await response.json();
        return data.isDone; 
    } catch (e) { return false; }
}

// دالة مقارنة النصوص (تتجاهل الفراغات وحالة الأحرف)
function isExactMatch(studentInput, correctSystemAnswer) {
    if (!studentInput || !correctSystemAnswer) return false;
    return studentInput.trim().toLowerCase() === correctSystemAnswer.trim().toLowerCase();
}

/**
 * دالة التقييم الرئيسية التي تستدعيها الصفحة الأم
 */
async function evaluateMission(iframe) {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    
    // 1. جلب المدخلات
    const allInputs = Array.from(doc.querySelectorAll('input, textarea, select'));
    
    // 2. تصحيح استخراج المفتاح لضمان التطابق مع GOLDEN_EAR_ANSWERS
    const urlParams = new URLSearchParams(window.location.search);
    
    // جلب القيم من الرابط وتحويلها لنصوص نظيفة
    let act = (urlParams.get('act') || 'GES').trim().toUpperCase(); 
    let m = (urlParams.get('m') || '1').trim();
    
    // بناء المفتاح النهائي (مثلاً GES1)
    const currentMKey = act + m; 
    
    console.log("Attempting to find answers for key:", currentMKey);

    const modelAnswers = GOLDEN_EAR_ANSWERS[currentMKey];
    
    // 3. إذا لم يجد المفتاح، سنقوم بمحاولة أخيرة (لو كان الكود GE بدلاً من GES)
    let finalAnswers = modelAnswers;
    if (!finalAnswers) {
        // محاولة البحث بـ GES لو كان اللي مبعوث GE
        const backupKey = currentMKey.startsWith('GE') && !currentMKey.startsWith('GES') 
                          ? currentMKey.replace('GE', 'GES') 
                          : currentMKey;
        finalAnswers = GOLDEN_EAR_ANSWERS[backupKey];
    }

    if (!finalAnswers) {
        return { isCorrect: false, points: 1, answerText: "No Model Answers Found for: " + currentMKey };
    }

    let correctCount = 0;

    // 4. التصحيح
    allInputs.forEach((input, index) => {
        if (index < finalAnswers.length) {
            if (isExactMatch(input.value, finalAnswers[index])) {
                correctCount++;
            }
        }
    });

    // 5. حساب النقاط (تأكد أن correctCount يتم ضربه في 1)
    let finalPoints = Math.max(1, correctCount);

    return {
        isCorrect: correctCount > 0, 
        points: finalPoints, 
        answerText: allInputs.map(i => i.value).join(" | ")
    };
}

