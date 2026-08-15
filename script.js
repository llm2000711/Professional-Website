
document.addEventListener("DOMContentLoaded",()=>{
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a=>{
    if(a.getAttribute("href")===path) a.classList.add("active");
  });
  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());

  // Public pages are read-only. They may optionally load published content
  // from published-content.js generated/exported from the local editor.
  if (window.PUBLISHED_SITE_CONTENT) {
    const data = window.PUBLISHED_SITE_CONTENT;
    const page = ((data.pages||{})[path]) || {};
    document.querySelectorAll("[data-edit]").forEach(el=>{
      const key = el.dataset.edit;
      if (page[key] !== undefined) el.innerHTML = page[key];
    });
    const globals = data.globals || {};
    document.querySelectorAll("[data-global]").forEach(el=>{
      const key = el.dataset.global;
      if (globals[key] !== undefined) el.innerHTML = globals[key];
    });
    const photos = data.photos || {};
    document.querySelectorAll("img[data-photo]").forEach(img=>{
      const key = img.dataset.photo;
      if (photos[key]) img.src = photos[key];
    });
  }
});

