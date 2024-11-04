import EnvVar from './interfaces.js';

class Credentials {
    private static readonly env: EnvVar = process.env as unknown as EnvVar; // type checking for safety

    get userPassword() {
        return Credentials.env.PASSWORD;
    }

    get userName() {
        return Credentials.env.USERNAME;
    }

    get baseUrl() {
        return Credentials.env.BASE_URL
    }
}
export default new Credentials();
