const time = Date.now();

function timer(string = '') {
    return function (files, metalsmith, done) {
        console.info('\x1b[31m',string, (Date.now() - time)/1000, '\x1b[0m');
        done && done();
    };
}

module.exports = timer;
