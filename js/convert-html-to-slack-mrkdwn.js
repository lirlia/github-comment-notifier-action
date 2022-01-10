const mrkdwn = require('html-to-mrkdwn');
const html = process.argv[3];

// json 形式で出力
console.log('%j',mrkdwn(html));

process.exit(0);
