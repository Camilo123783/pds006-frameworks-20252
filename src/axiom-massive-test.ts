import { axiomLogger } from './utils/axiom-logger.util';

async function runMassiveStressTest() {
  console.log('🚀 Iniciando prueba masiva con 5000 iteraciones...\n');
  
  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;

  for (let i = 1; i <= 5000; i++) {
    try {
      const logType = ['INFO', 'DEBUG', 'WARN', 'ERROR'][Math.floor(Math.random() * 4)];
      
      const testData = {
        iteration: i,
        timestamp: new Date().toISOString(),
        random: Math.random(),
        testId: `massive-test-${i}`,
        userId: `user-${Math.floor(Math.random() * 1000)}`,
        duration: Math.floor(Math.random() * 10000),
        endpoint: ['/api/devices', '/api/computers', '/api/medicaldevices'][Math.floor(Math.random() * 3)],
        status: [200, 201, 400, 404, 500][Math.floor(Math.random() * 5)],
        responseTime: Math.floor(Math.random() * 2000),
      };

      switch (logType) {
        case 'INFO':
          await axiomLogger.info(`Massive test iteration ${i}/5000`, testData);
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

      // Mostrar progreso cada 100 iteraciones
      if (i % 100 === 0) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        const rate = (i / Number(elapsed)).toFixed(0);
        console.log(`✅ ${i}/5000 - ${elapsed}s (${rate} eventos/s)`);
      }

      // Pausa mínima para no bloquear
      if (i % 5 === 0) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }

    } catch (error) {
      errorCount++;
      console.error(`❌ Error en iteración ${i}:`, error);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const avgTime = (Number(totalTime) / 5000).toFixed(4);

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESULTADOS DE PRUEBA MASIVA');
  console.log('='.repeat(60));
  console.log(`✅ Exitosas: ${successCount}/5000`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`⏱️  Tiempo total: ${totalTime}s`);
  console.log(`⚡ Promedio por iteración: ${avgTime}s`);
  console.log(`📈 Throughput: ${(5000 / Number(totalTime)).toFixed(2)} eventos/segundo`);
  console.log('='.repeat(60));
  console.log('\n✨ Los 5000 eventos deberían estar visibles en tu dashboard de Axiom');
  console.log('📊 Ve a: https://axiom.co/app → devops dataset');
  console.log('💡 Recarga la página si aún no ves los datos después de 10 segundos');
}

runMassiveStressTest().catch(console.error);
