# biblicon

Readers for the Gospels of Matthew, Mark, Luke and John (KJV) in which every passage is paired with
an Eastern Orthodox icon and with commentary from the Church Fathers, quoted from the
*Catena Aurea*.

**`Matthew Reader.html`**, **`Mark Reader.html`**, **`Luke Reader.html`** and **`John Reader.html`**
are the whole thing — one self-contained file each. Fonts, icons, the gospel text and all commentary are embedded, so each opens by
double-clicking with no server and no network. They are generated; don't hand-edit them.

```sh
make          # assemble the data, check it, emit every reader
make john     # one Gospel only
make check    # structural check on the assembled data, with the content counts
make BOOK=john serve    # serve a reader at http://127.0.0.1:8731 (some browsers cripple file://)
```

Needs only Node (no dependencies) and, for `make serve`, Python 3.

The build is deterministic: rebuilding without a content change reproduces the same bytes
and leaves `git status` clean, so a reader only enters git history when something
actually changed.

- `src/README.md` — how the build fits together and how to add an icon.
- `HANDOFF.md` — current state, what's next, and the gotchas worth knowing before you start.
