const { Listener } = require('@sapphire/framework');
const { blue, green, magenta, magentaBright, white } = require('colorette');

const dev = process.env.NODE_ENV !== 'production';

class MessageListener extends Listener {
    constructor(context, options) {
        super(context, options);
    }

    async run(message) {
        const success = green('+');

        if (!this.hasPrintedBanner) {
            this.printBanner(success);
            this.hasPrintedBanner = true;
        }

        console.log(`Message received: ${message.content} (from ${message.author.tag})`);

          }

    printBanner(success) {
        const llc = dev ? magentaBright : white;
        const blc = dev ? magenta : blue;

        const line01 = llc('');
        const line02 = llc('');
        const line03 = llc('');

        const pad = ' '.repeat(7);

        console.log(
            String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Message
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
        `.trim()
        );
    }
}

module.exports = MessageListener;
