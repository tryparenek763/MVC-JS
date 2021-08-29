class Subject {
    constructor(observers = []) {
        this._observers = observers;
    }

    subscribe(observerCallback) {
        this._observers.push(observerCallback);
    }
    unsubscribe(observerCallback) {
        const observerCallbackIndex = this._observers.indexOf(observerCallback);

        if (observerCallbackIndex !== -1)  {
            this._observers.splice(observerCallbackIndex, 1)
        }   
    }
    notify(data) {
        this._observers.forEach((observerCallback) => observerCallback(data))
    }
}

class LampModel extends Subject{
    constructor(isTurnOn = false) {
        super()
        this._isTurnOn = isTurnOn;
    }

    switch() {
        this._isTurnOn = !this._isTurnOn;
        this.notify(this._isTurnOn);
    }
} 

class LampController {
    constructor(model = new LampModel()) {
        this._model = model;
    }

    handleSwich() {
        this._model.switch()
    }
}

class LampView {
    constructor(model = new LampModel()) {
        this._model = model;
        this._bindedRender = this.render.bind(this)
        this._model.subscribe(this._bindedRender)
        this._controller = new LampController(this._model);
    }
    
    destroy() {
        this._model.unsubscribe(this._bindedRender)
    }

    render(isTurnOn) {
        console.log('Лампа', isTurnOn ? 'включена': 'выключена' , this._controller)
    }
}
const lampView = new LampView();
lampView.render();