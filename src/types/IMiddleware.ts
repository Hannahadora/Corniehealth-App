import { NavigationGuardNext, Route } from "vue-router/types/router";

export default interface IMiddleware {
  register(to: Route, from: Route, next: NavigationGuardNext<Vue>): void;
}
