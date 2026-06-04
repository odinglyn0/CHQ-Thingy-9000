import sys
import socket
import ssl
import urllib.request
import urllib.error

BASE = "https://89.101.110.214:8443"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

CANDIDATES = [
    "/view/view.shtml?id=14&imagepath=%2Fmjpg%2Fvideo.mjpg%3Fcamera%3D1&size=1",
    "/mjpg/video.mjpg?camera=1",
    "/mjpg/1/video.mjpg",
    "/axis-cgi/mjpg/video.cgi",
    "/axis-cgi/mjpg/video.cgi?camera=1",
    "/axis-cgi/jpg/image.cgi",
    "/axis-cgi/jpg/image.cgi?camera=1",
    "/jpg/image.jpg",
    "/jpg/1/image.jpg",
]

def probe(path):
    url = BASE + path
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 probe"})
    try:
        resp = urllib.request.urlopen(req, context=ctx, timeout=12)
        ct = resp.headers.get("Content-Type", "")
        server = resp.headers.get("Server", "")
        data = resp.read(2048)
        print(f"[OK {resp.status}] {path}")
        print(f"   Content-Type: {ct}")
        print(f"   Server: {server}")
        print(f"   First bytes: {data[:60]!r}")
    except urllib.error.HTTPError as e:
        auth = e.headers.get("WWW-Authenticate", "")
        print(f"[HTTP {e.code}] {path}  auth={auth!r} server={e.headers.get('Server','')}")
    except Exception as e:
        print(f"[ERR] {path} -> {type(e).__name__}: {e}")

if __name__ == "__main__":
    print("=== Probing camera endpoints ===")
    for p in CANDIDATES:
        probe(p)
