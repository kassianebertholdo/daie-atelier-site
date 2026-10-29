// Daiê Atelier — edite os nomes e descrições abaixo conforme os produtos disponíveis.
const WHATSAPP_NUMBER = "5571987476085"; // Número informado: 71987476085. Confira se o WhatsApp está cadastrado neste número.

const products = {
    personalizados: [
        ["Canetas personalizadas", "Um mimo útil com nome, frase ou cor especial.", "caneca.jpg"],
        ["Ímãs de geladeira", "Pequenos recados para deixar o dia mais doce.", "imas.jpg"],
        ["Bottons personalizados", "Mostre sua frase, estilo ou identidade.", "bottons.jpg"],
        ["Canecas personalizadas", "Uma mensagem especial para acompanhar cada café.", "canecas.jpg"],
        ["Garrafas personalizadas", "Personalidade e praticidade para a rotina.", "garrafas.jpg"],
        ["Photocards e lembranças", "Recordações especiais para guardar com carinho.", "photocards.jpg"]
    ],
    croche: [
        ["Sousplats de crochê", "Uma mesa posta com charme e delicadeza.", "sousplat.jpg"],
        ["Tapetes artesanais", "Aconchego e beleza para sua casa.", "tapetes.jpg"],
        ["Jogos de tapetes", "Conjuntos que combinam com seu cantinho.", "jogos-tapetes.jpg"],
        ["Jogos de banheiro", "Detalhes feitos para renovar o ambiente.", "jogos-banheiro.jpg"],
        ["Peças decorativas", "Peças artesanais cheias de personalidade.", "decoracao.jpg"],
        ["Encomendas personalizadas", "Escolha cores, tamanhos e detalhes.", "encomendas.jpg"]
    ],
    aromas: [
        ["Aromatizador de ambientes", "Perfume delicado para deixar a casa acolhedora.", "aromatizador.jpg"],
        ["Aromas especiais", "Fragrâncias para diferentes momentos.", "aromas.jpg"],
        ["Kit perfumado", "Uma combinação cheirosa para presentear.", "kit-perfumado.jpg"],
        ["Difusor de aromas", "Um toque de perfume e elegância.", "difusor.jpg"],
        ["Kit para presente", "Uma seleção especial preparada com carinho.", "kit-presente.jpg"],
        ["Lembrancinhas perfumadas", "Pequenos detalhes para ocasiões especiais.", "lembrancinhas.jpg"]
    ],
    velas: [
        ["Vela aromática", "Luz suave e fragrância para desacelerar.", "vela-aromatica.jpg"],
        ["Vela personalizada", "Uma frase especial para marcar o momento.", "vela-personalizada.jpg"],
        ["Kit de velas", "Uma combinação para presentear com afeto.", "kit-velas.jpg"],
        ["Vela para lembrancinha", "Um mimo delicado para seus convidados.", "lembrancinha.jpg"],
        ["Vela para momentos especiais", "Crie uma atmosfera aconchegante.", "momentos.jpg"],
        ["Encomenda personalizada", "Consulte aromas, embalagens e opções.", "encomenda.jpg"]
    ],
    cestas: [
        ["Cesta de café da manhã", "Comece o dia de alguém com uma surpresa.", "cafe-da-manha.jpg"],
        ["Cesta de chocolates", "Um presente doce para adoçar o dia.", "chocolates.jpg"],
        ["Cesta de maquiagem", "Uma seleção especial para quem ama beleza.", "maquiagem.jpg"],
        ["Cesta romântica", "Surpreenda com carinho em cada detalhe.", "romantica.jpg"],
        ["Cesta personalizada", "Montada conforme a ocasião e seu orçamento.", "personalizada.jpg"],
        ["Cesta de agradecimento", "Um jeito especial de dizer muito obrigado.", "agradecimento.jpg"]
    ]
};

const categoryNames = {
    personalizados: "produto personalizado",
    croche: "peça de crochê",
    aromas: "produto aromático",
    velas: "vela aromática",
    cestas: "cesta especial"
};

function createProductCard(category, product, index) {
    const [name, description, imageName] = product;
    const imagePath = `assets/img/${category}/${imageName}`;
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
    <div class="product-image">
      <img src="${imagePath}" alt="${name} — Daiê Atelier" loading="lazy">
      <div class="product-placeholder"><span>♡</span><small>Adicione a foto em<br>${imagePath}</small></div>
    </div>
    <div class="product-info">
      <h3>${name}</h3><p>${description}</p>
      <div class="product-bottom"><span class="product-tag">Feito com carinho</span>
      <a class="product-order" href="#" aria-label="Consultar ${name} pelo WhatsApp">Consultar ↗</a></div>
    </div>`;
    const img = card.querySelector("img");
    const imageWrap = card.querySelector(".product-image");
    const showImage = () => imageWrap.classList.add("has-image");
    img.addEventListener("load", showImage);
    img.addEventListener("error", () => imageWrap.classList.remove("has-image"));
    const link = card.querySelector(".product-order");
    link.href = whatsappUrl(`Olá! Tenho interesse em ${name.toLowerCase()} (${categoryNames[category]}) do Daiê Atelier. Pode me passar valores e opções?`);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return card;
}

function whatsappUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".product-grid[data-category]").forEach(grid => {
    const category = grid.dataset.category;
    (products[category] || []).forEach((product, index) => grid.appendChild(createProductCard(category, product, index)));
});

document.querySelectorAll("[data-whatsapp]").forEach(link => {
    const message = link.dataset.message || "Olá! Gostaria de conhecer os produtos do Daiê Atelier.";
    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();