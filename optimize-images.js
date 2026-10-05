import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'imagens';
const outputDir = 'imagens';

// Garantir que o diretório de saída existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  console.log(`Encontradas ${imageFiles.length} imagens para otimizar\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const nameWithoutExt = path.parse(file).name;
    const webpPath = path.join(outputDir, `${nameWithoutExt}.webp`);

    try {
      // Obter tamanho original
      const stats = fs.statSync(inputPath);
      const originalSize = stats.size;

      // Converter para WebP
      await sharp(inputPath)
        .webp({ quality: 70, alphaQuality: 100 })
        .toFile(webpPath);

      // Obter tamanho do WebP
      const webpStats = fs.statSync(webpPath);
      const webpSize = webpStats.size;

      const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(2);

      console.log(`✅ ${file}`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
      console.log(`   WebP:     ${(webpSize / 1024).toFixed(2)} KB`);
      console.log(`   Redução:  ${reduction}%\n`);
    } catch (error) {
      console.error(`❌ Erro ao processar ${file}:`, error.message);
    }
  }
}

optimizeImages().catch(console.error);
