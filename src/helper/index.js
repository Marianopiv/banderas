export const dynamicObject = (obj, array) => array.map((nombre) => ({ text: nombre, data: obj[nombre] }));

export const handleBorders = (arr,border) => {
    if (arr) {
       return arr.filter((item) => border.includes(item.cca3) && item)
    }
  };
