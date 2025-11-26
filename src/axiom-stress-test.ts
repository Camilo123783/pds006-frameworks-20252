import { axiomLogger } from './utils/axiom-logger.util';

async function runStressTest() {
  console.log('🚀 Iniciando prueba de estrés con 500 iteraciones...\n');
  
  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;

  for (let i = 1; i <= 500; i++) {
    try {
      const logType = ['INFO', 'DEBUG', 'WARN', 'ERROR'][Math.floor(Math.random() * 4)];
      
      const testData = {
        iteration: i,
        timestamp: new Date().toISOString(),
        random: Math.random(),
        testId: `stress-test-${i}`,
        userId: `user-${Math.floor(Math.random() * 100)}`,
        duration: Math.floor(Math.random() * 5000),
      };

      switch (logType) {
        case 'INFO':
          await axiomLogger.info(`Stress test iteration ${i}/500`, testData);
          break;
        case 'DEBUG':
          await axiomLogger.debug(`Debug data for iteration ${i}`, testData);
          break;
        case 'WARN':
          await axiomLogger.warn(`Warning at iteration ${i}`, testData);
          break;
        case 'ERROR':
          await axiomLogger.error(`Error simulation ${i}`, new Error(`Test error ${i}`));
          break;
      }

      successCount++;

      // Mostrar progreso cada 50 iteraciones
      if (i % 50 === 0) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ ${i}/500 - ${elapsed}s`);
      }

      // Pequeña pausa para no sobrecargar
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

    } catch (error) {
      errorCount++;
      console.error(`❌ Error en iteración ${i}:`, error);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const avgTime = (Number(totalTime) / 500).toFixed(3);

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESULTADOS DE PRUEBA DE ESTRÉS');
  console.log('='.repeat(50));
  console.log(`✅ Exitosas: ${successCount}/500`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`⏱️  Tiempo total: ${totalTime}s`);
  console.log(`⚡ Promedio por iteración: ${avgTime}s`);
  console.log(`📈 Throughput: ${(500 / Number(totalTime)).toFixed(2)} eventos/segundo`);
  console.log('='.repeat(50));
  console.log('\n✨ Los 500 eventos deberían estar visibles en tu dashboard de Axiom');
  console.log('📊 Ve a: https://axiom.co/app → devops dataset');
}

runStressTest().catch(console.error);
