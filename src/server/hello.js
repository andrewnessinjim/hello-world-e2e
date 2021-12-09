var http = require("http");
const PORT = process.env.PORT || 3000;

http.createServer(function(req, res) {
    res.write("<p>Hello World!</p>");
    res.end();
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', function onSigint () {
	console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
})

// shut down server
function shutdown() {
    process.exitCode = 1;
	process.exit();
}