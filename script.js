document.addEventListener('DOMContentLoaded', () => {
    const allSeats = document.querySelectorAll('.row .seat');
    const count = document.getElementById('count');
    const total = document.getElementById('totale');
    const buyButton = document.getElementById('compra');
    const resetButton = document.getElementById('reset');
    const ticketPrice = 10; // Prezzo del biglietto

    // Carica lo stato dei sedili salvato
    function loadSeats() {
        const seatNames = JSON.parse(localStorage.getItem('seatNames')) || {};

        Object.entries(seatNames).forEach(([index, name]) => {
            allSeats[index].innerText = name;
            allSeats[index].classList.add('sold');
        });
    }

    // Salva lo stato dei sedili venduti
    function saveSeats(seatNames) {
        localStorage.setItem('seatNames', JSON.stringify(seatNames));
    }

    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        const selectedSeatsCount = selectedSeats.length;
        count.innerText = selectedSeatsCount;
        total.innerText = (selectedSeatsCount * ticketPrice).toFixed(2);
    }

    allSeats.forEach(seat => {
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('sold')) {
                seat.classList.toggle('selected');
                updateSelectedCount();
            }
        });
    });

    buyButton.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        const seatNames = JSON.parse(localStorage.getItem('seatNames')) || {};

        selectedSeats.forEach(seat => {
            const seatIndex = [...allSeats].indexOf(seat);
            const userName = prompt('Inserisci il tuo nome per il posto selezionato:');
            if (userName) {
                seat.innerText = userName;
                seatNames[seatIndex] = userName;
                seat.classList.remove('selected');
                seat.classList.add('sold');
            }
        });

        saveSeats(seatNames);
        updateSelectedCount(); // Resetta il conteggio e il totale
    });

    resetButton.addEventListener('click', () => {
        const seatNames = JSON.parse(localStorage.getItem('seatNames')) || {};
        const userName = prompt('Inserisci il tuo nome per confermare il reset dei posti:');

        if (userName !== null && userName !== '') {
            const seatsToReset = Object.entries(seatNames)
                .filter(([index, name]) => name === userName)
                .map(([index, name]) => index);

            seatsToReset.forEach(index => {
                delete seatNames[index];
                allSeats[index].classList.remove('sold');
                allSeats[index].innerText = '';
            });

            saveSeats(seatNames);
            updateSelectedCount(); // Resetta il conteggio e il totale
        } else {
            alert('Inserisci un nome valido per confermare il reset dei posti.');
        }
    });

    // Carica i posti acquistati salvati in locale all'avvio
    loadSeats();
});
