/**
 * Axiom Logger Tests
 * Verifica que los logs se envíen correctamente a Axiom
 */

import { axiomLogger } from './utils/axiom-logger.util';
import { axiomConfig } from './config/axiom.config';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testAxiomConnection(): Promise<void> {
  console.log('🔍 Probando conexión con Axiom...\n');

  // Verificar configuración
  console.log('📋 Configuración:');
  console.log(`  - Organización: ${axiomConfig.organization}`);
  console.log(`  - Dataset: ${axiomConfig.dataset}`);
  console.log(`  - Token: ${axiomConfig.token ? '✓ Configurado' : '✗ NO configurado'}`);
  console.log(`  - Endpoint: ${axiomConfig.endpoints.logs}/${axiomConfig.dataset}/ingest\n`);

  if (!axiomConfig.token) {
    console.error('❌ ERROR: AXIOM_TOKEN no está configurado');
    console.error('   Por favor, configura la variable de entorno AXIOM_TOKEN');
    process.exit(1);
  }
}

async function testLogLevels(): Promise<void> {
  console.log('📝 Enviando logs de prueba...\n');

  // Test INFO
  console.log('1️⃣  Enviando log INFO...');
  await axiomLogger.info('Test INFO: Aplicación iniciada correctamente');
  await sleep(500);

  // Test DEBUG
  console.log('2️⃣  Enviando log DEBUG...');
  await axiomLogger.debug('Test DEBUG: Información detallada de diagnóstico', {
    version: '1.0.0',
    environment: 'test',
    timestamp: new Date().toISOString(),
  });
  await sleep(500);

  // Test WARN
  console.log('3️⃣  Enviando log WARN...');
  await axiomLogger.warn('Test WARN: Advertencia de prueba', {
    severity: 'medium',
    component: 'test-suite',
  });
  await sleep(500);

  // Test ERROR
  console.log('4️⃣  Enviando log ERROR...');
  const testError = new Error('Test ERROR: Simulación de error para pruebas');
  await axiomLogger.error('Error de prueba capturado', testError);
  await sleep(500);

  console.log('\n✅ Todos los logs de prueba fueron enviados\n');
}

async function testDataStructure(): Promise<void> {
  console.log('📦 Enviando logs con diferentes estructuras de datos...\n');

  // Datos simples
  console.log('1️⃣  Log con datos simples...');
  await axiomLogger.info('Prueba de datos simples', {
    userId: '123',
    action: 'login',
    success: true,
  });
  await sleep(500);

  // Datos anidados
  console.log('2️⃣  Log con datos anidados...');
  await axiomLogger.info('Prueba de datos anidados', {
    request: {
      method: 'GET',
      path: '/api/devices',
      headers: { 'Content-Type': 'application/json' },
    },
    response: {
      status: 200,
      time: 125,
    },
  });
  await sleep(500);

  // Arrays
  console.log('3️⃣  Log con arrays...');
  await axiomLogger.info('Prueba con arrays', {
    items: ['device1', 'device2', 'device3'],
    counts: [10, 20, 30],
  });
  await sleep(500);

  console.log('✅ Logs con diferentes estructuras enviados\n');
}

async function testApiEndpoints(): Promise<void> {
  console.log('🌐 Simulando llamadas a endpoints...\n');

  const endpoints = [
    { method: 'GET', path: '/api/computers' },
    { method: 'GET', path: '/api/medicaldevices' },
    { method: 'GET', path: '/api/devices/entered' },
    { method: 'POST', path: '/api/computers', status: 201 },
  ];

  for (const endpoint of endpoints) {
    const logMessage = `API Request: ${endpoint.method} ${endpoint.path}`;
    const duration = Math.random() * 200 + 50;
    const status = endpoint.status || 200;

    await axiomLogger.info(logMessage, {
      method: endpoint.method,
      path: endpoint.path,
      status,
      duration: Math.round(duration),
      timestamp: new Date().toISOString(),
    });

    console.log(`  ✓ ${endpoint.method} ${endpoint.path} - ${status} (${Math.round(duration)}ms)`);
    await sleep(300);
  }

  console.log('\n✅ Simulación de endpoints completada\n');
}

async function testPerformance(): Promise<void> {
  console.log('⏱️  Prueba de rendimiento...\n');

  const iterations = 10;
  const startTime = Date.now();

  for (let i = 0; i < iterations; i++) {
    await axiomLogger.info(`Prueba de rendimiento ${i + 1}/${iterations}`, {
      iteration: i + 1,
      totalIterations: iterations,
    });
    console.log(`  ✓ Log ${i + 1}/${iterations} enviado`);
    await sleep(100);
  }

  const totalTime = Date.now() - startTime;
  const avgTime = totalTime / iterations;

  console.log(`\n⏱️  Resultados:`);
  console.log(`  - Tiempo total: ${totalTime}ms`);
  console.log(`  - Promedio por log: ${avgTime.toFixed(2)}ms`);
  console.log(`  - Logs por segundo: ${(1000 / avgTime).toFixed(2)}\n`);
}

async function testErrorHandling(): Promise<void> {
  console.log('⚠️  Prueba de manejo de errores...\n');

  // Error estándar
  console.log('1️⃣  Error estándar...');
  try {
    throw new Error('Simulación de error estándar');
  } catch (error) {
    await axiomLogger.error('Error capturado en try-catch', error);
  }
  await sleep(500);

  // Error customizado
  console.log('2️⃣  Error customizado...');
  class CustomError extends Error {
    constructor(message: string, public code: string) {
      super(message);
      this.name = 'CustomError';
    }
  }

  try {
    throw new CustomError('Error customizado de prueba', 'CUSTOM_001');
  } catch (error) {
    await axiomLogger.error('Error customizado capturado', error);
  }
  await sleep(500);

  console.log('✅ Pruebas de manejo de errores completadas\n');
}

async function printSummary(): Promise<void> {
  console.log('═'.repeat(60));
  console.log('📊 RESUMEN DE PRUEBAS');
  console.log('═'.repeat(60));
  console.log(`
✅ Pruebas completadas exitosamente

Los siguientes tipos de datos se han enviado a Axiom (${axiomConfig.dataset}):

1. Logs por nivel (INFO, DEBUG, WARN, ERROR)
2. Datos simples y anidados
3. Llamadas a API simuladas
4. Prueba de rendimiento (10 logs)
5. Manejo de errores

📍 Próximos pasos:
1. Ve a https://axiom.co/app
2. Accede a tu organización (${axiomConfig.organization})
3. Abre el dataset (${axiomConfig.dataset})
4. Filtra por "level" para ver los diferentes tipos de logs
5. Usa AQL queries para analizar los datos

📌 Ejemplos de queries en Axiom:
- level == "ERROR"
- level == "INFO" and message contains "API Request"
- status == 200
- duration > 100

═`.repeat(60));
}

async function runAllTests(): Promise<void> {
  console.log('\n🚀 INICIANDO SUITE DE PRUEBAS AXIOM\n');
  console.log('═'.repeat(60) + '\n');

  try {
    await testAxiomConnection();
    await testLogLevels();
    await testDataStructure();
    await testApiEndpoints();
    await testPerformance();
    await testErrorHandling();
    await printSummary();

    console.log('\n✅ ¡TODAS LAS PRUEBAS COMPLETADAS!\n');
    console.log('Verifica Axiom en algunos segundos para ver los logs...\n');
  } catch (error) {
    console.error('\n❌ Error durante las pruebas:', error);
    process.exit(1);
  }
}

// Ejecutar pruebas
runAllTests();
