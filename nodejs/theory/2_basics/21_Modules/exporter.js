export const theSameObjectForAllImporters = {
    value: 1
};

export function logTheSameObjectForAllImportersValue() {
    console.log(theSameObjectForAllImporters.value);
}


export const toBeInitializedOnImport = { };

export function logInitializedOnImportValue() {
    console.log(toBeInitializedOnImport.value);
}