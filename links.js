/* ============================================================
   FILM FRACTURES — LINK PAGE CONFIG
   ------------------------------------------------------------
   This is the ONLY file you need to edit.
   - Change text/URLs between the quotes.
   - Keep the commas at the end of each { ... }, block.
   ============================================================ */

window.FF = {

  /* ---------- PROFILE ---------- */
  profile: {
    name: "Film Fractures",
    avatar: "assets/avatar.jpg",
    bio: [
      "📀 Building my physical media collection, one movie at a time",
      "🕵️ Movie facts, theories & hidden details",
      "🛒 Where I buy the best movies + deals ⬇️",
    ],
  },

  /* ---------- SOCIAL ICONS ----------
     platform: youtube, tiktok, instagram, facebook, letterboxd, email */
  socials: [
    { platform: "youtube",   url: "https://www.youtube.com/@filmfractures" },
    { platform: "tiktok",    url: "https://www.tiktok.com/@filmfracture" },
    { platform: "instagram", url: "https://www.instagram.com/filmfractures" },
    { platform: "facebook",  url: "https://www.facebook.com/profile.php?id=61578663930679" },
  ],

  /* ---------- THE SHELF (your Amazon picks) ----------
     NEWEST GOES AT THE TOP. To add a new movie, paste a new
     { ... }, block right under "items: [" — it becomes the big
     featured card and everything else moves down automatically.

     title  = movie name
     format = edition, e.g. "4K Ultra HD", "4K Steelbook", "Blu-ray"
     cover  = cover image in assets/covers/  (e.g. "assets/covers/dune.jpg")
     pitch  = one line on why it's worth buying (shown on the big card)
     url    = your Amazon affiliate link                                */
  shelf: {
    items: [
      {
        title: "Everything Everywhere All at Once",
        format: "4K Ultra HD + Blu-ray",
        cover: "assets/covers/everything-everywhere.jpg",
        pitch: "Seven Oscars, one googly eye, and infinite universes. A wild, heartfelt must-own in 4K.",
        url: "https://amzn.to/4hpUqUg",
      },
    ],
  },

  /* ---------- FOOTER ---------- */
  // your message at the bottom of the page
  thanks: "🍿 Grabbing your movies through my links helps support the channel, and it costs you nothing extra. Thank you!",

  // tiny fine print. Amazon requires this exact sentence, so keep it.
  disclosure: "As an Amazon Associate I earn from qualifying purchases.",
};
