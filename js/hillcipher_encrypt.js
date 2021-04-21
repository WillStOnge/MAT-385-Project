    const prompt = require('prompt-sync')();
    //let input = prompt("Enter the plaintext you would like to encrypt: ");
    //let key = prompt("Enter the key you would like to use to encrypt your message: ");
    var plaintext = prompt("Enter the plaintext you would like to encrypt: ").toLowerCase().replace(/[^a-z]/g, "");
    var k = prompt("Enter the key you would like to use to encrypt your message: ").toLowerCase().replace(/[^0-9 ]/g, "");
    var output = "";
    var keys = k.split(" ");
    // do some error checking
    if (plaintext.length < 1) {
        console.log("please enter some plaintext (letters and numbers only)");
        return;
    }
    if (plaintext.length % 2 == 1) {
        plaintext = plaintext + "x";
    }
    if (keys.length != 4) {
        console.log("key should consist of 4 integers");
        return;
    }
    for (i = 0; i < 4; i++)
        keys[i] = keys[i] % 26;

    for (i = 0; i < plaintext.length; i += 2) {
        output += String.fromCharCode((keys[0] * (plaintext.charCodeAt(i) - 97) + keys[1] * (plaintext.charCodeAt(i + 1) - 97)) % 26 + 97);
        output += String.fromCharCode((keys[2] * (plaintext.charCodeAt(i) - 97) + keys[3] * (plaintext.charCodeAt(i + 1) - 97)) % 26 + 97);
    }
    console.log(output);


