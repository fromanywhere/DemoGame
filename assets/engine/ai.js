/*jshint camelcase:true, curly:true, eqeqeq:true, immed:true, newcap:true, noarg:true, noempty:true, nonew:true, trailing:true, laxbreak:true, loopfunc:true, browser:true */

/* Подсказки */
document.addEventListener('hero.start', function (e) {
	if (e.detail.graphId === 0 && !globals.triggers.started) {
		hint.message('Герой перемещается в область, указанную мышью, при необходимости перепрыгивая препятствия.');
		globals.triggers.started = true;

		dragonToLeft();
	}
})

document.addEventListener('hero.stop.inGraphId.7', function () {
	if (!globals.triggers.brickOut) {
		hint.message('Иногда герою может что-то мешать. В этом случае бывает полезно поискать «выключатель».');
	}
});

document.addEventListener('hero.stop.inGraphId.4', function () {
	if (!globals.triggers.dragonOut) {
		hint.message('Со второстепенными героями тоже можно взаимодействовать.');
	}
});
/* /Подсказки */

/* Дракон */
function dragonToLeft() {
	globals.objects.dragon.moveTo({
		path: 'dragonPath',
		chain: 3
	})
}

function dragonToRight() {
	globals.objects.dragon.moveTo({
		path: 'dragonPath',
		chain: 0
	})
}

document.addEventListener('dragon.stop.inGraphId.8', function () {dragonToLeft(); });
document.addEventListener('dragon.stop.inGraphId.9', function () {dragonToRight(); });
document.addEventListener('dragon.objectClick', function () {
	globals.objects.dragon.moveTo({
		path: 'dragonOut',
		chain: 4
	})

	globals.triggers.dragonOut = true;

	globals.paths.jump3.breakpath = false;
	graph.buildGraph();
});
/* /Дракон */

/* После прыжка плюс шаг */
document.addEventListener('hero.stop.inGraphId.1', function () {
	if (globals.objects.hero.getPosition().orientation === -1) {
		globals.objects.hero.moveTo({
			path: 'startPath',
			chain: 3
		})
	}
});

document.addEventListener('hero.stop.inGraphId.2', function () {
	if (globals.objects.hero.getPosition().orientation === 1) {
		globals.objects.hero.moveTo({
			path: 'handlePath',
			chain: 1
		})
	}
});

document.addEventListener('hero.stop.inGraphId.7', function () {
	if (globals.objects.hero.getPosition().orientation === -1) {
		globals.objects.hero.moveTo({
			path: 'handlePath',
			chain: 3
		})
	}
});

document.addEventListener('hero.stop.inGraphId.3', function () {
	if (globals.objects.hero.getPosition().orientation === 1) {
		globals.objects.hero.moveTo({
			path: 'bonusPath',
			chain: 1
		})
	}
});

document.addEventListener('hero.stop.inGraphId.4', function () {
	if (globals.objects.hero.getPosition().orientation === -1) {
		globals.objects.hero.moveTo({
			path: 'bonusPath',
			chain: 6
		})
	}
});

document.addEventListener('hero.stop.inGraphId.5', function () {
	if (globals.objects.hero.getPosition().orientation === 1) {
		globals.objects.hero.moveTo({
			path: 'endPath',
			chain: 1
		})
	}
});
/* /После прыжка плюс шаг */

/* Убрать второй кубик */
document.addEventListener('handle.objectClick', function () {
	var heroPosition = globals.objects.hero.getPosition();

	if (heroPosition.path === 'handlePath' && heroPosition.chain === 2) {
		globals.objects.hero.animate({
			animation: 'jump',
			callback: function () {

				globals.paths.jump2.breakpath = false;
				graph.buildGraph({
					callback: function () {

						globals.objects.brick3.animate({
							animation: 'move'
						})

						globals.triggers.brickOut = true;
					}
				});
			}
		})

		setTimeout(function () {
			globals.objects.handle.animate({
				animation: 'handle'
			})
		}, 500)
	}
});
/* /Убрать второй кубик */

/* Бонусы */
globals.triggers.points = 0;

document.addEventListener('bonus1.objectClick', function () {
	var heroPosition = globals.objects.hero.getPosition();

	if (heroPosition.path === 'bonusPath' && heroPosition.chain === 1) {

		globals.triggers.points += 100;

		globals.objects.hero.animate({
			animation: 'jump',
			callback: function () {
				hint.message('Бонус №1!<br />Всего ' + globals.triggers.points + ' очков');
			}
		})

		setTimeout(function () {
			globals.objects.bonus1.animate({
				animation: 'get'
			})
		}, 500)
	}
});

document.addEventListener('bonus2.objectClick', function () {
	var heroPosition = globals.objects.hero.getPosition();

	if (heroPosition.path === 'bonusPath' && heroPosition.chain === 3) {
		globals.triggers.points += 100;

		globals.objects.hero.animate({
			animation: 'jump',
			callback: function () {
				hint.message('Бонус №2!<br />Всего ' + globals.triggers.points + ' очков');
			}
		})

		setTimeout(function () {
			globals.objects.bonus2.animate({
				animation: 'get'
			})
		}, 500)
	}
});

document.addEventListener('bonus3.objectClick', function () {
	var heroPosition = globals.objects.hero.getPosition();

	if (heroPosition.path === 'bonusPath' && heroPosition.chain === 5) {
		globals.triggers.points += 100;

		globals.objects.hero.animate({
			animation: 'jump',
			callback: function () {
				hint.message('Бонус №3!<br />Всего ' + globals.triggers.points + ' очков');
			}
		})

		setTimeout(function () {
			globals.objects.bonus3.animate({
				animation: 'get'
			})
		}, 500)
	}
});
/* /Бонусы */

/* Конец игры */
document.addEventListener('hero.stop.inGraphId.6', function () {
	audio.fadeOut();
	utils.fadeIn();
});
/* /Конец игры */