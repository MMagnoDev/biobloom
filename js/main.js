/**
 * BIOBLOOM | JARDINS DE BIODIVERSIDADE & RESTAURO ECOLÓGICO
 * Interactive Engine & Cascading Modal System
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. BACKGROUND CAROUSEL SLIDESHOW ENGINE (AUTONOMOUS CROSSFADE)
  // =========================================================================
  const slides = document.querySelectorAll('.bg-slide');
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 4500; // 4.5 seconds per slide
  let slideTimer = null;

  // Preload all slideshow images in background for instant switching
  [
    'assets/img/bg_slide_1.webp',
    'assets/img/bg_slide_2.webp',
    'assets/img/bg_slide_3.webp',
    'assets/img/bg_slide_4.webp',
    'assets/img/bg_slide_5.webp',
    'assets/img/bg_slide_6.webp'
  ].forEach(src => {
    const img = new Image();
    img.src = src;
  });

  function updateSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });

    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => {
      currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
      updateSlide(currentSlideIndex);
    }, slideDuration);
  }

  if (totalSlides > 0) {
    updateSlide(0);
  }


  // =========================================================================
  // 2. MODAL & CASCADING POP-UP MANAGEMENT
  // =========================================================================
  const allModals = document.querySelectorAll('.custom-modal-backdrop');
  const modalOpenButtons = document.querySelectorAll('[data-open-modal]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
  const modalSwitchButtons = document.querySelectorAll('[data-switch-modal]');
  const submodalOpenButtons = document.querySelectorAll('[data-open-submodal]');
  const nestedCloseButtons = document.querySelectorAll('[data-close-nested-modal]');

  const servicesModal = document.getElementById('servicesModal');
  const ourGardensModal = document.getElementById('ourGardensModal');
  const meetingsNatureModal = document.getElementById('meetingsNatureModal');
  const btnBackToServicesFromGardens = document.getElementById('btnBackToServicesFromGardens');
  const btnBackToServicesFromMeetings = document.getElementById('btnBackToServicesFromMeetings');

  // Open Main Modal
  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('is-open');
      targetModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  // Close Specific Modal
  function closeModal(modalElement) {
    if (modalElement) {
      modalElement.classList.remove('is-open');
      modalElement.setAttribute('aria-hidden', 'true');
      
      const hasOpenModals = document.querySelector('.custom-modal-backdrop.is-open');
      if (!hasOpenModals) {
        document.body.style.overflow = '';
      }
    }
  }

  // Close All Modals
  function closeAllModals() {
    allModals.forEach(m => closeModal(m));
  }

  // Switch Modal smoothly (e.g. from Sobre nós to Contactos rápidos)
  function switchModal(fromModal, toModalId) {
    if (fromModal) closeModal(fromModal);
    setTimeout(() => {
      openModal(toModalId);
    }, 200);
  }

  // Open Sub-modal in cascade (keeps or switches from servicesModal)
  function openSubModal(subModalId) {
    const targetSubModal = document.getElementById(subModalId);
    if (targetSubModal) {
      targetSubModal.classList.add('is-open');
      targetSubModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  // Close Sub-modal and return smoothly to Services Modal
  function returnToServicesModal(currentSubModal) {
    if (currentSubModal) {
      closeModal(currentSubModal);
    }
    if (servicesModal && !servicesModal.classList.contains('is-open')) {
      openModal('servicesModal');
    }
  }

  // Hook Menu Buttons
  modalOpenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-open-modal');
      openModal(targetId);
    });
  });

  // Hook Close Buttons
  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.custom-modal-backdrop');
      closeModal(modal);
    });
  });

  // Hook Sub-modal Open Buttons (Inside Services Modal)
  submodalOpenButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subModalId = btn.getAttribute('data-open-submodal');
      openSubModal(subModalId);
    });
  });

  // Hook Sub-modal Back Buttons (Returns to Services)
  if (btnBackToServicesFromGardens) {
    btnBackToServicesFromGardens.addEventListener('click', () => {
      returnToServicesModal(ourGardensModal);
    });
  }
  if (btnBackToServicesFromMeetings) {
    btnBackToServicesFromMeetings.addEventListener('click', () => {
      returnToServicesModal(meetingsNatureModal);
    });
  }

  // Hook Nested Close Buttons (X button inside sub-modals)
  nestedCloseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subModal = e.target.closest('.custom-modal-backdrop');
      closeModal(subModal);
    });
  });

  // Hook Switch Buttons (Inline links between modals)
  modalSwitchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const currentModal = e.target.closest('.custom-modal-backdrop');
      const targetId = btn.getAttribute('data-switch-modal');
      switchModal(currentModal, targetId);
    });
  });

  // Backdrop click to close
  allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (modal.classList.contains('nested-level-2')) {
          closeModal(modal);
        } else {
          closeModal(modal);
        }
      }
    });
  });

  // ESC Key Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openNested = document.querySelector('.custom-modal-backdrop.nested-level-2.is-open');
      if (openNested) {
        returnToServicesModal(openNested);
      } else {
        closeAllModals();
      }
    }
  });


  // =========================================================================
  // 3. ACTION BUTTONS: PRE-SELECT SERVICE IN CONTACT FORM
  // =========================================================================
  const btnRequestGardensQuote = document.getElementById('btnRequestGardensQuote');
  const btnRequestMeetingsQuote = document.getElementById('btnRequestMeetingsQuote');
  const serviceInterestSelect = document.getElementById('serviceInterest');

  function openContactWithService(serviceValue) {
    closeAllModals();
    setTimeout(() => {
      openModal('contactModal');
      if (serviceInterestSelect) {
        for (let i = 0; i < serviceInterestSelect.options.length; i++) {
          if (serviceInterestSelect.options[i].value === serviceValue) {
            serviceInterestSelect.selectedIndex = i;
            break;
          }
        }
      }
    }, 220);
  }

  if (btnRequestGardensQuote) {
    btnRequestGardensQuote.addEventListener('click', () => {
      openContactWithService('Os nossos jardins');
    });
  }

  if (btnRequestMeetingsQuote) {
    btnRequestMeetingsQuote.addEventListener('click', () => {
      openContactWithService('Reuniões e Actividades na Natureza');
    });
  }

  const linkFalaConnoscoMeetings = document.getElementById('linkFalaConnoscoMeetings');
  if (linkFalaConnoscoMeetings) {
    linkFalaConnoscoMeetings.addEventListener('click', () => {
      openContactWithService('Reuniões e Actividades na Natureza');
    });
  }


  // =========================================================================
  // 4. CONTACT FORM SUBMISSION HANDLER
  // =========================================================================
  window.handleContactSubmit = function() {
    const submitBtn = document.getElementById('submitFormBtn');
    const successMsg = document.getElementById('formSuccessMessage');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>A enviar mensagem...</span>';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.style.display = 'none';
      }
      if (successMsg) {
        successMsg.style.display = 'flex';
      }
    }, 800);
  };

});
