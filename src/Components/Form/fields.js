import { Field } from './Field'

export let fields = {
                                         /*    name,  caption,  placeholder, */
    agent_nom :                 new Field("agent_nom", "Nom", "Entrez un nom"),
    agent_prenom :              new Field("agent_prenom", "Prénom", "Entrez un prénom"),
    agent_date_de_naissance :   new Field("agent_date_de_naissance", "Date de naissance", "JJ/MM/AAAA"),
    agent_age :                 new Field("agent_age", "Âge"),
    agent_sexe :                new Field("agent_sexe", "Sexe"),
    agent_date_arrivee :        new Field("agent_date_arrivee", "Date d'arrivée", "JJ/MM/AAAA"),
    agent_categorie :           new Field("agent_categorie", "Catégorie"),
    agent_grade :               new Field("agent_grade", "Grade"),
    agent_echelon :             new Field("agent_echelon", "Échelon"),
    agent_date_echelon :        new Field("agent_date_echelon", "Date échelon"),
    agent_position_statutaire : new Field("agent_position_statutaire", "Position statutaire"),
    agent_unite_administrative :new Field("agent_unite_administrative", "Unité administrative"),
    agent_date_affectation_UA : new Field("agent_date_affectation_UA", "Date affectation UA"),
    agent_code_UA :             new Field("agent_code_UA", "Code UA"),
    agent_unite_operationnelle :new Field("agent_unite_operationnelle", "Unité opérationnelle"),
    agent_code_UO :             new Field("agent_code_UO", "Code UO"),
    agent_timbre_UO :           new Field("agent_timbre_UO", "Timbre unité opérationnelle"),
    agent_direction :           new Field("agent_direction", "Direction"),
    agent_presence :            new Field("agent_presence", "Présence"),
    agent_sirhius :             new Field("agent_sirhius", "Matricule Sirhius", "Entrez un identifiant"),
    agent_type_poste :          new Field("agent_type_poste", "Type de poste"),
    agent_observations :        new Field("agent_observations", "Observations", ""),
    agent_quotite_travail:      new Field("agent_quotite_travail", "Quotité de travail"),
    agent_rang :                new Field("agent_rang", "Rang hiérarchique"),
    agent_trames :              new Field("agent_trames", "Droits à trame(s)"),

                
    bureau_etage:               new Field("bureau_etage", "Étage"),
    bureau_position:            new Field("bureau_position", "Position"),
    bureau_numero:              new Field("bureau_numero", "Bureau", "Entrez un bureau"),
    bureau_aile:                new Field("bureau_aile", "Aile", ""),
    bureau_timbre:              new Field("bureau_timbre", "Timbre", ""),

    postes_entite:              new Field("postes_entite", "Entité (dernier niveau)"),
    postes_categorie:           new Field("postes_categorie", "Catégorie"),
    postes_systeme:             new Field("postes_systeme", "Système d'exploitation"),
    postes_marque:              new Field("postes_marque", "Marque"),
    postes_localisation:        new Field("postes_localisation", "Localisation"),
    postes_code_materiel:       new Field("postes_code_materiel", "Code matériel"),
    postes_statut:              new Field("postes_statut", "Statut"),
    postes_commentaire:         new Field("postes_commentaire", "Commentaire"),

    telephones_dept:            new Field("telephones_dept", "DEPT/DIV"),
    telephones_timbre:          new Field("telephones_timbre", "TIMBRE frais gestion"),
    telephones_materiel:        new Field("telephones_materiel", "Matériel"),
    telephones_categorie_ptt:   new Field("telephones_categorie_ptt", "Catégorie PTT"),
    telephones_tel:             new Field("telephones_tel", "Numéro"),
    telephones_prive:           new Field("telephones_prive", "Ligne privée"),
    telephones_filtrage:        new Field("telephones_filtrage", "Filtrage")
 
}
