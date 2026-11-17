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
    'assets/img/_DSC0827.webp',
    'assets/img/_DSC0915.webp',
    'assets/img/_DSC0896.webp',
    'assets/img/_DSC6859.webp',
    'assets/img/_DSC6787.webp',
    'assets/img/_DSC6788.webp',
    'assets/img/_DSC6789.webp'
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

  // Hook Generic Sub-modal Back Buttons (data-back-to-modal)
  document.querySelectorAll('[data-back-to-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentId = btn.getAttribute('data-back-to-modal');
      const currentModal = e.target.closest('.custom-modal-backdrop');
      if (currentModal) closeModal(currentModal);
      if (parentId) {
        setTimeout(() => {
          openModal(parentId);
        }, 150);
      }
    });
  });

  // =========================================================================
  // GALLERY PHOTO FILTERING & LIGHTBOX ENGINE
  // =========================================================================
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const photoCards = document.querySelectorAll('.photo-item-card');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  let currentPhotoList = [];
  let currentPhotoIndex = 0;

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      photoCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox functions
  function updateLightboxList() {
    currentPhotoList = Array.from(photoCards).filter(c => c.style.display !== 'none');
  }

  function showLightboxIndex(idx) {
    if (idx < 0) idx = currentPhotoList.length - 1;
    if (idx >= currentPhotoList.length) idx = 0;
    currentPhotoIndex = idx;

    const currentCard = currentPhotoList[currentPhotoIndex];
    if (currentCard && lightboxImg && lightboxCaption) {
      lightboxImg.src = currentCard.getAttribute('data-full');
      lightboxCaption.textContent = currentCard.getAttribute('data-caption') || '';
    }
  }

  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      updateLightboxList();
      const cardIndex = currentPhotoList.indexOf(card);
      showLightboxIndex(cardIndex >= 0 ? cardIndex : 0);
      if (lightbox) {
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); showLightboxIndex(currentPhotoIndex - 1); });
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); showLightboxIndex(currentPhotoIndex + 1); });
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Escape key handler for lightbox and modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    } else if (e.key === 'ArrowLeft' && lightbox && lightbox.classList.contains('is-open')) {
      showLightboxIndex(currentPhotoIndex - 1);
    } else if (e.key === 'ArrowRight' && lightbox && lightbox.classList.contains('is-open')) {
      showLightboxIndex(currentPhotoIndex + 1);
    }
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


  // =========================================================================
  // 5. YOUTUBE PLAYER: DISABLE AUTOMATIC CAPTIONS BY DEFAULT
  // =========================================================================
  const ytIframe = document.getElementById('biobloomYoutubePlayer');
  if (ytIframe) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    let ytPlayer = null;
    const disableAutoCaptions = () => {
      if (!ytPlayer) return;
      try {
        if (typeof ytPlayer.unloadModule === 'function') {
          ytPlayer.unloadModule('captions');
          ytPlayer.unloadModule('cc');
        }
      } catch (_) {}
    };

    window.onYouTubeIframeAPIReady = function() {
      ytPlayer = new window.YT.Player('biobloomYoutubePlayer', {
        events: {
          onReady: disableAutoCaptions,
          onApiChange: disableAutoCaptions,
          onStateChange: (e) => {
            if (e.data === 1) disableAutoCaptions();
          }
        }
      });
    };
  }

});
