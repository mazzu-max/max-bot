 import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;
    
    const menuText = generateMenuText(usedPrefix, userId, groupId);
        const imagePath = path.join(__dirname, '../../media/gruppo.jpeg');
        const footerText = global.t('chooseMenu', userId, groupId) || 'Scegli un menu:';
        const mainMenuText = global.t('mainMenuButton', userId, groupId) || '🏠 Menu Principale';
        const adminMenuText = global.t('menuAdmin', userId, groupId) || '🛡️ Menu Admin';
        const ownerMenuText = global.t('menuOwner', userId, groupId) || '👑 Menu Owner';
        const securityMenuText = global.t('menuSecurity', userId, groupId) || '🚨 Menu Sicurezza';
    
    await conn.sendMessage(message.chat, {
        image: { url: imagePath },
        caption: menuText,
                footer: footerText,
                buttons: [
                        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: mainMenuText }, type: 1 },
                        { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: adminMenuText }, type: 1 },
                        { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: ownerMenuText }, type: 1 },
                        { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: securityMenuText }, type: 1 },
                ],
                viewOnce: true,
                headerType: 4,
    }, { quoted: message });
};

handler.help = [
  'menugruppo',
  'gruppo',
  'groupmenu',
  'group',
  'menúgrupo',
  'grupo',
  'menugrupo',
  'grupo_pt',
  'gruppenmenü',
  'gruppe',
  '群组菜单',
  '群组',
  'менюгруппы',
  'группа',
  'قائمةالمجموعة',
  'مجموعة',
  'समूहमेनू',
  'समूह',
  'menu_groupe',
  'groupe',
  'menugrup',
  'grup',
  'grupmenü'
];
handler.tags = ['menu'];
handler.command = /^(gruppo|menugruppo|groupmenu|group|menúgrupo|grupo|menugrupo|grupo_pt|gruppenmenü|gruppe|群组菜单|群组|менюгруппы|группа|قائمةالمجموعة|مجموعة|समूहमेनू|समूह|menu_groupe|groupe|menugrup|grup|grupmenü)$/i;


export default handler;

function generateMenuText(prefix, userId, groupId) {
    const vs = global.vs || '8.0';
    const collab = global.collab || 'ChatUnity x 333';
    const menuTitle = global.t('groupMenuTitle', userId, groupId);
    
    const createSection = (title, commands) => {
        const commandLines = commands.trim().split('\n').map(c => `│ ${c.trim()}`).join('\n');
        return `╭★ ${title} ★╮\n${commandLines}\n╰★────────────★╯`;
    };
    
    const sections = [
        createSection(global.t('musicAudioSection', userId, groupId), `
ℹ️ *.comando* (info)`),
       createSection(global.t('infoUtilitySection', userId, groupId), `
ℹ️ *.comando* (info)`),
        createSection(global.t('imageEditSection', userId, groupId), `
ℹ️ *.comando* (info)`),
        createSection(global.t('gamesCasinoSection', userId, groupId), `
ℹ️ *.comando* (info)`),
        createSection(global.t('economyRankingSection', userId, groupId), `
💰 *.portafoglio* (${global.t('balanceCommand', userId, groupId)})
🏦 *.banca*
💳 *.donauc*
🤑 *.ruba* @${global.t('userCommand', userId, groupId)}
📤 *.withdraw* (${global.t('withdrawUCCommand', userId, groupId)})
📲 *deposit*`),
        createSection(global.t('socialInteractionSection', userId, groupId), `
💔 *.divorzia* (${global.t('endRelationshipCommand', userId, groupId)})
💌 *.sposa* @$
🗣️ *.rizz* @${global.t('userCommand', userId, groupId)} (${global.t('charmCommand', userId, groupId)})
💋 *.ditalino* @
💋 *.sega* @
🖕 *.insulta* @`),
        createSection(global.t('howMuchSection', userId, groupId), `
🏳️‍🌈 *.lesbica* @
🌈 *.gay*`),
];
    
    return `
╭┈ ─ ─ ✦ ─ ─ ┈╮
   ୧ 👑 ୭ *${menuTitle}*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${global.t('memberCommands', userId, groupId)} ✦ ꒷꒦

${sections.join('\n\n')}

╭★────★────★╮
│ ୭ ˚. ᵎᵎ 🎀
│ ${global.t('versionLabel', userId, groupId)}: ${vs}
╰★────★────★╯`.trim();
}

