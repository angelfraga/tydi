import { Provider } from "./api";


export class ValueProvider<T> implements Provider<T> {

    private readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    provide(): T {
        return this.value;
    }
}