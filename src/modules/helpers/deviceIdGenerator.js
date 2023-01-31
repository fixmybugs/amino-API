import crypto from 'crypto';

export default function generateDeviceId()
{
    const identifier = crypto.randomBytes(20);
    const key = Buffer.from('E7309ECC0953C6FA60005B2765F99DBBC965C8E9', 'hex');
    const hmac = crypto.createHmac('sha1', key);
    hmac.update(Buffer.concat([Buffer.from([0x19]), identifier]));
    return ('19' + identifier.toString('hex') + hmac.digest('hex')).toUpperCase();
}

