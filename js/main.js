/**
 * MARIA ECHEGOYEN | ARQUITETURA PAISAGÍSTICA & BIODIVERSIDADE
 * Main Interactive Engine & Cascading Modal System
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DATA REPOSITORY: DETAILED SERVICE SPECS FOR NESTED POP-UPS
  // =========================================================================
  const servicesData = {
    biodiversity: {
      badge: "Espaços Públicos & Empresas",
      title: "Jardins de Biodiversidade em Espaços Públicos & Corporativos",
      lead: "A nossa paixão é repor a natureza original em áreas verdes públicas, parques urbanos e terrenos empresariais. Convertemos relvados inertes em ecossistemas de biodiversidade vibrantes, onde a flora e fauna nativas coabitam em perfeita harmonia.",
      image: "assets/images/jardim1.png",
      benefits: [
        "Reposição autêntica da natureza original em espaços coletivos e sedes",
        "Aumento expressivo de polinizadores, aves e microfauna benéfica",
        "Redução de até 70% na pegada hídrica e custos de manutenção pública",
        "Forte impacto socioambiental, pedagogia ecológica e conformidade ESG"
      ],
      steps: [
        { num: "01", name: "Auditoria Ecológica", desc: "Mapeamento botânico, estudo da fauna local e diagnóstico do solo original." },
        { num: "02", name: "Projeto de Simbiose", desc: "Seleção criteriosa de espécies nativas, nichos biológicos e zonas húmidas." },
        { num: "03", name: "Instalação & Monitorização", desc: "Plantação sustentável, solo microbiótico e relatórios de fixação de fauna." }
      ],
      pricing: "Orçamento Sob Medida",
      pricingNote: "Projetos dimensionados para câmaras municipais, juntas de freguesia e empresas de todos os portes."
    },

    wildflowers: {
      badge: "Flores Nativas & Insetos",
      title: "Plantação de Flores Locais & Refúgios para Insetos",
      lead: "A transformação dos jardins acontece através da plantação de espécies de flores locais perenes e anuais, que irão proporcionar abrigo, néctar e alimento indispensáveis às várias espécies de insetos e polinizadores autóctones.",
      image: "assets/images/jardim2.png",
      benefits: [
        "Seleção exclusiva de prados floridos com espécies nativas regionais",
        "Hotéis de insetos integrados, pedras aquecedoras e nichos de nidificação",
        "Floração escalonada que garante alimento para abelhas e borboletas todo o ano",
        "Zero recurso a sementes híbridas ou plantas invasoras"
      ],
      steps: [
        { num: "01", name: "Curadoria de Espécies", desc: "Seleção botânica de flores silvestres com base na entomologia da região." },
        { num: "02", name: "Preparação Viva do Solo", desc: "Enriquecimento orgânico sem adubos sintéticos para germinação duradoura." },
        { num: "03", name: "Sementeira & Refúgios", desc: "Instalação dos abrigos biológicos e dispersão de sementes autóctones." }
      ],
      pricing: "A partir de 38€ / m²",
      pricingNote: "Inclui sementes certificadas de flora nativa, substrato biológico e módulos de abrigo."
    },

    maintenance: {
      badge: "100% Foco Ecológico",
      title: "Manutenção Ecológica Especializada",
      lead: "A ecologia é o principal foco dos nossos jardins. Desenvolvemos uma manutenção estritamente biológica, sem pesticidas ou herbicidas químicos, preservando a vida dos insetos, a microbiota do solo e o ciclo reprodutivo natural da flora.",
      image: "assets/images/jardim3.png",
      benefits: [
        "Total ausência de glifosato, inseticidas químicos ou adubos solúveis",
        "Preservação dos caules e flores secas que abrigam insetos no inverno",
        "Compostagem circular dos resíduos verdes no próprio local",
        "Equipa técnica com formação em botânica e conservação da natureza"
      ],
      steps: [
        { num: "01", name: "Plano de Manejo Biológico", desc: "Respeito rigoroso aos ciclos reprodutivos da fauna e períodos de nidificação." },
        { num: "02", name: "Nutrição e Poda Seletiva", desc: "Bioestimulantes naturais, cobertura morta e podas conscientes." },
        { num: "03", name: "Acompanhamento Contínuo", desc: "Visitas regulares e monitoramento da população de polinizadores." }
      ],
      pricing: "Planos a partir de 180€ / mês",
      pricingNote: "Contratos de gestão ecológica com periodicidade ajustada à dimensão do espaço."
    },

    corporate: {
      badge: "Regeneração Territorial & ESG",
      title: "Regeneração de Espaços Verdes Corporativos & Públicos",
      lead: "Apoiamos empresas, fábricas e instituições públicas a substituir relvados convencionais de alto consumo por corredores ecológicos autossustentáveis. Uma transformação visível que posiciona a sua marca na vanguarda da sustentabilidade.",
      image: "assets/images/jardim4.png",
      benefits: [
        "Poupança até 75% em consumo de água e custos energéticos operacionais",
        "Espaços de descompressão biofílicos que aumentam o bem-estar dos colaboradores",
        "Relatórios de biodiversidade auditáveis para relatórios de sustentabilidade e ESG",
        "Sinalética educativa e pedagógica para valorização perante a comunidade"
      ],
      steps: [
        { num: "01", name: "Estudo de Pegada Hídrica", desc: "Diagnóstico de consumos atuais e simulação de poupança ecológica." },
        { num: "02", name: "Conversão Paisagística", desc: "Substituição gradual do relvado por biótopos e prados autóctones." },
        { num: "03", name: "Ativação & Certificação", desc: "Entrega do selo de Jardim de Biodiversidade e materiais de comunicação." }
      ],
      pricing: "Consultoria & Projeto Sob Medida",
      pricingNote: "Projetos escaláveis para empresas, parques tecnológicos e entidades públicas."
    }
  };


  // =========================================================================
  // 2. BACKGROUND CAROUSEL SLIDESHOW ENGINE (AUTONOMOUS CROSSFADE)
  // =========================================================================
  const slides = document.querySelectorAll('.bg-slide');
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 4000; // 4 seconds per slide
  let slideTimer = null;

  // Preload all slideshow images in background for instant switching
  [
    'assets/images/jardim1.png',
    'assets/images/jardim2.png',
    'assets/images/jardim3.png',
    'assets/images/jardim4.png',
    'assets/images/jardim5.png'
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

  // Start Carousel immediately
  if (totalSlides > 0) {
    updateSlide(0);
  }


  // =========================================================================
  // 3. CASCADING POP-UP & MODAL MANAGEMENT (MEETING CLIENT SPECIFICATION)
  // =========================================================================
  const allModals = document.querySelectorAll('.custom-modal-backdrop');
  const modalOpenButtons = document.querySelectorAll('[data-open-modal]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
  const modalSwitchButtons = document.querySelectorAll('[data-switch-modal]');
  
  const servicesModal = document.getElementById('servicesModal');
  const serviceDetailModal = document.getElementById('serviceDetailModal');
  const serviceDetailContainer = document.getElementById('serviceDetailDynamicContent');
  const btnBackToServices = document.getElementById('btnBackToServices');
  const closeNestedBtn = document.querySelector('[data-close-nested-modal]');

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
      
      // Check if any other modal is still open
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

  // Switch Modal smoothly (e.g. from Sobre a Marca to Contactos)
  function switchModal(fromModal, toModalId) {
    if (fromModal) closeModal(fromModal);
    setTimeout(() => {
      openModal(toModalId);
    }, 200);
  }

  // Attach Open Buttons
  modalOpenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-open-modal');
      openModal(targetId);
    });
  });

  // Attach Close Buttons
  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.custom-modal-backdrop');
      closeModal(modal);
    });
  });

  // Attach Switch Buttons
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
        // If it is the nested sub-modal, closing it returns back to the services modal!
        if (modal === serviceDetailModal) {
          closeNestedModal();
        } else {
          closeModal(modal);
        }
      }
    });
  });

  // ESC Key Navigation (Handles nested pop-up stack)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (serviceDetailModal && serviceDetailModal.classList.contains('is-open')) {
        closeNestedModal();
      } else {
        closeAllModals();
      }
    }
  });


  // =========================================================================
  // 4. NESTED SUB-POP-UP LOGIC: OPEN SERVICE DETAILS & RETURN BACK TO POP-UP
  // =========================================================================
  function renderServiceDetail(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    serviceDetailContainer.innerHTML = `
      <div class="detail-template">
        
        <div class="detail-header-block">
          <div class="detail-badge-row">
            <span class="detail-badge">${data.badge}</span>
          </div>
          <h2 class="detail-hero-title">${data.title}</h2>
        </div>

        <p class="detail-description-lead">${data.lead}</p>

        <!-- Method Steps -->
        <div class="detail-methodology-wrap">
          <h3 class="detail-section-title"><i class="ph ph-compass"></i> Processo Metodológico</h3>
          <div class="detail-steps-grid">
            ${data.steps.map(s => `
              <div class="step-box">
                <span class="step-num">${s.num}</span>
                <span class="step-name">${s.name}</span>
                <p class="step-desc">${s.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Key Benefits -->
        <div class="detail-benefits-wrap">
          <h3 class="detail-section-title"><i class="ph ph-shield-check"></i> Benefícios Ecológicos & Técnicos</h3>
          <div class="service-highlights-pills" style="gap: 12px;">
            ${data.benefits.map(b => `
              <span style="font-size: 13.5px; padding: 8px 14px; background: rgba(141, 160, 130, 0.12); color: #e2ece0;">
                <i class="ph ph-check-circle" style="color: var(--color-accent-gold);"></i> ${b}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Pricing & Fast Booking -->
        <div class="detail-pricing-box">
          <div class="pricing-info-col">
            <span class="pricing-lead">Estimativa de Investimento</span>
            <span class="pricing-amount">${data.pricing}</span>
            <span class="pricing-note">${data.pricingNote}</span>
          </div>
          <button class="primary-action-btn" id="btnBookThisService" data-service-title="${data.title}">
            <span>Pedir Proposta para este Serviço</span>
            <i class="ph ph-arrow-right"></i>
          </button>
        </div>

      </div>
    `;

    // Hook the "Pedir Proposta" inside the detail to automatically select in Contact modal
    const bookBtn = document.getElementById('btnBookThisService');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        const sTitle = bookBtn.getAttribute('data-service-title');
        closeNestedModal();
        closeModal(servicesModal);
        setTimeout(() => {
          openModal('contactModal');
          const select = document.getElementById('serviceInterest');
          if (select) {
            for (let i = 0; i < select.options.length; i++) {
              if (select.options[i].value === sTitle) {
                select.selectedIndex = i;
                break;
              }
            }
          }
        }, 250);
      });
    }
  }

  function openServiceDetail(serviceKey) {
    renderServiceDetail(serviceKey);
    serviceDetailModal.classList.add('is-open');
    serviceDetailModal.setAttribute('aria-hidden', 'false');
  }

  function closeNestedModal() {
    serviceDetailModal.classList.remove('is-open');
    serviceDetailModal.setAttribute('aria-hidden', 'true');
  }

  // Hook all "Ver Detalhes" buttons in services modal
  document.querySelectorAll('[data-open-detail]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const serviceKey = btn.getAttribute('data-open-detail');
      openServiceDetail(serviceKey);
    });
  });

  // Hook clicking on whole service card
  document.querySelectorAll('.service-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const serviceKey = card.getAttribute('data-service-key');
      if (serviceKey) openServiceDetail(serviceKey);
    });
  });

  // Back button inside nested modal
  if (btnBackToServices) {
    btnBackToServices.addEventListener('click', closeNestedModal);
  }
  if (closeNestedBtn) {
    closeNestedBtn.addEventListener('click', closeNestedModal);
  }


  // =========================================================================
  // 5. DOCUMENTARY PLAYER SIMULATION
  // =========================================================================
  const docPlayBtn = document.getElementById('docPlayBtn');
  const cinematicScreen = document.getElementById('cinematicScreen');
  const hudPauseBtn = document.getElementById('hudPauseBtn');
  let isPlaying = false;

  if (docPlayBtn && cinematicScreen) {
    docPlayBtn.addEventListener('click', () => {
      docPlayBtn.style.display = 'none';
      cinematicScreen.style.display = 'flex';
      isPlaying = true;
    });
  }

  if (hudPauseBtn) {
    hudPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      hudPauseBtn.innerHTML = isPlaying ? '<i class="ph-fill ph-pause"></i>' : '<i class="ph-fill ph-play"></i>';
    });
  }


  // =========================================================================
  // 6. GALLERY FILTERING & LIGHTBOX
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Open
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-lightbox');
      const title = card.querySelector('.g-title')?.textContent || '';
      const loc = card.querySelector('.g-loc')?.textContent || '';
      
      if (lightboxImg && lightboxOverlay) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = `${title} — ${loc}`;
        lightboxOverlay.classList.add('active');
      }
    });
  });

  // Lightbox Close
  if (closeLightboxBtn && lightboxOverlay) {
    closeLightboxBtn.addEventListener('click', () => {
      lightboxOverlay.classList.remove('active');
    });
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) lightboxOverlay.classList.remove('active');
    });
  }


  // =========================================================================
  // 7. CONTACT FORM SUBMISSION HANDLER
  // =========================================================================
  window.handleContactSubmit = function() {
    const submitBtn = document.getElementById('submitFormBtn');
    const successMsg = document.getElementById('formSuccessMessage');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>A submeter pedido...</span>';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.style.display = 'none';
      }
      if (successMsg) {
        successMsg.style.display = 'flex';
      }
    }, 900);
  };

});
