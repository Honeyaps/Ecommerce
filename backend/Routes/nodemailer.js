const nodemailer = require("nodemailer");
require("dotenv").config()

function sendEmail ({ email,OTP }) {
    return new Promise((resolve, reject)=>{
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        var mailConfig = {
            from: process.env.EMAIL,
            to: email,
            subject: "PASSWORD RECOVERY",
            html: `<p>Give permission to change your BluOrn account password.<br/>
            Do not share the otp with anyone </p> 
            <p>Hello, ${email}</p> 
            <p>Your OTP: ${OTP} </p>`
        }

        transporter.sendMail(mailConfig,(error,info) => {
            if(error){
                reject({msg: "ERROR"})
            }else{
                resolve({msg: "OTP sent"})
            }
        })
    });
}

module.exports = {sendEmail};