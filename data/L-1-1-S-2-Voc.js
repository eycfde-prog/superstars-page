<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veto Program - Vocabulary Display</title>
    <style>
        :root {
            --bg-color: #0f172a; /* Dark Navy */
            --accent-color: #fde047; /* Bright Yellow for contrast */
            --text-white: #f8fafc;
        }

        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden; /* Full Screen Focus */
            background-color: var(--bg-color);
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #word-container {
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        #word-display {
            font-size: 20rem; /* Massive size for 4-meter rule */
            font-weight: 900;
            color: var(--accent-color);
            text-transform: uppercase;
            letter-spacing: -5px;
            user-select: none;
            text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .instruction-hint {
            position: fixed;
            bottom: 20px;
            color: var(--text-white);
            opacity: 0.5;
            font-size: 1.5rem;
        }
    </style>
</head>
<body>

    <div id="word-container" onclick="playCurrentSound()">
        <h1 id="word-display">READY</h1>
    </div>

    <div class="instruction-hint">
        Use [Arrows] to Navigate | [Enter/Space] to Play Sound
    </div>

    <script>
        // --- Veto Architect Logic ---
        
        const vocabData = ["eat", "drink", "fly"];
        let currentIndex = 0;

        const displayElement = document.getElementById('word-display');
        const audioPath = 'vocab/';

        // Initialize first word
        updateDisplay();

        function updateDisplay() {
            displayElement.textContent = vocabData[currentIndex];
        }

        function playCurrentSound() {
            // Audio file naming logic: Index 0 -> 1.wav, Index 1 -> 2.wav
            const audioFile = `${audioPath}${currentIndex + 1}.wav`;
            const audio = new Audio(audioFile);
            
            // Visual feedback on click
            displayElement.style.transform = "scale(0.95)";
            setTimeout(() => displayElement.style.transform = "scale(1)", 100);

            audio.play().catch(e => console.log("Audio play failed: ", e));
        }

        // Keyboard Navigation Protocol
        document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowRight") {
                if (currentIndex < vocabData.length - 1) {
                    currentIndex++;
                    updateDisplay();
                }
            } else if (event.key === "ArrowLeft") {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateDisplay();
                }
            } else if (event.key === "Enter" || event.key === " ") {
                playCurrentSound();
            }
        });
    </script>
</body>
</html>
