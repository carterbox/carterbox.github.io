var scene, camera, renderer;
var clouds = [];
var container;
var HEIGHT = 500;

function enableButtons() {
	var numclouds = clouds.length;
	if (numclouds > 0) {
		$('.btn').removeClass('disabled');
	}
	else {
		$('.btn').addClass('disabled');
	}
 }

function init() {
	container = document.getElementById('glcanvas');
	WIDTH = container.clientWidth; // Width is dynamic and depends on styling.

	// Set up Light, Camera, and Scene
	scene = new THREE.Scene();

	var light = new THREE.AmbientLight( 0xffffff ); // soft white light
	scene.add( light );

	camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 1, 10000 );
	camera.position.z = 4;

	// Controls view interaction.
	controls = new THREE.OrbitControls( camera );
	controls.damping = 0.2;
	controls.addEventListener( 'change', render );

	// Load object(s)
	var loader = new THREE.cOBJLoader();
	var geometry = loader.parse('http://people.oregonstate.edu/~chingd/obj/bunny.obj');
	var material = new THREE.PointCloudMaterial( {color: 0xffffff, size:0.001});
	clouds[0] = new THREE.PointCloud(geometry, material);
	scene.add(clouds[0]);

	// Render
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setClearColor( 0x000000, 1);

	// Attach the viewport to the page.
	container.appendChild(renderer.domElement);

	window.addEventListener( 'resize', onWindowResize, false );
	enableButtons();
}

function onWindowResize() {
	WIDTH = container.clientWidth;
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
		renderer.setSize( WIDTH, HEIGHT );
		render();
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	render();
}

function render() {
	renderer.render( scene, camera );
	//console.log(HEIGHT);
	//console.log(WIDTH);
}

function startgl() {
	init();
	animate();
}

var main = function() {
	$('.auto-rotate-button').click(function() {
		// Toggle auto rotation
			$('.auto-rotate-button').removeClass('active');
			controls.autoRotate = controls.autoRotate === false;
			if(controls.autoRotate) {
					$('.auto-rotate-button').addClass('active');
			}
	});
	$('.color-button').click(function() {
		// Toggle color segmentation
		clouds[0].material.color.setRGB(1,0,0);
	});
	$('.wood-button').click(function() {
			$('.wood-button').removeClass('active');
			clouds[0].visible = clouds[0].visible === false;
			if(clouds[0].visible) {
					$('.wood-button').addClass('active');
			}
	});
	$('.interphase-button').click(function() {
			$('.interphase-button').removeClass('active');
			clouds[1].visible = clouds[1].visible === false;
			if(clouds[1].visible) {
					$('.interphase-button').addClass('active');
			}
	});
	$('.adhesive-button').click(function() {
			$('.adhesive-button').removeClass('active');
			clouds[2].visible = clouds[2].visible === false;
			if(clouds[2].visible) {
					$('.adhesive-button').addClass('active');
			}
	});
	$(document).keypress(function(event)	{
		if(event.which === 114) {
			// r toggle camera rotation.
			$('.auto-rotate-button').removeClass('active');
			controls.autoRotate = controls.autoRotate === false;
			if(controls.autoRotate) {
					$('.auto-rotate-button').addClass('active');
			}
		}
		else if(event.which === 104) {
			// h hides the cloud.
			$('.wood-button').removeClass('active');
			clouds[0].visible = clouds[0].visible === false;
			if(clouds[0].visible) {
					$('.wood-button').addClass('active');
			}
		}
	});
};
