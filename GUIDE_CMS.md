# Guide d'Utilisation du CMS - EPRN

Ce guide explique comment utiliser le système de gestion de contenu (CMS) pour publier des actualités sur le site EPRN.

## Accès au CMS

Le CMS est accessible à l'adresse suivante :
**https://thedoublejo.github.io/eprn/admin/**

## Première Connexion : Créer un Token GitHub

La première fois que vous utilisez le CMS, vous devez créer un "token" GitHub. C'est comme un mot de passe spécial qui permet au CMS d'accéder au site.

### Étape 1 : Aller sur GitHub

1. Connectez-vous sur **https://github.com** avec votre compte
2. Cliquez sur votre photo de profil en haut à droite
3. Cliquez sur **Settings** (Paramètres)

### Étape 2 : Créer le Token

1. Dans le menu de gauche, tout en bas, cliquez sur **Developer settings**
2. Cliquez sur **Personal access tokens**
3. Cliquez sur **Fine-grained tokens** (Tokens personnels précis)
4. Cliquez sur le bouton **Generate new token**

### Étape 3 : Configurer le Token

Remplissez le formulaire comme suit :

**Token name (Nom du token) :**
- Écrivez : `CMS EPRN`

**Expiration :**
- Choisissez : `No expiration` (Pas d'expiration)
- OU si vous préférez : `1 year` (1 an) - vous devrez recréer un token chaque année

**Repository access (Accès aux repositories) :**
- Sélectionnez : `Only select repositories` (Seulement certains repositories)
- Dans la liste déroulante, choisissez : `TheDoubleJo/eprn`

**Permissions (Autorisations) :**

Descendez jusqu'à la section **Repository permissions** et configurez :
- **Contents** : Sélectionnez `Read and write` (Lecture et écriture)
- **Metadata** : Reste en `Read-only` (Lecture seule) - c'est automatique

### Étape 4 : Générer et Copier le Token

1. Cliquez sur le bouton vert **Generate token** en bas de la page
2. GitHub affiche votre token (une longue chaîne de caractères qui commence par `github_pat_`)
3. **IMPORTANT** : Copiez immédiatement ce token et sauvegardez-le dans un endroit sûr (fichier texte, gestionnaire de mots de passe, etc.)
4. Vous ne pourrez plus le voir une fois que vous aurez quitté cette page !

### Étape 5 : Se Connecter au CMS

1. Allez sur **https://thedoublejo.github.io/eprn/admin/**
2. Le CMS Sveltia s'ouvre
3. Cliquez sur **Work with Local Repository** (ou **Sign in with GitHub**)
4. Si demandé, choisissez **GitHub** comme source
5. Collez votre token dans le champ prévu
6. Cliquez sur **Authenticate** ou **Se connecter**

**Bonne nouvelle :** Le navigateur sauvegarde votre token. Vous n'aurez plus besoin de le rentrer à chaque fois !

## Utilisation Quotidienne du CMS

Une fois connecté, l'utilisation est très simple :

### Publier un Nouvel Article

1. Allez sur **https://thedoublejo.github.io/eprn/admin/**
2. Le CMS s'ouvre (déjà connecté avec votre token sauvegardé)
3. Cliquez sur **Actualités** dans le menu de gauche
4. Cliquez sur le bouton **New Actualités** (Nouvelle actualité)

### Remplir le Formulaire

**Titre :**
- Écrivez le titre de votre article

**Description :**
- Écrivez un court résumé (1-2 phrases)

**Image Principale :**
- Cliquez sur **Choose an image** (Choisir une image)
- Sélectionnez une image depuis votre ordinateur
- L'image sera automatiquement uploadée

**Date de publication :**
- La date du jour est pré-remplie
- Vous pouvez la modifier si besoin

**Corps du texte :**
- Écrivez le contenu de votre article
- Vous pouvez utiliser le formatage :
  - `**texte**` pour mettre en gras
  - `*texte*` pour mettre en italique
  - `## Titre` pour créer un sous-titre
  - `- Point` pour créer une liste à puces

### Publier l'Article

1. Vérifiez que tout est correct
2. Cliquez sur **Publish** en haut à droite
3. Choisissez **Publish now** (Publier maintenant)
4. Attendez quelques secondes

**C'est fait !** Votre article est publié sur GitHub. Le site se mettra à jour automatiquement dans 1-2 minutes.

### Modifier un Article Existant

1. Allez sur **https://thedoublejo.github.io/eprn/admin/**
2. Cliquez sur **Actualités** dans le menu de gauche
3. Cliquez sur l'article que vous voulez modifier
4. Faites vos modifications
5. Cliquez sur **Publish** puis **Publish now**

### Supprimer un Article

1. Ouvrez l'article à supprimer
2. Cliquez sur **Delete entry** (Supprimer l'entrée) en haut
3. Confirmez la suppression

## Problèmes Courants

### Le CMS me redemande le token

Cela peut arriver si :
- Vous avez changé d'ordinateur ou de navigateur
- Vous avez vidé le cache de votre navigateur
- Le token a expiré (si vous aviez choisi une durée limitée)

**Solution :** Rentrez à nouveau votre token sauvegardé. Si vous l'avez perdu, créez-en un nouveau (voir Étape 2).

### Mon article n'apparaît pas sur le site

Patientez 1-2 minutes. GitHub Pages doit reconstruire le site.

Vous pouvez vérifier l'état de la publication :
1. Allez sur **https://github.com/TheDoubleJo/eprn**
2. Cliquez sur l'onglet **Actions**
3. Vous verrez le statut du déploiement (point orange = en cours, coche verte = terminé)

### Je ne peux pas uploader d'image

Vérifiez que :
- L'image n'est pas trop lourde (max 5 MB recommandé)
- L'image est dans un format supporté (JPG, PNG, GIF)
- Votre token a bien les permissions `Contents: Read and write`

## Contact en Cas de Problème

Si vous rencontrez un problème, contactez le développeur du site avec :
- Une capture d'écran du problème
- Le message d'erreur si visible
- Ce que vous essayiez de faire

## Conseils pour de Bons Articles

1. **Titre accrocheur** : Court et descriptif (max 60 caractères)
2. **Description claire** : Résumez l'article en 1-2 phrases
3. **Images de qualité** : Utilisez des images nettes, bien cadrées
4. **Taille des images** : Optimisez vos images avant upload (max 1-2 MB)
5. **Structure** : Utilisez des sous-titres pour aérer le texte
6. **Longueur** : Entre 200 et 500 mots pour un bon article
7. **Relecture** : Relisez avant de publier !

---

**Version du guide :** 1.0 - Décembre 2025
