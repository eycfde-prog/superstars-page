(function() {
    const container = document.getElementById('activityFinalContent');
    if (!container) return;

    // --- إعدادات القصة ---
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
    // -------------------------------------------------------

    container.innerHTML = ''; 
    container.style.cssText = `height:calc(100vh - 200px); display:block; background:#121212; color:#eee; overflow-y:auto; padding:50px; font-family: 'Georgia', serif;`;

    container.innerHTML = `
        <style>
            .target-word {
                color: #f1c40f; 
                font-weight: bold;
                text-decoration: underline;
                background: rgba(241, 196, 15, 0.1);
                padding: 0 5px;
                border-radius: 4px;
            }
            .story-container {
                max-width: 1000px;
                margin: 0 auto;
                line-height: 1.8;
                font-size: 1.8rem;
            }
            .title {
                color: #9b59b6; /* لون بنفسجي يعبر عن الروحيات والموسيقى */
                text-align: center;
                font-size: 3rem;
                margin-bottom: 40px;
                text-transform: uppercase;
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
            }
        </style>
        <div class="story-container">
            <h1 class="title">ONE SHOT: ${storyTitle}</h1>
            <div id="textBody">
                ${storyContent}
            </div>
        </div>
    `;

})();
