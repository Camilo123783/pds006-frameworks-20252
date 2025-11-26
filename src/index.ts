import { ElysiaApiAdapter } from "./adapter/api/elysia";
import { FileSystemPhotoRepository } from "./adapter/photo/filesystem";
import { InMemoryDeviceRepository } from "./adapter/repository/inmemory";
import { ComputerService, DeviceService, MedicalDeviceService } from "./core/service";
import { axiomLogger } from './utils/axiom-logger.util';

const deviceRepository = new InMemoryDeviceRepository()
const photoRepository = new FileSystemPhotoRepository()

const computerService = new ComputerService(
    deviceRepository, 
    photoRepository, 
    new URL("http://localhost:3000/api")
)

const deviceService = new DeviceService(deviceRepository)

const medicalDeviceService = new MedicalDeviceService(
    deviceRepository,
    photoRepository
)

const apiAdapter = new ElysiaApiAdapter(
    computerService,
    deviceService,
    medicalDeviceService
)

apiAdapter.app.get('/api/devices', async () => {
    await axiomLogger.info('GET /api/devices called');
    return { devices: [] };
})

apiAdapter.run()
