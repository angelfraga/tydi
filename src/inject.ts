import { Container } from "./container";
import { Token } from "./token";

export function inject<T>(token: Token<T>, optional?: false | undefined): T {
    return Container.getInstance().inject(token, optional);
}