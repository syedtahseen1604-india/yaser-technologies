const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
const glow=document.querySelector('.cursor-glow');

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40),{passive:true});

menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{
  el.style.transitionDelay=`${Math.min(i%6,5)*70}ms`;
  observer.observe(el);
});

if(window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',(e)=>{
    glow.style.left=e.clientX+'px';
    glow.style.top=e.clientY+'px';
  },{passive:true});
}else glow.remove();
