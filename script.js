(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.documentElement.classList.add('js-reveal');

  if ('IntersectionObserver' in window) {
    document.querySelectorAll('.project-grid').forEach(function (grid) {
      grid.querySelectorAll('.project').forEach(function (card, i) {
        card.style.setProperty('--reveal-delay', (i * 70) + 'ms');
      });
    });

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.project').forEach(function (el) {
      revealObserver.observe(el);
    });

    var sectionObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });
    document.querySelectorAll('section.discipline').forEach(function (el) {
      sectionObserver.observe(el);
    });
  }

  document.querySelectorAll('.thumb').forEach(function (thumb) {
    thumb.addEventListener('mousemove', function (e) {
      var rect = thumb.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      thumb.style.setProperty('--thumb-x', (relX * -5).toFixed(1) + 'px');
      thumb.style.setProperty('--thumb-y', (relY * -5).toFixed(1) + 'px');
    });
    thumb.addEventListener('mouseleave', function () {
      thumb.style.setProperty('--thumb-x', '0px');
      thumb.style.setProperty('--thumb-y', '0px');
    });
  });

  var hero = document.querySelector('.hero');
  var orbitParallax = document.querySelector('.orbit-parallax');
  if (hero && orbitParallax && window.matchMedia('(min-width: 760px)').matches) {
    var ticking = false;
    var updateHeroParallax = function () {
      var rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var offset = Math.max(-40, Math.min(40, rect.top * -0.12));
        orbitParallax.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
      }
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeroParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  var bgDecor = document.querySelector('.bg-decor');
  if (bgDecor) {
    var targetX = 50, targetY = 50, curX = 50, curY = 50, moved = false;
    window.addEventListener('mousemove', function (e) {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
      moved = true;
    }, { passive: true });
    (function frameLight() {
      if (moved) {
        curX += (targetX - curX) * 0.06;
        curY += (targetY - curY) * 0.06;
        bgDecor.style.setProperty(
          '--cursor-glow',
          'radial-gradient(circle 26vmax at ' + curX.toFixed(2) + '% ' + curY.toFixed(2) +
            '%, color-mix(in srgb, var(--paper) 9%, transparent), transparent 70%)'
        );
      }
      requestAnimationFrame(frameLight);
    })();
  }
})();
