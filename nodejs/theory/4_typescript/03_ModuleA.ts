export interface ModuleA {
    name: string;
}
export class ModuleAImpl implements ModuleA {
    constructor(public name: string) {
    }
}
export function printName(module: ModuleA): void {
    console.log(module.name);
}