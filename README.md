# Jonah Joins the Navy

A three-minute cinematic scrolling retelling of **הצוללן העברי הראשון**, created for Almog Ankori’s Book of Jonah presentation at JTS.

**[Open the story](https://ankorial.github.io/jonah-joins-the-navy/)** · **[Presenter view](https://ankorial.github.io/jonah-joins-the-navy/?presenter=1#enlist)**

Scroll through seven chapters, or select **Play story** for the 180-second sequence. The final English/Hebrew question remains visible. The story has no automatic audio; narration is live, and the song recording is linked in Sources.

## Controls

- Space: play/pause.
- Scrolling or touch input pauses playback.
- Presenter view: left/right arrows select chapters; Home returns to the beginning.
- The small controls appear on pointer movement or keyboard focus.
- Reduced-motion users receive the still sequence. `?motion=still` selects it explicitly; `still.html` works without JavaScript.

Chapter links: `#enlist`, `#storm`, `#transfer`, `#england`, `#machine`, `#periscope`, `#lab`.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

For a local production preview:

```sh
npm run build
npm run preview
```

## GitHub Pages

This public repository uses GitHub Pages on the `main` branch, publishing the `docs/` directory. The checked static build is committed alongside the editable React, TypeScript, and GSAP source.

After edits:

```sh
npm run build:pages
git add src public docs package.json package-lock.json index.html vite.config.ts tsconfig.json README.md
git commit -m "Update story"
git push
```

GitHub Pages republishes the checked files. Keep `.nojekyll`, `CREDITS.txt`, and the license files with the build. All story artwork and fonts are bundled locally; linked recordings and references require internet access.

## Credits and interpretation

Words: Dan Almagor. Music: Albert Piamenta. Performer: Arik Lavie. The [published edition](https://benyehuda.org/read/12456) identifies a documented television performance in 1971.

Historical references: [Navy veterans’ archive](https://www.amutayam.org.il/?ArticleID=1116&CategoryID=603) and [Technion history](https://www.technion.ac.il/en/the-history-of-the-technion/). Biblical comparisons use the [Hebrew book of Jonah](https://mechon-mamre.org/p/pt/pt1701.htm).

Original generated artwork and animation creatively adapt the song. INS Tarshish is fictional; Nineveh is imagined as a port. The kikayon’s botanical identity remains uncertain. The final question is a Jonah 4:11 excerpt using a working English translation. The recording is linked, not redistributed.

Instrument Serif, Noto Sans, and Noto Sans Hebrew licenses are retained in `public/licenses/`; dependency credits are in `public/CREDITS.txt`.
