const prompt = require('prompt-sync')();
var ciphertext = prompt("Enter the ciphertext you would like to decrypt: ").toLowerCase().replace(/[^a-z]/g, "");
var k = prompt("Enter the key you would like to use to decrypt your message: ").toLowerCase().replace(/[^0-9 ]/g, "");
keys = k.split(" ");
    // do some error checking 
    if (ciphertext.length < 1) {
        console.log("please enter some ciphertext (letters only, numbers should be spelled)");
        return;
    }
    if (ciphertext.length % 2 == 1) {
        console.log("ciphertext is not divisible by 2 (wrong algorithm?)");
        return;
    }

    if (keys.length != 4) {
        console.log("key should consist of 4 integers");
        return;
    }
    for (i = 0; i < 4; i++)
        keys[i] = keys[i] % 26;
    // calc inv matrix
    var det = keys[0] * keys[3] - keys[1] * keys[2];
    det = ((det % 26) + 26) % 26;
    var di = 0;
    for (var i = 0; i < 26; i++) {
        if ((det * i) % 26 == 1) di = i;
    }
    if (di == 0) {
        console.log("could not invert, try different key");
        return;
    }
    var ikeys = new Array(4);
    ikeys[0] = (di * keys[3]) % 26;
    ikeys[1] = (-1 * di * keys[1]) % 26;
    ikeys[2] = (-1 * di * keys[2]) % 26;
    ikeys[3] = di * keys[0];
    for (i = 0; i < 4; i++) {
        if (ikeys[i] < 0) ikeys[i] += 26;
    }
    var plaintext = "";
    for (i = 0; i < ciphertext.length; i += 2) {
        plaintext += String.fromCharCode((ikeys[0] * (ciphertext.charCodeAt(i) - 97) + ikeys[1] * (ciphertext.charCodeAt(i + 1) - 97)) % 26 + 97);
        plaintext += String.fromCharCode((ikeys[2] * (ciphertext.charCodeAt(i) - 97) + ikeys[3] * (ciphertext.charCodeAt(i + 1) - 97)) % 26 + 97);
    }
    console.log(plaintext);