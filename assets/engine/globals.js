var globals = {

	paths: {}, // Неймспейс для путей
	graph: {}, // Неймспейс для путевого графа
	objects: {}, // Неймспейс для объектов
	triggers: {}, // Неймспейс для сценария
	objectClicked: false, // Факт клика по объекту
	viewport: { // Объект вьюпорта
		resize: false, // Факт процесса ресайза
		scale: 1 // Локальный масштаб
	},
	scale: 1, // Глобальный масштаб
	volume: 0.5, // Уровень громкости по умолчанию
	locale: 'ru' // Локаль по умолчанию
};