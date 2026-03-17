(function() {
    const container = document.getElementById('stage-content');
    if (!container) return;

    const storyTitle = "The City of Silence";
    
    const storyContent = `
        In a future where technology controlled every <span class="target-word">breath</span>, there was a place called the City of Silence. 
        Here, people didn't speak with their voices; they used <span class="target-word">electronic</span> chips to send thoughts directly to each other's brains. 
        This <span class="target-word">innovation</span> was supposed to make life easier, but it made the world feel <span class="target-word">isolated</span> and cold.
        <br><br>
        Elias was a young <span class="target-word">engineer</span> who felt a strange <span class="target-word">longing</span> for the past. 
        He spent his weekends exploring the <span class="target-word">abandoned</span> library at the edge of the city. 
        One day, while moving a heavy <span class="target-word">bookshelf</span>, he discovered an old, <span class="target-word">mechanical</span> object. 
        It was a gramophone—a machine that played music from large black <span class="target-word">discs</span>.
        <br><br>
        Elias was <span class="target-word">intrigued</span>. He managed to repair the device, and when the needle touched the surface, a <span class="target-word">vibrant</span> melody filled the room. 
        It was the first time he had ever heard a sound that didn't come from a computer. 
        The music was <span class="target-word">overwhelming</span>, full of passion and <span class="target-word">emotion</span>.
        <br><br>
        He decided to share this <span class="target-word">discovery</span> with his fellow citizens. He carried the machine to the central <span class="target-word">plaza</span> and turned it on. 
        At first, the people looked confused and even <span class="target-word">threatened</span> by the noise. 
        They were so <span class="target-word">accustomed</span> to silence that the music felt like an <span class="target-word">invasion</span>.
        <br><br>
        However, as the rhythm continued, something <span class="target-word">miraculous</span> happened. People stopped looking at their screens. 
        They began to tap their feet and smile at each other. For the first time in <span class="target-word">decades</span>, a girl opened her mouth and began to <span class="target-word">hum</span> along with the tune.
        <br><br>
        The <span class="target-word">authorities</span> tried to stop Elias, but it was too late. The "virus" of music had already spread. 
        The city wasn't silent anymore; it was <span class="target-word">echoing</span> with laughter and song. 
        Elias realized that while technology can give us <span class="target-word">efficiency</span>, only art can give us a <span class="target-word">soul</span>.
    `;

    container.innerHTML = ''; 
    container.style.cssText = `height:100%; display:block; background:#0a0a0c; color:#cfcfcf; overflow-y:auto; padding:60px 20px; font-family: 'Inter', 'Georgia', serif; scroll-behavior: smooth;`;

    container.innerHTML = `
        <style>
            @keyframes wordGlow {
                0%, 100% { text-shadow: 0 0 5px rgba(241, 196, 15, 0.3); color: #f1c40f; }
                50% { text-shadow: 0 0 20px rgba(241, 196, 15, 0.8); color: #fff; }
            }
            .story-card {
                max-width: 900px;
                margin: 0 auto;
                background: rgba(20, 20, 25, 0.8);
                padding: 60px;
                border-radius: 40px;
                box-shadow: 0 40px 100px rgba(0,0,0,0.6);
                border: 1px solid #1f1f2a;
            }
            .title-section {
                text-align: center;
                margin-bottom: 60px;
            }
            .title-section h1 {
                font-size: 3.5rem;
                color: #9b59b6;
                text-transform: uppercase;
                letter-spacing: 8px;
                margin: 0;
                font-weight: 900;
                text-shadow: 0 0 30px rgba(155, 89, 182, 0.3);
            }
            .subtitle {
                color: #666;
                font-size: 1rem;
                letter-spacing: 4px;
                text-transform: uppercase;
            }
            .target-word {
                color: #f1c40f;
                font-weight: bold;
                border-bottom: 2px solid rgba(241, 196, 15, 0.3);
                cursor: help;
                padding: 0 4px;
                animation: wordGlow 3s infinite ease-in-out;
                display: inline-block;
            }
            .text-content {
                line-height: 2.3;
                font-size: 1.9rem;
                text-align: justify;
                color: #b0b0b0;
            }
            #stage-content::-webkit-scrollbar { width: 10px; }
            #stage-content::-webkit-scrollbar-track { background: #0a0a0c; }
            #stage-content::-webkit-scrollbar-thumb { background: #9b59b6; border-radius: 10px; }
        </style>
        
        <div class="story-card">
            <div class="title-section">
                <span class="subtitle">Advanced One-Shot • Session 2</span>
                <h1>${storyTitle}</h1>
            </div>
            <div class="text-content">
                ${storyContent}
            </div>
        </div>
    `;

})();
