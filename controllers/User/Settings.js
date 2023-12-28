import Settings from "../../models/Settings.js"


export  const UpdateVersion = async (req, res) => {


}

export  const getVersion = async (req, res) => {
    const data = await Settings.find()
    console.log("new update",data)
   return res.status(200).send(data);
    
}