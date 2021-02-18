function hillEncipher(plaintext, matrix)
{
    if (!isValidKey(key))
        throw new Error("Invalid key. Determinant cannot be even or 13.")
    return plaintext;
}

function hillDecipher(ciphertext, matrix)
{
    inverse = math.inv(matrix);

    return ciphertext;
}

function isValidKey(matrix)
{
    det = math.mod(math.det(matrix), 26);

    return !(det % 2 == 0 || det == 13);
}
