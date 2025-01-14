import multer from 'multer';

export default {
  upload() {
    return {
      storage: multer.memoryStorage(), // Salva os arquivos na memória
    };
  },
};
