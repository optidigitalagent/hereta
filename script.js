// ===== HERETA DENTAL =====
(function(){
  var header = document.querySelector('.header');
  function onScroll(){ header.classList.toggle('scrolled', window.scrollY > 24); }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // mobile drawer
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  function toggle(open){
    drawer.classList.toggle('open', open);
    burger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function(){ toggle(!drawer.classList.contains('open')); });
  drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ toggle(false); }); });

  // services accordion — discrete max-height change (no transition dependency)
  var items = Array.prototype.slice.call(document.querySelectorAll('.svc-item'));
  function open(item){
    items.forEach(function(o){ o.classList.remove('open'); o.querySelector('.svc-body').style.maxHeight = '0px'; });
    item.classList.add('open');
    item.querySelector('.svc-body').style.maxHeight = '500px';
  }
  items.forEach(function(item){
    item.querySelector('.svc-head').addEventListener('click', function(){
      if (item.classList.contains('open')){
        item.classList.remove('open');
        item.querySelector('.svc-body').style.maxHeight = '0px';
      } else { open(item); }
    });
  });
  if (items[0]) open(items[0]);

  // entrance animation: only for elements that start BELOW the fold, armed on
  // real scroll. Above-the-fold content stays at its visible base state, so it
  // is never hidden in non-animating contexts (print, throttled previews).
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var vh0 = window.innerHeight || document.documentElement.clientHeight;
  var pending = reveals.filter(function(el){ return el.getBoundingClientRect().top > vh0 * 0.95; });
  function armCheck(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = pending.length - 1; i >= 0; i--){
      var el = pending[i];
      if (el.getBoundingClientRect().top < vh * 0.9){ el.classList.add('armed'); pending.splice(i,1); }
    }
  }
  window.addEventListener('scroll', armCheck, {passive:true});

  // play phone videos (muted/loop) — src set at runtime so it streams (and isn't inlined into the standalone)
  document.querySelectorAll('video[data-auto]').forEach(function(v){
    if (v.dataset.src && !v.src) v.src = v.dataset.src;
    var p = v.play(); if (p && p.catch) p.catch(function(){});
  });
})();
