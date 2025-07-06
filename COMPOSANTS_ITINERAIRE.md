# 🗺️ Composants d'itinéraire dynamique - Site de Mariage

## Nouveaux composants créés

### 1. **DynamicDirections** 
`src/components/dynamic-directions.tsx`

**Fonctionnalités :**
- 📍 Géolocalisation automatique du visiteur
- 🗺️ Carte Google Maps intégrée avec tracé d'itinéraire
- ⏱️ Calcul de la distance et du temps de trajet
- 🎯 Boutons d'actions pour ouvrir dans différentes applications
- 🔧 Gestion d'erreurs complète (API, géolocalisation)

**Utilisation :**
```tsx
<DynamicDirections 
  className="mb-16"
  height="500px"
  showMap={true}
/>
```

### 2. **SmartDirections**
`src/components/smart-directions.tsx`

**Fonctionnalités :**
- 🧭 Fonctionne sans API Google Maps
- 📏 Calcul de distance approximative (formule Haversine)
- 📱 Liens directs vers Google Maps, Apple Maps, Waze, Maps.me
- 📋 Bouton pour copier l'adresse
- 💡 Conseils pratiques et informations de route

**Utilisation :**
```tsx
<SmartDirections className="" />
```

### 3. **DirectionsTest**
`src/components/directions-test.tsx`

**Fonctionnalités :**
- 🧪 Interface de test pour les composants d'itinéraire
- 📊 Comparaison côte à côte des différents composants
- 🔍 Informations de débogage et conseils

## Pages créées

### Page de test : `/test-directions`
- Accès à tous les composants d'itinéraire
- Interface de test complète
- Documentation intégrée

## Intégration dans le site principal

Les composants ont été intégrés dans `src/app/page.tsx` :

1. **Section DynamicDirections** : Avec carte Google Maps intégrée
2. **Section SmartDirections** : Version alternative sans API

## Configuration requise

### Variables d'environnement
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=votre_clé_api_google_maps
```

### APIs Google Maps requises
- Maps JavaScript API
- Directions API
- Static Maps API (pour les fallbacks)

## Fonctionnalités techniques

### Géolocalisation
- Demande d'autorisation automatique
- Gestion des erreurs de géolocalisation
- Calcul de distance avec formule Haversine

### Fallbacks intelligents
- Liens directs si géolocalisation échoue
- Redirection vers applications mobiles
- Fonctionnement sans API Google Maps

### Responsive design
- Interface adaptée mobile/desktop
- Boutons optimisés pour le tactile
- Cartes responsives

## Destination configurée

**Lieu :** Mairie de Trizac  
**Adresse :** Place de la Mairie, 15400 Trizac, France  
**Coordonnées :** 45.25376, 2.53779  
**Date :** 27 septembre 2025 à 16h30

## Applications supportées

- 🗺️ **Google Maps** : Navigation web et mobile
- 🍎 **Apple Maps** : iPhones et iPads
- 🚗 **Waze** : Navigation sociale
- 🧭 **Maps.me** : Cartes hors ligne

## Testing

### Accès aux tests
1. Démarrer le serveur : `npm run dev`
2. Aller à `http://localhost:3001/test-directions`
3. Tester les différents composants

### Scénarios de test
- ✅ Autoriser la géolocalisation
- ❌ Refuser la géolocalisation
- 🔑 Avec/sans clé API Google Maps
- 📱 Test sur mobile/desktop

## Déploiement

1. Configurer les variables d'environnement sur la plateforme
2. Vérifier l'activation des APIs Google Maps
3. Tester les fonctionnalités en production

---

✨ **Les composants sont maintenant prêts et intégrés dans le site de mariage !**
