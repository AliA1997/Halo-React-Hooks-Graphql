const bcrypt = require('bcrypt');

class PasswordHasher {
    static async verifyPassword(inputPassword, userPassword) {

        const doPasswordsMatch = await bcrypt.compare(inputPassword, userPassword);
        
        return doPasswordsMatch;
    }

    static async generatePasswordHash(password) {
        const salt = await generateSalt(),
              hashedPassword = await bcrypt.hash(password, salt);

              console.log(hashedPassword);
        return hashedPassword;
    }

}

async function generateSalt() {
    const salt = await bcrypt.genSalt(120/10);
    return salt;
}


module.exports = PasswordHasher;