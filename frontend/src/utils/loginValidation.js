export const checkLoginInput = (input) => {

    // check if one of the inputs is empty
    if(!input.userEmail || !input.userPassword){
        return {
            status: false ,
            text: 'Please provide an email and a password.'
        }
    }

    // check if email is a valid email adress
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if(!emailRegex.test(input.userEmail)){
        return {
            status: false ,
            text: 'Please enter a valid email adress!'
        }
    }

    // return true for checked inputs
    return {
        status: true
    }

}