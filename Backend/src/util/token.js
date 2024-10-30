const jwt = require('jsonwebtoken');
const secretKey = 'Pineaple';

const checkToken = async (token,id)=>{ 
    try{
        let decoded = await jwt.verify(token,secretKey);
        if(decoded){
            if(decoded.id==id) return true;
        }
        console.log("checkToken não esta passando pelo deecoded")
        return false;
    }catch(e){
        return false;
    }
}

const returnIdUser = async (token)=>{ 
    try{
        let decoded = await jwt.verify(token,secretKey);
        if(decoded){
            return decoded.id;
        }
        console.log("checkToken não esta passando pelo deecoded")
        return false;
    }catch(e){
        return false;
    }
}

const setToken = (idUser) => {
    const token = jwt.sign({ "idUser": idUser }, secretKey, { expiresIn: '1h' }); // Expira em 1 hora
    return token;
};







module.exports = {
    checkToken,returnIdUser,
    setToken
};
