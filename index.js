document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const dateInput = document.getElementById('date');

  if (!form) {
    console.error('Formulário não encontrado');
  } else {
    // Impede escolher uma data que já passou
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const service = document.getElementById('service').value;
      const dateValue = document.getElementById('date').value;
      const message = document.getElementById('message').value.trim();

      const date = dateValue ? dateValue : 'Qualquer data';

      let text =
        'Olá! Meu nome é ' + name + '.\n' +
        'Gostaria de agendar o serviço: ' + service + '.\n' +
        'Data desejada: ' + date + '.\n';

      if (message) {
        text += `\nMensagem adicional: ${message}.`;
      }

      const waNumber = '5511994793486';
      const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

      window.open(waURL, '_blank');
    });
  }

  // ---------- Lightbox: zoom da foto + agendamento pelo WhatsApp ----------
  const waNumber = '5511994793486';
  const lightbox = document.getElementById('photoLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxPhotoWrap = document.querySelector('.lightbox-photo');
  const lightboxServiceName = document.getElementById('lightboxServiceName');
  const lightboxForm = document.getElementById('lightboxForm');
  const lbDate = document.getElementById('lb-date');
  const lbTime = document.getElementById('lb-time');
  let lastFocusedTrigger = null;

  if (lbDate) {
    const today = new Date().toISOString().split('T')[0];
    lbDate.min = today;
  }

  function openLightbox(trigger) {
    const img = trigger.dataset.img;
    const service = trigger.dataset.service || '';
    lastFocusedTrigger = trigger;

    lightboxImg.src = img;
    lightboxImg.alt = 'Foto do resultado: ' + service;
    lightboxServiceName.textContent = service;
    lightboxForm.dataset.service = service;
    lightboxPhotoWrap.classList.remove('is-zoomed');

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const nameField = document.getElementById('lb-name');
    if (nameField) nameField.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxPhotoWrap.classList.remove('is-zoomed');
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  }

  document.querySelectorAll('.photo-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });

  if (lightbox) {
    lightbox.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });

    if (lightboxImg) {
      lightboxImg.addEventListener('click', () => {
        lightboxPhotoWrap.classList.toggle('is-zoomed');
      });
    }
  }

  if (lightboxForm) {
    lightboxForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('lb-name').value.trim();
      const service = lightboxForm.dataset.service || '';
      const dateValue = lbDate.value;
      const timeValue = lbTime.value;

      const dateFormatted = dateValue
        ? new Date(dateValue + 'T00:00:00').toLocaleDateString('pt-BR')
        : 'Qualquer data';
      const timeFormatted = timeValue || 'A combinar';

      const text =
        'Olá! Meu nome é ' + name + '.\n' +
        'Vi essa foto no site e gostaria de agendar o serviço: ' + service + '.\n' +
        'Data desejada: ' + dateFormatted + '.\n' +
        'Horário desejado: ' + timeFormatted + '.';

      const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
      window.open(waURL, '_blank');
    });
  }

  // Revela seções suavemente ao rolar a página
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
});
