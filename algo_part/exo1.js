const numInStr = (array) =>  {
    return array.filter(string => /\d/.test(string));
}

console.log(numInStr(["1a", "a", "2b", "b"]));
console.log(numInStr(["abc", "abc10"]));
console.log(numInStr(["abc", "ab10c", "a10bc", "bcd"]));
console.log(numInStr(["this is a test", "test1"]));
console.log(numInStr(["this is a test", "with no number in array"]));