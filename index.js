if (process.argv.length === 2) {
    console.error('Pass in a Slack OAuth token as argument 1');
    process.exit(1);
}

const emojme = require('emojme');
const token = process.argv[2];
const fs = require('fs');

const downloadOptions = {
    save: false,
    bustCache: true,
    output: false,
};

emojme.download('zatech', token, downloadOptions).then((res) => {
    const remoteEmojis = res.zatech.emojiList.map(e => e.name);

    const localEmojis = fs.readdirSync('./emojis/');
    const missing = localEmojis.filter((fn) => {
        const emojiName = removeExt(fn);
        return remoteEmojis.indexOf(emojiName) === -1;
    });

    const addOptions = {
        src: missing.map(e => './emojis/' + e), // File paths
        name: missing.map(e => removeExt(e)), // Emoji names
        bustCache: false,
        avoidCollisions: false,
        output: false,
    };

    emojme.add('zatech', token, addOptions).then((res) => {
        console.log('Added Emoji:', res.zatech.emojiList);
    }).catch(error => {
        console.error('Failed to Add', addOptions, error);
    });
});

function removeExt(string) {
    return string.substr(0, string.indexOf('.'));
}
