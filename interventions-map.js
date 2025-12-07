// Données des interventions par ville
const interventionsData = [
    // Régulation par tir des pigeons de ville
    { city: "Lyon", lat: 45.764, lng: 4.8357, type: "pigeons", count: 3 },
    { city: "Marseille", lat: 43.2965, lng: 5.3698, type: "pigeons", count: 6 },
    { city: "Carpentras", lat: 44.0558, lng: 5.0481, type: "pigeons", count: 1 },
    { city: "Nice", lat: 43.7102, lng: 7.2620, type: "pigeons", count: 3 },
    { city: "Gigean", lat: 43.4992, lng: 3.7125, type: "pigeons", count: 1 },
    { city: "Martignas-sur-Jalles", lat: 44.8442, lng: -0.7828, type: "pigeons", count: 2 },
    { city: "Malestroit", lat: 47.8097, lng: -2.3831, type: "pigeons", count: 1 },
    { city: "Nantes", lat: 47.2184, lng: -1.5536, type: "pigeons", count: 7 },
    { city: "Agen", lat: 44.2033, lng: 0.6163, type: "pigeons", count: 1 },
    { city: "Toulouse", lat: 43.6047, lng: 1.4442, type: "pigeons", count: 3 },
    { city: "Bordeaux", lat: 44.8378, lng: -0.5792, type: "pigeons", count: 5 },
    { city: "Brest", lat: 48.3904, lng: -4.4861, type: "pigeons", count: 2 },
    { city: "Pau", lat: 43.2951, lng: -0.3708, type: "pigeons", count: 1 },
    { city: "Noisy-le-Grand", lat: 48.8483, lng: 2.5525, type: "pigeons", count: 1 },
    { city: "Arcachon", lat: 44.6581, lng: -1.1656, type: "pigeons", count: 1 },
    { city: "Andernos-les-Bains", lat: 44.7422, lng: -1.0981, type: "pigeons", count: 1 },
    { city: "Angoulême", lat: 45.6484, lng: 0.1561, type: "pigeons", count: 5 },
    { city: "Valençay", lat: 47.1597, lng: 1.5636, type: "pigeons", count: 2 },
    { city: "Sillé-le-Guillaume", lat: 48.1844, lng: -0.1150, type: "pigeons", count: 1 },

    // Régulation par tir des Ragondins
    { city: "Lyon", lat: 45.764, lng: 4.8357, type: "ragondins", count: 1 },
    { city: "Caussade", lat: 44.1603, lng: 1.5372, type: "ragondins", count: 1 },
    { city: "Saint-Pierre-des-Corps", lat: 47.3881, lng: 0.7203, type: "ragondins", count: 1 },

    // Régulation par tir de rongeurs
    { city: "Marseille", lat: 43.2965, lng: 5.3698, type: "rongeurs", count: 3 },
    { city: "Caussade", lat: 44.1603, lng: 1.5372, type: "rongeurs", count: 1 },
    { city: "Nérac", lat: 44.1353, lng: 0.3397, type: "rongeurs", count: 1 },
    { city: "Baziège", lat: 43.4531, lng: 1.6186, type: "rongeurs", count: 1 },
    { city: "Francescas", lat: 44.2114, lng: 0.2294, type: "rongeurs", count: 1 },
    { city: "Montcoutant", lat: 46.7281, lng: -0.5364, type: "rongeurs", count: 1 },
    { city: "Nantes", lat: 47.2184, lng: -1.5536, type: "rongeurs", count: 1 },
    { city: "Nérondes", lat: 46.9878, lng: 2.8203, type: "rongeurs", count: 2 },
    { city: "Rosny-sous-Bois", lat: 48.8697, lng: 2.4836, type: "rongeurs", count: 1 }
];

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

        // Déterminer la couleur du marqueur (prendre le type avec le plus d'interventions)
        const mainType = cityData.interventions.reduce((prev, current) =>
            (prev.count > current.count) ? prev : current
        ).type;

        // Créer une icône personnalisée
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin" style="background-color: ${markerColors[mainType]}">
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
