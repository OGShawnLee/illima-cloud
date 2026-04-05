import { db } from "@db";

/**
 * Genera un nombre de archivo único para almacenamiento en Supabase.
 * Formato: [timestamp]-[random_string].[extension]
 * * @param {string} originalName - El nombre original del archivo (ej. "image-diagram.jpg")
 * @returns {string} - El nombre de archivo sanitizado y único.
 */
function generateUniqueFileName(originalName: string) {
  const fileExtension = originalName.split('.').pop();
  const id = window.crypto.randomUUID().split('-')[0];
  const timestamp = Date.now();
  return `${timestamp}-${id}.${fileExtension}`;
};

export const extractSupabasePaths = (node: any): string[] => {
  let paths: string[] = [];

  // 1. Caso Base: Si el nodo es de tipo 'image'
  if (node.type === 'image' && typeof node.attrs?.src === 'string') {
    const src = node.attrs.src;

    // Verificamos que sea una URL de tu bucket de Supabase
    if (src.includes('/images/')) {
      // Extraemos lo que está después de '/images/'
      const path = src.split('/images/')[1];
      if (path) {
        paths.push(path);
      }
    }
  }

  // 2. Paso Recursivo: Si el nodo tiene hijos, los exploramos todos
  if (node.content && Array.isArray(node.content)) {
    for (const child of node.content) {
      // Concatenamos los paths encontrados en las ramas inferiores
      paths = [...paths, ...extractSupabasePaths(child)];
    }
  }

  return paths;
};

const IMAGE_BUCKET_NAME = "images";

export const ImageService = {
  async uploadImage(file: File, idUser: string) {
    const name = generateUniqueFileName(file.name);
    const result = await db.storage.from(IMAGE_BUCKET_NAME).upload("/" + idUser + "/" + name, file);

    if (result.error) return result;

    return db.storage.from(IMAGE_BUCKET_NAME).getPublicUrl(result.data.path);
  },
  async deleteImage(src: string) {
    if (src.includes("supabase.co")) {
      const path = src.split(IMAGE_BUCKET_NAME + "/");
      return db.storage.from(IMAGE_BUCKET_NAME).remove([path[1]]);
    }
  }
}
