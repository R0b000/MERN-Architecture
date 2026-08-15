export const Features = {
  redisEnabled: process.env.ENABLE_REDIS === 'true',
  smtpEnabled: process.env.ENABLE_SMTP === 'true',
  storageProvider: process.env.STORAGE_PROVIDER || 'local',
};
