export const dynamicObject = (obj, array) => array.map((nombre) => ({ text: nombre, data: obj[nombre] }));
