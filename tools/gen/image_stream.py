"""Streaming variant of image.py: uses streamGenerateContent (SSE) so the connection carries data
while the image is generated. Auth is injected by the environment's proxy; no key is read here.
Usage: python3 image_stream.py <out> <prompt-file> [model] [aspect] [size] [reference-image ...]"""
import base64, json, sys, time, urllib.request, pathlib
out, prompt_file = sys.argv[1], sys.argv[2]
model = sys.argv[3] if len(sys.argv) > 3 else "gemini-3-pro-image"
aspect = sys.argv[4] if len(sys.argv) > 4 else "16:9"
size = sys.argv[5] if len(sys.argv) > 5 else "2K"
refs = sys.argv[6:]
parts_in = [{"inlineData": {"mimeType": "image/jpeg", "data": base64.b64encode(pathlib.Path(r).read_bytes()).decode()}} for r in refs]
body = {
    "contents": [{"parts": parts_in + [{"text": pathlib.Path(prompt_file).read_text()}]}],
    "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": aspect, "imageSize": size}},
}
req = urllib.request.Request(
    f"https://generativelanguage.googleapis.com/v1beta/models/{model}:streamGenerateContent?alt=sse",
    data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
t0 = time.time()
try:
    resp = urllib.request.urlopen(req, timeout=300)
except urllib.error.HTTPError as e:
    sys.exit(f"HTTP {e.code} after {time.time()-t0:.0f}s: {e.read().decode('utf8','ignore')[:200]}")
img, usage, events = None, {}, 0
for raw in resp:
    line = raw.decode("utf8", "ignore").strip()
    if not line.startswith("data:"):
        continue
    events += 1
    chunk = json.loads(line[5:])
    usage = chunk.get("usageMetadata", usage)
    for c in chunk.get("candidates", []):
        for p in c.get("content", {}).get("parts", []):
            if "inlineData" in p:
                img = p["inlineData"]
    print(f"  event {events} at {time.time()-t0:.0f}s", flush=True)
if not img:
    sys.exit(f"No image after {events} events, {time.time()-t0:.0f}s")
pathlib.Path(out).write_bytes(base64.b64decode(img["data"]))
print("saved", out, img.get("mimeType"), f"{time.time()-t0:.0f}s", "usage:", json.dumps(usage))
