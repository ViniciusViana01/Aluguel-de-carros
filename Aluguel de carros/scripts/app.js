// ===============================================
// 1. DADOS SIMULADOS 
// ===============================================

const availableCars = [
    
    { id: 1, name: "Fiat Argo", category: "economico", dailyRate: 79.90, image: "argo.png", description: "Carro econômico, ideal para o dia a dia." },
    { id: 2, name: "Nissan Kicks", category: "suv", dailyRate: 149.90, image: "kicks.png", description: "SUV confortável e seguro para a família." },
    { id: 3, name: "Mercedes C180", category: "luxo", dailyRate: 349.90, image: "mercedes.png", description: "Alto padrão de conforto e performance." },
    { id: 4, name: "Renault Kwid", category: "economico", dailyRate: 69.90, image: "kwid.png", description: "Super compacto e econômico no combustível." },
    { id: 5, name: "Honda Civic", category: "executivo", dailyRate: 249.90, image: "civic.png", description: "Sedan elegante e esportivo. Oferece conforto premium, tecnologia avançada e excelente dirigibilidade. Ideal para viagens de negócios ou lazer com estilo." },
    { id: 6, name: "Chevrolet Onix", category: "economico", dailyRate: 89.90, image: "onix.png", description: "Hatch moderno, excelente em tecnologia e segurança." },
    { id: 7, name: "Jeep Renegade", category: "suv", dailyRate: 169.90, image: "renegade.png", description: "SUV robusto e icônico, perfeito para aventura urbana." },
    { id: 8, name: "Toyota Corolla", category: "executivo", dailyRate: 209.90, image: "corolla.png", description: "O sedan mais vendido, sinônimo de confiabilidade e conforto executivo." },
    { id: 9, name: "Audi A4", category: "luxo", dailyRate: 419.90, image: "audi.png", description: "Elegância alemã e alto desempenho para uma experiência superior." },
    { id: 10, name: "VW T-Cross", category: "suv", dailyRate: 159.90, image: "tcross.png", description: "SUV compacto moderno e conectado, com ótimo espaço interno." },
    { id: 11, name: "Peugeot 208", category: "economico", dailyRate: 94.90, image: "peugeot208.png", description: "Design arrojado e econômico, ideal para quem busca estilo na cidade." }
];

let currentRental = {}; 


// ===============================================
// 2. SELEÇÃO DE ELEMENTOS DO DOM
// ===============================================

const rentalForm = document.getElementById('rental-form');
const carList = document.getElementById('car-list');
const carCount = document.getElementById('car-count');
const frotaSection = document.getElementById('frota');
const summarySection = document.getElementById('summary');
const summaryDetails = document.getElementById('summary-details');
const confirmRentalBtn = document.getElementById('confirm-rental');
const backToSearchBtn = document.getElementById('back-to-search');


// ===============================================
// 3. FUNÇÕES DE UTILIDADE
// ===============================================

const calculateDays = (date1, date2) => {
    const diffTime = Math.abs(new Date(date2) - new Date(date1));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
};


// ===============================================
// 4. FUNÇÃO DE RENDERIZAÇÃO (Usando a tag <img> com caminho simples)
// ===============================================

const renderCars = (cars) => {
    carList.innerHTML = '';
    carCount.textContent = cars.length;

    if (cars.length === 0) {
        carList.innerHTML = '<p>Nenhum carro encontrado para os critérios de busca.</p>';
        return;
    }

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';

        
        carCard.innerHTML = `
            <img src="images/${car.image}" alt="Foto do carro ${car.name}">
            <h3>${car.name}</h3>
            <p>Categoria: ${car.category.toUpperCase()}</p>
            <p>${car.description}</p>
            <p><strong>R$ ${car.dailyRate.toFixed(2)} / dia</strong></p>
            <button onclick="simulateRental(${car.id})">Alugar Agora</button>
        `;
        carList.appendChild(carCard);
    });
};


// ===============================================
// 5. FUNÇÃO DE SIMULAÇÃO DE RESERVA
// ===============================================

const simulateRental = (carId) => {
    const car = availableCars.find(c => c.id === carId);
    const pickupDateInput = document.getElementById('pickup-date').value;
    const returnDateInput = document.getElementById('return-date').value;

    if (!pickupDateInput || !returnDateInput || new Date(pickupDateInput) > new Date(returnDateInput)) {
        alert("Por favor, preencha as datas de Retirada e Devolução corretamente.");
        return;
    }

    const totalDays = calculateDays(pickupDateInput, returnDateInput);
    const totalPrice = totalDays * car.dailyRate;

    currentRental = {
        carName: car.name,
        pickupDate: new Date(pickupDateInput).toLocaleDateString('pt-BR'),
        returnDate: new Date(returnDateInput).toLocaleDateString('pt-BR'),
        totalDays: totalDays,
        dailyRate: car.dailyRate,
        totalPrice: totalPrice.toFixed(2)
    };

    frotaSection.style.display = 'none';
    
    summaryDetails.innerHTML = `
        <p><strong>Veículo Selecionado:</strong> ${currentRental.carName}</p>
        <p><strong>Retirada:</strong> ${currentRental.pickupDate}</p>
        <p><strong>Devolução:</strong> ${currentRental.returnDate}</p>
        <p><strong>Período Total:</strong> ${currentRental.totalDays} dia(s)</p>
        <p><strong>Valor Diária:</strong> R$ ${currentRental.dailyRate.toFixed(2)}</p>
        <p class="final-price"><strong>VALOR FINAL:</strong> R$ ${currentRental.totalPrice}</p>
    `;
    summarySection.style.display = 'block';
    summarySection.scrollIntoView({ behavior: 'smooth' });
};


// ===============================================
// 6. EVENT LISTENERS
// ===============================================

rentalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('car-category').value;
    
    const filteredCars = availableCars.filter(car => {
        return category === '' || car.category === category;
    });

    frotaSection.style.display = 'block'; 
    summarySection.style.display = 'none';
    renderCars(filteredCars);
    document.getElementById('frota').scrollIntoView({ behavior: 'smooth' });
});

confirmRentalBtn.addEventListener('click', () => {
    alert(`🎉 Reserva do ${currentRental.carName} confirmada!`);
    backToSearchBtn.click(); 
});

backToSearchBtn.addEventListener('click', () => {
    summarySection.style.display = 'none';
    frotaSection.style.display = 'block';
    document.getElementById('aluguel').scrollIntoView({ behavior: 'smooth' });
});


// ===============================================
// 7. INICIALIZAÇÃO
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    document.getElementById('pickup-date').valueAsDate = today;
    
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 3); 
    document.getElementById('return-date').valueAsDate = tomorrow;

    renderCars(availableCars);
});