/**
 * Golden Ear Activity Correction Logic (GES.js)
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

// دالة التحقق من حالة المهمة (نفس الكود القديم لضمان الربط)
async function checkMissionStatus(email, act, m, scriptUrl) {
    try {
        const response = await fetch(`${scriptUrl}?email=${email}&activity=${act}&mission=${m}`);
        const data = await response.json();
        return data.isDone; 
    } catch (e) { return false; }
}

// دالة لمقارنة النصوص بدقة (مع تجاهل المسافات وحالة الأحرف)
function isExactMatch(studentInput, correctSystemAnswer) {
    if (!studentInput || !correctSystemAnswer) return false;
    return studentInput.trim().toLowerCase() === correctSystemAnswer.trim().toLowerCase();
}

/**
 * تقييم النشاط
 */
async function evaluateMission(iframe) {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    
    // جلب كل المدخلات (توقع 5 إجابات)
    const allInputs = Array.from(doc.querySelectorAll('input, textarea, select'));
    
    // استخراج رقم المهمة من الرابط (مثلاً GES5)
    const currentMKey = new URLSearchParams(window.location.search).get('m') || 'GES1';
    const modelAnswers = GOLDEN_EAR_ANSWERS[currentMKey];
    
    if (!modelAnswers) {
        return { isCorrect: false, points: 1, answerText: "No Model Answers Found" };
    }

    let correctCount = 0;

    // التصحيح بناءً على مطابقة كل Input مع ترتيبه في نموذج الإجابة
    allInputs.forEach((input, index) => {
        if (index < modelAnswers.length) {
            if (isExactMatch(input.value, modelAnswers[index])) {
                correctCount++;
            }
        }
    });

    // --- منطق حساب الدرجات ---
    
    // 1. كل سؤال صحيح بدرجة (الإجمالي 5)
    let rawPoints = correctCount; 

    // 2. تطبيق قاعدة "الحد الأدنى 1" حتى لو الطالب مجاوبش صح
    let finalPoints = Math.max(1, rawPoints);

    console.log(`نشاط Golden Ear - المهمة: ${currentMKey}`);
    console.log("الإجابات الصحيحة:", correctCount);
    console.log("الدرجة النهائية المرسلة:", finalPoints);

    return {
        isCorrect: correctCount > 0, 
        points: finalPoints, 
        answerText: allInputs.map(i => i.value).join(" | ") // تجميع إجابات الطالب للتدقيق
    };
}
