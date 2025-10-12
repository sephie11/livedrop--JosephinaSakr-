import requests
from datetime import datetime

BASE = input("Enter your ngrok public URL (e.g., https://xxxx.ngrok-free.dev): ").strip()
CHAT_URL = BASE.rstrip("/") + "/chat"

LOG_FILE = "conversation_log.txt"  

def log(role, text):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{ts}] {role.upper()}: {text}\n")

print("\nShoplite Assistant CLI")
print("Type 'exit' to quit.\n")

while True:
    try:
        q = input("> ").strip()
        if q.lower() in ("exit", "quit"):
            print("bye!")
            break

        log("user", q)
        print("[Retrieving context...]")

        r = requests.post(CHAT_URL, json={"query": q}, timeout=30)

        if r.status_code != 200:
            msg = f"HTTP {r.status_code}: {r.text}"
            print("[Error]", msg)
            log("system", msg)
            continue

    data = r.json()
answer = data.get("answer", "").strip() or "(no answer)"
sources = data.get("sources", [])
sources_text = "; ".join(sources)



        print("[Calling LLM...]\n")
        print("Answer:", answer)
        print("Sources:", sources_text if sources else "(none)")
        print()

        log("assistant", f"{answer}\nSources: {sources_text}")

    except requests.exceptions.RequestException as e:
        print("[Error] Could not connect to server:", e)
        log("system", f"connection error: {e}")
    except KeyboardInterrupt:
        print("\nbye!")
        break
