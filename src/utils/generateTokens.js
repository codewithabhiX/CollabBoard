import JWT from "jsonwebtoken";

const generateToken = (payload) => {
    console.log("Generating token with payload:", payload); // Debugging log    
    try{
    const accessToken = JWT.sign(payload, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: '15m'
    });
    const refreshToken = JWT.sign(payload, process.env.REFRESH_SECRET_TOKEN, {
        expiresIn: '7d'
    });
    return {
        accessToken,
        refreshToken
    }
    }catch(error){
        throw new Error(`Token generation failed`)
    }
}
export default generateToken;