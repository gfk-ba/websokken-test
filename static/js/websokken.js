(function() {

    var testResult = {};
    var testMessage = 'Some random test message.';

    var sockjs = null;


    var writeTestOutput = function(msg) {
        $('.js-test_output').append($('<li/>').text(msg));
    };


    var checkTestResult = function() {
        var finalResult =
            testResult.opened &&
            testResult.dataReceived &&
            testResult.correctDataReceived &&
            testResult.closed &&
            testResult.closedNormally;
        writeTestOutput('Final test result: ' + (finalResult ? 'SUCCESS' : 'FAILED'));
    };


    $().ready(function() {
        writeTestOutput('Initializing socket...');
        sockjs = new SockJS('/echo', null, { protocols_whitelist: ['websocket'], debug: true });

        sockjs.onopen = function() {
            testResult.opened = true;
            writeTestOutput('Websocket connection opened. Protocol: ' + sockjs.protocol);
            setTimeout(function() {
                writeTestOutput('Sending message to websocket server...');
                sockjs.send(testMessage);
            }, 2000);
        };

        sockjs.onmessage = function(e) {
            testResult.dataReceived = true;
            testResult.correctDataReceived = e.data === testMessage;
            writeTestOutput('Received websocket message: ' + e.data);
        };

        sockjs.onclose = function(e) {
            testResult.closed = true;
            testResult.closedNormally = e.code === 1000;
            writeTestOutput('Websocket closed. Code: ' + e.code + '. Reason: ' + e.reason);
            checkTestResult();
        };
    });

})();
