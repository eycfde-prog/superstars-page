/**

 * AS.js - محرك تصحيح نشاط Alike

 * موقع الملف: assets/CC/AL.js

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



// --- قاعدة بيانات الإجابات النموذجية ---

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

 * 2. الدالة الأساسية (The Hook)

 */

function gradeMission(data) {

    // الأرينا بتبعت missionNum، تأكد من مطابقتها

    const studentAnswers = data.answers; 

    const taskKey = data.missionNum || "1"; 

    

    const modelAnswers = AL_MODEL_ANSWERS[taskKey];

    let correctCount = 0;



    if (modelAnswers && studentAnswers) {

        modelAnswers.forEach((correct, index) => {

            // نتحقق من وجود إجابة للطالب في هذا المركز لتجنب الـ Errors

            if (studentAnswers[index] && isNearlyCorrect(studentAnswers[index], correct)) {

                correctCount++;

            }

        });

    }



 /**

     * 3. معادلة مستر عز المعدلة (Integer Score Logic)

     * (عدد الصح * 0.4) + 1 مع التقريب لأقرب رقم صحيح

     */

    let rawScore = (correctCount * 0.4) + 1;

    

    // التقريب لأقرب عدد صحيح (3.5 -> 4 | 3.4 -> 3)

    let finalScore = Math.round(rawScore);

    

    // ضمان أن الحد الأدنى 1 والحد الأقصى 5

    finalScore = Math.min(5, Math.max(1, finalScore));



    return finalScore;
