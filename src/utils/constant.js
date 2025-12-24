export const isEmailOrPhoneNumber = (emailOrPhoneNumber) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const phonePattern = /^[0-9]{10}$/

    if (emailPattern.test(emailOrPhoneNumber)) {
        return { status: true, type: "email" }
    } else if (phonePattern.test(emailOrPhoneNumber)) {
        return { status: true, type: "number" }
    } else {
        return { status: false, type: null }
    }
}