var scene, camera, renderer;
var clouds = [];
var container;
var HEIGHT = 500;

function changestep(step) {
	// Loads the data for the clicked preview.
	$('.previews img').toggleClass('active');
	var newdir = step.attr("id");

	$('.big-image img').each( function() {
		$(this).attr('src', $(this).attr("src").replace(/step0\d/g, newdir));
		//console.log($(this).attr("src"));
	});
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function changeview(angle) {
	// Loads the viewing angle for the slider.
	var index = pad(angle/10,2);

	$('.big-image img').each( function() {
		$(this).attr('src', $(this).attr("src").replace(/\d\d.gif/g, index + ".gif"));
		//console.log($(this).attr("src"));
	});
}

var main = function() {
	$('.auto-rotate-button').click(function() {
		// Toggle auto rotation
	});
	$('.color-button').click(function() {
		// Toggle color segmentation
		$('#spin-b').toggleClass('hidden');
		$('#spin-color').toggleClass('hidden');
		$('.color-button').toggleClass('active');
		$('.wood-button').toggleClass('disabled');
	});
	$('.wood-button').click(function() {
			$('.wood-button').toggleClass('active');
			$('#spin-a').toggleClass('hidden');
			$('#spin-c').toggleClass('hidden');
	});
	$('.interphase-button').click(function() {
			$('.interphase-button').toggleClass('active');
	});
	$('.adhesive-button').click(function() {
			$('.adhesive-button').toggleClass('active');
	});
	$('.previews img').click(function() {
		changestep($(this));
	});
	$( "#slider" ).slider({
		value: 0,
		min: 0,
		max: 359,
		step: 10,
		slide: function( event, ui ) {
			$( "#view-angle" ).val(ui.value );
			changeview(ui.value);
		}
	});
	$( "#view-angle" ).val($( "#slider" ).slider( "value" ) );
	$('img').each( function() {
		$(this).attr('src', $(this).attr("src").replace(/SPECIMEN/g, urlParams["sample"]));
		console.log($(this).attr("src"));
	});
};
