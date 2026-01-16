# EPRN - Entreprise Pontoise de Régulation des Nuisibles

Site web statique reproduit depuis [eprn.fr](https://eprn.fr/) pour hébergement sur GitHub Pages.

## Structure

- `index.html` - Page d'accueil
- `mentions-legales.html` - Mentions légales
- `politique-confidentialite.html` - Politique de confidentialité
- `qui-sommes-nous.html` - À propos
- `styles.css` - Styles CSS
- `script.js` - JavaScript interactions
- `images/` - Dossier pour les images

## Développement local

### Prérequis

- Ruby 3.2 (recommandé pour compatibilité avec GitHub Pages)
  ```bash
  winget install RubyInstallerTeam.RubyWithDevKit.3.2
  ```

### Installation

```bash
gem install bundler
bundle install
```

### Lancer le serveur local

```bash
bundle exec jekyll serve
```

Le site est accessible sur http://localhost:4000

### Options utiles

- `bundle exec jekyll serve --livereload` : recharge automatique du navigateur
- `bundle exec jekyll serve --drafts` : affiche les brouillons

**Note** : après modification de `_config.yml`, relancer le serveur.

## Déploiement GitHub Pages

1. Activez GitHub Pages dans les paramètres du repository
2. Sélectionnez "Deploy from a branch"
3. Choisissez la branche `main` et le dossier `/root`

## Images

Pour ajouter les images des services, placez les fichiers suivants dans le dossier `images/` :
- `desinfection.jpg`
- `desinsectisation.jpg`
- `deratisation.jpg`
- `traitement-tir.jpg`

## Technologies

- HTML5 sémantique
- CSS3 avec Grid et Flexbox
- JavaScript vanilla
- Google Fonts (Inter et Jost)
- Design responsive

## Fonctionnalités

- Navigation responsive
- Animations au scroll
- Effets hover
- Optimisé pour les performances
- Compatible GitHub Pages
