import {firstLetterCapitalizeThenNormal, nmDate, testDate, testBureau, testSirhius, noControl, testString, testNumber, testValidDate, testLength, testExistingDate, testSirhiusExists} from '../../fonctions_front'


export const testsChange = {

    agent_nom :                value => ({ errors: [testString(value), testLength(value, 30)], 
                                           output: value.toUpperCase().trimStart(),
                                           type: "input" }),
                    
    agent_prenom :             value => ({ errors: [testString(value), testLength(value, 30)], 
                                           output: firstLetterCapitalizeThenNormal(value).trim()    ,
                                           type: "input" }),

    agent_date_de_naissance :  value => ({ errors:  [testNumber(value),
                                                     testValidDate(value),
                                                     testExistingDate(value), 
                                                     testDate(nmDate(value), "jour"),
                                                     testDate(nmDate(value), "mois"),
                                                     testDate(nmDate(value), "annee_de_naissance")],
                                          output: nmDate(value),
                                          type: "input" }),
    
    agent_date_arrivee :       value => ({             errors:  [testNumber(value),
                                                                testValidDate(value), 
                                                                testExistingDate(value),
                                                                testDate(nmDate(value), "jour"),
                                                                testDate(nmDate(value), "mois"),
                                                                testDate(nmDate(value), "annee_arrivee")],
                                                        output: nmDate(value),
                                                        type: "input" }),

    agent_position_statutaire : value => noControl(value, "select"),
    
    agent_sirhius :             value           =>   ({   
                                                           errors: [testNumber(value), testSirhius(value), testSirhiusExists(value)], 
                                                           output: value,
                                                           type: "input" }),

    agent_sexe :                value => noControl(value, "radio"),

    agent_categorie :           value => noControl(value, "select"),

    agent_direction :           value => noControl(value, "select"),

    agent_observations :        value => noControl(value, "textarea"),

    bureau_etage :              value => noControl(value, "select"),

    bureau_position :           value => noControl(value, "select"),

    bureau_numero :             value => ({ errors: [testBureau(value)],
                                            output: value,
                                            type: "input" }),
    
    
}





