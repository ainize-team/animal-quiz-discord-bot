const eventName = 'ready';
const executeOnce = 'true';
const execute = async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
};

export { eventName as name, executeOnce as once, execute };
