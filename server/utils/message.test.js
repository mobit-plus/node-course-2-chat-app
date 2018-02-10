const expect = require('expect');

var {generatemessage} = require('./message');

describe('Generatemessage', () => {
    it('should generate correct message object' ,() => {
        var from = 'prasoon';
        var text = 'hey prasoon!';
        var createdAt = new Date().getTime();

        var Message = generatemessage(from, text);

        expect(Message).toInclude({from, text});
        expect(Message.createdAt).toBeA('number');
    });
});