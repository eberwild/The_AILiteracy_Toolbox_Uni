export const validateBlackBoardText = (text) => {

    // no empty input and not less than 20 characters
    if(!text || text.trim() === '' || text.trim().length < 20){
        return {
            status: false ,
            text: 'Please enter an entry with at least 20 characters.'
        }
    }

    return {
        status: true
    }
}