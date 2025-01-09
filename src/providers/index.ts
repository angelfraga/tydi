import { Container } from '../container';
import { Token } from '../token';
import { Constructor } from '../utils';
import { ClassProvider } from './class.provider';
import { Factory, FactoryProvider } from './factory.provider';
import { ValueProvider } from './value.provider';

export * from './class.provider';
export * from './factory.provider';
export * from './value.provider';

export type Providers<T> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T, any>;

export function registerProvider<T>(token: Token<T>) {
    const container = Container.getInstance();

    return {
        useValue: (value: T) => {
            const provider = new ValueProvider(value);
            container.register(token, provider);
        },
        useFactory: <N>(factory: Factory<T, Token<N>>, deps: Token<N>[]) => {
            const provider = new FactoryProvider<T, Token<N>>(factory, deps);
            container.register(token, provider);
        },
        useClass: (clazz: Constructor<T>) => {
            const provider = new ClassProvider(clazz);
            container.register(token, provider);
        }
    }
}
