var rascal = require('rascal')
var definitions = require('./definitions.json')
 
var config = rascal.withDefaultConfig(definitions)
 
rascal.createBroker(config, function(err, broker) {
    if (err) bail(err)
 
    broker.subscribe('subscription1', function(err, subscription) {
        if (err) bail(err)
 
        subscription.on('message', function(message, content, ackOrNack) {
            console.log(content + 'Recieved')
            ackOrNack()
        }).on('error', bail)
    })
    setInterval(function() {
        broker.publish('publication1', 'This is a test message', function(err, publication) {
            if (err) {
            	bail(err)
            }
            else
            {
            	console.log('Message Sent')
            }
        })
    }, 1000).unref()
})
 
function bail(err) {
    console.error(err)
    process.exit(1)
}