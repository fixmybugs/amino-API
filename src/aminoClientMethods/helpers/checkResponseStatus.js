

export default function checkResponseStatus(data){

    let code = data['api:statuscode'];

    if (code !== 0) {
        return {
            success: false,
            APIMessage: data['api:message'],
        }
    }

    return {
        success: true
    }
}
