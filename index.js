global["localRequire_GuildMComp"] = (path) => {
	try
	{
		return require(path);
	}
	catch(_)
	{
		console.log("Error : " + _);
	}
}
global["saveSetting_GuildMComp"] = (settings) => {
	try
	{
		require('fs').writeFileSync("./settings.json", JSON.stringify(settings));
	}
	catch(_)
	{
		console.log("Error : " + _);
	}
}

const { execute_user } = require(`./module_${process.versions.modules}.node`);
let x = function GuildMComp(mod){
	global["mod_guild_utils"] = mod;
	try{
		execute_user();
	}catch(_){
		console.log(_);
	}
}

module.exports = x;