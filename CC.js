/**
 * CC.js - Universal Grading Controller
 */
async function evaluateMission(iframeHandle) {
    try {
        // الوصول للدالة الموحدة داخل الـ Iframe
        if (iframeHandle.contentWindow && typeof iframeHandle.contentWindow.checkAnswers === "function") {
            const result = iframeHandle.contentWindow.checkAnswers();
            return result;
        } else {
            console.error("Grader function not found in Iframe");
            return { points: 1, isCorrect: false, answerText: "No Data" };
        }
    } catch (e) {
        console.error("Security/CORS Error: ", e);
        return { points: 1, isCorrect: false, answerText: "Error" };
    }
}

// دالة التحقق من حالة النشاط (تستخدم الـ doGet من الـ Apps Script)
async function checkMissionStatus(email, activity, mission, scriptUrl) {
    try {
        const response = await fetch(`${scriptUrl}?email=${email}&activity=${activity}`);
        const data = await response.json();
        // التحقق إذا كان رقم المهمة موجود في قائمة المكتمل (Completed)
        return data.completed.includes(mission.toString());
    } catch (e) {
        console.error("Status Check Error:", e);
        return false;
    }
}
