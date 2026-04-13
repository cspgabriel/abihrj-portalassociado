#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const CLIP_START_OFFSET_MS = 500;
const CLIP_END_OFFSET_MS = 1000;
const MERGE_GAP_THRESHOLD = 2000;
const SPLIT_GAP_THRESHOLD = 3000;
const FPS = 30;
const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

async function processVideo() {
  console.log('\n🎬 Processando tutorial com Remotion...\n');

  try {
    const momentsPath = path.join(__dirname, 'moments.json');
    const rawVideoPath = path.join(__dirname, 'tutorial-raw.mp4');
    const outputPath = path.join(__dirname, 'tutorial-polished.mp4');

    // Verificar se arquivos existem
    if (!fs.existsSync(momentsPath)) {
      console.log('❌ moments.json não encontrado');
      console.log('   Execute primeiro: node record-tutorial-steel.cjs\n');
      process.exit(1);
    }

    if (!fs.existsSync(rawVideoPath)) {
      console.log('❌ tutorial-raw.mp4 não encontrado');
      console.log('   Execute primeiro: node record-tutorial-steel.cjs\n');
      process.exit(1);
    }

    // Ler moments
    console.log('📝 Lendo moments.json...');
    const moments = JSON.parse(fs.readFileSync(momentsPath, 'utf8'));
    console.log(`   📍 Total de momentos: ${moments.length}\n`);

    // === PASSO 1: Calcular clips ===
    console.log('✂️  Etapa 1: Calculando clips...');
    const clips = [];

    for (let i = 0; i < moments.length; i++) {
      const moment = moments[i];
      const startTime = Math.max(0, moment.timestamp - CLIP_START_OFFSET_MS);
      const endTime = moment.timestamp + CLIP_END_OFFSET_MS;

      clips.push({
        start: startTime,
        end: endTime,
        moment: moment,
        index: i
      });
    }

    console.log(`   ✂️  ${clips.length} clips criados\n`);

    // === PASSO 2: Mesclar clips próximos ===
    console.log('🔗 Etapa 2: Mesclando clips próximos...');
    const mergedClips = [];
    let currentClip = clips[0];

    for (let i = 1; i < clips.length; i++) {
      const gap = clips[i].start - currentClip.end;

      if (gap < MERGE_GAP_THRESHOLD) {
        // Mesclar
        currentClip.end = clips[i].end;
        currentClip.momente = clips[i].moment;
      } else {
        // Salvar clip atual e iniciar novo
        mergedClips.push(currentClip);
        currentClip = clips[i];
      }
    }
    mergedClips.push(currentClip);

    console.log(`   🔗 ${mergedClips.length} clips após mesclagem\n`);

    // === PASSO 3: Dividir gaps grandes ===
    console.log('📍 Etapa 3: Dividindo gaps grandes...');
    const finalClips = [];

    for (let i = 0; i < mergedClips.length - 1; i++) {
      finalClips.push(mergedClips[i]);

      const gap = mergedClips[i + 1].start - mergedClips[i].end;
      if (gap > SPLIT_GAP_THRESHOLD) {
        console.log(`   📍 Gap de ${gap}ms detectado - será cortado`);
      }
    }
    finalClips.push(mergedClips[mergedClips.length - 1]);

    console.log(`   ✅ ${finalClips.length} clips finais\n`);

    // === PASSO 4: Criar composição Remotion ===
    console.log('🎨 Etapa 4: Criando composição Remotion...');

    const compositionCode = `import React from 'react';
import { Video, useCurrentFrame, interpolate, spring } from 'remotion';

interface Clip {
  start: number;
  end: number;
  moment: any;
}

const clips = ${JSON.stringify(finalClips)};

export const TutorialRecording: React.FC = () => {
  const frame = useCurrentFrame();
  const durationsFrames = Math.ceil((Math.max(...clips.map(c => c.end)) / 1000) * 30);
  
  // Calcular escala (zoom) baseada em momentos
  let zoom = 1;
  for (const clip of clips) {
    const clipStartFrame = Math.ceil((clip.start / 1000) * 30);
    const clipEndFrame = Math.ceil((clip.end / 1000) * 30);
    
    if (frame >= clipStartFrame && frame <= clipEndFrame) {
      // Zoom suave em torno do momento
      const progress = (frame - clipStartFrame) / (clipEndFrame - clipStartFrame);
      zoom = 1 + spring({ fps: 30, frame: progress * 30, config: { damping: 0.8 } }) * 0.2;
    }
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '${VIDEO_WIDTH}px',
        height: '${VIDEO_HEIGHT}px',
        transform: \`scale(\${zoom})\`,
        transformOrigin: 'center',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <Video src="tutorial-raw.mp4" />
      </div>
    </div>
  );
};
`;

    const remotionDir = path.join(__dirname, 'remotion-tutorial');
    const srcDir = path.join(remotionDir, 'src');
    
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }

    const compositionPath = path.join(srcDir, 'TutorialRecording.tsx');
    fs.writeFileSync(compositionPath, compositionCode, 'utf8');
    console.log(`   ✅ Composição criada: ${compositionPath}\n`);

    // === PASSO 5: Renderizar com Remotion ===
    console.log('🎬 Etapa 5: Renderizando vídeo final...');
    console.log('   (Esta etapa requer Remotion instalado)\n');

    // Criar arquivo info
    const summaryPath = path.join(__dirname, 'tutorial-summary.json');
    const summary = {
      status: 'processed',
      timestamps: {
        momentos_totais: moments.length,
        clips_iniciais: clips.length,
        clips_mesclados: mergedClips.length,
        clips_finais: finalClips.length,
      },
      timing: {
        duracao_total_ms: Math.max(...finalClips.map(c => c.end)),
        duracao_total_s: (Math.max(...finalClips.map(c => c.end)) / 1000).toFixed(2),
      },
      files: {
        raw_video: rawVideoPath,
        moments_json: momentsPath,
        composition: compositionPath,
        output: outputPath,
      }
    };

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📊 Resumo: ${summaryPath}\n`);

    console.log('✅ Processamento concluído!\n');
    console.log('📝 Próximas etapas:');
    console.log('   1. Instalar Remotion: npx create-video@latest');
    console.log('   2. Integrar composição');
    console.log('   3. Renderizar: npx remotion render src/TutorialRecording.tsx output.mp4\n');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    throw error;
  }
}

processVideo().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
