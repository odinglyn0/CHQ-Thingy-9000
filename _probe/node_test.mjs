import https from "node:https";

const HOST = "89.101.110.214";
const PORT = 8443;

function attempt(label, options, path) {
  return new Promise((resolve) => {
    const req = https.request(
      {
        host: HOST,
        port: PORT,
        path,
        method: "GET",
        rejectUnauthorized: false,
        ...options,
      },
      (res) => {
        const ct = res.headers["content-type"];
        let received = 0;
        const chunks = [];
        res.on("data", (d) => {
          received += d.length;
          if (chunks.length < 2) chunks.push(d);
          if (received > 8000) {
            res.destroy();
          }
        });
        res.on("close", () => {
          const head = Buffer.concat(chunks).subarray(0, 50);
          console.log(`[OK] ${label} status=${res.statusCode} CT=${ct} bytes=${received}`);
          console.log(`     head=${JSON.stringify(head.toString("latin1"))}`);
          resolve(true);
        });
      }
    );
    req.on("error", (e) => {
      console.log(`[FAIL] ${label}: ${e.code || e.message}`);
      resolve(false);
    });
    req.setTimeout(12000, () => {
      console.log(`[TIMEOUT] ${label}`);
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

console.log("Node version:", process.version);
console.log("=== Node TLS attempts to camera ===");

await attempt("default", {}, "/axis-cgi/jpg/image.cgi");
await attempt("ciphers=DEFAULT@SECLEVEL=0", { ciphers: "DEFAULT@SECLEVEL=0" }, "/axis-cgi/jpg/image.cgi");
await attempt("ciphers=DHE-RSA-AES256-SHA@0", { ciphers: "DHE-RSA-AES256-SHA@SECLEVEL=0", minVersion: "TLSv1.2" }, "/axis-cgi/jpg/image.cgi");
await attempt("mjpg-stream@0", { ciphers: "DEFAULT@SECLEVEL=0" }, "/axis-cgi/mjpg/video.cgi");
