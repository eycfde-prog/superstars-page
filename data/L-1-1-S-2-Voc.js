// مقتطف من التعديل الجوهري الذي سأنفذه فور موافقتك:

const AUDIO_BASE_URL = "https://raw.githubusercontent.com/eycfde-prog/EYCVetoProgram/main/data/vocab/v1/";

function playSound(index) {
    if (!isInitialized) return;
    
    if (currentAudio) {
        currentAudio.pause();
    }

    // ربط الكلمة بالملف الصوتي بالترتيب (1.wav للكلمة الأولى، وهكذا)
    const audioPath = `${AUDIO_BASE_URL}${index + 1}.wav`;
    currentAudio = new Audio(audioPath);
    
    // إضافة تأثير بصري عند التشغيل
    const wordElement = document.getElementById('vocabWord');
    if(wordElement) wordElement.style.color = '#c5a059'; // تغيير اللون لحظياً

    currentAudio.play().then(() => {
        setTimeout(() => {
            if(wordElement) wordElement.style.color = '#ffffff';
        }, 500);
    }).catch(e => console.error("Veto Audio Error:", e.message));
}
