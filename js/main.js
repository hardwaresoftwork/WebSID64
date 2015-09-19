$(document).ready(function() {

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  var oscillator = context.createOscillator();
	var gainNode = context.createGain();

  gainNode.gain.value = 0;
  oscillator.start();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

	var updateFreq = function(freq){
        oscillator.frequency.value = freq;
  //      console.log(freq);
	};

  $(".freqKnob").knob();
	$(".volKnob").knob();

	$(".freqKnob").trigger('configure', {'change':function(v) { updateFreq(v) } });
	$(".volKnob").trigger('configure', {'change':function(v) { gainNode.gain.value = (v)/100; } });

  $("#btnPause").click(function() {
		oscillator.disconnect(gainNode);
  });

	$("#comboWaveType").change(function() {
        oscillator.type = $('#comboWaveType').val();
  //      console.log($('#comboWaveType').val());
  });


init();

	function init(){
		if(window.DeviceOrientationEvent){
			window.addEventListener('deviceorientation',function(eventData){
				var tiltLR=eventData.gamma;var tiltFB=eventData.beta;var dir=eventData.alpha;
				deviceOrientationHandler(tiltLR,tiltFB,dir);

				$('.volKnob').val(tiltLR).trigger('change');
				gainNode.gain.value = (Math.abs(tiltLR))/100;

				$('.freqKnob').val(Math.abs(tiltFB) * 100).trigger('change');
				updateFreq(Math.abs(tiltFB) * 100);
				},false);
		}
		else{
			$('#maincontent').empty();
			$('#maincontent').append('Not supported on your device or browser. Sorry.');}
		}

	function deviceOrientationHandler(tiltLR,tiltFB,dir){
		//$("#freqSlider").val(Math.round(tiltLR));
		}

window.addEventListener('shake', shakeEventDidOccur, false);

  function shakeEventDidOccur () {
		oscillator.disconnect(gainNode);
		$('#maincontent').empty();
		$('#maincontent').append('<span class="c64pma px16"><br/><br/>GDG Berlin<br/>DevFest 2013<br/><br/>bnz<br/><br/>bit.ly/1aUJgxU</span>');
		}
});

/**
* Google Analytics
* bnz-power.com
*/

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-59815538-1', 'auto');
ga('send', 'pageview');
