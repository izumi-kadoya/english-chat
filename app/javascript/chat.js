document.addEventListener('DOMContentLoaded', function() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  document.getElementById('start-recording').addEventListener('click', function() {
      recognition.onresult = function(event) {
          const talkedText = event.results[0][0].transcript;
          document.getElementById('talked-content').innerText = talkedText;

      };

      recognition.start();
  });
});
