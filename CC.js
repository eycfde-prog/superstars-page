/**
 * CC.js - Universal Grading Controller
 * تم تنقية المهام لاختيار الكلمات الأسهل (10 كلمات لكل مهمة)
 */

const ALIKE_ANSWERS_KEY = {
    "1": ["to", "too", "son", "sun", "here", "hear", "sea", "see", "no", "know"],
    "2": ["two", "too", "for", "four", "i", "eye", "be", "bee", "by", "buy"],
    "3": ["flour", "flower", "peace", "piece", "knight", "night", "sun", "son", "tail", "tale"],
    "4": ["main", "mane", "steel", "steal", "root", "route", "whole", "hole", "son", "sun"],
    "5": ["horse", "hoarse", "one", "won", "stair", "stare", "bare", "bear", "hair", "hare"],
    "6": ["past", "passed", "place", "plaice", "rain", "reign", "key", "quay", "not", "knot"],
    "7": ["allowed", "aloud", "check", "cheque", "mail", "male", "sea", "see", "wait", "weight"],
    "8": ["desert", "dessert", "dual", "duel", "flea", "flee", "gate", "gait", "week", "weak"],
    "9": ["hero", "heroin", "hymn", "him", "idle", "idol", "lead", "led", "hair", "hare"],
    "10": ["brake", "break", "scent", "sent", "band", "banned", "sight", "site", "meat", "meet"]
};

function checkSimilarity(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return true;
    if (Math.abs(s1.length - s2.length) > 1) return false;
    let diffs = 0;
    let shorter = s1.length < s2.length ? s1 : s2;
    let longer = s1.length >= s2.length ? s1 : s2;
    for (let i = 0; i < shorter.length; i++) {
        if (s1[i] !== s2[i]) diffs++;
    }
    return diffs <= 1;
}

async function evaluateMission(iframeHandle) {
    try {
        if (iframeHandle.contentWindow && typeof iframeHandle.contentWindow.checkAnswers === "function") {
            return iframeHandle.contentWindow.checkAnswers();
        }
    } catch (e) { console.error("Grading Error", e); }
    return { points: 1, isCorrect: false };
}

async function checkMissionStatus(email, activity, mission, scriptUrl) {
    try {
        const response = await fetch(`${scriptUrl}?email=${email}&activity=${activity}`);
        const data = await response.json();
        return data.completed.includes(mission.toString());
    } catch (e) { return false; }
}
