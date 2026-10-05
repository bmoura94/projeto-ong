import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'imagens';
const outputDir = 'imagens';

// Garantir que o diretório de saída existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const breakpoints = [
  { width: 480, suffix: '-sm' },
  { width: 768, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: null, suffix: '' }
];

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  console.log(`Encontradas ${imageFiles.length} imagens para otimizar\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const nameWithoutExt = path.parse(file).name;

    console.log(`📸 Processando ${file}...\n`);

    try {
      const stats = fs.statSync(inputPath);
      const originalSize = stats.size;

      for (const bp of breakpoints) {
        const webpFileName = bp.width
          ? `${nameWithoutExt}${bp.suffix}.webp`
          : `${nameWithoutExt}.webp`;
        const webpPath = path.join(outputDir, webpFileName);

        let transformer = sharp(inputPath);
        if (bp.width) {
          transformer = transformer.resize(bp.width, null, { withoutEnlargement: true });
        }

        await transformer
          .webp({ quality: 70, alphaQuality: 100 })
          .toFile(webpPath);

        const webpStats = fs.statSync(webpPath);
        const webpSize = webpStats.size;
        const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(2);

        const sizeLabel = bp.width ? `${bp.width}px` : 'Full';
        console.log(`   ✅ ${webpFileName}`);
        console.log(`      Tamanho: ${(webpSize / 1024).toFixed(2)} KB`);
        console.log(`      Redução: ${reduction}%\n`);
      }
    } catch (error) {
      console.error(`❌ Erro ao processar ${file}:`, error.message);
    }
  }
}

optimizeImages().catch(console.error);
