# Build the Matthew reader.
#
#   make            assemble the data, emit the reader, check it
#   make check      structural check on the assembled data
#   make serve      serve the reader at http://127.0.0.1:8731 (file:// breaks in some browsers)
#   make clean      remove the generated intermediate
#
# The build is deterministic: rebuilding without a content change reproduces the same bytes
# and leaves `git status` clean, so the 8.7 MB reader only enters git history when something
# actually changed.

READER  := Matthew Reader.html
DATA    := src/data/icons.json
PORT    := 8731

# Everything the assembled data is derived from. Touch any of these and `make` redoes it.
# Every hotspots file assemble.js requires has to be listed: hotspots3.js was left out when
# it was added, so a session that wrote 73 sets of markers into it left icons.json — and the
# shipped reader — a build behind, with no error anywhere to say so.
SOURCES := src/assemble.js src/assign.js src/picks.js src/labels.js src/fathers.js \
           src/hotspots.js src/hotspots2.js src/hotspots3.js $(wildcard src/overrides.js) \
           $(wildcard src/stories.js) \
           src/data/anchors.json src/data/titles.json src/data/icons_orig.json \
           src/data/image_meta.json src/data/pick_keys.json src/data/matthew_kjv.json \
           src/data/catena.json

.PHONY: all reader check serve clean

all: check reader

# Stage 1 — merge the data files into one blob the page can carry.
$(DATA): $(SOURCES)
	node src/assemble.js

# Stage 2 — inline the fonts, icons and app into the single self-contained file.
# Phony rather than a real target: GNU make cannot depend cleanly on a path with a space,
# and the build is deterministic, so re-emitting it costs nothing but a few seconds.
reader: check $(DATA) src/build.js src/app.js src/page.css src/spectral_keep.json
	node src/build.js

check: $(DATA)
	node src/check.js

serve: reader
	@echo "http://127.0.0.1:$(PORT)/$(subst $() ,%20,$(READER))"
	python3 -m http.server $(PORT) --bind 127.0.0.1

clean:
	rm -f $(DATA)
