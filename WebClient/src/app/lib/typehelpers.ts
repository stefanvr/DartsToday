export function createInstance<A>(c: new () => A, ...args: any[]): A {
    let instance =  new c();
    instance.constructor.apply(instance, args);
    return instance
}