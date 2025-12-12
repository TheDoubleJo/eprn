// Les données des interventions sont injectées depuis Jekyll via index.html
// Variable globale qui sera remplie par Jekyll
const interventionsData = window.INTERVENTIONS_DATA || [];

// Couleurs pour chaque type d'intervention
const markerColors = {
    pigeons: '#667eea',    // Violet/bleu (couleur principale du site)
    ragondins: '#ffd700',  // Or (couleur accent)
    rongeurs: '#764ba2'    // Violet foncé
};

// Initialiser la carte uniquement si l'élément existe
document.addEventListener('DOMContentLoaded', function() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Créer la carte centrée sur la France
    const map = L.map('map', {
        center: [46.603354, 1.888334], // Centre de la France
        zoom: 6,
        scrollWheelZoom: true,
        zoomControl: true
    });

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Regrouper les interventions par ville
    const cityInterventions = {};
    interventionsData.forEach(intervention => {
        const key = `${intervention.city}-${intervention.lat}-${intervention.lng}`;
        if (!cityInterventions[key]) {
            cityInterventions[key] = {
                city: intervention.city,
                lat: intervention.lat,
                lng: intervention.lng,
                interventions: []
            };
        }
        cityInterventions[key].interventions.push({
            type: intervention.type,
            count: intervention.count
        });
    });

    // Créer les marqueurs pour chaque ville
    Object.values(cityInterventions).forEach(cityData => {
        // Calculer le total d'interventions
        const totalInterventions = cityData.interventions.reduce((sum, i) => sum + i.count, 0);

        // Récupérer tous les types d'interventions présents
        const types = cityData.interventions.map(i => i.type);

        // Créer le style du marqueur en fonction du nombre de types
        let markerStyle = '';
        if (types.length === 1) {
            // Une seule couleur
            markerStyle = `background-color: ${markerColors[types[0]]};`;
        } else if (types.length === 2) {
            // Deux couleurs : dégradé vertical
            const colors = types.map(t => markerColors[t]);
            markerStyle = `background: linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%);`;
        } else if (types.length === 3) {
            // Trois couleurs : dégradé en trois sections
            const colors = types.map(t => markerColors[t]);
            markerStyle = `background: linear-gradient(135deg, ${colors[0]} 33.33%, ${colors[1]} 33.33%, ${colors[1]} 66.66%, ${colors[2]} 66.66%);`;
        }

        // Créer une icône personnalisée
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin" style="${markerStyle}">
                       <span class="marker-count">${totalInterventions}</span>
                   </div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
            popupAnchor: [0, -42]
        });

        // Créer le contenu du popup
        let popupContent = `<div class="marker-popup">
            <h3>${cityData.city}</h3>
            <p><strong>${totalInterventions}</strong> intervention${totalInterventions > 1 ? 's' : ''} :</p>
            <ul>`;

        cityData.interventions.forEach(intervention => {
            const typeLabel = {
                pigeons: 'Régulation par tir des pigeons',
                ragondins: 'Régulation par tir des ragondins',
                rongeurs: 'Régulation par tir de rongeurs'
            }[intervention.type];

            popupContent += `<li>${intervention.count} ${typeLabel}</li>`;
        });

        popupContent += `</ul></div>`;

        // Créer et ajouter le marqueur
        const marker = L.marker([cityData.lat, cityData.lng], { icon: markerIcon })
            .addTo(map)
            .bindPopup(popupContent);
    });

    // Adapter la vue pour afficher tous les marqueurs
    const bounds = L.latLngBounds(interventionsData.map(i => [i.lat, i.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
});
