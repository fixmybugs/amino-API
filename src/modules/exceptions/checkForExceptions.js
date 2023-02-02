
export default function checkForExeptions(data){

    let code = data['api:statuscode'];
    if(code !== 0){
        throw new Error(data['api:message']);
    }
}

