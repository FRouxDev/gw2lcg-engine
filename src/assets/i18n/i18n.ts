export const gw2I18n = {
  en: {
    menu: {
      newGame: 'Start New Game',
      joinLobby: 'Join a Lobby',
      loadSaved: 'Load Saved Game',
      navAdmin: 'Administration Board',
      deckManager: 'Deck Manager',
      settings: 'Settings',
      quit: 'Quit',
    },
    adminMenu: {
      manageSets: 'Manage Sets',
      manageCards: 'Manage Cards',
      websockets: 'Test Websockets',
      back: 'Back to Main menu',
    },
    generic: {
      modal: {
        buttons: {
          cancel: 'Cancel',
          confirm: 'Confirm',
        },
      },
    },
    admin: {
      cards: {
        back: 'Back to Menu',
        pageTitle: 'Cards Management',
        text: {
          cards: 'cards',
          total: 'Total:',
        },
        buttons: {
          import: 'Import Cards by JSON',
          create: 'Create New Card',
        },
        data: {
          spheres: {
            leadership: 'Leadership',
            lore: 'Lore',
            spirit: 'Spirit',
            tactics: 'Tactics',
            neutral: 'Neutral',
          },
          types: {
            hero: 'Hero',
            ally: 'Ally',
            event: 'Event',
            attachment: 'Attachment',
            enemy: 'Enemy',
            location: 'Location',
            quest: 'Quest',
            treachery: 'Perish',
          },
        },
        table: {
          buttons: {
            details: 'Details',
            delete: 'Delete',
            edit: 'Modifier',
          },
          labels: {
            cardImage: 'Card image',
            cardName: 'Card name',
            cardSet: 'Card Set',
            type: 'Type',
            sphere: 'Sphere',
            uuid: 'UUID',
            controls: 'Operations',
          },
        },
        messages: {
          notifyCreated: 'The new Card has been successfully created.',
          notifyDeleted: 'The Card has been successfully deleted.',
          notifyImportSuceeded: 'The new cards have been successfully imported.',
          notifyUpdated: 'The Card has been successfully updated.',
          confirmDelete: 'Are you sure you want to delete this card?',
        },
        modal: {
          import: {
            title: 'Import cards from JSON',
            label: 'JSON File',
            button: 'Choose a JSON File to upload',
          },
          create: {
            title: 'Create a New Card',
            upload: {
              button: 'Choose a picture to upload',
            },
          },
          edit: {
            title: 'Edit a New Card',
            upload: {
              button: 'Choose a picture to upload',
            },
          },
          delete: {
            title: 'Card Deletion',
            text: 'Are you sure you want to delete this Card?',
          },
        },
      },
      sets: {
        back: 'Back to Menu',
        pageTitle: 'Card Sets Management',
        buttons: {
          create: 'Create New Set',
        },
        table: {
          buttons: {
            details: 'Detail',
            delete: 'Delete',
          },
          labels: {
            setName: 'Set name',
            setType: 'Set type',
            nbCards: 'Nb. of cards',
            controls: 'Operations',
          },
        },
        messages: {
          notifyCreated: 'The new Card Set has been successfully created.',
          notifyDeleted: 'The Card Set has been successfully deleted.',
          confirmDelete: 'Are you sure you want to delete this Card Set?',
        },
        modal: {
          create: {
            title: 'Card Set Creation',
            setName: 'Set name',
            setType: 'Set type',
          },
          delete: {
            title: 'Card Set Deletion',
            text: 'Are you sure you want to delete this Card Set?',
          },
        },
      },
    },
  },
  fr: {
    menu: {
      newGame: 'Nouvelle Partie',
      joinLobby: 'Rejoindre un Lobby',
      loadSaved: 'Charger une Partie',
      navAdmin: "Panneau d'administration",
      deckManager: 'Gestionnaire de Decks',
      settings: 'Configuration',
      quit: 'Quitter',
    },
    adminMenu: {
      manageSets: 'Gérer les Sets',
      manageCards: 'Gérer les Cartes',
      websockets: 'Tester les Websockets',
      back: 'Retour au Menu principal',
    },
    generic: {
      modal: {
        buttons: {
          cancel: 'Annuler',
          confirm: 'Valider',
        },
      },
    },
    admin: {
      cards: {
        back: 'Retour au Menu',
        pageTitle: 'Gestion des cartes',
        text: {
          cards: 'cartes',
          total: 'Total :',
        },
        buttons: {
          import: 'Importer via JSON',
          create: 'Créer une nouvelle carte',
        },
        data: {
          spheres: {
            leadership: 'Commandement',
            lore: 'Connaissance',
            spirit: 'Esprit',
            tactics: 'Tactique',
            neutral: 'Neutre',
          },
          types: {
            hero: 'Héros',
            ally: 'Allié',
            event: 'Événement',
            attachment: 'Attachement',
            enemy: 'Ennemi',
            location: 'Lieu',
            quest: 'Quête',
            treachery: 'Péril',
          },
        },
        table: {
          buttons: {
            details: 'Détails',
            delete: 'Supprimer',
            edit: 'Modifier',
          },
          labels: {
            cardImage: 'Visuel',
            cardName: 'Nom de la carte',
            cardSet: 'Set',
            type: 'Type',
            sphere: 'Sphère',
            uuid: 'UUID',
            controls: 'Opérations',
          },
        },
        messages: {
          notifyCreated: 'La nouvelle carte a été créée avec succès.',
          notifyDeleted: 'La carte a été supprimée avec succès.',
          notifyImportSuceeded: 'Les nouvelles cartes ont été importées avec succès',
          notifyUpdated: 'La carte a été modifiée avec succès.',
          confirmDelete: 'Êtes-vous sûr·e de vouloir supprimer cette carte ?',
        },
        modal: {
          import: {
            title: 'Importer des cartes via JSON',
            label: 'Fichier JSON',
            button: 'Choisissez un fichier JSON à uploader',
          },
          create: {
            title: 'Créer une nouvelle carte',
            upload: {
              button: 'Choisissez une image à uploader',
            },
          },
          edit: {
            title: 'Modifier une nouvelle carte',
            upload: {
              button: 'Choisissez une image à uploader',
            },
          },
          delete: {
            title: 'Supprimer une carte',
            text: 'Êtes-vous sûr·e de vouloir supprimer cette carte ?',
          },
        },
      },
      sets: {
        back: 'Retour au menu',
        pageTitle: 'Gestion des extensions',
        buttons: {
          create: 'Créer une nouvelle extension',
        },
        table: {
          buttons: {
            details: 'Détails',
            delete: 'Supprimer',
          },
          labels: {
            setName: 'Nom de la carte',
            setType: "Type d'extension",
            nbCards: 'Nb. de cartes',
            controls: 'Opérations',
          },
        },
        messages: {
          notifyCreated: 'La nouvelle extension a été créée avec succès.',
          notifyDeleted: "L'extension a été supprimée avec succès.",
          confirmDelete: 'Êtes-vous sûr·e de vouloir supprimer cette extension ?',
        },
        modal: {
          create: {
            title: 'Créer une nouvelle extension',
            setName: "Nom de l'extension",
            setType: "Type d'extension",
          },
          delete: {
            title: 'Supprimer une extension',
            text: 'Êtes-vous sûr·e de vouloir supprimer cette extension ?',
          },
        },
      },
    },
  },
};
