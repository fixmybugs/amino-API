import crypto from 'crypto';

export default function generateSignature(data) {
    const mac = crypto.createHmac('sha1', Buffer.from('DFA5ED192DDA6E88A12FE12130DC6206B1251E44', 'hex'));
    mac.update(data);
    return Buffer.concat([Buffer.from([0x19]), mac.digest()]).toString('base64');
}
