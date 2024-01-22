import { makeObservable, observable } from "mobx";

export default class ActivityStore {
    title = 'Hi';
    
    constructor() {
        makeObservable(this, {
            title: observable
        })
    }
}