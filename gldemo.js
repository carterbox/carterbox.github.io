var scene, camera, renderer;
var geometry, material, mesh;

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	geometry = new THREE.BoxGeometry( 200, 200, 200 );
	material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	//renderer.setSize( canvas.width, canvas.height );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xb4b4b4, 1);

	var canvas = document.getElementById("glcanvas");
	canvas.appendChild(renderer.domElement);
}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}

function startgl() {
	init();
	animate();
}
