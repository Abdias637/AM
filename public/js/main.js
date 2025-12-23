// ============================================
// FUNCIONES PRINCIPALES DE NAVEGACIÓN
// ============================================

// Función para el menú móvil
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMain = document.getElementById('navMain');
    
    if (mobileMenuBtn && navMain) {
        mobileMenuBtn.addEventListener('click', () => {
            navMain.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMain.classList.contains('active') ? '✕' : '☰';
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMain.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!navMain.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navMain.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    }
}

// Función para animaciones al hacer scroll
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card, .value-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
}

// Función para smooth scroll a anclas
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INICIALIZACIÓN GENERAL
// ============================================

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('AMQ Trofeos - Inicializando...');
    
    // Inicializar todas las funciones generales
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    
    // Efecto de carga inicial
    document.body.classList.add('loaded');
    
    // Log de inicialización completa
    console.log('AMQ Trofeos - Inicialización completa ✅');
});