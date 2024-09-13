const mapping = (array) => {
    return array.reduce((object, letter) => ({
        ...object, 
        [letter]: letter.toUpperCase()
    }), {});
}



console.log(mapping(["p", "s"])); 
console.log(mapping(["a", "b", "c"])); 
console.log(mapping(["a", "v", "y"]));
