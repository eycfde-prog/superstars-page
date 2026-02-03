/**
 * GES.js - نظام تصحيح أنشطة Golden Ear
 * يقوم بمعالجة 10 مهمات، كل مهمة تحتوي على 5 أسئلة.
 */

const GES_ANSWER_KEYS = {
    "GE1": [
        "The ability to analyze information objectively and make a reasoned judgment.",
        "Logical fallacies.",
        "Curiosity and a willingness to question assumptions.",
        "In everyday decision-making and academic settings.",
        "Critical thinking."
    ],
    "GE2": [
        "It hosts vast amounts of misinformation.",
        "Responsible, respectful, and safe online.",
        "Learning to evaluate online sources for credibility.",
        "Personal data.",
        "Harnessing its power while minimizing its potential for harm."
    ],
    "GE3": [
        "Repair and consolidation for the body and brain.",
        "Concentration, mood, and judgment.",
        "Turns short-term memories into long-term ones.",
        "Treating sleep as a non-negotiable part of our health routine.",
        "Muscle tissue."
    ],
    "GE4": [
        "Innovation focuses on improving or effectively utilizing existing ideas.",
        "Innovation.",
        "A culture that accepts risk and views failure as a learning opportunity.",
        "They are quickly surpassed by competitors.",
        "Potential."
    ],
    "GE5": [
        "Influence.",
        "Practice, preparation, and shifting focus to the message.",
        "A good speaker connects emotionally with the audience.",
        "The ability to articulate ideas clearly and persuasively.",
        "Mastering the skill of public speaking."
    ],
    "GE6": [
        "The emotions of others.",
        "High Emotional Intelligence (EQ).",
        "Strong emotional skills.",
        "Seeing situations from another person's perspective.",
        "Your triggers and tendencies."
    ],
    "GE7": [
        "To divert waste from landfills and conserve natural resources.",
        "Raw material extraction.",
        "Proper sorting of used materials.",
        "Significant pollution and high energy consumption.",
        "A sustainable economy."
    ],
    "GE8": [
        "Specific, Measurable, Achievable, Relevant, and Time-bound.",
        "It prevents feelings of overwhelm and provides continuous psychological wins.",
        "Direction, increased motivation, and focused effort.",
        "Clear action plans.",
        "Personal and professional priorities."
    ],
    "GE9": [
        "Working smarter, not harder.",
        "Using the Eisenhower Matrix.",
        "Non-essential commitments.",
        "Allocating specific time blocks for deep work and avoiding distractions.",
        "Less stress, better work-life balance, and consistent achievement."
    ],
    "GE10": [
        "Protecting life on our planet by absorbing harmful UV radiation.",
        "Ozone-depleting substances.",
        "Harmful ultraviolet (UV) radiation.",
        "The effectiveness of coordinated international environmental policy.",
        "Severe health and environmental damage."
    ]
};

/**
 * دالة التقييم الرئيسية التي يتم استدعاؤها من Terminal
 * @param {string} missionCode - كود المهمة (مثال: GE1)
 * @param {Object} studentAnswers - كائن يحتوي على إجابات الطالب {0: "answer1", 1: "answer2", ...}
 */
window.evaluateGESMission = function(missionCode, studentAnswers) {
    const correctAnswers = GES_ANSWER_KEYS[missionCode];
    
    if (!correctAnswers) {
        console.error("Mission code not found in GES.js");
        return { points: 1, isCorrect: false, answerText: "Error: Mission code not found" };
    }

    let score = 0;
    let reportText = "";

    // مقارنة الإجابات
    for (let i = 0; i < 5; i++) {
        const studentAns = studentAnswers[i] || "No Answer";
        const isCorrect = studentAns.trim() === correctAnswers[i].trim();
        
        if (isCorrect) {
            score++;
        }
        reportText += `Q${i+1}: ${isCorrect ? '✓' : '✗'} | `;
    }

    // تطبيق قاعدة: أقل درجة هي 1
    const finalPoints = Math.max(1, score);

    return {
        status: "COMPLETED",
        points: finalPoints,
        isCorrect: score === 5,
        answerText: reportText + ` Final Score: ${score}/5`
    };
};
