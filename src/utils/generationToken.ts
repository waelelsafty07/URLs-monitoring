// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"
class GenerationToken {
    private payload: object;

    constructor(payload: object) {
        this.payload = payload;
    }
    public genrate(ExpireTime: string): string {
        const token = jwt.sign(this.payload, String(process.env.JWT_SECRET_KEY), {
            expiresIn: ExpireTime,
        });

        return token;
    }
}
export default GenerationToken