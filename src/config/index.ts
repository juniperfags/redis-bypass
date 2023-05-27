const configuration = () => ({
  REDIS_CLIENT_URL: process.env.REDIS_CLIENT_URL,
  WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
  REDIS_HASH_KEY: process.env.HASH_KEY,
  HTTP_PORT: process.env.HTTP_PORT,
});

export default configuration;
