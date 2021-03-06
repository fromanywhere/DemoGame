/*jshint camelcase:true, curly:true, eqeqeq:true, immed:true, newcap:true, noarg:true, noempty:true, nonew:true, trailing:true, laxbreak:true, loopfunc:true, browser:true */

/**
 * Реализует перемещение объектов по траекториям
 *
 * @class move
 */
var move = (function () {

	/**
	 * Перемещает заданный объект в заданную точку заданной траектории
	 *
	 * @method move
	 * @private
	 * @param p {Object}
	 * @param p.id {String} идентификатор объекта
	 * @param p.path {String} идентификатор пути
	 * @param p.chain {Number} целевое звено
	 * @param p.speed {Number} скорость перемещения
	 * @param p.callback {Function} выполнится по завершении
	 */
	function move( p ) {
		var modelStep = globals.objects[p.id].step,
			currentPath = globals.paths[ p.path ],
			targetStep = currentPath.controlPath[ p.chain ].step,
			callback = p.callback || function () {},
			stepDirection;

		globals.objects[p.id].path = p.path;

		if (Math.abs(modelStep - targetStep) < p.speed  ) {
			callback();
			return;
		}

		// Направление движения
		stepDirection = currentPath.controlPath[ p.chain ].step - globals.objects[p.id].step;
		if (stepDirection !== 0) {
			stepDirection = stepDirection / Math.abs(stepDirection);
		}

		audio.updateWorldSound({
			id: p.id
		});

		// Анимация запукается циклически
		if (globals.objects[p.id].image.state.isComplete()) {
			globals.objects[p.id].image.state.setAnimationByName( p.animation , false);

			if (globals.objects[p.id].animation && globals.objects[p.id].animation[p.animation]) {
				globals.objects[p.id].animation[p.animation].track.play();
			}
		}

		globals.objects[p.id].step = globals.objects[p.id].step + stepDirection * p.speed;

		if (currentPath.steps[ globals.objects[p.id].step ] === undefined) {
			globals.objects[p.id].step = currentPath.steps.length-1;
		}


		globals.objects[p.id].move({
			x: currentPath.steps[ globals.objects[p.id].step ].x,
			y: currentPath.steps[ globals.objects[p.id].step ].y
		});

	}

	return {

		/**
		 * Публичная обертка для перемещения объекта
		 *
		 * @method setMovement
		 * @method public
		 * @param p {Object}
		 * @param p.id {String} идентификатор объекта
		 * @param p.path {String} идентификатор пути
		 * @param p.chain {Number} целевое звено
		 * @param p.speed {Number} скорость перемещения
		 * @param p.callback {Function} выполнится по завершении
		 */
		setMovement: function ( p ) {
			move( p );
		}
	};

}());