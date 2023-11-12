import otpGenerator from "otp-generator"

export const otpGenerate = () =>{
    const otpCode = otpGenerator.generate(6,
        {
            digits: true,
            lowerCaseAlphabets: true,
            upperCaseAlphabets: false,
            specialChars: false
        }
    )
    const now = new Date().getTime()
    const _expirationTime = new Date(now + 10 * 60000)
    return {otp: otpCode, expirationTime: _expirationTime}
}