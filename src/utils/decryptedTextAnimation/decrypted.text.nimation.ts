let alreadyExecuted = false;

export const startDecryptAnimation = (originalTextContent: string, cycles = 5, executeOnce = false, callback: (value: (((prevState: string) => string) | string)) => void) => {
    let originalText = originalTextContent.split('').reverse();
    let decryptedText = "";
    let i = 0;

    if (executeOnce && alreadyExecuted) {
        return
    }

    let shuffleInterval = setInterval(async () => {
        alreadyExecuted = true
        let shuffledText = '';
        let j = originalText.length;
        while(j--) shuffledText += String.fromCharCode((Math.random()*94+33) | 0);
        if(i++ % cycles === 0 && originalText.length > 0) decryptedText += originalText.pop();
        const currentDescription = (decryptedText === undefined ? "" : decryptedText) + (shuffledText === undefined ? "" : shuffledText);
        callback(currentDescription);
        if(!shuffledText.length) clearInterval(shuffleInterval);
    },50);

}

/** experimental
export const useDescriptionAnimation = (initialState: string) => {
    const [state, setState] = useState(initialState);

    let originalText = initialState.split('').reverse();
    let decryptedText = "";
    let i = 0;

    let shuffleInterval = setInterval(function(){
        let shuffledText = '';
        let j = originalText.length;
        while(j--) shuffledText += String.fromCharCode((Math.random()*94+33) | 0);

        if(i++ % 3 === 0) decryptedText += originalText.pop();
        const currentDescription = decryptedText + shuffledText;
        setState(currentDescription)
        if(!shuffledText.length) clearInterval(shuffleInterval);
    },50);

    return [state, setState];
}
**/
