import { Providers } from "./providers";
import { Token } from "./token";


type TokenOrNull<T, Optional extends boolean> = Optional extends true ? T | null : T;


export class Container {
    protected static instance: Container;
    static getInstance() {
        if (Container.instance) {
            return Container.instance;
        }

        Container.instance = new Container();

        return Container.instance;
    }

    protected readonly instances = new Map<Symbol, any>();
    protected readonly providers = new Map<Symbol, Providers<any>>();

    inject<T, N extends boolean = false>(token: Token<T>, optional?: N): TokenOrNull<T, N> {
        if (this.instances.has(token.id)) {
            return this.instances.get(token.id);
        }
        if (this.providers.has(token.id)) {
            const instance = this.providers.get(token.id)?.provide();
            this.instances.set(token.id, instance);
            return instance;
        }

        if (optional) {
            return null as TokenOrNull<T, N>;
        }

        throw new Error(`Tydi: No provider for ${token.id.toString()}`);
    }

    register<T>(token: Token<T>, provider: Providers<T>) {
        if (this.providers.has(token.id)) {
            throw new Error(`Tydi Error: a provider for ${token.id.toString()} already exists.`);
        }
        this.providers.set(token.id, provider);
    }
}