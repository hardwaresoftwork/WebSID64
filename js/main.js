$(document).ready(function() {

	// HTML5 WebAudio Object, Oscillator 
    var context = new webkitAudioContext(),
        oscillator = context.createOscillator(),
		gainNode = context.createGainNode();
		
	// in this case its used as output volume, main out
	gainNode.gain.value = 0.0;
		
	// here you connect the oscillator to the "main out"
	oscillator.connect(gainNode);

	// function to handle the  Oscillator frequency	
    var updateFreq = function(freq){
        oscillator.type = parseInt($('#comboWaveType').val(),10) ;
        oscillator.frequency.value = freq;
		gainNode.connect(context.destination);
        oscillator.noteOn && oscillator.noteOn(0); // needed?
        $("#freqDisplay").val(freq + "Hz");
		};
		
	var count=0;	

	// Creates the knobs	
    $(".freqKnob").knob();
	$(".volKnob").knob();
	 
	$(".freqKnob").trigger('configure', {'change':function(v) { updateFreq(v) } });
	$(".volKnob").trigger('configure', {'change':function(v) { gainNode.gain.value = (v)/100; } });
        
    $("#freqSlider").bind("change",function() {
        $("#freqDisplay").val( $("#freqSlider").val() + "Hz");
        updateFreq($("#freqSlider").val());
    });
	
	$("#freqVolume").bind("change",function() {
        gainNode.gain.value = this.value;
    });
    
	//	Play function (not needed anymore)
    $("#btnPlay").click(function() {
		oscillator.connect(gainNode);
        updateFreq($("#freqSlider").val());
    });

	// kill sound, remove oscillator from "main out"
    $("#btnPause").click(function() {
		oscillator.disconnect(gainNode);
    });

	// Wave type change function
    $("#comboWaveType").change(function() {
        updateFreq($("#freqSlider").val());
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

//Function when a shake was detected
	function shakeEventDidOccur () {
		oscillator.disconnect(gainNode);
		$('#maincontent').empty();
		$('#maincontent').append('<span class="c64pma px16"><br/><br/>GDG Berlin<br/>DevFest 2013<br/><br/>bnz<br/><br/>bit.ly/1aUJgxU</span>');
		}	
});





