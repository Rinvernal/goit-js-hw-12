import{i as l,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();function m(s){const o=`https://pixabay.com/api/?key=46229228-83a12c4f45cb396a8637e93cb&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(o).then(e=>e.json()).then(e=>e.hits).catch(e=>(console.error("Error:",e),[]))}function h(s){const n=document.querySelector(".gallery");n.innerHTML="";const o=s.map(e=>`
    <li class="gallery-item">
      <div class="info-container">
        <a href="${e.largeImageURL}" class="link">
        
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><span class="name-info">Likes</span> ${e.likes}</p>
          <p class="info-item"><span class="name-info">Views</span> ${e.views}</p>
          <p class="info-item"><span class="name-info">Comments</span> ${e.comments}</p>
          <p class="info-item"><span class="name-info">Downloads</span> ${e.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");n.innerHTML=o}const i=document.querySelector("#form-input"),a=document.querySelector(".gallery"),d=document.querySelector("#loadingId");let p;function y(){d.classList.remove("hidden")}function u(){d.classList.add("hidden")}i.addEventListener("submit",s=>{s.preventDefault();const n=document.querySelector('input[name = "Search"]').value.trim();if(n===""){l.error({message:"Please enter a search term.",position:"topCenter"}),a.innerHTML="",i.reset();return}y(),m(n).then(o=>{u(),o.length===0?(l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),a.innerHTML="",i.reset()):(a.innerHTML="",h(o),p&&p.destroy(),p=new f(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250})),i.reset()}).catch(o=>{u(),l.error({message:"Something went wrong, please try again later.",position:"topCenter"}),a.innerHTML="",i.reset()})});
//# sourceMappingURL=index.js.map
