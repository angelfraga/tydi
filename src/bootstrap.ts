import { Container } from "./container";
import { Factory, registerProvider } from "./providers";
import { Token } from "./token";
import { Constructor } from "./utils";

export interface Main { run(): void }
export const Main = new Token<Main>('Main');

export interface BootstrapProvider<T = unknown, N = unknown> {
    provide: Token<T>;
    useValue?: T;
    useClass?: Constructor<T>;
    useFactory?: Factory<T, Token<N>>;
    deps?: Token<N>[];
}

export const AsyncRegisterProvider = new Token<AsyncRegisterProvider>("AsyncRegisterProvider");
export interface AsyncRegisterProvider {
    provide(): Promise<BootstrapProvider[]>;
}

export function bootstrap(providers: BootstrapProvider[]) {


    const register = (provider: BootstrapProvider) => {
        if (provider.useValue) {
            registerProvider(provider.provide).useValue(provider.useValue);
            return;
        }
        if (provider.useFactory) {
            registerProvider(provider.provide).useFactory(provider.useFactory, provider.deps!);
            return;
        }
        if (provider.useClass) {
            registerProvider(provider.provide).useClass(provider.useClass);
        }
    }

    providers.forEach(register);

    const container = Container.getInstance();
    const provider = container.inject(AsyncRegisterProvider, true);
    if (provider) {
        provider.provide().then(asyncProviders => {
            asyncProviders.forEach(register);
            return container.inject(Main)?.run();
        });
    } else {
        return container.inject(Main, true)?.run();
    }

}
