/**
 * @author mrdoob / http://mrdoob.com/
 */

	parse: function ( text ) {

		console.time( 'OBJLoader' );

// Initialize some variables.
		var object, objects = [];
		var geometry;
		var vertices = [], normals = [];

// Helper Functions
		function parseVertexIndex( value ) {

			var index = parseInt( value );

			return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;

		}

		function parseNormalIndex( value ) {

			var index = parseInt( value );

			return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;

		}

		function addVertex( a, b, c ) {

			geometry.vertices.push(
				vertices[ a ], vertices[ a + 1 ], vertices[ a + 2 ],
				vertices[ b ], vertices[ b + 1 ], vertices[ b + 2 ],
				vertices[ c ], vertices[ c + 1 ], vertices[ c + 2 ]
			);

		}

		function addNormal( a, b, c ) {

			geometry.normals.push(
				normals[ a ], normals[ a + 1 ], normals[ a + 2 ],
				normals[ b ], normals[ b + 1 ], normals[ b + 2 ],
				normals[ c ], normals[ c + 1 ], normals[ c + 2 ]
			);

		}

// Set up some patterns for matching.
		// v float float float
		var vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
		// vn float float float
		var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

// Get all the lines from the file.
		var lines = text.split( '\n' );

// START PARSING --------------------------------------------------------------
		for ( var i = 0; i < lines.length; i ++ ) {

			var line = lines[ i ];
			line = line.trim();

			var result;

			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {
				// Skip lines that are comments or blank.
				continue;
			} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {
				// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
				vertices.push(
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )
				);
			} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {
				// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
				normals.push(
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )
				);
			} else if ( /^o /.test( line ) ) {
				// Make a new object.
				geometry = {
					vertices: [],
					normals: [],
					uvs: []
				};

				material = {
					name: ''
				};

				object = {
					name: line.substring( 2 ).trim(),
					geometry: geometry,
					material: material
				};

				objects.push( object )
			} else if ( /^g /.test( line ) ) {
				// group
			} else if ( /^usemtl /.test( line ) ) {
				// material
				material.name = line.substring( 7 ).trim();
			} else if ( /^mtllib /.test( line ) ) {
				// mtl file
			} else if ( /^s /.test( line ) ) {
				// smooth shading
			} else {
				console.log( "THREE.OBJLoader: Unhandled line " + line );
			}
		}
// END PARSING ----------------------------------------------------------------

		var container = new THREE.Object3D();

		for ( var i = 0, l = objects.length; i < l; i ++ ) {

			object = objects[ i ];
			geometry = object.geometry;

			var buffergeometry = new THREE.BufferGeometry();

			buffergeometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry.vertices ), 3 ) );

			if ( geometry.normals.length > 0 ) {
				buffergeometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( geometry.normals ), 3 ) );
			}

			if ( geometry.uvs.length > 0 ) {
				buffergeometry.addAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry.uvs ), 2 ) );
			}

			material = new THREE.MeshLambertMaterial();
			material.name = object.material.name;

			var mesh = new THREE.Mesh( buffergeometry, material );
			mesh.name = object.name;

			container.add( mesh );

		}

		console.timeEnd( 'OBJLoader' );

		return container;

	};
