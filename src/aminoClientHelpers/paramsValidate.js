export default function validateParams(paramConfig) {

   let paramNames = Object.keys(paramConfig);
   let errorMessages = [];

   paramNames.forEach((name)=>{
    
    let {expectedType, required, value} = paramConfig[name];

    if(!required && typeof value === 'undefined') return;

    if(required && !value) errorMessages.push(`{ ${name} } is a required param\n`);

    if(typeof value !== expectedType) errorMessages.push(`{ ${name} } must be of type ${expectedType}\n`);

    
   });

   let message = errorMessages.toString();
   if(errorMessages.length !== 0) throw new Error(message);
}