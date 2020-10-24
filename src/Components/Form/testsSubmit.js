
import { fields } from './fields'

export const testsSubmit = {

    agent_nom :                value => value ? true : false,

    agent_prenom :             value => value ? true : false,

    agent_date_de_naissance :  value => /^\d{2}\/\d{2}\/\d{4}$/.test(value) ? true : false,

    agent_date_arrivee :       value => /^\d{2}\/\d{2}\/\d{4}$/.test(value) ? true : false,

    agent_sexe :               value => value ? true : false,

    agent_sirhius :            value => value ? (/^\d{12}$/.test(value) ? true : false) : true,

    bureau_numero :            value => value ? (/^\d{3}$/.test(value) && fields["bureau_position"].currentValue && fields["bureau_etage"].currentValue ? true : false) : true,

    bureau_etage :             value => value ? (/^\d{3}$/.test(fields["bureau_numero"].currentValue) && fields["bureau_position"].currentValue ? true : false ) : true,

    bureau_position :          value => value ? (/^\d{3}$/.test(fields["bureau_numero"].currentValue) &&  fields["bureau_etage"].currentValue ? true : false ) : true,

}


