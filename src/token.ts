export class Token<T> {
    readonly id: Symbol;
    constructor(name: string) {
        this.id = Symbol(name);
        return this as Token<T>;
    }
}