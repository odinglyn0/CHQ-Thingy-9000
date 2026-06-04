import ssl
import socket
import urllib.request
import urllib.error

HOST = "89.101.110.214"
PORT = 8443

def make_ctx(seclevel=None, min_ver=None):
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    if min_ver is not None:
        ctx.minimum_version = min_ver
    cipher = "DEFAULT"
    if seclevel is not None:
        cipher = f"DEFAULT@SECLEVEL={seclevel}"
    try:
        ctx.set_ciphers(cipher)
    except ssl.SSLError as e:
        print(f"   cipher set failed: {e}")
    return ctx

def try_handshake(label, ctx):
    try:
        raw = socket.create_connection((HOST, PORT), timeout=12)
        s = ctx.wrap_socket(raw, server_hostname=HOST)
        print(f"[OK] {label}: proto={s.version()} cipher={s.cipher()}")
        cert = s.getpeercert(binary_form=True)
        print(f"   cert bytes: {len(cert) if cert else 0}")
        s.close()
        return ctx
    except Exception as e:
        print(f"[FAIL] {label}: {type(e).__name__}: {e}")
        return None

print("=== TLS handshake attempts ===")
configs = [
    ("seclevel0", make_ctx(seclevel=0)),
    ("seclevel1", make_ctx(seclevel=1)),
    ("seclevel2", make_ctx(seclevel=2)),
    ("min_tls1.0+seclevel0", make_ctx(seclevel=0, min_ver=ssl.TLSVersion.TLSv1)),
    ("min_tls1.0+seclevel1", make_ctx(seclevel=1, min_ver=ssl.TLSVersion.TLSv1)),
]

working = None
for label, ctx in configs:
    if ctx is None:
        continue
    result = try_handshake(label, ctx)
    if result and working is None:
        working = result

print()
print("=== Fetch attempt with working ctx ===")
if working:
    paths = [
        "/axis-cgi/jpg/image.cgi",
        "/axis-cgi/mjpg/video.cgi",
        "/view/view.shtml?id=14&imagepath=%2Fmjpg%2Fvideo.mjpg%3Fcamera%3D1&size=1",
        "/",
    ]
    for path in paths:
        url = f"https://{HOST}:{PORT}{path}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        try:
            resp = urllib.request.urlopen(req, context=working, timeout=12)
            print(f"[{resp.status}] {path} CT={resp.headers.get('Content-Type')} Server={resp.headers.get('Server')}")
            print(f"   {resp.read(80)!r}")
        except urllib.error.HTTPError as e:
            print(f"[{e.code}] {path} auth={e.headers.get('WWW-Authenticate')!r} Server={e.headers.get('Server')}")
        except Exception as e:
            print(f"[ERR] {path} {type(e).__name__}: {e}")
else:
    print("No working TLS context found.")
