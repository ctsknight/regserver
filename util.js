const {
    createCipheriv,
    scryptSync,
    createDecipheriv
  } = require('node:crypto');
  
  const { Buffer } = require('node:buffer');
  const algorithm = 'aes-192-cbc';
  const password = 'Password used to generate key';
  
  var encrypted = "";
  // First, we'll generate the key. The key length is dependent on the algorithm.
  // In this case for aes192, it is 24 bytes (192 bits).

  const key = scryptSync(password, 'salt', 24);
  // The IV is usually passed along with the ciphertext.
  const iv = Buffer.alloc(16, 0); // Initialization vector.
  
  const decipher = createDecipheriv(algorithm, key, iv);
  const cipher = createCipheriv(algorithm, key, iv);

  cipher.setEncoding('hex');

  cipher.on('data', (chunk) => encrypted += chunk);
  cipher.on('end', () => console.log(encrypted));

  plain_text = 'some clear 111 text data';

  let decrypted = '';
  decipher.on('readable', () => {
    let chunk;
    while (null !== (chunk = decipher.read())) {
      decrypted += chunk.toString('utf8');
    }
  });
  decipher.on('end', () => {
    console.log(decrypted);
    // Prints: some clear text data
  });

  cipher.write(plain_text);
  cipher.end();
  decipher.write(encrypted, 'hex');
  decipher.end();
/*
  // Encrypted with same algorithm, key and iv.
  //const encrypted = 'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
  decipher.write(encrypted, 'hex');
  decipher.end();
  */