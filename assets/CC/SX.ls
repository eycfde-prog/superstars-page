/**
 * SSX.js - محرك تصحيح SeedsX
 * تصميم: جي (Ge) لمستر عز
 */

function gradeMission(data) {
    const studentStory = data.answers[0] || ""; // القصة كاملة
    const taskNum = data.missionNum;
    
    const seedsXData = {
        "1": ["The stars were closer than ever.", "Oxygen levels were dropping fast.", "The alien planet looked like crystal.", "We landed the ship on a giant crater.", "Communication with Earth was lost.", "Someone was frying onions in the cockpit."],
        "2": ["The pyramid hid a secret chamber.", "Ancient symbols covered every wall.", "The pharaoh's crown began to glow.", "A trap door opened under my feet.", "We discovered a map made of gold.", "My smartphone started an automatic software update."],
        "3": ["The rainforest was dark and loud.", "A rare jaguar watched from the trees.", "The river was rising after the storm.", "We followed the path to the hidden cave.", "Nature has its own mysterious language.", "A clown on a unicycle appeared in the bushes."],
        "4": ["The submarine reached the ocean floor.", "Bioluminescent fish lit up the dark.", "Pressure was increasing on the glass.", "We found a shipwreck from 1912.", "Giant squids moved silently nearby.", "The captain insisted on wearing a silk tuxedo."],
        "5": ["Robots were running the entire city.", "Flying cars filled the neon sky.", "AI controlled every human decision.", "Computers were faster than human brains.", "Reality was just a digital simulation.", "A lonely cow was grazing on the motherboard."],
        "6": ["The sun was burning the endless sand.", "Water was more valuable than gold.", "The caravan moved slowly through heat.", "Wind carved shapes into the dunes.", "We found an ancient dry well.", "I decided to build a massive snowman."],
        "7": ["The emergency room was very busy.", "Doctors worked through the long night.", "The patient made a full recovery.", "Medicine saved many lives today.", "The lab results were finally ready.", "A talking dragon was waiting in the pharmacy."],
        "8": ["The detective found a silver hair.", "The suspect vanished into the night.", "Police sirens echoed in the street.", "Every clue led to the same house.", "The truth was hidden in the files.", "He scored a goal from the halfway line."],
        "9": ["The teacher opened the old textbook.", "Students were focused on the exam.", "The library was silent and peaceful.", "Knowledge is the key to the future.", "The bell rang for the final break.", "The principal started eating popcorn in 3D glasses."],
        "10": ["The bride looked stunning in white.", "Music filled the decorated hall.", "Family members gathered from afar.", "The cake was five layers high.", "They promised to stay together forever.", "The soldiers began the midnight invasion."]
    };

    const targetSentences = seedsXData[taskNum] || [];
    let score = 0;

    // --- 1. فحص الجمل الستة (3 درجات) ---
    let foundSentencesCount = 0;
    targetSentences.forEach(sentence => {
        // تنظيف الجملة من النقطة والمسافات للبحث بمرونة
        const cleanSentence = sentence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
        const regex = new RegExp(cleanSentence.slice(0, -1), "i"); // البحث عن الجملة بدون النقطة الأخيرة لضمان المطابقة
        if (regex.test(studentStory)) {
            foundSentencesCount++;
        }
    });

    if (foundSentencesCount === 6) {
        score += 3;
    } else if (foundSentencesCount === 5) {
        score += 1;
    }

    // --- 2. فحص عدد الكلمات (2 درجة) ---
    const wordCount = studentStory.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount >= 150 && wordCount <= 220) {
        score += 2;
    } else if (wordCount > 0 && wordCount < 150) {
        score += 1;
    }

    // --- 3. فحص جودة اللغة (خصم درجة لو الأخطاء > 50%) ---
    // فحص تقريبي: لو النص يحتوي على كلمات قصيرة جداً أو تكرار مريب أو فقدان للبنكيتويشن
    const errorRatio = calculateSimpleErrorRatio(studentStory);
    if (errorRatio > 0.5) {
        score -= 1;
    }

    // ضمان المبادئ: الحد الأدنى 1 والحد الأقصى 5
    let finalScore = Math.max(1, Math.min(5, score));
    return Math.round(finalScore);
}

function calculateSimpleErrorRatio(text) {
    if (!text) return 0;
    const words = text.split(/\s+/);
    // فحص الكلمات التي لا تحتوي على حروف (رموز فقط) أو تكرار كلمات 3 مرات وراء بعض
    let suspectedErrors = 0;
    for(let i=0; i < words.length; i++) {
        if (words[i] === words[i+1] && words[i] === words[i+2]) suspectedErrors++;
        if (!/[a-zA-Z]/.test(words[i])) suspectedErrors++;
    }
    return suspectedErrors / words.length;
}
