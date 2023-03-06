
export default function checkAminoAPIStatusCode(data){

    let code = data['api:statuscode'];
    if(code !== 0){
        console.error(data['api:message']);
    }
}

