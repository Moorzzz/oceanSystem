const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "-";
const dev = ["410778583682777098", "316324088865882142"];

// Other
client.on("ready", async() => {
    client.user.setGame("Loading...");
    console.log(`Logged in as ${client.user.tag}.`);
    setTimeout(() => {
client.user.setActivity("'Ocean Network.", {type: "WATCHING"});
    }, 5000);
});

// Command - Status
client.on("message", async message => {
    if(!dev[message.author.id]) return;
    var cmd = message.content.split(" ")[0];
    command = prefix.length;
    var args = message.content.split(" ").slice(1).join(" ");
if(cmd == "username") {
    var coolDown = new Set();
    if(!args) return;
if(coolDown.has(message.author.id)) return message.channel.send("You can only change bot's username once per hour.");
client.user.setUsername(args);
    message.channel.send(`**:white_check_mark:: ${args}`);
    setTimeout(() => {
coolDown.remove(message.author.id);
    }, 1000 * 60 * 60);

}
if(cmd == "avatar") {
    if(!args) return;
if(!args.includes("https://")) return;
client.user.setAvatar(args);
    message.channel.send(`**:white_check_mark::`, {file: args});
}
if(cmd == "stream") {
    if(!args) return;
client.user.setGame(args, "https://twitch.tv/9ivv");
    message.channel.send(`**:white_check_mark:: ${args}`);
}
if(cmd == "watch") {
    if(!args) return;
client.user.setActivity(args, {type: "WATCHING"});
    message.channel.send(`**:white_check_mark:: ${args}`);
}
if(cmd == "listen") {
    if(!args) return;
client.user.setActivity(args, {type: "LISTENING"});
    message.channel.send(`**:white_check_mark:: ${args}`);
}
if(cmd == "play") {
    if(!args) return;
client.user.setActivity(args, {type: "PLAYING"});
    message.channel.send(`**:white_check_mark:: ${args}`);
}

});

// Command - clear
client.on("message", async message => {
    if(!message.guild) return;
if(message.content.startsWith(prefix + "clear")) {
    var args = message.content.split(" ").slice(1).join(" ");
if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
       
 if(!args) {
    args = 100;
}
if(isNaN(args)) {
    return message.channel.send("Messages must be a number.").then(m => m.delete(3000));
}
message.channel.bulkDelete(args).then(message.channel.send(`\`\`\`md\n# Cleard ${args} Messages.\n\`\`\``).then(m => m.delete(3000)));
}
});

// Command - bans
client.on('message', message => {
    if (message.content.startsWith(prefix + "bans")) {
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return;
message.guild.fetchBans().then(bans => {
    let banz = bans.map(m => `${m}`).join("\n");
    const ban = new Discord.RichEmbed()
.setColor('RED') 
.setTitle(`**${bans.size} Bans.**`)
.setDescription(`**${banz}**`)
message.channel.sendEmbed(ban);
});
    }
});

// Command - move, move all
client.on("message", message => {
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
if(!message.channel.guild) return;
if(message.author.bot) return;

if(command == "move") {
    if(!message.guild.member(message.author.id).hasPermission("MOVE_MEMBERS"))return;
    if(!message.guild.member(message.author.id).voiceChannel) {
return message.channel.send("**You have to be in a voicechannel.**");
    }
    var userM = message.mentions.users.first();
    if(!userM) {
return message.channel.send(`**Usage: \`${prefix}move <User>\``);
    }
    if(!message.guild.member(userM.id).voiceChannel) {
return message.channel.send("**This user has to be in a voicechannel.**");
    }
    if(message.guild.member(userM.id).hasPermission("ADMINISTRATOR")) {
return message.channel.send("**You can't move an Administrator.**");
    }
    if(!message.guild.member(message.author.id).highestRole <= message.guild.member(userM.id).highestRole) {
return message.channel.send("**This user is higher role than you.**");
    }
    message.channel.send(`**${userM.username}** Has been moved to **${message.guild.member(message.author.id).voiceChannel.name}** by **${message.author.username}**`);
    message.guild.member(userM.id).setVoiceChannel(message.guild.member(message.author.id).voiceChannel);

}
if(command == "move all") {
    if(!message.guild.member(message.author.id).hasPermission("MOVE_MEMBERS"))return;
    if(!message.guild.member(message.author.id).voiceChannel) {
return message.channel.send("**You have to be in a voicechannel.**");
    }
message.guild.members.filter(m => m.voiceChannel && !m.hasPermission("ADMINISTRATOR") && !m.highestRole >= message.guild.member(message.author.id).highestRole && !m.user.bot).forEach(member => {
    member.setVoiceChannel(message.guild.member(message.author.id).voiceChannel);
message.channel.send(`**${message.guild.members.filter(m => m.voiceChannel && !m.hasPermission("ADMINISTRATOR") && !m.highestRole >= message.guild.member(message.author.id).highestRole && !m.user.bot).size}** Members Has been moved to **${message.guild.member(message.author.id).voiceChannel.name}** by **${message.author.username}**`);
});
}
});

// Command - bc, obc
client.on("message", async message => {
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    if(!message.channel.guild) return;
    if(message.author.bot) return;
    var args = message.content.split(" ").slice(1).join(" ");
    const embed = new Discord.RichEmbed()
  .setColor('RED') 
    .setTitle(`**Usage.**`)
    .setDescription(`\`${prefix}bc <message>\` ~ Broadcast Message For All Members.\n\`${prefix}obc <message>\` ~ Broadcast Message For Online Members.`)
    .setFooter(message.author.username, message.author.displayAvatarURL);
    if(command == "bc") {
if(!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR")) return;
if(!args) return message.channel.sendEmbed(embed);
    message.guild.members.filter(m => !m.user.bot).forEach(member => {
var bc = args.replace("[user]", member);
member.send(bc);
if(message.attachments.first()) {
    member.sendFile(message.attachments.first().url).catch();
}
    });
    }
    if(command == "obc") {
if(!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR")) return;
    
    if(!args) return message.channel.sendEmbed(embed);
    message.guild.members.filter(m => m.user.presence.status !== "offline" && !m.user.bot).forEach(member => {
var obc = args.replace("[user]", member);
member.send(obc);
if(message.attachments.first()) {
    member.sendFile(message.attachments.first().url).catch();
}
    
    });
    }
    });

// Command - hidec, showc
    client.on('message', message => {

if(message.content === prefix + "hidec") {
if(!message.channel.guild) return;
if(!message.member.hasPermission('ADMINISTRATOR')) return;
       message.channel.overwritePermissions(message.guild.id, {
       READ_MESSAGES: false
   })
message.channel.send('Channel Is Now Hidden! :white_check_mark:  ')
   }
  });

  client.on('message', message => {

    if(message.content === prefix + "showc") {
    if(!message.channel.guild) return;
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':x:');
   message.channel.overwritePermissions(message.guild.id, {
   READ_MESSAGES: true
})
    message.channel.send('Channel Is Now Visible For Everyone! :white_check_mark: ');
}
});

// Command - mute, unmute
client.on('message', async function(message) {
    if(!message.channel.guild) return;    let messageArray = message.content.split(' ');
       let muteRole =  message.guild.roles.find('name', 'Muted');
       let muteMember = message.mentions.members.first();
       let muteReason = messageArray[2];
       let muteDuration = messageArray[3];
    if (message.content.split(" ")[0].toLowerCase() === prefix + "mute") {
       
     if (message.author.bot) return;
  if(!muteRole) return message.guild.createRole({name: 'Muted'}).then(message.guild.channels.forEach(chan => chan.overwritePermissions(muteRole, {SEND_MESSAGES:false,ADD_REACTIONS:false})));
  if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : You Need `` MANAGE_ROLES ``Permission ');
  if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : I Don’t Have `` MANAGE_ROLES ``Permission ');
  if(!muteMember) return message.channel.send(' Error : ``Mention a User``').then(message => message.delete(4000))
  if(!muteReason) return message.channel.send(' Error : ``Supply a Reason``').then(message => message.delete(4000))
  if(!muteDuration) return message.channel.send(' Error : `` Supply Mute Time `` \n Ex: #mute @user reason 1m ').then(message => message.delete(4000))
  if(!muteDuration.match(/[1-7][s,m,h,d,w]/g)) return message.channel.send(' Error : `` Invalid Mute Duration``').then(message => message.delete(4000))
  message.channel.send(`${muteMember} Has Been Muted.`).then(message => message.delete(5000))
  muteMember.addRole(muteRole);
  muteMember.setMute(true)
  .then(() => { setTimeout(() => {
      muteMember.removeRole(muteRole)
      muteMember.setMute(false)
  }, mmss(muteDuration));
  });
      } 
   });

   client.on("message", message => {
    if(!message.channel.guild) return;  
     if (message.author.bot) return;
    
     let command = message.content.split(" ")[0];
    
     if (message.content.split(" ")[0].toLowerCase() === prefix + "unmute") {
   if (!message.member.hasPermission('MANAGE_ROLES')) return;
     let user = message.mentions.users.first();
     let modlog = client.channels.find('name', 'log');
     let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
     if (!muteRole) return message.channel.send(" I Can’t Find 'Muted' Role ").catch(console.error).then(message => message.delete(4000))
     if (message.mentions.users.size < 1) return message.channel.send(' Error : ``Mention a User``').catch(console.error).then(message => message.delete(4000))
     if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
    
     if (message.guild.member(user).removeRole(muteRole.id)) {
 return message.channel.send("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
     } else {
       message.guild.member(user).removeRole(muteRole).then(() => {
 return message.channel.send("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
       });
     }
    
   };
    
   });

   // Command - ban
   client.on('message', async message => {
    if(!message.channel.guild) return; 	 	
    
     if (message.author.bot) return;
     if (message.author.codes) return;
     if (!message.content.startsWith(prefix)) return;
   
     let command = message.content.split(" ")[0];
     command = command.slice(prefix.length);
   
     let reason = message.content.split(" ").slice(2).join(" ");
   
   if (message.content.split(" ")[0].toLowerCase() === prefix + "ban") {
  if(!message.channel.guild) return;
    
     if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return;
     if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return;
     let user = message.mentions.users.first();
     
     if (message.mentions.users.size < 1) return message.channel.send('Mention a User').then(message => message.delete(4000))
     if (!message.guild.member(user).bannable) return message.channel.send("I Can’t Ban This User").then(message => message.delete(4000))
    if(!reason) {
reason = "None.";
    }
   
     message.guild.member(user).ban({
 reason: reason
     });
   
   message.channel.send(`** ${user.tag} banned from the server ! :airplane: **  `).then(message => message.delete(10000))
   
   }
   });
   
   // Command - kick
   client.on('message', async message => {
    if(!message.channel.guild) return;
     if (message.author.kick) return;
       if (message.author.bot) return;
     if (!message.content.startsWith(prefix)) return;
   
     let command = message.content.split(" ")[0];
     command = command.slice(prefix.length);
   
     let args = message.content.split(" ").slice(1);
   
   if (message.content.split(" ")[0].toLowerCase() === prefix + "kick") {
  if(!message.channel.guild) return;
    
     if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return;
     if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return;
     let user = message.mentions.users.first();
     let reason = message.content.split(" ").slice(2).join(" ");
   
     if (message.mentions.users.size < 1) return message.channel.send("Mention a User").then(message => message.delete(4000))
     if(!reason) return message.channel.send ("Supply a Reason").then(message => message.delete(4000))
     if (!message.guild.member(user)
     .bannable) return message.channel.send("I Can’t Kick This User").then(message => message.delete(4000))
   
     message.guild.member(user).kick(7, user);
     message.channel.send(`${user.tag} Has Been Kicked`).then(message => message.delete(10000))
   }
   });
// Command - mutec, unmutec
   client.on('message', message => {

    if(message.content === prefix + "mutec") {
if(!message.channel.guild) return message.channel.send('** This command only for servers**');

if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
   message.channel.overwritePermissions(message.guild.id, {
 SEND_MESSAGES: false

   });
       message.channel.send("**__Chat Has Been Locked.__ :white_check_mark: **")
      
     }

 if(message.content === prefix + "unmutec") {
     if(!message.channel.guild) return message.channel.send('** This command only for servers**');

if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
   message.channel.overwritePermissions(message.guild.id, {
 SEND_MESSAGES: true

   });
       message.channel.send("**__Chat Has Been Unlocked.__:white_check_mark:**")
   
 }

});

// Command - createc, createv
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "createc")) {
if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("You Don't Have `MANAGE_CHANNELS` Premissions ");
    let args = message.content.split(" ").slice(1);
    let p = message.channel.parent;
    if(!p) {
message.guild.createChannel("...", "category").then(mmm => {
    p = mmm;
});
    }
message.guild.createChannel(args.join(' '), 'text').then(c => {
    c.setParent(p);
    message.channel.sendMessage(`:white_check_mark: | ${c} .`);
});
    
    }
    });
    
    
    client.on("message", (message) => {
    if (message.content.startsWith(prefix + "createv")) {
if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("You Don't Have `MANAGE_CHANNELS` Premissions ");
    let args = message.content.split(" ").slice(1);
let p = message.channel.parent;
if(!p) {
    message.guild.createChannel("...", "category").then(mmm => {
p = mmm;
    });
}
message.guild.createChannel(args.join(' '), 'voice').then(c => {
    c.setParent(p);
});
message.channel.sendMessage(':white_check_mark: .')
    
    }
    });

    // Command - ccolors
    client.on('message', message => {

let args = message.content.split(" ").slice(1).join(" ")
if(message.content.startsWith(prefix + 'ccolors')) {
if(!args) return message.channel.send('Err: `COLORS_SIZE_MISSING`.');
if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.sendMessage('Err: `PERMISSIONS_MISSING`.');
if(isNaN(args)) return message.channel.send("Err: `NUMBER_NOT_DEFINED`."); 
message.channel.send(`**✅ | Created __${args}__ Colors**`);
  setInterval(function(){})
    let count = 0;
    let ecount = 0;
for(let x = 1; x < `${parseInt(args)+1}`; x++){
message.guild.createRole({name:x,
color: 'RANDOM'})
}
}
});
// Command - tempban
client.on('message', async message => {
    let args = message.content.split(" ").slice(1)

if (message.content.split(" ")[0].toLowerCase() === prefix + "tempban") {
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return;
 
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return;


      let mention = message.mentions.members.first();
      if(!mention) return message.channel.send('Error : `Mention a User`').then(msg => {
msg.delete(3500);
message.delete(3500);
      });
      if(mention.highestRole.position >= message.guild.member(message.author).highestRole.positon) return message.channel.send('Error : ` You Cann’t Ban User Have Higher Rank Than You ` ').then(msg => {
msg.delete(3500);
message.delete(3500);
      });
      if(mention.highestRole.positon >= message.guild.member(client.user).highestRole.positon) return message.channel.send('Error : ` I Cann’t Ban User Have Higher Rank Than Me ` ').then(msg => {
msg.delete(3500);
message.delete(3500);
      });
      if(mention.id === message.author.id) return message.channel.send('Error : \` You Cannot Ban Your Self \`').then(msg => {
msg.delete(3500);
message.delete(3500);
      });

       let duration = message.content.split(" ").slice(2).join(" ");
       if(!duration) return message.channel.send('Error :\` Type The Ban Duration \` ').then(msg => {
 msg.delete(3500);
 message.delete(3500);
       });
       if(isNaN(duration)) return message.channel.send('Error : `Invaild Duration`').then(msg => {
 msg.delete(3500);
 message.delete(3500);
       });

       let reason = message.content.split(" ").slice(3).join(" ");
       if(!reason) reason = 'غير محدد';

       mention.ban({
 reason: reason,
       });
       message.channel.send(`** ${mention.user.username} banned from the server ! :airplane: **  `)
       setTimeout(() => {
 if(duration === 0) return;
 message.guild.unban(mention);
       },duration * 3600000);

   }
});

// Command - bots
client.on("message", message => {
    if(message.content.startsWith(prefix + "bots")) {
if(!message.guild) return;
    const bots = message.guild.members.filter(c => c.user.bot).map(m => `${m}`).join("\n");
    const botsCount = message.guild.members.filter(c => c.user.bot).size;
    const embed = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL)
.setDescription(`Bots ~ ${botsCount}\n${bots}\n-`)
.setColor("RED")
.setTimestamp();
message.channel.sendEmbed(embed);
    }
});

// Command - server
client.on('message', message => {
	 
    if(message.content.startsWith(prefix +"server")){
   if(!message.channel.guild) return message.channel.send(' ');
   const millis = new Date().getTime() - message.guild.createdAt.getTime();
   const now = new Date();
   dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
   const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
   const days = millis / 1000 / 60 / 60 / 24;
   let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
   var embed  = new Discord.RichEmbed()
   .setAuthor(message.guild.name, message.guild.iconURL)
   .addField("**🆔 Server ID:**", message.guild.id,true)
   .addField("**📅 Created On**", message.guild.createdAt.toLocaleString(),true)
   .addField("**👑 Owned by**",`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
   .addField("👥 Members ",`[${message.guild.memberCount}]`,true)
   .addField('**💬 Channels **',`**${message.guild.channels.filter(m => m.type === 'text').size}**` + ' text | Voice  '+ `**${message.guild.channels.filter(m => m.type === 'voice').size}** `,true)
   .addField("**🌍 Others **" , message.guild.region,true)
   .addField("** 🔐 Roles **",`**[${message.guild.roles.size}]** Role `,true)
   .setColor('#000000')
   message.channel.sendEmbed(embed)
   
   }
   });

   client.on("message", async function(message){
    if(!message.guild) return;
    if(message.content.split(" ")[0].slice(prefix.length).toLowerCase() == "role"){
    if(!message.guild.member(message.author.id).hasPermission("MANAGE_ROLES"))return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **لا تمتلك الصلاحيات الازمة لهذ الأمر**`)).then(m => m.delete(5000)).catch(e => console.error(e));
    var target = message.content.split(" ").slice(1).join(" ");
    var aRole = message.content.split(" ").slice(2).join(" ");
    var bRole = message.guild.roles.find(r => r.name.includes(aRole.split("-")));
    if(target[0] == message.mentions.users.first()){
    var aUser = message.mentions.users.first();
    if(!aRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`**:أمثلة على الاستخدام الصحيح للأمر\n${prefix}role @Moorz Admin ~ .اعطاء عضو رول محدد\n${prefix}role all Users ~ .لاعطاء جميع من في السيرفر رول محدد\n${prefix}role humans Members ~ .لاعطاء رول محدد للأعضاء فقط\n${prefix}role bots Robots ~ .لاعطاء رول محدد للبوتات فقط**`));
    if(aRole.startsWith("-")){
    if(!bRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.لم يتم ايجاد الرول المحدد**`));
    if(!message.guild.member(aUser.id).roles.has(bRole))return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.هذا العضو لا يمتلك الرول المحدد**`));
    if(message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(client.user.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لدي صلاحيات على هذا الرول**`));
    message.guild.member(aUser.id).removeRole(bRole);
    message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("GREEN").setTimestamp().setDescription(`:white_check_mark: **Changed roles for <@${aUser.id}>, -${bRole.name}**`)).then(m => m.delete(5000)).catch(e => console.error(e));
    }else{
    if(!bRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.لم يتم ايجاد الرول المحدد**`));
    if(!message.guild.member(aUser.id).roles.has(bRole))return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.هذا العضو يمتلك الرول المحدد بالفعل**`));
    if(message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(client.user.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لدي صلاحيات على هذا الرول**`));
    message.guild.member(aUser.id).removeRole(bRole);
    message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("GREEN").setTimestamp().setDescription(`:white_check_mark: **Changed roles for <@${aUser.id}>, +${bRole.name}**`)).then(m => m.delete(5000)).catch(e => console.error(e));
    }}
    if(target[0].toLowerCase() == "all"){
    message.guild.members.forEach(member=>{
    if(!aRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`**:أمثلة على الاستخدام الصحيح للأمر\n${prefix}role @Moorz Admin ~ .اعطاء عضو رول محدد\n${prefix}role all Users ~ .لاعطاء جميع من في السيرفر رول محدد\n${prefix}role humans Members ~ .لاعطاء رول محدد للأعضاء فقط\n${prefix}role bots Robots ~ .لاعطاء رول محدد للبوتات فقط**`));
    if(aRole.startsWith("-")){
    if(!bRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.لم يتم ايجاد الرول المحدد**`));
    if(message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(client.user.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لدي صلاحيات على هذا الرول**`));
    member.addRole(bRole);
    message.channel.send(`**
    ...جاري تنفيذ الأمر
    تم تنفيذ الأمر على 0
    **`).then(msg =>{
    setInterval(function(){
    msg.edit(`**
    ...جاري تنفيذ الأمر
    ${message.guild.members.filter(r => r.roles.has(bRole)).size} تم تنفيذ الأمر على
    **`);
    },1000);
    if(!message.guild.members.filter(r => r.roles.has(bRole))){
    msg.delete();
    message.channel.send(":white_check_mark: **.تم تنفيذ الأمر على جميع من في السيرفر بنجاح**").then(m => m.delete(5000)).catch(e => console.error(e));
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }else{
    if(!bRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.لم يتم ايجاد الرول المحدد**`));
    if(message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(client.user.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لدي صلاحيات على هذا الرول**`));
    member.removeRole(bRole);
    message.channel.send(`**
    ...جاري تنفيذ الأمر
    تم تنفيذ الأمر على 0
    **`).then(msg =>{
    setInterval(function(){
    msg.edit(`**
    ...جاري تنفيذ الأمر
    ${message.guild.members.filter(r => !r.roles.has(bRole)).size} تم تنفيذ الأمر على
    **`);
    },1000);
    if(!message.guild.members.filter(r => !r.roles.has(bRole))){
    msg.delete();
    message.channel.send(":white_check_mark: **.تم تنفيذ الأمر على جميع من في السيرفر بنجاح**").then(m => m.delete(5000)).catch(e => console.error(e));
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }
    if(target[0].toLowerCase() == "humans"){
    message.guild.members.filter(a => !a.user.bot).forEach(member => {
    if(!aRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`**:أمثلة على الاستخدام الصحيح للأمر\n${prefix}role @Moorz Admin ~ .اعطاء عضو رول محدد\n${prefix}role all Users ~ .لاعطاء جميع من في السيرفر رول محدد\n${prefix}role humans Members ~ .لاعطاء رول محدد للأعضاء فقط\n${prefix}role bots Robots ~ .لاعطاء رول محدد للبوتات فقط**`));
    if(aRole.startsWith("-")){
    if(!bRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.لم يتم ايجاد الرول المحدد**`));
    if(message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(client.user.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لدي صلاحيات على هذا الرول**`));
    member.addRole(bRole);
    message.channel.send(`**
    ...جاري تنفيذ الأمر
    تم تنفيذ الأمر على 0
    **`).then(msg =>{
    setInterval(function(){
    msg.edit(`**
    ...جاري تنفيذ الأمر
    ${message.guild.members.filter(r => r.roles.has(bRole) && !r.user.bot).size} تم تنفيذ الأمر على
    **`);
    },1000);
    if(!message.guild.members.filter(r => r.roles.has(bRole) && !r.user.bot)){
    msg.delete();
    message.channel.send(":white_check_mark: **.تم تنفيذ الأمر على جميع الأعضاء بنجاح**").then(m => m.delete(5000)).catch(e => console.error(e));
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }else{
    if(!bRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.لم يتم ايجاد الرول المحدد**`));
    if(message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(client.user.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لدي صلاحيات على هذا الرول**`));
    member.removeRole(bRole);
    message.channel.send(`**
    ...جاري تنفيذ الأمر
    تم تنفيذ الأمر على 0
    **`).then(msg =>{
    setInterval(function(){
    msg.edit(`**
    ...جاري تنفيذ الأمر
    ${message.guild.members.filter(r => !r.roles.has(bRole) && !r.user.bot).size} تم تنفيذ الأمر على
    **`);
    },1000);
    if(!message.guild.members.filter(r => !r.roles.has(bRole) && !r.user.bot)){
    msg.delete();
    message.channel.send(":white_check_mark: **.تم تنفيذ الأمر على جميع الأعضاء بنجاح**").then(m => m.delete(5000)).catch(e => console.error(e));
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }
    if(target[0].toLowerCase() == "bots"){
    message.guild.members.filter(a => a.user.bot).forEach(member => {
    if(!aRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`**:أمثلة على الاستخدام الصحيح للأمر\n${prefix}role @Moorz Admin ~ .اعطاء عضو رول محدد\n${prefix}role all Users ~ .لاعطاء جميع من في السيرفر رول محدد\n${prefix}role humans Members ~ .لاعطاء رول محدد للأعضاء فقط\n${prefix}role bots Robots ~ .لاعطاء رول محدد للبوتات فقط**`));
    if(aRole.startsWith("-")){
    if(!bRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.لم يتم ايجاد الرول المحدد**`));
    if(message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(client.user.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لدي صلاحيات على هذا الرول**`));
    member.addRole(bRole);
    message.channel.send(`**
    ...جاري تنفيذ الأمر
    تم تنفيذ الأمر على 0
    **`).then(msg =>{
    setInterval(function(){
    msg.edit(`**
    ...جاري تنفيذ الأمر
    ${message.guild.members.filter(r => r.roles.has(bRole) && r.user.bot).size} تم تنفيذ الأمر على
    **`);
    },1000);
    if(!message.guild.members.filter(r => r.roles.has(bRole) && r.user.bot)){
    msg.delete();
    message.channel.send(":white_check_mark: **.تم تنفيذ الأمر على جميع البوتات بنجاح**").then(m => m.delete(5000)).catch(e => console.error(e));
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }else{
    if(!bRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.لم يتم ايجاد الرول المحدد**`));
    if(message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(message.author.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لديك صلاحيات على هذا الرول**`));
    if(bRole >= message.guild.member(client.user.id).highestRole)return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`:x: **.ليس لدي صلاحيات على هذا الرول**`));
    member.removeRole(bRole);
    message.channel.send(`**
    ...جاري تنفيذ الأمر
    تم تنفيذ الأمر على 0
    **`).then(msg =>{
    setInterval(function(){
    msg.edit(`**
    ...جاري تنفيذ الأمر
    ${message.guild.members.filter(r => !r.roles.has(bRole) && r.user.bot).size} تم تنفيذ الأمر على
    **`);
    },1000);
    if(!message.guild.members.filter(r => !r.roles.has(bRole) && r.user.bot)){
    msg.delete();
    message.channel.send(":white_check_mark: **.تم تنفيذ الأمر على جميع البوتات بنجاح**").then(m => m.delete(5000)).catch(e => console.error(e));
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz.
    }
    }
    }); // جميع الحقوق محفوظة لسيرفر كودز و موورز - Moorz. 
    

// Other - ID
   client.on("guildMemberAdd", member => {
    let welcomer = member.guild.channels.find("name", "lobby");
  if(!welcomer) return;
  if(welcomer) {
     moment.locale('ar-ly');
     var h = member.user;
    let norelden = new Discord.RichEmbed()
  .setColor('RED') 
    .setThumbnail(h.avatarURL)
    .setAuthor(h.username,h.avatarURL)
    .addField(': تاريخ دخولك الدسكورد',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)
     .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
 welcomer.send({embed:norelden});
    
    
  }
  });

// Command - count
  client.on('message', message => {
    if (!message.channel.guild) return;
    if(message.content.startsWith(prefix + "count")) {
    var Moorz = new Discord.RichEmbed()
  .setColor('RED') 
    .setDescription(`**${message.guild.memberCount} ~ Members.**`);
    message.channel.send("**'Count :**",{embed: Moorz});
    }
  });

// Command - perms
  client.on('message', message => {
  
    if (message.content.startsWith(prefix + 'perms')) {
     if(!message.channel.guild) return;
     var perms = JSON.stringify(message.channel.permissionsFor(message.author).serialize(), null, 4);
     var zPeRms = new Discord.RichEmbed()
   .setColor('RED') 
     .setTitle(':tools: Permissions')
     .addField('Your Permissions:',perms)
      message.channel.send({embed:zPeRms});
    
}
    });


// Command - channels
    client.on('message', message => {
if (message.content === prefix + "channels") {
    if (message.author.bot) return
  if (!message.guild) return;
    
    const channels = message.guild.channels.map(channels => `${channels.name}`).join("\n");
    const embed = new Discord.RichEmbed()
  .setColor('RED') 
    .setTitle(`**${message.guild.name} Channels.**`, true)
    .setDescription(`**Channels Count.**\n[ ${message.guild.channels.size} ]`,`**Channels.**\n${channels}`);
    message.channel.sendEmbed(embed);
}
    });

// Command - emojis
    client.on('message', message => {
if (message.content.startsWith(prefix + 'emojis')) {
    
    const List = message.guild.emojis.map(e => e.toString()).join(" ");
    
    const EmojiList = new Discord.RichEmbed()
.setTitle('❖ Emojis')
.setAuthor(message.guild.name, message.guild.iconURL)
.setColor('#000000')
.setDescription(List)
.setFooter(message.guild.name)
    message.channel.send(EmojiList)
}
    });
// Command - id
    client.on("message", msg => {
if(msg.content === prefix + '' + "id") {
    const embed = new Discord.RichEmbed();
embed.addField("🔱| Name :", `${msg.author.username}#${msg.author.discriminator}`, true)
.addField("🆔| ID :", `${msg.author.id}`, true)
      .setColor('RED') 
.setFooter(msg.author.username , msg.author.avatarURL)
.setThumbnail(`${msg.author.avatarURL}`)
.setTimestamp()
.setURL(`${msg.author.avatarURL}`)
.addField('📛| Status :', `${msg.author.presence.status.toUpperCase()}`, true)
.addField('🎲| Game :', `${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name}`, true)
.addField('🏅| Roles : ', `${msg.member.roles.filter(r => r.name).size}`, true)
.addField('📅| Created At :', `${msg.createdAt}`,true)
.addField('🤖| Type', `${msg.author.bot.toString().toUpperCase()}`, true);
    msg.channel.send({embed: embed})
}
      });
      // Command - avatar, image
      client.on("message", message => {

if(!message.channel.guild) return;
 if(message.author.bot) return;
    if(message.content.startsWith(prefix + "avatar")) {
      let user = message.mentions.users.first();
      if(!user) {
  user = message.author;
      }
const embed1 = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor('RED') 
  .setImage(user.avatarURL)
  .setTimestamp();

 message.channel.sendEmbed(embed1);
    }
    if(message.content.startsWith(prefix + "image")) {
const embed = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL)
  .setColor('RED') 
  .setImage(message.guild.iconURL)
  .setTimestamp();

 message.channel.sendEmbed(embed);
    }
});
// Command - rules
client.on("message", message => {
    if(message.content == "rules") {
message.channel.sendFile("https://cdn.discordapp.com/attachments/520005883464515593/520034740250869775/info-2.png");
    }
});
// Other - DM Welcome
client.on("guildMemberAdd", member => {
    member.send("**Welcomee To OceanNetwork. :rose:**");
});
// Command - check, done
const fs = require("fs");
const received = JSON.parse(fs.readFileSync("./received.json", "utf8"));
client.on("message", async message => {
    if(!message.guild) return;
if(message.content.split(" ")[0].slice(prefix.length).toLowerCase() == "check") {
    var aUser = message.mentions.users.first();
    if(aUser) {
if(!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR") || !message.guild.member(message.author.id).roles.has(message.guild.roles.find(a => a.name == "Support Team"))) {
    return message.channel.send("**:red_circle: .ليس لديك الصلاحيات الازمة لعرض حالة استلام شخص غيرك**").catch(err => {
console.error(err);
    });
} else {
    if(!received[aUser.id]) {
    received[aUser.id] = {
status: "Waiting"
    }
    }
    if(received[aUser.id] = {status: "Done"}) return message.channel.send("**:blue_diamond: .لقد قمت باستلام جائزتك بالفعل**");
    if(received[aUser.id] = {startsWith: "Waiting"}) return message.channel.send("**:orange_diamond: .لم تقم باستلام جائزتك بعد**");
}
    } else {
aUser = message.author;
    } 
}
if(message.content.split(" ")[0].slice(prefix.length).toLowerCase() == "done") {
    var bUser = message.mentions.users.first();
     if(!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR") || !message.guild.member(message.author.id).roles.has(message.guild.roles.find(a => a.name == "Support Team"))) {
 return message.channel.send(":red_circle: **.ليس لديك الصلاحيات الازمة لهذا الأمر**").catch(err => {
    console.error(err);
 });
     }
if(received[bUser.id] = {status: "Done"}) { return message.channel.send(":red_circle: **.تم اضافة هذا العضو الى قائمة المستلمين بالفعل**").catch(err => {console.error(err)})};
    received[bUser.id] = {
status: "Done"
    }
message.channel.send(":white_check_mark: **.تم اضافة هذا العضو الى قائمة المستلمين**").catch(err => { console.log(err) });
    }
    if(message.content.split(" ")[0].slice(prefix.length).toLowerCase() == "inv-renew") {
if(!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR")) return;
var user = message.mentions.users.first();

if(message.content.split(" ").slice(1).join(" ") == "all") {
    message.guild.members.forEach(member => {
received[member.id] = {
    status: "Waiting"
}
message.channel.send(`:white_check_mark: **.عضو من قائمة المستلمين \`${message.guild.memberCount}\` تم ازالة**`)
    });

} else {
    if(user) {
received[user.id] = {
    status: "Waiting"
};
message.channel.send(":white_check_mark: **.تم ازالة العضو من قائمة المستلمين**");
    }
}
    } 
    fs.writeFile("./received.json", JSON.stringify(received), (err) => {
if(err) console.log(err)
.catch(err => {
    console.error(err);
});
    });

});
// Command - رابط
client.on("message", message => {
    if(message.content.startsWith("رابط")) {
message.channel.createInvite({
    maxUses: 5,
    maxAge: 2
}).then(invite => {
    message.author.send(`**
    مدة الــرابط : 2 يوم
    عدد الآستخدامــات : 5
    LINK: discord.gg/${invite.url}
    **`).catch(err => {
if(err) {
    return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(":x: **.يرجى التأكد من أنك تسمح بالرسائل الخاصة**"));
} else {
    message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(":link: **.تم ارسال الرابط برسالة خاصة**"));
}
    })
});
    }
});

client.on("ready", async() => {
    setInterval(() => {
        client.channels.get("520005932542066688").setName(`' © Ócean Online : , ${client.guilds.get("520005460879867909").members.filter(m => m.voiceChannel).size} .`);
    }, 1000);
});

// Command - new, close, close all
const coolDown = new Set();
client.on("message", async message => {
    if(!message.guild) return;
if(message.content.split(" ")[0].slice(prefix.length).toLowerCase() == "new") {
    var subject = message.content.split(" ").slice(1).join(" ");
    var supportRole = message.guild.roles.find("name", "Support Team");
    var tickets = message.guild.channels.find(a => a.name == "Tickets" && a.type == "category");
    if(coolDown.has(message.author.id)) {
if(message.member.hasPermission("ADMINISTRATOR")) return;
return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(":x: **.يجب عليك انتظار ساعة أخرى قبل فتح تذكرة مرة أخرى**"));
    }
    if(!supportRole) {
try {
    message.guild.createRole({
name: "Support Team",
color: "RED",
position: message.guild.roles.size
    }).then(r2 => {
supportRole = r2;
    });
} catch (error) {
    console.error(error);
}
    }
    if(!subject) {
subject = ".لم يتم تحديد موضوع";
    }
    if(!tickets) {
try {
    message.guild.createChannel("Tickets", "category").then(c2 => {
    tickets = c2; 
    });
} catch(err) {
    console.error(err);
}
    }
    message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(":white_check_mark: **.تم انشاء تذكرتك بنجاح**"));
message.guild.createChannel(`ticket-${message.author.username}`, "text").then(ticket => {
ticket.overwritePermissions(message.guild.id, {
    READ_MESSAGES: false
});
ticket.overwritePermissions(message.author.id, {
    READ_MESSAGES: true
});
ticket.overwritePermissions(supportRole.id, {
    READ_MESSAGES: true
});
ticket.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setThumbnail(message.guild.iconURL).setDescription(`**،مرحباً ${message.author}\n.يرجى منك الانتظار الى أن يتم الرد عليك من قبل الادارة المختصة**`).addField("**:موضوع التذكرة**", subject).setTimestamp().setColor("RED"));
    });

    setTimeout(() => {
coolDown.remove(message.author.id);
    }, 1000 * 60 * 60);
}
if(message.content.split(" ")[0].slice(prefix.length).toLowerCase() == "close") {
    if(!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription("**.عذراً، أنت لا تمتلك الصلاحيات الازمة**")).then(m => m.delete(5000)).catch(err => console.error(err));
var filter = m => m.author.id == message.author.id;    
if(message.content.split(" ").slice(1).join(" ").toLowerCase() == "all") {
message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`تذكرة؟ **${message.guild.channels.filter(a => a.name.startsWith("ticket") && a.type !== "category").size}** هل أنت متأكد من اغلاق\n.أجب بـ **لا** أو **نعم**، لديك 10 ثواني فقط`)).then(msg => {
    message.channel.awaitMessages(filter, {
max: 1,
time: 10000,
errors: ['time']
    }).then(collected => {
if(collected.first().content == "نعم") {
    message.guild.channels.filter(`${message.guild.channels.filter(a => a.name.startsWith("ticket") && a.type !== "category").forEach(c => c.delete())}`);
}
if(collected.first().content == "لا") {
    msg.edit({embed: new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription("**.تم الغاء أمر اغلاق التذكرة بنجاح**")}).then(m => m.delete(5000)).catch(err => console.error(err));
}
    });
});
    } else {
if(!message.channel.name.startsWith("ticket")) return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription("**.لا يمكنك استعمال أمر الاغلاق خارج رومات التذاكر**")).then(m => m.delete(5000)).catch(err => console.error(err));
message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription("هل أنت متأكد من اغلاق التذكرة؟\n.أجب بـ **لا** أو **نعم**، لديك 10 ثواني فقط")).then(msg => {
    message.channel.awaitMessages(filter, {
max: 1,
time: 10000,
errors: ['time']
    }).then(collected => {
if(collected.first().content == "نعم") {
    message.channel.delete();
}
if(collected.first().content == "لا") {
    msg.edit({embed: new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription("**.تم الغاء أمر اغلاق التذكرة بنجاح**")}).then(m => m.delete(5000)).catch(err => console.error(err));
}
    });
});
    }

}

});



// Command - anti-bots
const antibots = JSON.parse(fs.readFileSync("./antibots.json", "utf8"));
client.on("message", message => {
    if(message.content.toLowerCase() == "anti-bots") {
if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(!antibots[message.guild.id]) {
antibots[message.guild.id] = {
    status: "Off"
};
    } 
if(received[message.guild.id] = {status: "Off"}) {
    received[message.guild.id] = {status: "On"};
message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("GREEN").setTimestamp().setDescription(":shield: **.تم تفعيل مانع البوتات بنجاح**")).then(m => m.delete(5000)).catch(err => console.error(err));
}
if(received[message.guild.id] = {status: "On"}) {
    received[message.guild.id] = {status: "Off"};
    message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(":no_entry: **.تم اطفاء مانع البوتات**")).then(m => m.delete(5000)).catch(err => console.error(err));
}
fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
    if(err) console.log(err)
    .catch(err => {
console.error(err); 
    });
});

    }
});
client.on("guildMemberAdd", member => {
    if(member.user.bot) {
if(received[member.guild.id] = {status: "Off"}) return;
if(received[member.guild.id] = {status: "On"}) {
    member.ban({
reason: "Anti-bots"
    });
member.guild.channels.find("name", "log").send(`**<@${member.id}> Banned for Anti-bots.**`).catch(err => console.error(err));
}
    }
});

const antic = JSON.parse(fs.readFileSync("./antichannels.json", "utf8"));
client.on("message", async function(message) {
    if(!message.guild) return;
if(message.content.toLowerCase() == prefix + "anti-c") {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;  
if(!antic[message.guild.id]) antic[message.guild.id] = {
    status: "Off"
}
if(antic[message.guild.id] = { status: "Off" }) {
    antic[message.guild.id] = { status: "On" }
message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(":white_check_mark: **.تم تشغيل مانع انشاء الرومات، كرر الأمر لاطفاءه**")).then(m => m.delete(5000)).catch(err => console.error(err));
}
if(antic[message.guild.id] = { status: "On" }) {
    antic[message.guild.id] = { status: "Off" }
message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(":white_check_mark: **.تم اطفاء مانع انشاء الرومات، كرر الأمر لتشغيله**")).then(m => m.delete(5000)).catch(err => console.error(err));
}
fs.writeFile("./antichannels.json", JSON.stringify(antic), (err) => {
    if(err) {
console.log(err).catch(e => console.error(e));
    }
});
}

});

client.on("channelCreate", function(channel) {
    if(antic[channel.guild.id] = { status: "Off" }) return;
if(antibots[channel.guild.id] = { status: "On" }) {
    channel.delete();
    const moorzLog = channel.guild.channels.find("name", "log");
    if(!moorzLog) {
console.log(".");
    } else {
log.sendEmbed(new Discord.RichEmbed().setAuthor(client.user.username, client.user.displayAvatarURL).setColor("RED").setTimestamp().setDescription(`Deleted **${channel.name}** for \`Anti-Channels\``)).catch(err => {
    console.error(err);
});
    }
}
});





// Command - help
client.on("message", async message => {
    if(message.content.startsWith(prefix + "help")) {
const help = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("RED")
    .setDescription(`**
    ${prefix}clear ~ لمسح الشات بعدد .
    ${prefix}move ~ لنقل أي عضو من روم صوتي الى رومك الصوتي .
    ${prefix}move all ~ لنقل جميع الأعضاء المتفاعلين صوتياً الى رومك الصوتي .
    ${prefix}bc ~ لارسال رسالة جماعية لكل من في السيرفر .
    ${prefix}obc ~ لارسال رسالة جماعية للأعضاء الاونلاين فقط في السيرفر .
    ${prefix}hidec ~ لاخفاء الشات .
    ${prefix}showc ~ لاظهار الشات .
    ${prefix}mute <user> <duration> <reason> ~ لآعطاء أي عضو ميوت كتابي مع الوقت والسبب .
    ${prefix}unmute ~ لفك الميوت عن شخص تم اعطاءه ميوت مسبقاً .
    ${prefix}ban ~ لحظر عضو من السيرفر .
    ${prefix}kick ~ لطرد عضو من السيرفر .
    ${prefix}createc ~ لعمل روم كتابي .
    ${prefix}createv ~ لعمل روم صوتي .
    ${prefix}bans ~ لعرض قائمة الباند .
    ${prefix}server ~ لعرض معلومات عن السيرفر .
    ${prefix}id ~ لعرض معلومات عامة عن أي عضو .
    ${prefix}avatar ~ لعرض الصورة الشخصية لأي عضو .
    ${prefix}image ~ لعرض الصورة الخاصة بالسيرفر .
    ${prefix}channels ~ لعرض قائمة بالرومات .
    ${prefix}emojis ~ لعرض قائمة بالايموجيات .
    ${prefix}tempban ~ بان مؤقت لأي عضو .
    ${prefix}perms ~ لعرض برمشناتك في السيرفر .
    ${prefix}count ~ عداد أعضاء السيرفر .
    ${prefix}bots ~ عرض بوتات السيرفر .
    ${prefix}ccolors ~ انشان رتب الوان بالعدد .
    ${prefix}role ~ لاعطاء عضو ما رول محدد .
    ${prefix}role all ~ لاعطاء جميع من في السيرفر رول محدد .
    ${prefix}role bots ~ لاعطاء البوتات رول محدد .
    ${prefix}role humans ~ لاعطاء الأعضاء رول محدد      
    ${prefix}mutec ~ لعمل ميوت للروم .   
    ${prefix}unmutec ~ لفك الميوت عن الروم . 
    ${prefix}check ~ معرفة حالة استلام الانفايت ريوارد لديك .
    ${prefix}done ~ لاضافة عضو مستلم الى قائمة المستلمين .  
    ${prefix}inv-renew ~ لازالة عضو ما من قائمة المستلمين .
    ${prefix}inv-renew all ~ لازالة جميع من في السيرفر من قائمة المستلمين . 
    ${prefix}new ~ لفتح تذكرة .
    ${prefix}close ~ لاغلاق تذكرة .
    ${prefix}close all ~ لاغلاق جميع تذاكر السيرفر .
    ${prefix}anti-bots ~ لتشغيل مانع البوتات، كرر الأمر لاطفاءه .
    **`)
    .setTimestamp();
    message.author.send(help).catch(err => {
if(err) {
    message.channel.sendEmbed(help);
} else {
    message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(menubar.author.username, message.author.displayAvatarURL).setColor("RED").setTimestamp().setDescription(":white_check_mark: **.تم ارسال قائمة المساعدة في رسالة خاصة**"));
}
    });
    }
});

console.log(1208 - 1177)
{`
channelCreate ~ انشاء روم، لديه فنكشن واحد يعود الى الروم نفسه
channelDelete ~ حذف روم، لديه فنكشن واحد يعود الى الروم نفسه
channelPinsUpdate ~ تغيير في مثبتات أي رول، لديه فنكشنين الاول يعود الى الروم والثاني الى الوقت
channelUpdate ~ تحديث في الروم [مثال: تغيير اسمه]، لديه فنكشنين الأول يعود على النسخة القديمة من الروم والثاني يعود على النسخة الجديدة منه
emojiCreate ~ انشاء ايموجي، لديه فنكشن واحد يعود الى الايموجي نفسه
emojiDelete ~ حذف ايموجي، لديه فنكشن واحد يعود على الايموجي نفسه
emojiUpdate ~ تحديث في الايموجي [مثال: تغيير اسمه]، لديه فنكشنين الأول يعود على النسخة القديمة من الروم والثاني يعود على النسخة الجديدة منه 
guildBanAdd ~ تبنيد عضو، لديه فنكشنين الأول يعود على السيرفر والثاني يعود على الشخص الذي تم تبنيده
guildBanRemove ~ فك باند عن عضو، لديه فنكشنين الأول يعود على السيرفر والثاني يعود على الشخص الذي تم فك الباند عنه
guildCreate ~ دخول البوت الى سيرفر، لديه فنكشن واحد يعود على السيرفر نفسه
guildDelete ~ خروج البوت من سيرفر، لديه فنكشن واحد يعود على السيرفر نفسه
guildMemberAdd ~ دخول عضو جديد الى السيرفر، لديه فنكشن واحد يعود على العضو نفسه
guildMemberAvailable ~ اظن لما يكون العضو اوفلاين ويصير اونلاين ، لديه فنكشن واحد ويعود الى العضو نفسه
guildMemberRemove ~ خروج عضو من السيرفر، لديه فنكشن واحد ويعود على العضو نفسه
guildMembersChunk ~ اظن شي زي الـ  ، لديه فنكشن واحد يعود على الأعضاءPrune
guildMemberSpeaking ~ تحدث عضو صوتياً ، لديه فنكشنين الأول يعود على العضو والثاني يعود على التحدث
guildMemberUpdate ~ تغيير يحدث على عضو . أظن مثل تغيير النيك نيم، لديه فنكشنين نسخة العضو القديمة والثاني يعود على النسخة الجديدة
guildUnavailable ~ اظن تبنيد السيرفر او زي كذا، لديه فنكشن واحد يعود على السيرفر
guildUpdate ~ تغيير في السيرفر مثال الاسم أو الصورة، لديه فنكشنين الأول نسخة السيرفر القديمة والثاني النسخة الجديدة
message ~ ارسال رسالة (يعتبر أشهر حدث ويستخدم في أغلبية الأكواد)، لديه فنكشن واحد ويعود على الرسالة نفسها
messageDelete ~ حذف رسالة، لديه فنكشن واحد ويعود على الرسالة قبل حذفها
messageDeleteBulk ~ حذف رسائل عديدة برسالة واحدة مثل كود مسح الشات، لديه فنكشنين الأول يعود على مجموعة الرسائل التي تم حذفها والثاني على الرسالة الأساسية
messageReactionAdd ~ اضافة ريأكشن الى رسالة، لديه فنكشنين الأول يعود على الريأكشن والثاني على العضو
messageReactionRemove ~ حذف ريأكشن من رسالة، لديه فنكشنين الأول يعود على الريأكشن والثاني على العضو
messageReactionRemoveAll ~ حذف جميع الريأكشنات من رسالة، لديه فنكشن واحد يعود على الرسالة المحذوف منها الريأكشنات
messageUpdate ~ تغيير رسالة [تعديلها]، لديه فنكشنين الأول يعود على الرسالة القديمة والثاني يعود على الرسالة الجديدة
roleCreate ~ انشاء رول، لديه فنكشن واحد يعود على الرول نفسها
roleDelete ~ حذف رول، لديه فنكشن واحد يعود على الرول نفسها
roleUpdate ~ تغيير في الرول [مثال: تغيير الاسم]، لديه فنكشنين الأول يعود على النسخة القديمة والثاني يعود على النسخة الجديدة للرول
typingStart ~ البدأ في الكتابة، لديه فنكشنين الأول يعود على الروم الذي يكتب فيه والثاني على الشخص [Moorz is typing... عند ظهور
typingStop ~ الانتهاء من الكتابة، لديه فنكشنين الأول يعود على الروم الذي يكتب فيه والثاني على الشخص [Moorz is typing... عند اختفاء]
voiceStateUpdate ~ تغيير الحالة الصوتية لعضو [مثال: وضع ميوت صوتي وفكه]، لديه فنكشنين الأول يعود على النسخة القديمة من الحالة والنسخة الجديدة منها
`}
client.login(process.env.BOT_TOKEN);




