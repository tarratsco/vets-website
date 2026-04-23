/**
 * Barrel re-export for all page uiSchema / schema pairs.
 * Allows form.js to import from a single location if preferred.
 */
export {
  loanIdentificationUiSchema,
  loanIdentificationSchema,
} from '../config/chapters/loanIdentification';

export {
  sectionIUiSchema,
  sectionISchema,
} from '../config/chapters/sectionI';

export {
  sectionIIUiSchema,
  sectionIISchema,
} from '../config/chapters/sectionII';

export {
  sectionIIIUiSchema,
  sectionIIISchema,
} from '../config/chapters/sectionIII';

export {
  lenderCertificationUiSchema,
  lenderCertificationSchema,
} from '../config/chapters/lenderCertification';