/* Film Fractures — renders the page from links.js. You shouldn't need to edit this. */
(function () {
  const C = window.FF || {};
  const P = C.profile || {};
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ext = (url) => /^https?:/i.test(url || "");

  /* ---------- official logos, in brand colors ---------- */
  const ICONS = {
    youtube: {
      label: "YouTube",
      svg: '<svg viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    },
    tiktok: {
      label: "TikTok",
      svg: (() => {
        const d = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
        return `<svg viewBox="-1 -1 26 26"><g transform="translate(12 12) scale(.86) translate(-12 -12)"><path fill="#25F4EE" transform="translate(-.9 -.7)" d="${d}"/><path fill="#FE2C55" transform="translate(.9 .7)" d="${d}"/><path fill="#000" d="${d}"/></g></svg>`;
      })(),
    },
    instagram: {
      label: "Instagram",
      svg: '<svg viewBox="0 0 24 24"><defs><radialGradient id="ig" cx="0.3" cy="1.07" r="1.3"><stop offset="0" stop-color="#FFDD55"/><stop offset=".1" stop-color="#FFDD55"/><stop offset=".5" stop-color="#FF543E"/><stop offset="1" stop-color="#C837AB"/></radialGradient></defs><path fill="url(#ig)" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>',
    },
    facebook: {
      label: "Facebook",
      svg: '<svg viewBox="0 0 24 24"><path fill="#0866FF" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
    },
    letterboxd: {
      label: "Letterboxd",
      svg: '<svg viewBox="0 0 24 24"><circle cx="4.45" cy="12" r="4.44" fill="#FF8000"/><circle cx="19.55" cy="12" r="4.44" fill="#40BCF4"/><circle cx="12" cy="12" r="4.44" fill="#00E054"/></svg>',
    },
    email: {
      label: "Email",
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 6.5L21 7"/></svg>',
    },
  };
  const AMAZON = '<svg class="amz" viewBox="0 0 24 24" aria-hidden="true"><path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z"/></svg>';
  const target = (url) => ext(url) ? ' target="_blank" rel="noopener sponsored"' : "";

  /* ---------- profile ---------- */
  document.title = P.name || document.title;
  $("name").textContent = P.name || "";
  const bio = Array.isArray(P.bio) ? P.bio : [P.bio || ""];
  // split each line into emoji + text so the emojis stack in a neat column
  $("bio").innerHTML = bio.map((line) => {
    const [, emoji, text] = String(line).match(/^(\S+)\s+(.*)$/u) || [, "", line];
    return `<p><span class="e">${esc(emoji)}</span><span>${esc(text)}</span></p>`;
  }).join("");
  // optically center the bio: the block is centered on its longest line, so
  // nudge it right by the empty space the shorter lines leave behind
  const centerBio = () => {
    const el = $("bio");
    el.style.transform = "";
    const box = el.getBoundingClientRect();
    const rights = [...el.children].map((p) => {
      const r = document.createRange();
      r.selectNodeContents(p.lastElementChild);
      return Math.max(...[...r.getClientRects()].map((x) => x.right));
    });
    if (!rights.length || !isFinite(rights[0])) return;
    const maxR = Math.max(...rights);
    const avgR = rights.reduce((a, b) => a + b, 0) / rights.length;
    const shift = Math.min((box.right - maxR) / 2 + (maxR - avgR) / 2, 12);
    el.style.transform = `translateX(${shift.toFixed(1)}px)`;
  };
  centerBio();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(centerBio);
  addEventListener("resize", centerBio);
  if (P.avatar) {
    $("avatar").src = P.avatar;
    $("bg").style.backgroundImage = `url("${P.avatar}")`;
  }

  /* ---------- social icons ---------- */
  $("socials").innerHTML = (C.socials || []).map((s) => {
    const ic = ICONS[s.platform] || ICONS.email;
    const t = ext(s.url) ? ' target="_blank" rel="noopener"' : "";
    return `<a class="soc" href="${esc(s.url)}" aria-label="${ic.label}" title="${ic.label}"${t}>${ic.svg}</a>`;
  }).join("");

  /* ---------- shelf: newest pick first, the rest below ---------- */
  const items = (C.shelf && C.shelf.items) || [];
  if (!items.length) $("shelf").hidden = true;

  const cover = (m, eager) => {
    if (m.cover) return `<img src="${esc(m.cover)}" alt="${esc(m.title)} ${esc(m.format || "")} cover"${eager ? "" : ' loading="lazy"'} />`;
    const uhd = /4k|uhd/i.test(m.format || "");
    return `<div class="case${uhd ? " uhd" : ""}"><div class="band">${uhd ? "4K ULTRA HD" : "BLU-RAY"}</div><div class="t">${esc(m.title)}</div></div>`;
  };
  const amazonBadge = `<span class="amz-badge">Available at ${AMAZON}<b>amazon</b></span>`;

  const [top, ...rest] = items;
  if (top) {
    $("featured").innerHTML = `
      <a class="feature" href="${esc(top.url)}"${target(top.url)}>
        <span class="f-cover">${cover(top, true)}<span class="new">Just added</span></span>
        <span class="f-body">
          ${amazonBadge}
          <span class="f-title">${esc(top.title)}</span>
          ${top.format ? `<span class="f-format">${esc(top.format)}</span>` : ""}
          ${top.pitch ? `<span class="f-pitch">${esc(top.pitch)}</span>` : ""}
        </span>
        <span class="buy">${AMAZON}<span>Buy on Amazon</span></span>
        <span class="f-note">Check today’s price &amp; editions on Amazon →</span>
      </a>`;
  }

  $("prev-heading").hidden = rest.length === 0;
  $("picks").innerHTML = rest.map((m) => `
    <li>
      <a class="pick" href="${esc(m.url)}"${target(m.url)}>
        <span class="p-cover">${cover(m)}</span>
        <span class="p-info">
          <span class="p-title">${esc(m.title)}</span>
          ${m.format ? `<span class="p-format">${esc(m.format)}</span>` : ""}
        </span>
        <span class="buy buy-sm">${AMAZON}<span>Buy</span></span>
      </a>
    </li>`).join("");

  /* ---------- footer ---------- */
  $("disclosure").textContent = C.disclosure || "";

  /* ---------- share this page ---------- */
  let toastTimer;
  const toast = (msg) => {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
  };
  $("share").addEventListener("click", async () => {
    try {
      if (navigator.share) return await navigator.share({ title: P.name, url: location.href });
      await navigator.clipboard.writeText(location.href);
      toast("Link copied");
    } catch (_) { /* cancelled */ }
  });
})();
