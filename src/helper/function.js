export default function makeid(lenght) {
    var result = ''
    var char =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charlenght = char.length;
    for (var i = 0; i < lenght; i++){
        result += char.charAt(Math.floor(Math.random()*charlenght))
    }
    return result
}
