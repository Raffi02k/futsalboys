from __future__ import annotations

import time
from collections import defaultdict, deque

RATE_WINDOW_SECONDS = 15 * 60
RATE_LIMIT = 5
REQUESTS: dict[str, deque[float]] = defaultdict(deque)


def is_rate_limited(ip: str) -> bool:
    now = time.time()
    attempts = REQUESTS[ip]
    while attempts and now - attempts[0] > RATE_WINDOW_SECONDS:
        attempts.popleft()
    if len(attempts) >= RATE_LIMIT:
        return True
    attempts.append(now)
    return False
