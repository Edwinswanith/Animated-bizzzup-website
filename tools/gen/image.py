"""Generate one anchor still with the Gemini image API.
Auth is injected by the environment's proxy; this script never reads or stores a key.
Usage: python3 image.py <out> <prompt-file> [model] [aspect] [size] [reference-image ...]"""
import base64, json, sys, urllib.request, pathlib
out, prompt_file = sys.argv[1], sys.argv[2]
model = sys.argv[3] if len(sys.argv) > 3 else "gemini-3-pro-image"
aspect = sys.argv[4] if len(sys.argv) > 4 else "16:9"
size = sys.argv[5] if len(sys.argv) > 5 else "4K"
refs = sys.argv[6:]
parts_in = [{"inlineData": {"mimeType": "image/jpeg", "data": base64.b64encode(pathlib.Path(r).read_bytes()).decode()}} for r in refs]
body = {
    "contents": [{"parts": parts_in + [{"text": pathlib.Path(prompt_file).read_text()}]}],
    "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": aspect, "imageSize": size}},
}
req = urllib.request.Request(
    f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
    data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
try:
    res = json.load(urllib.request.urlopen(req, timeout=300))
except urllib.error.HTTPError as e:
    raw = e.read().decode("utf8", "ignore")
    try:
        err = json.loads(raw).get("error", {})
        sys.exit(f"HTTP {e.code} {err.get('status')}: {err.get('message')}")
    except ValueError:
        sys.exit(f"HTTP {e.code} (non-JSON body): {raw[:200]}")
parts = res["candidates"][0]["content"]["parts"]
img = next((p["inlineData"] for p in parts if "inlineData" in p), None)
if not img:
    sys.exit("No image returned: " + json.dumps(res.get("candidates", [{}])[0].get("finishReason")))
pathlib.Path(out).write_bytes(base64.b64decode(img["data"]))
print("saved", out, img.get("mimeType"), "usage:", json.dumps(res.get("usageMetadata", {})))
