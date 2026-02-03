/**
 * Alike Activity Correction Logic (Debugged Version)
 */

const ALIKE_ANSWERS_KEY = {
    "1": ["to", "too", "son", "sun", "here", "hear", "sea", "see", "no", "know"],
    "2": ["two", "too", "son", "sun", "i", "eye", "be", "bee", "by", "buy"],
    "3": ["flour", "flower", "peace", "piece", "knight", "night", "sun", "son", "tail", "tale"],
    "4": ["main", "mane", "steel", "steal", "root", "route", "whole", "hole", "son", "sun"],
    "5": ["horse", "hoarse", "one", "won", "stair", "stare", "bare", "bear", "hair", "hare"],
    "6": ["past", "passed", "place", "plaice", "rain", "reign", "key", "quay", "not", "knot"],
    "7": ["allowed", "aloud", "check", "cheque", "mail", "male", "sea", "see", "wait", "weight"],
    "8": ["desert", "dessert", "dual", "duel", "flea", "flee", "gate", "gait", "week", "weak"],
    "9": ["hero", "heroin", "hymn", "him", "idle", "idol", "lead", "led", "hair", "hare"],
    "10": ["brake", "break", "scent", "sent", "band", "banned", "sight", "site", "meat", "meet"]
};

async function checkMissionStatus(email, act, m, scriptUrl) {
    try {
        const response = await fetch(`${scriptUrl}?email=${email}&activity=${act}&mission=${m}`);
        const data = await response.json();
        return data.isDone; 
    } catch (e) { return false; }
}

function checkSimilarity(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return true;
    if (Math.abs(s1.length - s2.length) > 1) return false;
    let longer = s1.length >= s2.length ? s1 : s2;
    let shorter = s1.length < s2.length ? s1 : s2;
    let diffs = 0, sIdx = 0;
    for (let lIdx = 0; lIdx < longer.length; lIdx++) {
        if (longer[lIdx] !== shorter[sIdx]) {
            diffs++;
            if (longer.length === shorter.length) sIdx++;
        } else { sIdx++; }
    }
    return diffs <= 1;
}

async function evaluateMission(iframe) {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    
    // تعديل هائل: سحب جميع النصوص من كل الـ inputs أو textareas الموجودة
    const allInputs = Array.from(doc.querySelectorAll('input, textarea'));
    const studentAnswer = allInputs.map(i => i.value).join(" "); 
    
    const currentMNum = new URLSearchParams(window.location.search).get('m') || '1';
    const answers = ALIKE_ANSWERS_KEY[currentMNum];
    
    if (!answers) return { isCorrect: false, points: 0, answerText: studentAnswer };

    // تنظيف الكلمات بشكل أدق
    const studentWords = studentAnswer.toLowerCase()
                        .replace(/[^a-z\s]/g, ' ') // إزالة أي رموز غير الحروف
                        .split(/\s+/) 
                        .filter(w => w.length > 0);
    
    let correctCount = 0;
    let tempAnswers = [...answers];

    studentWords.forEach(word => {
        const index = tempAnswers.findIndex(target => checkSimilarity(word, target));
        if (index !== -1) {
            correctCount++;
            tempAnswers.splice(index, 1);
        }
    });

    // الحساب: 0.5 لكل كلمة
    let finalPoints = correctCount * 0.5;

    console.log("عدد الكلمات الصحيحة:", correctCount);
    console.log("النقاط النهائية:", finalPoints);

    return {
        isCorrect: correctCount > 0, 
        points: finalPoints, 
        answerText: studentAnswer
    };
}
