var scene, camera, renderer;
var clouds = [];
var container;

function init() {
	HEIGHT = 480;//window.innerWidth;
	WIDTH = 640;//window.innerWidth;

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
	var material = new THREE.PointCloudMaterial( {color: 0x9933ff, size:0.001});
	clouds[0] = new THREE.PointCloud(geometry, material);
	scene.add(clouds[0]);

	// Render
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setClearColor( 0x000000, 1);

	// Attach the viewport to the page.
	container = document.getElementById("glcanvas");
	container.appendChild(renderer.domElement);

	window.addEventListener( 'resize', onWindowResize, false );
};

function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		render();
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	render();
}

function render() {
	renderer.render( scene, camera );
}

function startgl() {
	init();
	animate();
}

var main = function() {
	$(document).keypress(function(event)	{
		if(event.which === 114) {
			// r toggle camera rotation.
			controls.autoRotate = controls.autoRotate === false;
		}
		else if(event.which === 104) {
			// h hides the cloud.
			clouds[0].visible = clouds[0].visible === false;
		}
	});
};
