async function carregarSite() {
    try {
        const res = await fetch('dados.json');
        const data = await res.json();

        // Helper para o Link do WPP
        const wppLink = (msg) => `https://wa.me/${data.hotel.whatsapp}?text=${encodeURIComponent(msg)}`;

        // 1. Preencher Contatos e Maps
        document.getElementById('hotel-endereco').innerText = data.hotel.endereco;
        document.getElementById('hotel-fone').innerText = data.hotel.telefone;
        document.getElementById('hotel-email').innerText = data.hotel.email;
        document.getElementById('link-maps').href = data.hotel.maps_link;

        // 2. Configurar Botões Iniciais
        document.getElementById('whatsapp-flutuante').href = wppLink("Olá! Gostaria de tirar uma dúvida sobre o hotel.");
        document.getElementById('btn-reserve-topo').onclick = () => window.open(wppLink(data.hotel.mensagem_reserva), '_blank');

        // 3. Renderizar Quartos (Garantindo que o container existe)
        const container = document.getElementById('container-quartos');
        if (container) {
            container.innerHTML = ''; // Limpa para evitar duplicatas
            data.quartos.forEach(q => {
                container.innerHTML += `
                    <div class="room-card">
                        <img src="${q.imagem}" alt="${q.nome}">
                        <div class="room-info">
                            <h3>${q.nome}</h3>
                            <p style="font-size: 0.9rem; color: #666; margin: 10px 0;">${q.detalhes}</p>
                            <button class="price-btn" onclick="reservarQuarto('${q.nome}')">
                                R$ ${q.preco} Diária | Reservar
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        // Função de reserva por quarto
        window.reservarQuarto = (nome) => {
            window.open(wppLink(`Olá! Tenho interesse em reservar o ${nome}.`), '_blank');
        };

    } catch (e) {
        console.error("Erro crítico ao carregar o site do Hotel GB:", e);
    }
}

document.addEventListener('DOMContentLoaded', carregarSite);