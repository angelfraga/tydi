import { Container } from "./container";
import { Token } from "./token";

export function inject<T, Optional extends boolean>(token: Token<T>, optional?: Optional): Optional extends true ? T | null : T {
    return Container.getInstance().inject(token, optional);
}