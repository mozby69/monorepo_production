import bcrypt from "bcrypt";

export function verifyPassword(
    plainPassword: string,
    passwordHash: string
) {
    return bcrypt.compare(
        plainPassword,
        passwordHash
    );
}

export function hashPassword(
    password: string
) {
    return bcrypt.hash(password, 12);
}