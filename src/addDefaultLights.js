//import the light that we'll be using
import { DirectionalLight, PointLight } from 'three'

export const addLight = () => {
	//we don't need to worry about the specifics of it for now but we're basically creating a light with an intensity of 1 and it's color is 0xffffff
	//const light = new DirectionalLight(0xffe300, 0)
	const light = new PointLight(0xa5e3ff, 0, 0, 2)
	light.position.set(-0.57, 0.45, 1.5)
	//the most important part is that we're returning the light to whatever function called it.
	return light
}
