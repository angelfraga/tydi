import { Constructor } from "../utils";
import { Provider } from "./api";

export class ClassProvider<T> implements Provider<T> {

    private readonly clazz: Constructor<T>;

    constructor(clazz: Constructor<T>) {
        this.clazz = clazz;
    }

    provide(): T {
        return new this.clazz;
    }
}