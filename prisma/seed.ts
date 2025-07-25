import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  // Create Cameras
  const cameras = await prisma.camera.createMany({
    data: [
      { name: 'Camera 01', location: 'Shop Floor A' },
      { name: 'Camera 02', location: 'Vault' },
      { name: 'Camera 03', location: 'Entrance' },
    ],
  });

  // Fetch created cameras to use their IDs
  const allCameras = await prisma.camera.findMany();

  const now = new Date();
  const hoursAgo = (n: number) => new Date(now.getTime() - n * 60 * 60 * 1000);

  // Create Incidents
  await prisma.incident.createMany({
    data: [
      {
        cameraId: allCameras[0].id,
        type: 'Unauthorised Access',
        tsStart: hoursAgo(3),
        tsEnd: hoursAgo(2.9),
        thumbnailUrl: '/thumbnails/unauth1.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[0].id,
        type: 'Gun Threat',
        tsStart: hoursAgo(2.5),
        tsEnd: hoursAgo(2.4),
        thumbnailUrl: '/thumbnails/gun1.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[1].id,
        type: 'Face Recognised',
        tsStart: hoursAgo(5),
        tsEnd: hoursAgo(4.9),
        thumbnailUrl: '/thumbnails/face1.jpg',
        resolved: true,
      },
      {
        cameraId: allCameras[2].id,
        type: 'Unauthorised Access',
        tsStart: hoursAgo(1.2),
        tsEnd: hoursAgo(1.1),
        thumbnailUrl: '/thumbnails/unauth2.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[1].id,
        type: 'Gun Threat',
        tsStart: hoursAgo(6),
        tsEnd: hoursAgo(5.9),
        thumbnailUrl: '/thumbnails/gun2.jpg',
        resolved: true,
      },
      {
        cameraId: allCameras[2].id,
        type: 'Face Recognised',
        tsStart: hoursAgo(4),
        tsEnd: hoursAgo(3.9),
        thumbnailUrl: '/thumbnails/face2.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[1].id,
        type: 'Gun Threat',
        tsStart: hoursAgo(7),
        tsEnd: hoursAgo(6.9),
        thumbnailUrl: '/thumbnails/gun3.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[0].id,
        type: 'Unauthorised Access',
        tsStart: hoursAgo(8),
        tsEnd: hoursAgo(7.9),
        thumbnailUrl: '/thumbnails/unauth3.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[2].id,
        type: 'Face Recognised',
        tsStart: hoursAgo(9),
        tsEnd: hoursAgo(8.9),
        thumbnailUrl: '/thumbnails/face3.jpg',
        resolved: true,
      },
      {
        cameraId: allCameras[0].id,
        type: 'Gun Threat',
        tsStart: hoursAgo(10),
        tsEnd: hoursAgo(9.9),
        thumbnailUrl: '/thumbnails/gun4.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[1].id,
        type: 'Unauthorised Access',
        tsStart: hoursAgo(11),
        tsEnd: hoursAgo(10.9),
        thumbnailUrl: '/thumbnails/unauth4.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[2].id,
        type: 'Face Recognised',
        tsStart: hoursAgo(12),
        tsEnd: hoursAgo(11.9),
        thumbnailUrl: '/thumbnails/face4.jpg',
        resolved: false,
      },
      {
        cameraId: allCameras[1].id,
        type: 'Gun Threat',
        tsStart: hoursAgo(13),
        tsEnd: hoursAgo(12.9),
        thumbnailUrl: '/thumbnails/gun5.jpg',
        resolved: false,
      }
    ],
  });

  console.log('✅ Seeded database with cameras and incidents.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
