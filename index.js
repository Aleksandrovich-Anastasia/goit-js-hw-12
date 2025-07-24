import{a as S,S as P,i as q}from"./assets/vendor-DgsA5abv.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const B="51362308-fccd9ac64991a037e5dade233",M="https://pixabay.com/api/";async function f(s,e=1){return(await S.get(M,{params:{key:B,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}})).data}const h=document.querySelector(".gallery"),d=document.querySelector(".loader"),m=document.querySelector(".load-more"),$=new P(".gallery a");function p(s){const e=s.map(({webformatURL:a,largeImageURL:c,tags:t,likes:o,views:i,comments:b,downloads:w})=>`
      <li class="gallery-item">
        <a href="${c}">
          <img src="${a}" alt="${t}" loading="lazy" />
          <div class="info">
            <div class="info-item"><span class="label">Likes</span><span class="value">${o}</span></div>
            <div class="info-item"><span class="label">Views</span><span class="value">${i}</span></div>
            <div class="info-item"><span class="label">Comments</span><span class="value">${b}</span></div>
            <div class="info-item"><span class="label">Downloads</span><span class="value">${w}</span></div>
          </div>
        </a>
      </li>`).join("");h.insertAdjacentHTML("beforeend",e),$.refresh()}function A(){h.innerHTML=""}function y(){d.classList.add("is-visible"),d.classList.remove("is-hidden")}function g(){d.classList.remove("is-visible"),d.classList.add("is-hidden")}function v(){m.classList.remove("is-hidden")}function u(){m.classList.add("is-hidden")}const E="/goit-js-hw-12/assets/sprite-BWBAyIsh.svg",x=document.querySelector(".form"),H=document.querySelector('input[name="search-text"]'),O=document.querySelector(".load-more");let n=1,l="";const L=15;x.addEventListener("submit",async s=>{if(s.preventDefault(),l=H.value.trim(),n=1,!l){r("Please enter a search query!");return}A(),u(),y();try{const e=await f(l,n);if(e.hits.length===0){r("Sorry, there are no images matching your search query.");return}p(e.hits);const a=Math.ceil(e.totalHits/L);n<a?v():(u(),r("We're sorry, but you've reached the end of search results.","end-toast"))}catch{r("An error occurred. Please try again later.")}finally{g()}});O.addEventListener("click",async()=>{n++,y(),u();try{const s=await f(l,n);p(s.hits);const e=Math.ceil(s.totalHits/L);n>=e?(u(),r("We're sorry, but you've reached the end of search results.","end-toast")):v(),_()}catch{r("Failed to load more images.")}finally{g()}});function r(s,e="custom-toast"){q.info({class:e,icon:"",message:`
      <svg class="toast-icon" width="24" height="24">
        <use xlink:href="${E}#icon-info"></use>
      </svg>
      <span class="info-text">${s}</span>
    `,dangerouslyHTML:!0,position:"topRight",timeout:3e3})}function _(){const s=document.querySelector(".gallery-item");if(!s)return;const{height:e}=s.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
