const jwt = require('jsonwebtoken');
const secretKey = 'Pineaple';

const checkToken = async (token,id,key)=>{ 
    try{
        let decoded = await jwt.verify(token,key);
        if(decoded){
            if(decoded.id==id) return true;
        }
        return false;
    }catch(e){
        return false;
    }
}

const setToken = (idUser) => {
    const token = jwt.sign({ idUser: idUser }, secretKey, { expiresIn: '1h' }); // Expira em 1 hora
    return token;
};





module.exports = {
    checkToken,
    setToken
};
