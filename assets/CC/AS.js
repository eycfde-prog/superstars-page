/**
 * AS.js - محرك تصحيح نشاط Alike
 * متوافق تماماً مع نظام Hybird & HybirdX
 */

// 1. خوارزمية المسافة (Fuzzy Matching) - للسماح بخطأ حرف واحد
function isNearlyCorrect(studentWord, correctWord) {
    if (!studentWord || !correctWord) return false;
    
    const s = studentWord.toLowerCase().trim();
    const c = correctWord.toLowerCase().trim();
    
    if (s === c) return true;
    if (Math.abs(s.length - c.length) > 1) return false;

    let edits = 0;
    let i = 0, j = 0;

    while (i < s.length && j < c.length) {
        if (s[i] !== c[j]) {
            edits++;
            if (edits > 1) return false; 
            if (s.length > c.length) i++; 
            else if (s.length < c.length) j++; 
            else { i++; j++; } 
        } else {
            i++; j++;
        }
    }
    if (i < s.length || j < c.length) edits++;
    return edits <= 1;
}

// --- قاعدة بيانات الإجابات النموذجية (تمت إضافتها بواسطة جي) ---
const AL_MODEL_ANSWERS = {
    "1": ["sun", "son", "sea", "see", "to", "too", "here", "hear", "no", "know"],
    "2": ["week", "weak", "road", "rode", "hour", "our", "buy", "by", "meat", "meet"],
    "3": ["new", "knew", "right", "write", "eight", "ate", "whole", "hole", "pray", "prey"],
    "4": ["piece", "peace", "flower", "flour", "tale", "tail", "hair", "hare", "sun", "son"],
    "5": ["where", "wear", "one", "won", "son", "sun", "blue", "blew", "mail", "male"],
    "6": ["night", "knight", "wood", "would", "allowed", "aloud", "red", "read", "scene", "seen"],
    "7": ["weather", "whether", "bare", "bear", "root", "route", "bare", "bear", "stare", "stair"],
    "8": ["main", "mane", "serial", "cereal", "bored", "board", "vessel", "vasal", "effect", "affect"],
    "9": ["site", "sight", "lone", "loan", "aloud", "allowed", "write", "right", "key", "quay"],
    "10": ["council", "counsel", "complimentary", "complement", "stationary", "stationery", "see", "sea", "metal", "mettle"]
};

/**
 * 2. الدالة الأساسية التي تستدعيها صفحة Hybird
 * @param {Object} data - تحتوي على إجابات الطالب ورقم المهمة
 */
function gradeMission(data) {
    // استخراج إجابات الطالب ورقم المهمة
    const studentAnswers = data.answers; 
    const taskNum = data.taskNum || "1";
    
    // سحب الإجابات النموذجية بناءً على رقم المهمة
    const modelAnswers = AL_MODEL_ANSWERS[taskNum];
    
    let correctCount = 0;

    // مقارنة الإجابات باستخدام خوارزمية المسامحة
    if (modelAnswers) {
        modelAnswers.forEach((correct, index) => {
            if (isNearlyCorrect(studentAnswers[index], correct)) {
                correctCount++;
            }
        });
    }

    /**
     * 3. معادلة مستر عز للدرجات (من 1 لـ 5)
     * (عدد الصح * 0.4) + 1
     */
    let finalScore = (correctCount * 0.4) + 1;
    finalScore = Math.min(5, Math.max(1, parseFloat(finalScore.toFixed(1))));

    // إرجاع الرقم فقط ليتم إرساله للـ Apps Script
    return finalScore;
}
