document.addEventListener('DOMContentLoaded', function() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  document.getElementById('start-recording').addEventListener('click', function() {
      recognition.onresult = function(event) {
          const talkedText = event.results[0][0].transcript;
          document.getElementById('talked-content').innerText = talkedText;

          // 必要であればAPIにテキストを送信する処理を追加
          // fetch('/your_api_endpoint', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Authorization': 'Bearer api-key'
          //   },
          //   body: JSON.stringify({ text: talkedText })
          // });
      };

      recognition.start();
  });
});
