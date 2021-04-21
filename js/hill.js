//Greyson Fangman
//MAT 385
//Hill Cipher - Encryption & Decryption
//4/21/21
const prompt = require('prompt-sync')();
//Takes user input to determine what kind of encryption they would like to do. 
var choice = prompt("Would you like to Encrypt (E), Decrypt (D), or Quit (Q): ").toLowerCase()
if (choice == 'e') {
    var plaintext = prompt("Enter the plaintext you would like to encrypt(must not be blank): ").toLowerCase();
    var k = prompt("Enter the key you would like to use to encrypt your message(must be 4 numbers): ").toLowerCase();
    var output = "";
    var keys = k.split(" ");
    //Runs the encryption function to get the encrypted text based on the user input. 
    encryption(plaintext, keys);
}

if (choice == 'd'){
    var ciphertext = prompt("Enter the ciphertext you would like to decrypt: ").toLowerCase();
    var k = prompt("Enter the key you would like to use to decrypt your message: ").toLowerCase();
    keys = k.split(" ");
    //Runs the decryption function to get the decrypted text based on the user input. 
    decryption(ciphertext, keys);
}
//quits the program if user input is q or Q
if (choice == 'q'){
    process.exit(0);
}

//This function encypts the message by multiplying the plaintext by the keys matrix and converting the number to their alphabetical value
function encryption(plaintext, keys){
    errorChecking(plaintext, keys);
    keygeneration(keys);

    for (i = 0; i < plaintext.length; i += 2) {
        output += String.fromCharCode((keys[0] * (plaintext.charCodeAt(i) - 97) + keys[1] * (plaintext.charCodeAt(i + 1) - 97)) % 26 + 97);
        output += String.fromCharCode((keys[2] * (plaintext.charCodeAt(i) - 97) + keys[3] * (plaintext.charCodeAt(i + 1) - 97)) % 26 + 97);
    }
    console.log(output);
}

//This function deciphers a text from the user by taking their input and the key and inverting in order to get the hidden message
function decryption(ciphertext, keys){
    errorChecking(ciphertext, keys);
    keygeneration(keys);
    var det = keys[0] * keys[3] - keys[1] * keys[2];
    det = ((det % 26) + 26) % 26;
    var di = 0;
    for (var i = 0; i < 26; i++) {
        if ((det * i) % 26 == 1) di = i;
    }
    //This takes the inverse of the keys so that we can use the same algorithm as the encryption
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
}
//Takes the user input for the key and puts it in an array called keys
function keygeneration(keys){
    for (i = 0; i < 4; i++)
        keys[i] = keys[i] % 26;
}
//Checks to make sure that the user input for the text and keys are valid and able to be used to encrypt / decrypt. 
function errorChecking(text, keys){
    if (text.length < 1) {
        console.log("Text can not be blank");
        return;
    }
    if (text.length % 2 == 1) {
        console.log("Text can not be used, use something different.");
        return;
    }
    if (keys.length != 4) {
        console.log("key should consist of 4 integers");
        return;
    }
}