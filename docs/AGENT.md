# AGENT.md

Rules for writing code that doesn't look AI-generated.
Read this before touching anything. These aren't suggestions.

---

## Naming

- Short names are fine. `res`, `idx`, `cfg`, `tmp`, `n` are all normal.
- Don't use full-word compound names unless it's a class or public API. `userAuthenticationService` screams AI. `auth` doesn't.
- Abbreviations are human. `db`, `req`, `resp`, `srv`, `buf`, `msg`.
- Names should be **contextually obvious**, not self-documenting essays. If the context makes it clear, a short name is better.
- No `processed_item`, `current_active_subscription`, `handleUserInputData`. Ever.

## Comments

- Comment WHY, never WHAT. The code already says what.
- No docstrings on internal/private functions unless it's genuinely non-obvious math or an algorithm.
- No block headers like `# ===== INITIALIZATION =====` or `# --- Helper Functions ---`.
- No emoji in comments or docs. Not even once.
- If a comment would just restate the function name → delete it.
- Acceptable comment: `# supabase returns 406 if row doesn't exist, not 404`
- Not acceptable: `# This function processes the user data and returns the result`

## Functions and structure

- Functions can be longer than "clean code" orthodoxy says. Real code has 80-line functions. That's fine.
- Don't split trivial helpers into separate functions just to look organized.
- No unnecessary abstraction layers. If it's used once, inline it.
- Monolithic is fine for scripts and bots. Over-engineering is an AI tell.

## Error handling

- Don't catch every possible exception with a custom message. Catch what you expect.
- Silent failures are bad, but so is wrapping every line in try/except with a print statement.
- Don't write `except Exception as e: logger.error(f"An unexpected error occurred: {e}")` — that's an AI signature.
- Formal grammatical error messages are a red flag. Keep them terse: `"invalid token"` not `"The provided authentication token is not valid or has expired."`.

## Type hints and annotations

- Use them where they actually help readability. Not everywhere by default.
- Private helper functions, one-liners, obvious returns → skip the hints.
- Don't annotate `-> None` on every function. Don't annotate `x: int = 5`.

## Imports

- Don't sort or group imports perfectly every time. Alphabetical sorted grouped imports = AI flag.
- Add imports as you need them, in roughly the order you needed them. Stdlib → third party is fine but don't be anal about it.

## Boilerplate and patterns

- No `if __name__ == "__main__":` blocks unless the file is genuinely meant to run as a script.
- No `__all__` unless you're writing a library.
- No `README` updates or project structure explanations unless asked.
- Don't add logging setup, argparse, or config management unless the task explicitly needs it.

## Python specifics

- Don't use `Optional[X]` — use `X | None` if you're using hints at all.
- `dict()` and `list()` constructors are fine, but `{}` and `[]` are more natural.
- Don't `.format()` strings when f-strings exist.
- List comprehensions over loops where it's actually cleaner, not as a flex.
- Don't add `pass` to empty blocks that should probably raise or return.

## What NOT to generate unless explicitly asked

- Tests
- Docstrings on private/internal code
- Type stubs
- `requirements.txt` / `pyproject.toml` changes
- Docker or CI config
- README or changelog updates
- Logging setup from scratch
- `.env.example` files
- Architecture diagrams in comments

## Consistency with existing code

- Before writing anything, look at the surrounding code style.
- Match the naming length, comment density, and error handling style of what's already there.
- If the codebase uses `snake_case` with short names — don't suddenly write `camelCase` or long descriptive names.
- Stylistic discontinuity is one of the hardest-to-miss AI tells.

## General tone

- Write like you're solving the problem, not like you're demonstrating best practices.
- Messy in the right places is human. Perfectly symmetrical and polished throughout is not.
.
- Don't hedge with comments like `# Note: this could be optimized in the future`.

---

*Last thing: if you're unsure whether to add something — don't add it.*
