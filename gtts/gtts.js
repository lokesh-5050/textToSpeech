const gTTS = require('gtts');
      
var speech = 'Welcome to GeeksforGeeks';
var gtts = new gTTS(speech, 'en');
  
gtts.save('Voice.mp3', function (err, result){
    if(err) { throw new Error(err); }
    console.log("Text to speech converted!");
});

module.exports = gTTS