

// const asyncHandeler =  (func) => async(req,res,next) => {
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(error.code||500).json({sucess:false,message:error.message})
//     }
// }


const asyncHandelar = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export default asyncHandelar;