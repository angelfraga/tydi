import { Container } from "../container";
import { Token } from "../token";
import { Provider } from "./api";

export type Factory<T, N> = (...args: Token<N>[]) => T;

export class FactoryProvider<T, N> implements Provider<T> {

    private readonly factory: Factory<T, N>;
    private readonly deps: Token<N>[];

    constructor(factory: Factory<T, N>, deps: Token<N>[]) {
        this.factory = factory;
        this.deps = deps;
    }

    provide(): T {
        const container = Container.getInstance();
        const args = this.deps.map(dep => container.inject(dep))
        return this.factory.call(args);
    }
}