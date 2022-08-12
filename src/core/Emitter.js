class Emitter {
	constructor () {
		this.listeners = {};
	}

	// dispatch, fire, trigger
	// table.emit('table-select', {data: 1})
	emit (eventName, ...rest) {
		if (!Array.isArray(this.listeners[eventName])) return;


		this.listeners[eventName].forEach(listener => {
			listener(...rest);
		});
	}

	// on, listener
	// table.subscribe('table-select', () => {})
	subscribe (eventName, cb) {
		if (!this.listeners[eventName]) this.listeners[eventName] = [];
		this.listeners[eventName].push(cb);

		return () => {
			this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== cb);
		};
	}
}
const emitter = new Emitter();
Object.freeze(emitter);

export default emitter;

// const emitter = new Emitter();
//
// const unsub = emitter.subscribe('bunny', data => console.log(data));
//
// emitter.emit('bunny', 42);
// unsub()
// emitter.emit('bunny', 42);
