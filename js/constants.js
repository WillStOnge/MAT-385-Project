// All upper case letters in alphabetic order.
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Buffer character for padding.
const bufferChar = "X";

function validateType(variable, type, variableName)
{
    if(typeof(variable) !== type)
        throw new Error("Invalid input. Expected type '" + type + "' for " + variableName + ", got type '" + typeof(variable) + "'.");
}