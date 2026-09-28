# Build the readers.
#
#   make                assemble, check and emit EVERY reader (matthew/index.html, mark/index.html,
#                       luke/index.html, john/index.html — served at biblicon.ca/matthew/ etc)
#   make matthew        one Gospel only (also: make mark, make luke, make john)
#   make check          structural check on every book's assembled data
#   make BOOK=john serve   serve a reader at http://127.0.0.1:8731 (file:// breaks in some browsers)
#   make clean          remove the generated intermediates
#
# Each Gospel's own sources live in src/books/<book>/ (see src/book.js); the pipeline in src/
# is shared, and so is the image pool. The build is deterministic: rebuilding without a content
# change reproduces the same bytes and leaves `git status` clean, so a reader only enters git
# history when something actually changed.

BOOKS := matthew john mark luke
PORT  := 8731
BOOK  ?= matthew

# Everything the assembled data is derived from. Touch any of these and `make` redoes it.
# Every file assemble.js requires has to be listed: hotspots3.js was once left out, and a
# session that wrote 73 sets of markers into it left the shipped reader a build behind, with
# no error anywhere to say so.
SHARED := src/book.js src/assemble.js src/fathers.js src/data/image_meta.json src/data/pick_keys.json
PERBOOK = $(wildcard src/books/$(1)/*.js) $(wildcard src/books/$(1)/*.json)

.PHONY: all check serve clean $(BOOKS) $(addprefix check-,$(BOOKS))

all: $(BOOKS)

define BOOK_RULES
# Stage 1 — merge the book's data files into one blob the page can carry.
src/books/$(1)/icons.json: $(SHARED) $$(filter-out src/books/$(1)/icons.json,$$(call PERBOOK,$(1)))
	BOOK=$(1) node src/assemble.js

# Stage 2 — inline the fonts, icons and app into the single self-contained file at
# <book>/index.html. Phony rather than a real target keyed on that path: the build is
# deterministic, so re-emitting it costs nothing but a few seconds either way.
$(1): check-$(1) src/build.js src/app.js src/page.css src/spectral_keep.json
	BOOK=$(1) node src/build.js

check-$(1): src/books/$(1)/icons.json src/check.js
	BOOK=$(1) node src/check.js
endef
$(foreach b,$(BOOKS),$(eval $(call BOOK_RULES,$(b))))

check: $(addprefix check-,$(BOOKS))

serve: $(BOOK)
	@echo "http://127.0.0.1:$(PORT)/$(BOOK)/"
	python3 -m http.server $(PORT) --bind 127.0.0.1

clean:
	rm -f $(addsuffix /icons.json,$(addprefix src/books/,$(BOOKS)))
