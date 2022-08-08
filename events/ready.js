const name = 'ready';
const once = 'true';
const execute = async function(client){
  console.log(`Ready! Logged in as ${client.user.tag}`);
}

export {
  name,
  once,
  execute,
};
