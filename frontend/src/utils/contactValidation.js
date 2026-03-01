export const validateContact = (input) => {

    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if(!input.email || input.email.trim() === '' || !emailRegex.test(input.email)){
        return {
            status: false ,
            text: 'Please enter a valid email adress.'
        }
    }

    if(!input.message || input.message.trim() === ''){
        return {
            status: false ,
            text: 'Please enter a message..'
        }
    }

    const minMessageLength = 20;
    if(input.message.trim().length < minMessageLength){
        return {
            status: false ,
            text: 'Your message must be at least 20 characters long.'
        }
    }

    return {
        status: true
    }

}