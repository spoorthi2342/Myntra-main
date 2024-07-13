<body>
    <div class="chat-container">
        <div class="chat-box" id="chat-box" data-user-logo="{{ url_for('static', filename='user.png') }}" data-maya-logo="{{ url_for('static', filename='myn.jpg') }}"></div>
        <input type="text" id="user-input" placeholder="Type your command...">
        <button onclick="sendCommand()">Send</button>
    </div>
    <script>
        let userName = '';

        window.onload = function() {
            fetch('/greet')
                .then(response => response.json())
                .then(data => {
                    addToChat("Maya", data.message);
                });
        };

        function sendCommand() {
            var userInput = document.getElementById("user-input").value;
            addToChat("User", userInput);

            if (!userName) {
                userName = userInput;
                addToChat("Maya", `Nice to meet you, ${userName}! How can I assist you with your fashion choices today?`);
            } else {
                fetch('/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: userInput })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.response) {
                        addToChat("Maya", data.response);
                    } else {
                        addToChat("Maya", "I'm not sure about that combination. Could you ask about a different color or style?");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            document.getElementById("user-input").value = "";
        }

        function addToChat(sender, message) {
            var chatBox = document.getElementById("chat-box");
            var chatMessage = document.createElement("div");
            var logoPath = sender === "User" ? chatBox.getAttribute("data-user-logo") : chatBox.getAttribute("data-maya-logo");
            chatMessage.classList.add('chat-message');
            chatMessage.innerHTML = `<img src="${logoPath}" alt="${sender} logo" class="logo"> <strong>${sender}:</strong> ${message}`;
            chatBox.appendChild(chatMessage);
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom of chat box
        }
    </script>
</body>
