document.addEventListener('DOMContentLoaded', function() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  recognition.onresult = function(event) {
      const talkedText = event.results[0][0].transcript;
      document.getElementById('talked-content').innerText = talkedText;
  };

  document.getElementById('start-recording').addEventListener('click', function() {
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function(stream) {
              // Audio processing setup
              let audioContext = new (window.AudioContext || window.webkitAudioContext)();
              let analyser = audioContext.createAnalyser();
              let microphone = audioContext.createMediaStreamSource(stream);
              let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
              
              analyser.smoothingTimeConstant = 0.8;
              analyser.fftSize = 1024;
              
              microphone.connect(analyser);
              analyser.connect(javascriptNode);
              javascriptNode.connect(audioContext.destination);

              javascriptNode.onaudioprocess = function() {
                  let array = new Uint8Array(analyser.frequencyBinCount);
                  analyser.getByteFrequencyData(array);
                  let values = 0;
                  let length = array.length;
                  for (let i = 0; i < length; i++) {
                      values += (array[i]);
                  }

                  let average = values / length;
                  document.querySelector('.volume-level').style.width = average + "%";
              }

              // Start voice recognition
              recognition.start();
          })
          .catch(function(err) {
              console.log('The following error occurred: ' + err);
          });
  });
});
