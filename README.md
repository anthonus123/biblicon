# biblicon

A reader for the Gospel of Matthew (KJV) in which every passage is paired with an Eastern
Orthodox icon and with commentary from the Church Fathers, quoted verbatim from the
*Catena Aurea*.

**`Matthew Reader.html`** is the whole thing — one self-contained file, ~8.7 MB. Fonts,
icons, the gospel text and all commentary are embedded, so it opens by double-clicking with
no server and no network. It is generated; don't hand-edit it.

```sh
make          # assemble the data, check it, emit "Matthew Reader.html"
make check    # structural check on the assembled data, with the content counts
make serve    # serve it at http://127.0.0.1:8731 (some browsers cripple file://)
```

Needs only Node (no dependencies) and, for `make serve`, Python 3.

The build is deterministic: rebuilding without a content change reproduces the same bytes
and leaves `git status` clean, so the 8.7 MB output only enters git history when something
actually changed.

- `src/README.md` — how the build fits together and how to add an icon.
- `HANDOFF.md` — current state, what's next, and the gotchas worth knowing before you start.
