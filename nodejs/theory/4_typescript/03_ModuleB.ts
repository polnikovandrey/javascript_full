interface ModuleB {
    name: string;
}
class ModuleBImpl implements ModuleB {
    constructor(public name: string) {
    }
}
function printName(module: ModuleB): void {
    console.log(module.name);
}
export { ModuleB, ModuleBImpl, printName }