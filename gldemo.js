var scene, camera, renderer;
var geometry, material, cloud;
var rotateflag = false;

function init() {
	HEIGHT = 480;//window.innerWidth;
	WIDTH = 640;//window.innerWidth;

	// Set up Light, Camera, and Scene
	scene = new THREE.Scene();

	var light = new THREE.AmbientLight( 0xffffff ); // soft white light
	scene.add( light );

	camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 1, 10000 );
	camera.position.z = 4;

	// Load objects
	var loader = new THREE.cOBJLoader();
	geometry = loader.parse('http://people.oregonstate.edu/~chingd/obj/bunny.obj');
	material = new THREE.PointCloudMaterial( {color: 0x9933ff, size:0.001});
	cloud = new THREE.PointCloud(geometry, material);
	scene.add(cloud);

	// Render
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setClearColor( 0x000000, 1);

	var canvas = document.getElementById("glcanvas");
	canvas.appendChild(renderer.domElement);
};

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	if (rotateflag) {
		cloud.rotation.x += 0.01;
	}


};

function startgl() {
	init();
	animate();
};

var main = function() {
	$(document).keypress(function(event)	{
		if(event.which === 114) {
			// r toggle cloud rotation.
			rotateflag = rotateflag === false;
		}
		else if(event.which === 104) {
			// h hides the cloud.
			cloud.visible = cloud.visible === false;
		}
	});

};
