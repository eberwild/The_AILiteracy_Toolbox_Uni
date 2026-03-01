export const checkToolInput = async (object) => {

    // check name and set a default value
    const minNameLength = 3;
    if(object.name.trim() === '' || object.name < minNameLength){
        return {
            status: false ,
            text: `Please enter a name with a least ${minNameLength} characters.`
        }
    }

    // check email
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if(!object.email || !emailRegex.test(object.email)){
        return {
            status: false ,
            text: 'Please enter a valid email adress!'
        }
    }

    // check title 
    const minTitleLength = 6;
    if(!object.title || object.title.trim() === '' || object.title.trim().length < minTitleLength){
        return {
            status: false ,
            text: `Please enter a valid title with at least ${minTitleLength} characters.`
        };
    }

    // check type 
    const types = ["game" , "education" , "quiz" , "other"];
    if(!types.includes(object.type)){
        return {
            status: false ,
            text: 'Please select one type for your tool.'
        }
    }

    // check GitHub URL
    const gitRegex = /^https?:\/\/(www\.)?github\.com\/[^/\s]+\/[^/\s]+(\/.*)?$/;
    if(!object.gitURL || !gitRegex.test(object.gitURL)){
        return {
            status: false ,
            text: 'Please enter a valid GitHub Repository Link!'
        }
    }

    // check thumbnail URL
    // helper function to check if we can use the submitted thumbnail URL
    const isValidThumbnailURL = async (url) => {
    // 1. is the URL valid ?
    try {
        new URL(url);
    } catch {
        return false;
    }

    // 2. is the image able to be loaded ?
    return await new Promise((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);

        img.src = url;

        });
    };

    // await Thumbnail-Check
    const thumbnailValid = await isValidThumbnailURL(object.imgURL);
    if (!thumbnailValid) {
        return {
            status: false ,
            text: 'Please enter a valid thumbnail URL.'
        }
    }

    //check ageRecommandation
    if(!object.ageRecom ) {
        return {
            status: false ,
            text: 'Please select a age recommendation.'
        }
    }

    // check description
    const minDescriptionLength = 15;
    if(!object.description || object.description.trim().length < minDescriptionLength){
        return {
            status: false ,
            text: `Please enter a description of at least ${minDescriptionLength} characters!`
        }
    }

    //check checkbox
    if(!object.consent){
        return {
            status: false ,
            text: 'Please accept the consent.'
        }
    }

    // return true if every input is valid
    return {
        status: true 
    }

}