import crypto from 'crypto';
export function encodeToHash(data:string){
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update('_path_wall_path_wall').digest(); // 32 bytes key
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;

}

export function decodeHash(data:string){
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update('_path_wall_path_wall').digest(); // 32 bytes key
    const iv = crypto.randomBytes(16);
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
    
}


