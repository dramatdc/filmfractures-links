# Film Fractures link page

A clean, Linktree-style link page with Amazon picks. It's pure HTML/CSS/JS with no build step.

```
links.js     ← EDIT THIS: bio, socials, movie picks
index.html   page structure
styles.css   look
script.js    renders everything (+ official logos)
assets/      avatar.jpg, covers/
```

## Adding a new movie (newest goes on top)

1. Save the cover image (Blu-ray/4K case art, portrait) into `assets/covers/`, e.g. `dune.jpg`.
2. In `links.js`, paste a new block **directly under `items: [`**:

```js
      {
        title: "Dune: Part Two",
        format: "4K Ultra HD Steelbook",
        cover: "assets/covers/dune.jpg",
        pitch: "One line on why it's worth owning.",
        url: "https://amzn.to/your-link",
      },
```

The first item becomes the big "Just added" card, and all older picks move down into "Previous picks."
If there's no cover yet, leave `cover: ""` and a placeholder case is shown.

## Hosting (GitHub + Vercel, free)

One-time setup:
1. Push this folder to a GitHub repo.
2. At https://vercel.com, click **Add New → Project**, import the repo, choose Framework **Other**, then **Deploy**.

**Updating the live site:** change `links.js`, upload the cover on github.com (or push from here), and Vercel redeploys in a few seconds.
