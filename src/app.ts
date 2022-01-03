// abstract library
import { DrawingCommon } from './common';
import * as THREE from 'three'

let smile;
let leftBrow, rightBrow;
var angle = 0;
var radius = 8; 
var browsRaised = 0;
var browsRising = 1;
var smileRotation = 0;

// A class for our application state and functionality
class Drawing extends DrawingCommon {

    constructor (canv: HTMLElement) {
        super (canv)
    }

    /*
	Set up the scene during class construction
	*/
	initializeScene(){
        const objectRoot = new THREE.Group();

        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry(.5, .8, 1.5, 20);
        var material = new THREE.MeshPhongMaterial( { color: 0x0BDA51, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0,-1.6,1);
        objectRoot.add( mesh );

        geometry = new THREE.SphereGeometry(1, 20, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x0BDA51, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0 , 1.5, 1);
        mesh.scale.set(1.3, 1.3, 1.3)
        objectRoot.add( mesh );

        //front right
        geometry = new THREE.CylinderGeometry(.3, .4, 2, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x0BDA51, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.set(.7, 0, .4);
        mesh.position.set(-.35,-.6,1.7);
        objectRoot.add( mesh );

        geometry = new THREE.SphereGeometry(1.1, 20, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x0BDA51, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-.8 ,.5, 0);
        objectRoot.add( mesh );

        //back stalk
        geometry = new THREE.CylinderGeometry(.3, .4, 2, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x0BDA51, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.set(-.7, 0, .5);
        mesh.position.set(-.35 ,-.6, .5);
        objectRoot.add( mesh );

        geometry = new THREE.SphereGeometry(1.1, 20, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x0BDA51, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-.6 ,.5, 1.9);
        objectRoot.add( mesh );


        // front left
        geometry = new THREE.CylinderGeometry(.3, .4, 2, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x0BDA51, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.set(0, .2, -.7);
        mesh.position.set(.5 ,-.55, .9);
        objectRoot.add( mesh );

        geometry = new THREE.SphereGeometry(1.1, 20, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x0BDA51, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(1.1 ,.5, .8);
        objectRoot.add( mesh );


        //right eye

        geometry = new THREE.CircleGeometry(.3, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x000000, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.set(0, 2.7, 0);
        mesh.position.set(0 , .7, -1);
        objectRoot.add(mesh);

        geometry = new THREE.RingGeometry(.05, .3, 5, 5, 6, 3.5);
        material = new THREE.MeshPhongMaterial( { color: 0x000000, flatShading: true } );
        rightBrow = new THREE.Mesh( geometry, material );

        rightBrow.rotation.set(0, 2.7, 0);
        rightBrow.position.set(0 , 1.1, -1);
        objectRoot.add( rightBrow );

        //left eye

        geometry = new THREE.CircleGeometry(.3, 20);
        material = new THREE.MeshPhongMaterial( { color: 0x000000, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.set(0, 2.7, 0);
        mesh.position.set(1.5 , .7, -.3);
        objectRoot.add( mesh );

        geometry = new THREE.RingGeometry(.05, .3, 5, 5, 6.3, 3.5);
        material = new THREE.MeshPhongMaterial( { color: 0x000000, flatShading: true } );
        leftBrow = new THREE.Mesh( geometry, material );

        leftBrow.rotation.set(0, 2.7, 0);
        leftBrow.position.set(1.5 , .7, -.3);
        leftBrow.translateY(.4);
        objectRoot.add( leftBrow );

        //smile

        geometry = new THREE.RingGeometry(.07, .4, 5, 5, 9.2, 3.5);
        material = new THREE.MeshPhongMaterial( { color: 0x000000, flatShading: false } );
        smile = new THREE.Mesh( geometry, material );

        smile.rotation.set(0, 2.7, 0);
        smile.position.set(.75 , .2, -.65);
        objectRoot.add( smile );

        this.scene.add( objectRoot );

        this.camera.lookAt(new THREE.Vector3())
    }

	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
	updateScene(time: DOMHighResTimeStamp){
        if (angle < 5.2) {
            this.camera.position.x = radius * Math.cos( angle );  
            this.camera.position.z = radius * Math.sin( angle );
            this.camera.lookAt(new THREE.Vector3())
            angle += 0.01;
        } else if (browsRaised < 3){
            if (browsRising) {
                leftBrow.position.y += browsRising * .01;
                rightBrow.position.y += browsRising * .01;
                if ((leftBrow.position.y < 1.1) || (leftBrow.position.y > 1.3)) {
                    browsRising *= -1;
                    browsRaised += .5
                }
            }
        } else {
            if (smileRotation < 3.2) {
                smileRotation += .05;
                smile.rotation.z = smileRotation;
            }
        }

        

    }
}

// a global variable for our state.  We implement the drawing as a class, and 
// will have one instance
var myDrawing: Drawing;

// main function that we call below.
// This is done to keep things together and keep the variables created self contained.
// It is a common pattern on the web, since otherwise the variables below woudl be in 
// the global name space.  Not a huge deal here, of course.

function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    myDrawing = new Drawing(div);
}

exec()