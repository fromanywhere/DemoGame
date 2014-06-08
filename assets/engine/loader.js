/*jshint camelcase:true, curly:true, eqeqeq:true, immed:true, newcap:true, noarg:true, noempty:true, nonew:true, trailing:true, laxbreak:true, loopfunc:true, browser:true */

var loader = (function () {

	// Предзагрузка ресурсов
	function initResources( p ) {
		var assetsLoader = new PIXI.AssetLoader(p.resources),
			callback = p.callback || function () {};

		assetsLoader.onComplete = function () {
			callback();
		};

		assetsLoader.load();
	}

	// Извлечение путей
	function buildPaths ( p ) {
		var callback = p.callback || function () {};

		// Построить траектории
		utils.processPaths({
			callback: function () {

				// Построить граф
				graph.buildGraph({
					callback: function () {
						callback();
						pathfinder.start();
					}
				});

			}
		});
	}

	return {

		init: function ( p ) {
			var callback = p.callback || function () {};

			// предзагрузить ресурсы
			initResources({
				resources: p.resources,
				callback: function () {

					globals.sceneWidth = 2546;
					globals.sceneHeight = 560;

					globals.scale = globals.sceneHeight / document.body.clientHeight;

					buildPaths({
						callback: callback
					});
				}
			});
		}
	};

}());

function init() {

	localforage.config({
		name: 'demoGame',
		version: 1.0,
		size: 20*1024*1024,
		storeName: 'keyvaluepairs',
		description: 'Offline Storage'
	});

	loader.init({
		resources: [
			"assets/models/ready/hero/hero.json",
			"assets/models/ready/hero/hero.anim",

			"assets/models/ready/dragon/dragon.json",
			"assets/models/ready/dragon/dragon.anim",

			"assets/models/ready/brick/brick.json",
			"assets/models/ready/brick/brick.anim",

			"assets/models/ready/bonus/bonus.json",
			"assets/models/ready/bonus/bonus.anim",

			"assets/models/ready/handle/handle.json",
			"assets/models/ready/handle/handle.anim",

			"assets/background/background.jpg"
		],
		callback: function () {

			var startPath = 'startPath',
				dragonPath = 'dragonPath';

			var hero = obj().create({
					src: 'assets/models/ready/hero/hero.anim',
					name: 'hero',
					path: startPath,
					step: 0,
					z: 15,
					pz: 10,
					animation: {
						jump: {
							soundSrc: 'assets/models/ready/hero/jump.wav'
						}
					}
				}),

				dragon = obj().create({
					src: 'assets/models/ready/dragon/dragon.anim',
					name: 'dragon',
					scale: 0.5,
					path: dragonPath,
					step: 0,
					z: 15,
					pz: 5,
					interactive: true,
					animation: {
						flying: {
							soundSrc: 'assets/models/ready/dragon/flying.wav'
						}
					}
				}),

				brick1 = obj().create({
					src: 'assets/models/ready/brick/brick.anim',
					name: 'brick1',
					scale: 0.3,
					x: 630,
					y: 520,
					z: 15,
					pz: 5
				}),

				brick2 = obj().create({
					src: 'assets/models/ready/brick/brick.anim',
					name: 'brick2',
					scale: 0.3,
					x: 1180,
					y: 520,
					z: 15,
					pz: 5
				}),

				brick3 = obj().create({
					src: 'assets/models/ready/brick/brick.anim',
					name: 'brick3',
					scale: 0.3,
					x: 1270,
					y: 520,
					z: 15,
					pz: 5
				}),

				brick4 = obj().create({
					src: 'assets/models/ready/brick/brick.anim',
					name: 'brick4',
					scale: 0.3,
					x: 1935,
					y: 520,
					z: 15,
					pz: 5
				}),

				bonus1 = obj().create({
					src: 'assets/models/ready/bonus/bonus.anim',
					name: 'bonus1',
					scale: 0.5,
					x: 1350,
					y: 140,
					z: 15,
					pz: 5,
					interactive: true,
					animation: {
						'get': {
							soundSrc: 'assets/models/ready/bonus/bonus.wav'
						}
					}
				}),

				bonus2 = obj().create({
					src: 'assets/models/ready/bonus/bonus.anim',
					name: 'bonus2',
					scale: 0.5,
					x: 1550,
					y: 140,
					z: 15,
					pz: 5,
					interactive: true,
					animation: {
						'get': {
							soundSrc: 'assets/models/ready/bonus/bonus.wav'
						}
					}
				}),

				bonus3 = obj().create({
					src: 'assets/models/ready/bonus/bonus.anim',
					name: 'bonus3',
					scale: 0.5,
					x: 1750,
					y: 140,
					z: 15,
					pz: 5,
					interactive: true,
					animation: {
						'get': {
							soundSrc: 'assets/models/ready/bonus/bonus.wav'
						}
					}
				}),

				handle = obj().create({
					src: 'assets/models/ready/handle/handle.anim',
					name: 'handle',
					scale: 0.5,
					x: 900,
					y: 130,
					z: 15,
					pz: 5,
					interactive: true,
					animation: {
						handle: {
							soundSrc: 'assets/models/ready/bonus/bonus.wav'
						}
					}
				}),

				background = obj().create({
					src: 'assets/background/background.jpg',
					name: 'background',
					x: 0,
					y: 0,
					z: 5
				})

			globals.objects.hero.image.stateData.setMixByName("_walk", "stop", 0.3);
			globals.objects.hero.image.stateData.setMixByName("_walk", "jump", 0.3);
			globals.objects.hero.image.stateData.setMixByName("jump", "stop", 0.3);
			globals.objects.hero.image.stateData.setMixByName("jump", "_walk", 0.3);

			if (!debug) {
				audio.initBackgroundSound();
			}

			scene
				.init({
					canvasId: 'view'
				})
				.addObj(hero)
				.addObj(dragon)
				.addObj(brick1)
				.addObj(brick2)
				.addObj(brick3)
				.addObj(brick4)
				.addObj(bonus1)
				.addObj(bonus2)
				.addObj(bonus3)
				.addObj(handle)
				.addObj(background);

			viewport.init();

			queue.startQueue();

			if (debug) {
				document.querySelector('.debug__wrap' ).style.display = "block";
				debugTraect.init();
			}

		}
	});
}

document.addEventListener("DOMContentLoaded", function () {

	hint.init();

	if (!debug) {
		audio.init();
		document.body.className += ' _noscroll';

		init();

	} else {
		init();
	}
});