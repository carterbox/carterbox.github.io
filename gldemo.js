var scene, camera, renderer;
var geometry, material, cloud;

function loadCloudGeometry(objname) {
	var ageometry = new THREE.BoxGeometry( 1, 1, 1 );
	//ageometry.vertices.push(new THREE.Vector3(0, 0, 0),
		//											new THREE.Vector3(0, 1, 0),
			//										new THREE.Vector3(0, 0, 1));
	//var colors = [1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];

	//ageometry.colors = colors;
	return ageometry;
}

function init() {
	HEIGHT = window.innerWidth;
	WIDTH = window.innerWidth;

	// Set up Light, Camera, and Scene
	scene = new THREE.Scene();

	var light = new THREE.AmbientLight( 0xffffff ); // soft white light
	scene.add( light );

	camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 1, 10000 );
	camera.position.z = 4;

	// Load objects

	geometry = loadCloudGeometry('/obj/bunny.obj');
	material = new THREE.PointCloudMaterial();
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

	cloud.rotation.x += 0.01;
	cloud.rotation.y += 0.02;

	renderer.render( scene, camera );

};

function startgl() {
	init();
	animate();
};
