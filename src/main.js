import './style.css'
import * as THREE from 'three'
import {
	addBoilerPlateMeshes,
	addStandardMesh,
	addTexturedMesh,
} from './addDefaultMeshes.js'
import { addLight } from './addDefaultLights'
import Model from './Model'
import { HDRI } from './environment'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { manager } from './manager'
import gsap from 'gsap'

const renderer = new THREE.WebGLRenderer({ antialias: true })

const clock = new THREE.Clock()

const camera = new THREE.PerspectiveCamera(
	40,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)

const mixers = []

const meshes = {}

const lights = {}

const scene = new THREE.Scene()

const targetObject = []
//const controls = new OrbitControls(camera, renderer.domElement)

let mouseX = 0
let mouseY = 0
let isMouseControlEnabled = true

let clickCount = 0
let onOff = 0

const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
init()

const closeSound = new Audio('/button.wav')


function init() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	//make the load manager
	const loadManager = manager()

	// meshes.default = addBoilerPlateMeshes()
	// meshes.standard = addStandardMesh()
	// meshes.physical = addTexturedMesh()

	lights.point = addLight()
	// lights.default.target = targetObject

	scene.add(lights.point)
	// scene.add(meshes.default)
	// scene.add(meshes.standard)
	// scene.add(meshes.physical)

	// set up hdri
	scene.background = HDRI(loadManager)
	scene.environment = HDRI(loadManager)
	scene.environmentIntensity = 0.8

	camera.position.set(0, 0, 6.7)

	instances(loadManager)
	raycast()
	resize()
	animate()
}

function raycast(){
	window.addEventListener('click', (event) => {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
		raycaster.setFromCamera(pointer, camera)
		const intersects = raycaster.intersectObjects(scene.children)
		//console.log(intersects)

		// document.body.style.cursor = 'default' I tried to recreate the curspr hover over clickable items and change to a pointer based on my understanding of the code AI gave me, but failed

		for (let i = 0; i < intersects.length; i++) {
			let object = intersects[i].object
			while (object) {
				// tried to change the camera position once the computer is clicked, but failed to figure out how to get the corrct rotation
				// if (object.userData.name === 'computer') {
				// 	isMouseControlEnabled = false
				// 	closeSound.currentTime = 0;
				// 	closeSound.play();
				// 	const tl = new gsap.timeline()
				// 	tl.to(camera.position,{
				// 		x:-0.3,
				// 		y:0.4,
				// 		z:-0.2,
				// 	})
				// 	tl.to(camera.rotation,{
				// 		x:-180,
				// 		y:37,
				// 		z:-180
				// 	},"<")
				// 	break
				// }
				if (object.name === 'folder1') {
					// document.body.style.cursor = 'pointer' same here failed to recreate the cursor effect
					const tl = new gsap.timeline()
					closeSound.currentTime = 0;
					closeSound.play();
					tl.to(object.scale,{
						x:1.05,
						y:1.05,
						z:1.05,
						duration:0.1,
						ease:'power1'
					})
					tl.to("#video",{
						zIndex: 1,
						duration: 0.1,
					})
					tl.to("#video",{
						opacity: 1,
						duration: 0.1,
					})
					break
				}

				if (object.name === 'folder2') {
					const tl = new gsap.timeline()
					closeSound.currentTime = 0;
					closeSound.play();
					tl.to(object.scale,{
						x:1.05,
						y:1.05,
						z:1.05,
						duration:0.1,
						ease:'power1'
					})

					tl.to("#video2",{
						zIndex: 1,
						duration: 0.1,
					})
					tl.to("#video2",{
						opacity: 1,
						duration: 0.1,
					})
					break
				}

				if (object.name === 'folder3') {
					const tl = new gsap.timeline()
					closeSound.currentTime = 0;
					closeSound.play();
					tl.to(object.scale,{
						x:1.05,
						y:1.05,
						z:1.05,
						duration:0.1,
						ease:'power1'
					})

					tl.to("#video3",{
						zIndex: 1,
						duration: 0.1,
					})
					tl.to("#video3",{
						opacity: 1,
						duration: 0.1,
					})
					break
				}
				if (object.name === 'binder') {
					const tl = new gsap.timeline()
					closeSound.currentTime = 0;
					closeSound.play();
					tl.to(object.scale,{
						x:1.05,
						y:1.05,
						z:1.05,
						duration:0.1,
						ease:'power1'
					})

					tl.to("#folder4",{
						zIndex: 1,
						duration: 0.1,
					})
					tl.to("#folder4",{
						opacity: 1,
						duration: 0.1,
					})
					break
				}

				if (object.name === 'hair_lambert1_0' || object.name === '0' || object.name === '0_1' || object.name === 'pig1body_bodydress_lambert1_0') {
					const tl = new gsap.timeline()
					closeSound.currentTime = 0;
					closeSound.play();

					switch(clickCount){
						case 0:
							tl.to("#text1",{
								zIndex: 1,
								duration: 0,
							})
							tl.to("#text1",{
								opacity: 1,
								duration: 0.1,
							})
							tl.to("#text1",{
								opacity: 0,
								duration: 0.5,
								delay:1,
							})
							break

						case 1:
							tl.to("#text2",{
								zIndex: 1,
								duration: 0,
							})
							tl.to("#text2",{
								opacity: 1,
								duration: 0.1,
							})
							tl.to("#text2",{
								opacity: 0,
								duration: 0.5,
								delay:1,
							})
							break

						case 2:
							tl.to("#text3",{
								zIndex: 1,
								duration: 0,
							})
							tl.to("#text3",{
								opacity: 1,
								duration: 0.1,
							})
							tl.to("#text3",{
								opacity: 0,
								duration: 0.5,
								delay:1,
							})
							break
					}
					clickCount = (clickCount + 1) % 3
					return
					
				}

				if (object.name === 'lamp') {
					const tl = new gsap.timeline()
					closeSound.currentTime = 0;
					closeSound.play();

					switch (onOff){
						case 0: 
						tl.to(scene,{
							environmentIntensity:0,
						})
						tl.to(lights.point,{
							intensity: 2,
						}, "<") // < to play the animation at the same time
						break

						case 1: 
						tl.to(scene,{
							environmentIntensity:1,
						})
						tl.to(lights.point,{
							intensity: 0,
						}, "<")
						break
					}

					onOff = (onOff + 1) % 2
					return
				}
				
				if (object.name === 'frame') {
					const tl = new gsap.timeline()
					closeSound.currentTime = 0;
					closeSound.play();
					tl.to(object.scale,{
						x:1.05,
						y:1.05,
						z:1.05,
						duration:0.1,
						ease:'power1'
					})
					tl.to("#frame1",{
						zIndex: 1,
						duration: 0.1,
					})
					tl.to("#frame1",{
						opacity: 1,
						duration: 0.1,
					})
					break
				}

				if (object.name === 'frame1') {
					const tl = new gsap.timeline()
					closeSound.currentTime = 0;
					closeSound.play();
					tl.to(object.scale,{
						x:1,
						y:1.02,
						z:1.02,
						duration:0.1,
						ease:'power1'
					})
					tl.to("#frame2",{
						zIndex: 1,
						duration: 0.1,
					})
					tl.to("#frame2",{
						opacity: 1,
						duration: 0.1,
					})
					break
				}

				if (object.userData.name === 'computer') {
					closeSound.currentTime = 0;
					closeSound.play();
					const tl = new gsap.timeline()
					tl.to(object.scale,{
						x:1.02,
						y:1.02,
						z:1.02,
						duration:0.1,
						ease:'power1'
					})
					tl.to("#computer",{
						zIndex: 1,
						duration: 0.1,
					})
					tl.to("#computer",{
						opacity: 1,
						duration: 0.1,
					})
					break
				}
				object = object.parent
			}
		}
	})
}

// window.addEventListener('mousemove', raycast) same here failed to recreate the cursor effect

document.getElementById('closeVideo').addEventListener('click', () => {
	const tl = new gsap.timeline()

    closeSound.currentTime = 0;
    closeSound.play();

    scene.traverse((object) => {
        if (object.name === 'folder1') {
            tl.to(object.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.1,
                ease: 'power1'
            });
			tl.to("#video",{
				zIndex: -1,
				duration: 0.1,
			})
			tl.to("#video",{
				opacity: 0,
				duration: 0.2,
			})
        }
    });

});

document.getElementById('closeVideo2').addEventListener('click', () => {
	const tl = new gsap.timeline()

    closeSound.currentTime = 0;
    closeSound.play();

    scene.traverse((object) => {
        if (object.name === 'folder2') {
            tl.to(object.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.1,
                ease: 'power1'
            });
			tl.to("#video2",{
				zIndex: -1,
				duration: 0.1,
			})
			tl.to("#video2",{
				opacity: 0,
				duration: 0.2,
			})
        }
    });

});

document.getElementById('closeVideo3').addEventListener('click', () => {
	const tl = new gsap.timeline()

    closeSound.currentTime = 0;
    closeSound.play();

    scene.traverse((object) => {
        if (object.name === 'folder3') {
            tl.to(object.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.1,
                ease: 'power1'
            });
			tl.to("#video3",{
				zIndex: -1,
				duration: 0.1,
			})
			tl.to("#video3",{
				opacity: 0,
				duration: 0.2,
			})
        }
    });

});

document.getElementById('closeFolder4').addEventListener('click', () => {
	const tl = new gsap.timeline()

    closeSound.currentTime = 0;
    closeSound.play();

    scene.traverse((object) => {
        if (object.name === 'binder') {
            tl.to(object.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.1,
                ease: 'power1'
            });
			tl.to("#folder4",{
				zIndex: -1,
				duration: 0.1,
			})
			tl.to("#folder4",{
				opacity: 0,
				duration: 0.2,
			})
        }
    });

});

document.getElementById('closeFrame1').addEventListener('click', () => {
	const tl = new gsap.timeline()

    closeSound.currentTime = 0;
    closeSound.play();

    scene.traverse((object) => {
        if (object.name === 'frame') {
            tl.to(object.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.1,
                ease: 'power1'
            });
			tl.to("#frame1",{
				zIndex: -1,
				duration: 0.1,
			})
			tl.to("#frame1",{
				opacity: 0,
				duration: 0.2,
			})
        }
    });

});

document.getElementById('closeFrame2').addEventListener('click', () => {
	const tl = new gsap.timeline()

    closeSound.currentTime = 0;
    closeSound.play();

    scene.traverse((object) => {
        if (object.name === 'frame1') {
            tl.to(object.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.1,
                ease: 'power1'
            });
			tl.to("#frame2",{
				zIndex: -1,
				duration: 0.1,
			})
			tl.to("#frame2",{
				opacity: 0,
				duration: 0.2,
			})
        }
    });

});

document.getElementById('closeComputer').addEventListener('click', () => {
	const tl = new gsap.timeline()

    closeSound.currentTime = 0;
    closeSound.play();

    scene.traverse((object) => {
        if (object.name === 'computer') {
            tl.to(object.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.1,
                ease: 'power1'
            });
			tl.to("#computer",{
				zIndex: -1,
				duration: 0.1,
			})
			tl.to("#computer",{
				opacity: 0,
				duration: 0.2,
			})
        }
    });

});

function instances(manager) {
	const character = new Model({
		name: 'character',
		scene: scene,
		meshes: meshes,
		url: 'pig_idle10.glb',
		scale: new THREE.Vector3(17, 17, 17),
		position: new THREE.Vector3(-0.39, -1, 0.2),
		rotate: new THREE.Vector3(0, 0, 0),
		animationState: true,
		manager: manager,
		mixers: mixers,
	})
	character.init()

	const office = new Model({
		name: 'office',
		scene: scene,
		meshes: meshes,
		url: 'office9.glb',
		scale: new THREE.Vector3(15, 15, 15),
		position: new THREE.Vector3(0, -0.5, 0),
		rotation: new THREE.Vector3(0, 0, 0),
		manager: manager,
	})
	office.init()
}
function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}
//console.log(Math.clamp)

document.addEventListener('mousemove', function(e){
	if(isMouseControlEnabled == true) {
		const windowHalfX = window.innerWidth/2
		const windowHalfY = window.innerHeight/2
		mouseX = clamp((e.clientX - windowHalfX) / 4000, -1, 1)
		mouseY = clamp((e.clientY - windowHalfY) / 4000, -1, 1)
	}
})

// this part was to change the cursor in to a pointer once on clickable objects, all generated by AI
// function onMouseMove(event) {
//     pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//     pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     raycaster.setFromCamera(pointer, camera);
    
//     const intersects = raycaster.intersectObjects(scene.children);
    
//     // Default cursor
//     document.body.style.cursor = 'default';
    
//     // Check for intersections
//     for (let i = 0; i < intersects.length; i++) {
//         let object = intersects[i].object;
//         while (object) {
//             if (object.name === 'folder1' || object.name === 'folder2' || object.name === 'folder3' || object.name === 'binder' || object.name === 'hair_lamber1_0' || object.name === '0' || object.name === '0_1' || object.name === 'pig1body_bodydress_lambert1_0' || object.name === 'lamp'|| object.name === 'frame'||object.name === 'frame1'||object.name === 'computer') {
//                 document.body.style.cursor = 'pointer';
//                 break;
//             }
//             object = object.parent;
//         }
//     }
// }
// window.addEventListener('mousemove', onMouseMove);

function animate() {
	const delta = clock.getDelta()
	requestAnimationFrame(animate)

	for (const mixer of mixers) {
		mixer.update(delta)
	}

	if(isMouseControlEnabled){
		camera.position.x += (mouseX - camera.position.x) * 0.05
		camera.position.y += (-mouseY - camera.position.y) * 0.05
		camera.lookAt(scene.position)
	}

	// if (meshes.flower) {
	// 	meshes.flower.rotation.y -= 0.01
	// }

	// meshes.default.rotation.x += 0.01
	// meshes.default.rotation.y -= 0.01
	// meshes.default.rotation.z -= 0.02

	// meshes.standard.rotation.x += 0.01
	// meshes.standard.rotation.y += 0.02
	// meshes.standard.rotation.z -= 0.012

	// set to device resoluation
	// renderer.setPixelRatio(window.devicePixelRatio)
	renderer.render(scene, camera)
}
