function changestep(step) {
	// Loads the data for the clicked step preview.
	$('.previews .thumbnail').removeClass('active');
	$(step).addClass('active');
	var newdir = step.attr("id");

	$('.big-image img').each( function() {
		$(this).attr('src', $(this).attr("src").replace(/step0\d/g, newdir));
		//console.log($(this).attr("src"));
	});
}

function pad(num, size) {
	// Padds a NUMber to SIZE places with leading zeros.
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function changeview(angle) {
	// Loads the viewing angle from the slider input.
	var index = pad(angle/10,2);

	$('.big-image img').each( function() {
		$(this).attr('src', $(this).attr("src").replace(/\d\d.gif/g, index + ".gif"));
		//console.log($(this).attr("src"));
	});
}

function changedata(step) {
	// Loads speciment data into the table
	var stepid = step.attr("id")
	var stepindex = Number(stepid.charAt(stepid.length-1))-1;

	$(".step").text(stepindex + 1);
	$(".proj").text(SampleData.proj[stepindex]);
	$(".load").text(SampleData.load[stepindex].toFixed(2) + " N");
}

function init() {

	// Replace the specimen name
	$(".sample-name").text(urlParams["sample"]);

	// Load the json file from the directory
	$.getJSON( "http://people.oregonstate.edu/~chingd/" + urlParams["sample"] + "/data.json", function(data, textStatus, jqXHR) {
		if (textStatus === "success") {
			//alert("Success");
			//console.log(data);
			SampleData = data;
			// Replace all the constant text
			$(".species").text(SampleData.species);
			$(".adhesive").text(SampleData.adhesive);
			$(".cell-type").text(SampleData.celltype);
			$(".radial").text(SampleData.radial.toFixed(2) + " mm");
			$(".tangential").text(SampleData.tangential.toFixed(2) + " mm");
			$(".notes").text(SampleData.notes);
			$(".num-steps").text(SampleData.numsteps);

			// Hide extra step thumbs
			for (var i = 6; i > SampleData.numsteps; i--) {
				var thumbid = "#step0" + i;
				$(thumbid).addClass("hidden");
			}

			// Replace step variable data
			changedata($('#step01'));
		} else if (textStatus === "error") {
				//alert("Error: " + jqXHR.status + ": " + jqXHR.statusText);
		}
	});
}

var main = function() {

	// Big Image control buttons
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

	// Slider Functions
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

	// Step previews
	$('.previews .thumbnail').click(function() {
		changestep($(this));
		changedata($(this));
	});

	// Initialize image links and load specimen information.
	$('img').each( function() {
		$(this).attr('src', $(this).attr("src").replace(/SPECIMEN/g, urlParams["sample"]));
		//console.log($(this).attr("src"));
	});

	init();
};
