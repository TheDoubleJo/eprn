# AGENTS.md — Instructions pour agents IA (EPRN)

Ce fichier est la source unique de vérité pour tout agent IA (Claude, Gemini, ChatGPT, Mistral Vibe, etc.) travaillant sur ce dépôt. Les fichiers `CLAUDE.md` et `GEMINI.md` ne sont que des pointeurs vers ce document.

## Vue d'ensemble du projet

- **EPRN** (Entreprise Pontoise de Régulation des Nuisibles) : site vitrine professionnel d'une entreprise de régulation des nuisibles en Charente-Maritime, France.
- **Architecture** : site statique Jekyll, déployé sur GitHub Pages (dépôt `TheDoubleJo/eprn`, branche `main`, dossier `/root`), domaine personnalisé `https://eprn.fr` (fichier `CNAME`).
- **Contenu** : entièrement en français (contenu et SEO).
- **CMS** : Sveltia CMS accessible sur `/admin/` pour la publication d'articles par le client.
- **Environnement de développement** : Linux (depuis octobre 2026 ; auparavant Windows).

## Commandes de développement

Prérequis : Ruby 3.2 recommandé et Bundler.

```bash
# Installation des dépendances Ruby (Linux — Debian/Ubuntu)
sudo apt install ruby-full build-essential zlib1g-dev
gem install bundler

# Installer les dépendances du projet
bundle install

# Serveur local avec rechargement → http://localhost:4000
bundle exec jekyll serve --livereload

# Build vers _site/
bundle exec jekyll build

# Servir avec les brouillons visibles
bundle exec jekyll serve --drafts
```

Notes :

- **Ruby système Linux** : sur Debian/Ubuntu, `gem install` échoue avec `Gem::FilePermissionError` sur `/var/lib/gems`. La machine est configurée avec `GEM_HOME="$HOME/.gem"` et `PATH="$PATH:$HOME/.gem/bin"` dans `~/.bashrc` (installation des gems dans le dossier utilisateur, sans sudo). C'est déjà en place — ne pas utiliser `sudo gem install`.
- Le `Gemfile` contient des gems conditionnelles Windows (`tzinfo-data`, `wdm`, sous `platforms :mingw/:mswin`) : elles sont ignorées sous Linux, ne pas les supprimer inutilement.
- Après modification de `_config.yml`, relancer le serveur (les changements de config ne sont pas repris en live-reload).
- GitHub Pages ignore le `Gemfile` du dépôt et utilise ses propres versions (gem `github-pages`) : aucun plugin non supporté par GitHub Pages ne doit être ajouté.

## Structure du projet

```
_config.yml              # Configuration Jekyll : baseurl vide, url, collections, plugins
CNAME                   # Domaine eprn.fr
Gemfile                 # gem github-pages + gems Windows conditionnelles
index.html              # Page d'accueil (éditable via le CMS)
actualites.html         # Liste des articles
interventions-map.js    # Logique de la carte des interventions (Leaflet)
interventions.txt       # Données annexes carte
mentions-legales.html
politique-confidentialite.html
qui-sommes-nous.html
robots.txt
styles.css              # Feuille de style unique (design tokens)
script.js               # Interactions client (nav responsive, animations au scroll)
favicon.svg
images/                 # Images du site ; images/uploads/ = médias envoyés via le CMS
admin/                  # Sveltia CMS (config.yml + index.html)
_data/interventions.yml # Données de la carte des interventions
_layouts/               # default.html (SEO complet), post.html, service.html
_includes/              # header.html, footer.html
_posts/                 # Articles (Actualités), nommage YYYY-MM-DD-slug.md
_services/              # Pages services (markdown), permalien /:name.html
faq-*.html              # 5 pages FAQ autonomes (Liquid), gérées via le CMS
GUIDE_CMS.md            # Guide utilisateur du CMS (pour le client)
```

## Configuration Jekyll (`_config.yml`)

- `baseurl` : chaîne vide (site à la racine du domaine), `url` : `https://eprn.fr`.
- Plugins : `jekyll-seo-tag`, `jekyll-sitemap`.
- `exclude` : documentation (`README.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `GUIDE_CMS.md`) — tout nouveau fichier .md de doc doit y être ajouté, sinon il est publié en ligne.
- Collection `services` : `output: true`, `permalink: /:name.html`.
- Defaults : layout `default` partout, layout `service` pour `_services/`.

## Collections

**Services (`_services/`)** — rendus via `_layouts/service.html` :

- Permalien : `/:name.html` (ex. `desinfection.md` → `/desinfection.html`).
- Front matter : `title`, `description`, `keywords`, `image`, `service_type`, `heading` (optionnel), `show_faq_link`, `faq_url`, `faq_link_text`.
- Fichiers actuels : `deratisation.md`, `desinfection.md`, `desinsectisation.md`, `depigeonnage.md`, `traitement-tir.md`.

**Posts (`_posts/`)** — blog Actualités :

- Nommage standard Jekyll : `YYYY-MM-DD-slug.md` (accents tolérés dans les noms de fichiers, générés par le CMS).
- Front matter : `layout: post`, `title`, `description`, `image`, `youtube_url` (optionnel), `date` (`YYYY-MM-DD HH:mm:ss ZZ`).

**Data (`_data/interventions.yml`)** — carte des interventions :

- Champs par entrée : `city`, `lat`, `lng`, `type` (pigeons/ragondins/rongeurs/flechage), `count`.

## Layouts et includes

- `_layouts/default.html` : gabarit maître — toutes les balises meta SEO, Open Graph, Twitter Cards, et le JSON-LD Schema.org `LocalBusiness`.
- `_layouts/service.html` : étend `default`, ajoute le balisage Schema.org `Service`.
- `_layouts/post.html` : rendu des articles, gère l'image et l'intégration YouTube (`youtube_url`).
- `_includes/header.html` / `footer.html` : navigation et pied de page.

## Conventions clés

### Chemins et liens

Toujours utiliser `{{ site.baseurl }}/chemin` pour les liens internes (`baseurl` est vide mais le préfixe garantit la portabilité).

### Synchronisation des coordonnées (CRITIQUE)

Les coordonnées de contact sont codées en dur en **deux endroits** et DOIVENT rester synchronisées :

1. `_includes/footer.html`
2. `_layouts/default.html` (JSON-LD Schema.org `LocalBusiness`)

Valeurs actuelles :

- **Adresse** : 4 Moulin de Barate – 17800 PONS
- **Téléphone** : 06 06 40 07 79 / +33606400779
- **Email** : eprn@hotmail.fr

Toute modification des coordonnées doit être répercutée aux deux endroits. (Un `contact.html` autonome n'existe pas ; si une telle page est créée un jour, elle devient un troisième endroit à synchroniser.)

### Pages FAQ

Les pages `faq-*.html` sont des fichiers HTML autonomes pilotés en Liquid (boucle sur `faq_items`, liste structurée `question`/`answer`). Le CMS les gère comme des listes de paires. Les pages de services y font référence via le front matter `show_faq_link` + `faq_url`.

### Contenu

- Tout le contenu éditorial est en français.
- Ne pas créer de plugins Jekyll personnalisés : GitHub Pages ne les supporte pas (Jekyll 3.10 via la gem `github-pages`).

## Styles et design tokens

Tout est dans `styles.css` (à la racine) :

- **Couleurs** : dégradé principal `#667eea → #764ba2`, texte `#1a1a2e`, accent or `#ffd700`, secondaire `#4a5568`.
- **Polices** : `Inter` (titres), `Jost` (corps), base `1.2rem`, interligne `1.55`.
- **Largeurs** : contenu max `1000px`, header/services `1280px`.
- **Breakpoints** : `900px`, `768px`, `600px`, `480px`.

Respecter ces tokens pour toute modification visuelle.

## SEO

- `_layouts/default.html` injecte : meta description/keywords, URL canonique, Open Graph, Twitter Cards, JSON-LD `LocalBusiness` (adresse, téléphone, email, géolocalisation, zone d'intervention 100 km, horaires lun–ven 08:00–18:00).
- Plugin `jekyll-seo-tag` + `jekyll-sitemap`.
- Les pages de services incluent un schéma `Service` spécifique.

## CMS (Sveltia)

- Configuration : `admin/config.yml`. Backend GitHub, commit direct sur `main` dans `TheDoubleJo/eprn` via Personal Access Token.
- Collections CMS : Pages (accueil), Actualités, Services, Carte des Interventions, FAQ.
- Médias uploadés dans `images/uploads/`.
- Le guide utilisateur complet (création de token, publication, dépannage) est dans `GUIDE_CMS.md`.

## Déploiement

- GitHub Pages : « Deploy from a branch », branche `main`, dossier `/root`.
- Tout push sur `main` reconstruit le site (délai 1–2 min). Statut visible dans l'onglet Actions du dépôt GitHub.
- Après publication via le CMS ou un push, vérifier le déploiement si le changement est important.

## Historique Windows → Linux (octobre 2026)

Le développement a été déplacé d'une machine Windows vers Linux (Pop!_OS, Ruby 3.2.3). Conséquences :

- Le `Gemfile.lock` Windows d'époque a été supprimé puis régénéré sous Linux par `bundle install` (vérifié : `bundle exec jekyll build` passe en 0,71 s, aucune page d'agent publiée dans `_site`).
- Un `.gitattributes` force les fins de ligne LF : ne pas le supprimer.
- Le `Gemfile` conserve les gems Windows conditionnelles (plateformes mingw/mswin) — inertes sous Linux, utiles si retour sur Windows.
