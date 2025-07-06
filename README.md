# Site de Mariage - Agathe & Alain

Ce projet est un site de mariage moderne développé avec Next.js, React et TypeScript. Il inclut des composants interactifs avec des effets d'animation, des cartes géographiques et des fonctionnalités d'itinéraire dynamique.

## Caractéristiques

- ✨ Animations cinématographiques avec effets d'apparition progressifs
- 🗺️ Cartes interactives avec Google Maps API
- 📍 Composants d'itinéraire dynamique avec géolocalisation
- 🎨 Design moderne avec Tailwind CSS
- 📱 Interface responsive
- 🔄 Smooth scrolling avec Lenis
- 🎊 Effets de confettis
- 🎯 Fallback pour les cartes sans API

## Composants principaux

### Composants d'affichage
- **Hero** : Section d'accueil avec effet d'apparition progressif
- **Programme** : Planning de la journée de mariage
- **NotreHistoire** : Section narrative du couple
- **Gallery** : Galerie photos interactive

### Composants de cartes
- **GoogleMap** : Carte Google Maps avec marqueur personnalisé
- **StaticMap** : Carte statique Google Maps (fallback)
- **OpenStreetMap** : Carte OpenStreetMap avec Leaflet
- **MapContainer** : Composant intelligent qui bascule entre les cartes

### Composants d'itinéraire
- **DynamicDirections** : Itinéraire avec Google Maps Directions API
- **SmartDirections** : Liens intelligents vers les applications de navigation
- **DirectionsTest** : Composant de test pour les fonctionnalités d'itinéraire

## Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=votre_clé_api_google_maps
```

### Obtenir une clé API Google Maps

1. Rendez-vous sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez les APIs suivantes :
   - Maps JavaScript API
   - Static Maps API
   - Directions API
   - Places API
4. Créez une clé API et configurez les restrictions
5. Ajoutez la clé dans `.env.local`

## Installation et développement

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Construction pour la production
npm run build

# Démarrage en production
npm start
```

Open [http://localhost:3000](http://localhost:3000) pour voir le site.

## Pages de test

- `/test-directions` : Page de test pour les composants d'itinéraire
- `/test-map` : Page de test pour les composants de carte

## Structure du projet

```
src/
├── app/
│   ├── page.tsx              # Page principale
│   ├── layout.tsx            # Layout global
│   └── test-directions/      # Page de test itinéraire
├── components/
│   ├── hero.tsx              # Section d'accueil
│   ├── programme.tsx         # Planning du mariage
│   ├── notre-histoire.tsx    # Histoire du couple
│   ├── google-map.tsx        # Carte Google Maps
│   ├── static-map.tsx        # Carte statique
│   ├── open-street-map.tsx   # Carte OpenStreetMap
│   ├── map-container.tsx     # Container intelligent
│   ├── dynamic-directions.tsx # Itinéraire dynamique
│   ├── smart-directions.tsx  # Liens de navigation
│   ├── directions-test.tsx   # Tests d'itinéraire
│   └── ui/                   # Composants UI génériques
└── lib/
    └── utils.ts              # Utilitaires
```

## Fonctionnalités d'itinéraire

### DynamicDirections
- Géolocalisation automatique du visiteur
- Calcul d'itinéraire avec Google Maps Directions API
- Affichage de la distance et du temps de trajet
- Carte intégrée avec tracé de l'itinéraire

### SmartDirections
- Fonctionne sans API Google Maps
- Calcul de distance approximative
- Liens directs vers Google Maps, Apple Maps, Waze, Maps.me
- Informations pratiques et conseils de route

## Technologies utilisées

- **Next.js 14** : Framework React
- **TypeScript** : Typage statique
- **Tailwind CSS** : Framework CSS
- **Lenis** : Smooth scrolling
- **Google Maps API** : Cartes et itinéraires
- **Leaflet** : Cartes alternatives
- **Canvas Confetti** : Effets de confettis

## Déploiement

Le site peut être déployé sur Vercel, Netlify ou tout autre hébergeur compatible avec Next.js.

Pour Vercel :
```bash
npm install -g vercel
vercel deploy
```

N'oubliez pas d'ajouter les variables d'environnement dans les paramètres de déploiement.

## Développement futur

- [ ] Système de RSVP
- [ ] Intégration calendrier
- [ ] Notifications push
- [ ] Mode PWA
- [ ] Optimisations SEO avancées

## Licence

Ce projet est privé et destiné à un usage personnel.
