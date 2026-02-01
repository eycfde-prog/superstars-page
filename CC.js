/**
 * CC.js - Universal Grading Controller
 * مهمة هذا الملف هو الربط بين الصفحة وبين ملفات التصحيح الخاصة بكل نشاط
 */

async function evaluateMission(code, mNum, level, studentAnswer) {
    console.log(`Evaluating ${code} - Mission ${mNum} - Level ${level}`);

    // 1. التحقق من وجود دالة التصحيح الخاصة بالنشاط (التي تم تحميلها من ملف النشاط مثل AS.js)
    // لاحظ أننا في ملف AS.js سمينا الدالة evaluateMission أيضاً، لذا سنعتمد على الترتيب
    
    if (typeof window.evaluateMission === "function") {
        try {
            // استدعاء دالة التصحيح الموجودة في ملف النشاط (مثلاً AS.js)
            return window.evaluateMission(mNum, level, studentAnswer);
        } catch (error) {
            console.error("Grading Error:", error);
            return { correct: false, points: 0, status: "Error in Logic" };
        }
    } else {
        // إذا لم يتم تحميل ملف النشاط أو لم تكن الدالة موجودة
        console.warn(`No specific grader found for ${code}. Using default fallback.`);
        
        // منطق احتياطي (Fallback) في حال عدم وجود ملف تصحيح خاص
        return {
            correct: true, 
            points: 5, 
            status: "Auto-Accepted (No Grader)"
        };
    }
}
