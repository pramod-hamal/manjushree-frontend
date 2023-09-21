export const getNamefirstChar = (name: string): string => {
    var s = name;
    let nameChar = [];
    for (var i = 0; i < s.length; i++) {
        nameChar.push(s.charAt(i))
    }
    return nameChar[0]
}
