const express   = require('express'),
    compress  = require('compression'),
    app       = express(),
    path      = require('path'),
    ip        = '0.0.0.0',
    port      = 8080;

app.use(compress());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname + '/assets/css')));
app.use(express.static(path.join(__dirname + '/assets/scripts')));
app.use(express.static(path.join(__dirname + '/assets/img')));

// 404
app.use('*', function(req, res) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '/404.html'));

        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Sorry, requested page not found');
});

app.listen(port, ip, function () {
    console.log('Listening on port ' + port);
});

process.on('SIGQUIT SIGINT SIGTERM', function() {
    app.close();
});
