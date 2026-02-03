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
    
    // 1. جلب كل مدخلات الطالب من الـ iframe
    const allInputs = Array.from(doc.querySelectorAll('input, textarea, select'));
    
    // 2. منطق الربط الديناميكي: دمج كود النشاط مع رقم المهمة (مثل GES + 1 = GES1)
    const urlParams = new URLSearchParams(window.location.search);
    const act = urlParams.get('act') || 'GES'; 
    const m = urlParams.get('m') || '1';      
    const currentMKey = act + m;              
    
    const modelAnswers = GOLDEN_EAR_ANSWERS[currentMKey];
    
    // حالة طارئة إذا لم يتم العثور على نموذج الإجابة
    if (!modelAnswers) {
        console.error("Model answers not found for key:", currentMKey);
        return { isCorrect: false, points: 1, answerText: "Error: Key " + currentMKey };
    }

    let correctCount = 0;

    // 3. مقارنة إجابات الطالب بنموذج الإجابة (ترتيب الأسئلة مهم)
    allInputs.forEach((input, index) => {
        if (index < modelAnswers.length) {
            if (isExactMatch(input.value, modelAnswers[index])) {
                correctCount++;
            }
        }
    });

    // 4. حساب الدرجات (الدرجة النهائية 5، والحد الأدنى 1)
    let rawPoints = correctCount; 
    let finalPoints = Math.max(1, rawPoints);

    console.log(`[GES Correction] Mission: ${currentMKey} | Score: ${correctCount}/5 | Final Points: ${finalPoints}`);

    return {
        isCorrect: correctCount > 0, 
        points: finalPoints, 
        answerText: allInputs.map(i => i.value).join(" | ")
    };
}
