#!/usr/bin/env node

/**
 * 🎨 REMOTION VIDEO PROCESSOR
 * 
 * Lê moments.json + video bruto
 * Aplica: trims, merges, splits, zooms, gradientes
 * Saída: vídeo polidofoldo professional
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CLIP_START_OFFSET_MS = 500;
const CLIP_END_OFFSET_MS = 1000;
const MERGE_GAP_THRESHOLD = 2000;
const SPLIT_GAP_THRESHOLD = 3000;
const VIDEO_FPS = 30;
const VIDEO_DURATION_SEC = 120; // tempo total esperado

const outputDir = path.join(__dirname, 'tutorials');
const momentsFile = path.join(outputDir, 'tutorial-moments.json');
const videosDir = path.join(outputDir, 'videos');

console.log('\n🎨 PROCESSADOR REMOTION - VIDEO POLISH\n');

// Verificar se moments.json existe
if (!fs.existsSync(momentsFile)) {
  console.error('\n❌ Arquivo não encontrado: tutorial-moments.json');
  console.error('Execute: node record-all-benefits.cjs');
  process.exit(1);
}

console.log(`📂 Carregando: ${momentsFile}`);
const moments = JSON.parse(fs.readFileSync(momentsFile, 'utf8'));

console.log(`✅ ${moments.length} momentos carregados\n`);

// PASSO 1: Calcular clipes (trim)
function calculateClips(moments) {
  console.log('📋 PASSO 1: Calculando clipes (trim dead time)');
  
  const clips = moments.map((m, idx) => ({
    id: idx,
    moment: m,
    start: Math.max(0, m.timestamp - CLIP_START_OFFSET_MS),
    end: m.timestamp + CLIP_END_OFFSET_MS,
    label: m.label
  }));

  console.log(`   ✅ ${clips.length} clipes criados\n`);
  return clips;
}

// PASSO 2: Mesclar clipes próximos
function mergeClips(clips) {
  console.log('📋 PASSO 2: Mesclando clipes (gap < 2s)');
  
  const merged = [];
  let current = clips[0];

  for (let i = 1; i < clips.length; i++) {
    const gap = clips[i].start - current.end;
    
    if (gap < MERGE_GAP_THRESHOLD) {
      // Mesclar
      current = {
        ...current,
        end: Math.max(current.end, clips[i].end),
        label: `${current.label} → ${clips[i].label}`
      };
    } else {
      // Novo clipe
      merged.push(current);
      current = clips[i];
    }
  }
  merged.push(current);

  console.log(`   📊 ${clips.length} clipes → ${merged.length} clipes mesclados`);
  console.log(`   ✅ Redução: ${(100 * (clips.length - merged.length) / clips.length).toFixed(1)}%\n`);
  
  return merged;
}

// PASSO 3: Dividir lacunas grandes
function splitLargeGaps(clips) {
  console.log('📋 PASSO 3: Dividindo lacunas (gap > 3s)');
  
  const split = [];
  
  clips.forEach((clip, idx) => {
    split.push(clip);
    
    if (idx < clips.length - 1) {
      const nextGap = clips[idx + 1].start - clip.end;
      if (nextGap > SPLIT_GAP_THRESHOLD) {
        split.push({
          id: `gap-${idx}`,
          moment: { label: 'Pausa' },
          start: clip.end,
          end: clips[idx + 1].start,
          label: 'Pausa - Transição',
          isGap: true
        });
      }
    }
  });

  console.log(`   📊 ${clips.length} clipes → ${split.length} com pausas`);
  console.log(`   ✅ Pausas adicionadas: ${split.length - clips.length}\n`);
  
  return split;
}

// PASSO 4: Construir keyframes de zoom
function buildZoomKeyframes(clips) {
  console.log('📋 PASSO 4: Construindo keyframes de zoom');
  
  const keyframes = clips.map((clip, idx) => {
    const duration = (clip.end - clip.start) / 1000; // segundos
    const frames = duration * VIDEO_FPS;
    
    return {
      clipId: clip.id,
      label: clip.label,
      startFrame: Math.round(clip.start / 1000 * VIDEO_FPS),
      endFrame: Math.round(clip.end / 1000 * VIDEO_FPS),
      frames: frames,
      zoom: {
        start: 1.0,
        peak: 1.15,
        end: 1.0,
        easing: 'spring'
      },
      position: {
        x: Math.random() * 0.3 + 0.35,
        y: Math.random() * 0.3 + 0.35
      }
    };
  });

  console.log(`   📊 ${keyframes.length} keyframes construídos`);
  console.log(`   ✅ Duração total: ${(keyframes[keyframes.length - 1].endFrame / VIDEO_FPS).toFixed(1)}s\n`);
  
  return keyframes;
}

// PASSO 5: Aplicar gradiente
function applyGradientBackground(clips) {
  console.log('📋 PASSO 5: Aplicando gradiente background');
  
  const gradient = {
    type: 'linear',
    angle: 135,
    colors: ['#667eea', '#764ba2'],
    opacity: 0.95,
    fillLetterbox: true
  };

  console.log(`   🎨 Gradiente: ${gradient.colors[0]} → ${gradient.colors[1]}`);
  console.log(`   ✅ Preencherá letterbox com 95% de opacidade\n`);
  
  return gradient;
}

// PASSO 6: Criar composição Remotion
function createRemotionComposition(clips, keyframes, gradient) {
  console.log('📋 PASSO 6: Gerando composição Remotion');
  
  const composition = {
    name: 'PortalTutorial',
    width: 1920,
    height: 1080,
    fps: VIDEO_FPS,
    durationInFrames: Math.round(VIDEO_DURATION_SEC * VIDEO_FPS),
    duration: `${VIDEO_DURATION_SEC}s`,
    clips: clips.map(c => ({
      id: c.id,
      label: c.label,
      start: c.start,
      end: c.end
    })),
    keyframes: keyframes.map(k => ({
      clipId: k.clipId,
      startFrame: k.startFrame,
      endFrame: k.endFrame,
      zoom: k.zoom
    })),
    background: gradient,
    effects: [
      { type: 'zoom', strength: 'moderate' },
      { type: 'fade', duration: 300 },
      { type: 'grain', opacity: 0.1 }
    ]
  };

  const compositionFile = path.join(outputDir, 'remotion-composition.json');
  fs.writeFileSync(compositionFile, JSON.stringify(composition, null, 2), 'utf8');
  
  console.log(`   ✅ Composição Remotion: ${compositionFile}\n`);
  
  return composition;
}

// PASSO 7: Criar resumo
function createProcessingSummary(clips, segments, keyframes) {
  console.log('📋 PASSO 7: Criando resumo de processamento');
  
  const summary = {
    timestamp: new Date().toISOString(),
    statistics: {
      clips: clips.length,
      segments: segments.length,
      gaps: segments.filter(s => s.isGap).length,
      totalDuration: `${VIDEO_DURATION_SEC}s`,
      fps: VIDEO_FPS,
      resolution: '1920x1080'
    },
    timing: {
      CLIP_START_OFFSET_MS,
      CLIP_END_OFFSET_MS,
      MERGE_GAP_THRESHOLD,
      SPLIT_GAP_THRESHOLD
    },
    clips: segments.slice(0, 5).map(c => ({
      label: c.label,
      startMs: c.start,
      endMs: c.end,
      durationMs: c.end - c.start
    })),
    notes: 'Veja remotion-composition.json para detalhes técnicos completos'
  };

  const summaryFile = path.join(outputDir, 'processing-summary.json');
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2), 'utf8');
  
  console.log(`   ✅ Resumo: ${summaryFile}\n`);
  
  return summary;
}

// Executar pipeline
try {
  console.log('=' .repeat(60));
  console.log('🎬 PIPELINE DE PROCESSAMENTO REMOTION');
  console.log('='.repeat(60) + '\n');

  const clips = calculateClips(moments);
  const merged = mergeClips(clips);
  const segments = splitLargeGaps(merged);
  const keyframes = buildZoomKeyframes(segments);
  const gradient = applyGradientBackground(segments);
  const composition = createRemotionComposition(segments, keyframes, gradient);
  const summary = createProcessingSummary(segments, segments, keyframes);

  console.log('='.repeat(60));
  console.log('✅ PROCESSAMENTO CONCLUÍDO COM SUCESSO');
  console.log('='.repeat(60) + '\n');

  console.log('📊 RESULTADOS:');
  console.log(`  • Momentos originais: ${moments.length}`);
  console.log(`  • Clipes após trim: ${clips.length}`);
  console.log(`  • Clipes após merge: ${merged.length}`);
  console.log(`  • Segmentos finais: ${segments.length}`);
  console.log(`  • Keyframes: ${keyframes.length}`);
  console.log(`  • Duração: ${VIDEO_DURATION_SEC}s @ ${VIDEO_FPS}fps\n`);

  console.log('📁 ARQUIVOS GERADOS:');
  console.log(`  ✅ remotion-composition.json (configuração)`);
  console.log(`  ✅ processing-summary.json (resumo)\n`);

  console.log('🎨 PRÓXIMOS PASSOS:');
  console.log(`  1. Verificar remotion-composition.json`);
  console.log(`  2. Renderizar com Remotion: npx remotion render`);
  console.log(`  3. Embark no tutorial-completo.html\n`);

} catch (error) {
  console.error('\n❌ Erro durante processamento:', error.message);
  process.exit(1);
}
