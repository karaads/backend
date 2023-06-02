import pkg from 'jsonwebtoken';

export const ValidateToken = async (req, res, next)=>{
    const jwt  = pkg;
    let token  
    let authHeader = req.headers.Authorization || req.headers.authorization;
    // console.log(authHeader)
    if(authHeader){
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
        jwt.verify(
            token,'mayorgnn@088',(err, decoded)=>{
                if(err){
                     return res.status(401).json({msg: 'User is not Authorized'})

                }
                req.user = decoded.user.data;
                next()
            })

            if(token == undefined || token == null){
                return res.status(401).json({msg: 'User is not Authorized'})
            }
    }
}else{
  
       return res.status(401).json({msg: 'User is not Authorized'}) 
    
    
}

   
}