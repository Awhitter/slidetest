document.addEventListener('DOMContentLoaded', function() {
    // Animação da hero section
    gsap.to(".hero h1", {opacity: 1, y: 0, duration: 1, delay: 0.5});
    gsap.to(".hero p", {opacity: 1, y: 0, duration: 1, delay: 0.8});
    gsap.to(".hero .btn", {opacity: 1, y: 0, duration: 1, delay: 1.1});

    // Animação das seções
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Dados dos drinks (simulando uma base de dados)
    const drinks = [
        { name: "Mojito Clássico", description: "Rum, hortelã, limão, açúcar e água com gás", category: "classicos", image: "images/mojito.jpg" },
        { name: "Negroni", description: "Gin, Campari e vermute tinto", category: "classicos", image: "images/negroni.jpg" },
        { name: "Margarita", description: "Tequila, licor de laranja e suco de limão", category: "classicos", image: "images/margarita.jpg" },
        { name: "Absolute Sunset", description: "Vodka, suco de laranja, grenadine e espuma de maracujá", category: "assinatura", image: "images/absolute-sunset.jpg" },
        { name: "Molecular Martini", description: "Gin, esferas de vermute e azeitona molecular", category: "moleculares", image: "images/molecular-martini.jpg" },
        { name: "Virgin Colada", description: "Abacaxi, coco e espuma de baunilha", category: "sem-alcool", image: "images/virgin-colada.jpg" },
        // Adicione mais 194 drinks aqui...
    ];

    const itemsPerPage = 12;
    let currentPage = 1;
    let currentFilter = 'all';

    function displayDrinks(page, filter) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const filteredDrinks = filter === 'all' ? drinks : drinks.filter(drink => drink.category === filter);
        const displayedDrinks = filteredDrinks.slice(startIndex, endIndex);

        const menuGrid = document.getElementById('menu-grid');
        menuGrid.innerHTML = '';

        displayedDrinks.forEach(drink => {
            const drinkElement = document.createElement('div');
            drinkElement.className = 'menu-item';
            drinkElement.dataset.name = drink.name;
            drinkElement.dataset.description = drink.description;
            drinkElement.dataset.image = drink.image;
            drinkElement.innerHTML = `
                <img src="${drink.image}" alt="${drink.name}">
                <div class="menu-item-content">
                    <h3>${drink.name}</h3>
                </div>
            `;
            menuGrid.appendChild(drinkElement);
        });

        updatePagination(filteredDrinks.length, page);
    }

    function updatePagination(totalItems, currentPage) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationElement = document.getElementById('menu-pagination');
        paginationElement.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            button.dataset.page = i;
            button.textContent = i;
            paginationElement.appendChild(button);
        }
    }

    // Inicializar a exibição
    displayDrinks(currentPage, currentFilter);

    // Event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            currentPage = 1;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayDrinks(currentPage, currentFilter);
        });
    });

    document.getElementById('menu-pagination').addEventListener('click', function(e) {
        if (e.target.classList.contains('page-btn')) {
            currentPage = parseInt(e.target.dataset.page);
            displayDrinks(currentPage, currentFilter);
        }
    });

    // Modal
    const modal = document.getElementById('drinkModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalImage');

    document.getElementById('menu-grid').addEventListener('click', function(e) {
        const menuItem = e.target.closest('.menu-item');
        if (menuItem) {
            modalTitle.textContent = menuItem.dataset.name;
            modalDescription.textContent = menuItem.dataset.description;
            modalImage.src = menuItem.dataset.image;
            modal.classList.add('show');
        }
    });

    document.querySelector('.close-modal').addEventListener('click', function() {
        modal.classList.remove('show');
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mudar cor do cabeçalho ao rolar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
