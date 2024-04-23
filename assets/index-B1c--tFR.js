var D=Object.defineProperty;var F=(e,t,n)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var d=(e,t,n)=>(F(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();class L{constructor(t,n){d(this,"tag");d(this,"className");d(this,"element");this.tag=t,this.className=n,this.element=document.createElement(t),this.element.className=n}addToParent(t){t.appendChild(this.element)}}class A extends L{constructor(n,s,o){super("button",n);d(this,"button");this.button=this.element,this.button.type=s,o&&this.button.addEventListener("click",o)}}class G extends L{constructor(n,s,o){super("input",n);d(this,"value");d(this,"type");d(this,"isValid");const a=this.element;a.placeholder=o,a.type=s,this.type=s,this.value="",this.isValid=!1,this.validateInput()}validateInput(){this.element.addEventListener("input",n=>{const s=n.target;let o=/^[a-zA-Z0-9]*$/;this.type==="password"&&(o=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9-]+$/),this.isValid=o.test(s.value),this.value=s.value;const a=new CustomEvent("inputValidated",{detail:this.isValidInput()});document.dispatchEvent(a)})}isValidInput(){return this.isValid}getInputValue(){return this.value.trim()}}function r(e,t,n){const s=new L(e,t);return n&&s.addToParent(n),s.element}function h(e,t,n,s){const o=s?new A(e,t,s):new A(e,t);return o.element.textContent=n,o.element}function v(e,t,n,s){const o=new G(e,t,n);return s&&o.addToParent(s),o}function P(e,t,n){const s={id:n,login:e,password:t};sessionStorage.setItem("chat-user",JSON.stringify(s))}function b(){const e=sessionStorage.getItem("chat-user");return e?JSON.parse(e):null}function J(){sessionStorage.removeItem("chat-user")}function g(){const e="0123456789",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",n="-_",s=e+t+n,o=7;let a="";a+=e.charAt(Math.floor(Math.random()*e.length)),a+=n.charAt(Math.floor(Math.random()*n.length));for(let i=2;i<=o;i+=1)a+=s.charAt(Math.floor(Math.random()*s.length));return a=a.split("").sort(()=>.5-Math.random()).join(""),a}function _(e,t){const n=r("div","title",e);n.textContent=t}function $(){const e=document.createDocumentFragment(),t=r("div","chat__user");r("div","chat__user-info",t);const n=r("div","chat__wrapper",t),s=r("div","chat__user-message",n);_(s,"Pick user and go FUN_CHAT!");const o=r("form","chat__send",t);v("send-input","text","write message",o).element.setAttribute("disabled","true");const i=h("btn send-button","submit","send");return i.setAttribute("disabled","true"),o.appendChild(i),e.append(t),e}function B(e){const t=new Date(e),n=t.toLocaleString("en-GB",{weekday:"short"}),s=t.getDate(),o=t.toLocaleString("en-GB",{month:"short"}),a=t.getFullYear(),i=t.toLocaleTimeString("en-GB",{hourCycle:"h23",hour:"2-digit",minute:"2-digit",second:"2-digit"});return`${n}, ${s} ${o} ${a}, ${i}`}function H(e,t){const{isReaded:n,isDelivered:s}=e;let o;if(t&&typeof e=="boolean")o=t;else switch(!0){case n:o="Read";break;case s:o="Delivered";break;default:o="Sent";break}return o}function C(e,t){const n=document.createDocumentFragment(),s=r("div","message",n);s.setAttribute("id",e.id),e.status.isDelivered&&s.classList.add("delivered");const o=r("p","message-status");if(t===e.from){const c=r("p","message-to",s);c.textContent=`To ${e.to}`,s.style.marginLeft="auto",s.style.marginRight="0",o.textContent=H(e.status)}else{const c=r("p","message-from",s);c.textContent=`From ${e.from}`}const a=r("p","message-date",s);a.textContent=B(e.datetime);const i=r("p","message-text",s);return i.textContent=e.text,s.appendChild(o),n}async function W(e,t){const n=document.querySelector(".chat__user-message");e.forEach(s=>{const o=C(s,t);n.appendChild(o)})}function z(e){const t=document.querySelector(".chat__user-message");m(t);const n={id:g(),type:"MSG_FROM_USER",payload:{user:{login:e}}},{ws:s}=y;s.send(JSON.stringify(n)),setTimeout(()=>{Array.from(t.children).some(a=>a.classList.contains("message"))||(_(t,"write your message"),_(t,`to ${e}`))},100)}function T(e){const t=document.querySelector(".chat__user-info"),{login:n,isLogined:s}=e;m(t);const o=r("div","user user-login",t);o.textContent=n;const a=r("div","user user-status",t);s?(a.classList.add("user-online"),a.textContent="online"):(a.classList.add("user-offline"),a.textContent="offline")}const S=e=>{Array.from(e.children).forEach(t=>{console.log(t);const n={id:g(),type:"MSG_READ",payload:{message:{id:t.id}}},{ws:s}=y;s.send(JSON.stringify(n)),t.classList.remove("delivered")})};function Z(){const e=document.querySelector(".chat__user-message"),t=document.querySelector(".chat__wrapper"),n=document.querySelector(".send-input");e.addEventListener("click",()=>{S(e)}),t.addEventListener("scroll",()=>{S(e)}),n.addEventListener("input",()=>{n.value.length>0&&S(e)})}function x(e){const{id:t,status:n,text:s}=e,o=document.getElementById(t);if(o){const a=o.querySelector(".message-status"),i=o.querySelector(".message-text");let c="";const u=o.firstChild;if(a){switch(!0){case n.isReaded:u.className==="message-to"&&(c="Read");break;case n.isEdited:c=`Edited ${o.textContent}`,i.textContent=s;break;default:c="Delivered",o.classList.add("delivered");break}a.textContent=c}}}async function X(e,t,n){const s=document.querySelector(".user-login"),o=document.querySelector(".chat__user-message");if(Array.from(o.children).some(i=>i.classList.contains("message"))||m(o),s&&(s.textContent===e.from||s.textContent===e.to)){const c=C(e,t);document.querySelector(".chat__user-message").appendChild(c)}}function Y(e,t){e.value.length>0?t.removeAttribute("disabled"):t.setAttribute("disabled","true")}function j(e){const t=document.querySelector(".chat__send"),n=t.firstChild,s=t.lastChild;n.removeAttribute("disabled"),n.addEventListener("input",a=>{const i=a.target;i&&Y(i,s)});const{ws:o}=y;t.onsubmit=a=>{a.preventDefault();const i={id:g(),type:"MSG_SEND",payload:{message:{to:e,text:n.value}}};o.send(JSON.stringify(i)),n.value="",s.setAttribute("disabled","true")}}function K(e){const t=e.target;if(t&&t.classList.contains("user")){const n=t.textContent,s=t.classList.contains("user-online"),o={login:n,isLogined:s};j(n),T(o),z(n),Z()}}function Q(e,t){const s=e.target.value.trim().toLowerCase();Array.from(t).forEach(o=>{var i;(i=o.textContent)!=null&&i.toLowerCase().startsWith(s)?o.classList.remove("hide"):o.classList.add("hide")})}function ee(){const e=document.createDocumentFragment(),t=r("div","chat__list"),n=v("chat__list-search","search","find user...",t).element,s=r("div","chat__list-wrapper",t),o=r("ul","chat__list-user",s);return n.addEventListener("input",a=>Q(a,o.children)),o.addEventListener("click",K),e.append(t),e}function te(e){const t=r("div","chat",e),n=ee(),s=$();t.append(n,s)}const ne=(e,t,n)=>{e.preventDefault();const s=document.querySelector(".modal");n.classList.remove("blur"),t.removeChild(s)};function se(){const e=document.querySelector(".container");e.classList.add("blur");const t=r("div","modal",document.body),n=r("div","modal__wrapper",t),s=r("div","about",n),o=r("div","about__info",s);o.textContent="This application was developed for the Fun Chat work assignments as part of the RSSchool JS/FE 2023Q4";const a=r("a","about__info",s);a.href="https://github.com/Jezhora",a.textContent="Yauheni Jezhora";const i=h("btn","button","back",c=>ne(c,document.body,e));s.appendChild(i)}const oe=e=>{e.preventDefault(),se()};function ae(e){const t=r("h1","title",e);t.textContent="RS FUN-CHAT";const n=h("btn","button","ABOUT",oe);e.append(n)}function q(e){const t=document.querySelector(".logout");e.removeChild(t)}const ie=e=>{e.preventDefault(),J(),ve(),E("/")};function I(e,t){const n=r("div","logout",e),s=r("p","logout__name",n);s.textContent=`${t}`;const o=h("btn","button","LOG OUT",ie);n.appendChild(o)}function re(e){const t=r("header","header",e);return ae(t),t}const f=(e,t)=>{Array.from(e.children).forEach(n=>{n.classList.contains(t)&&e.removeChild(n)})},M=(e,t,n)=>{const s=r("div",t);e.appendChild(s),s.textContent=n};function O(e,t,n,s){const o=n.isValidInput(),{length:a}=n.getInputValue();a>=t&&o&&f(e,s),a<t&&(f(e,s),M(e,s,`Must contain at least ${t} symbols`)),a<1&&f(e,s),!o&&a>=t&&(f(e,s),M(e,s,s==="invalid-login"?"English letters, numbers are allowed":"Must contain uppercase and lowercase letters with numbers"))}function ce(e,t){const n=e.isValidInput(),s=t.isValidInput(),o=e.getInputValue().length,a=t.getInputValue().length,i=o>2&&a>3;return n&&s&&i}function ue(e,t,n,s){ce(e,t)?n.removeAttribute("disabled"):n.setAttribute("disabled","true"),O(s,3,e,"invalid-login"),O(s,4,t,"invalid-password")}async function de(e,t,n){e.preventDefault();const s=g();k(t.value.trim(),n.value.trim(),s)}const le=e=>{e.preventDefault(),E("/")};function p(e,t){const n=r("form","login",e),s=v("login__input user-name","text","login",n),o=v("login__input user-password","password","password",n),a=h("btn","submit","go chat");a.setAttribute("disabled","true"),document.addEventListener("inputValidated",()=>ue(s,o,a,n)),n.appendChild(a);const i=s.element,c=o.element;t&&(i.disabled=t,c.disabled=t),n.onsubmit=u=>de(u,i,c)}function m(e){for(;e.firstChild;)e.removeChild(e.lastChild)}function me(e,t="404 Page not found"){const n=r("p","title");n.textContent=t,n.style.fontSize="74px";const s=h("btn","button","GO LOGIN PAGE",le);e.append(n,s)}const R=e=>{e.children.length>2&&q(e)};function w(e){const t=document.querySelector(".main"),n=document.querySelector(".header"),s=b();switch(e){case"/":m(t),s?(p(t,!0),q(n),I(n,s.login)):(p(t),R(n));break;case"/chat":m(t),s?(R(n),I(n,s.login),te(t)):me(t,"To access, enter your login and password");break;default:m(t),p(t);break}}function E(e){window.history.pushState({path:e},"",e),w(e)}function ge(){const{ws:e}=y,n={id:g(),type:"USER_ACTIVE",payload:null},o={id:g(),type:"USER_INACTIVE",payload:null};e.send(JSON.stringify(n)),e.send(JSON.stringify(o))}function he(e,t,n,s){const o={id:s,type:"USER_LOGIN",payload:{user:{login:t,password:n}}};e.send(JSON.stringify(o))}function fe(e,t,n,s,o){const a=JSON.parse(t.data),i=b();if(a.type==="USER_LOGIN"&&a.payload.user.isLogined)P(n,s,o),E("/chat");else if(!i&&a.type==="ERROR"){const c=document.querySelector(".login"),u=r("p","invalid-password");console.log(u),u.textContent=a.payload.error.toUpperCase(),c.appendChild(u),e.close()}}function V(e,t,n){const o=r("li",t?"user user-online":"user user-offline");o.textContent=e,n.prepend(o)}async function U(e,t){const n=document.querySelector(".chat__list-user"),s=document.createDocumentFragment();e.forEach(o=>{const{login:a,isLogined:i}=o;a!==t&&V(a,i,s)}),n.appendChild(s)}async function N(e){const{login:t,isLogined:n}=e,s=document.querySelector(".chat__list-user"),o=document.querySelectorAll(".user"),a=Array.from(o).filter(i=>i.textContent===t);if(a.length!==0){const i=a[0];s.removeChild(i),n?s.prepend(i):s.appendChild(i),i.classList.toggle("user-offline"),i.classList.toggle("user-online");const c=document.querySelector(".user-login");c&&i.textContent===c.textContent&&T(e)}else V(t,n,s)}let l;const y={get ws(){return l}};async function pe(e,t){const n=JSON.parse(e.data),{type:s,payload:o}=n;switch(s){case"USER_ACTIVE":await U(o.users,t);break;case"USER_INACTIVE":await U(o.users,t);break;case"USER_EXTERNAL_LOGIN":await N(o.user);break;case"USER_EXTERNAL_LOGOUT":await N(o.user);break;case"MSG_FROM_USER":await W(o.messages,t);break;case"MSG_SEND":await X(o.message,t,o.message.id);break;case"MSG_DELIVER":x(o.message);break;case"MSG_READ":x(o.message);break}}function k(e,t,n=""){l=new WebSocket("ws://localhost:4000"),l.onopen=()=>{he(l,e,t,n),ge()},setTimeout(()=>{l.onmessage=async s=>{fe(l,s,e,t,n),pe(s,e)}},0)}function ve(){l&&l.close()}async function be(){const e=b();if(e){const{login:t,id:n,password:s}=e;k(t,s,n)}}const ye=""+new URL("rs_school-DDD5qqfv.png",import.meta.url).href;function Se(e){const t=r("footer","footer",e),n=r("a","footer__git",t);n.href="https://github.com/Jezhora",n.textContent="Jezhora 2024",n.setAttribute("target","blank");const s=r("a","footer__git",t);s.href="https://rs.school/",s.textContent="The Rolling Scopes",s.setAttribute("target","blank");const o=r("img","footer__logo",t);o.src=`${ye}`,o.alt="RSschool",o.width=150}function _e(){const e=r("div","container",document.body),t=re(e);e.appendChild(t);const n=r("main","main",e);b()?be():p(n),Se(e)}function Ce(){const e=document.createElement("meta");e.setAttribute("charset","UTF-8"),document.head.appendChild(e);const t=document.createElement("meta");t.setAttribute("name","viewport"),t.setAttribute("content","width=device-width, initial-scale=1.0"),document.head.appendChild(t);const n=document.createElement("link");n.rel="icon",n.type="image/x-icon",n.href="images/favicon.ico",document.head.appendChild(n);const s=document.createElement("title");s.textContent="RS FunChat",document.head.appendChild(s)}window.addEventListener("DOMContentLoaded",()=>{Ce(),_e();const e=window.location.pathname;w(e),window.addEventListener("popstate",t=>{const n=t.state?t.state.path:window.location.pathname;w(n)})});
