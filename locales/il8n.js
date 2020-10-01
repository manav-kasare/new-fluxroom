import i18n from 'i18n-js';

import ar from './ar.json';
import bg from './bg.json';
import bn from './bn.json';
import bs from './bs.json';
import ca from './ca.json';
import cs from './cs.json';
import cy from './cy.json';
import da from './da.json';
import de from './de.json';
import el from './el.json';
import en from './en.json';
import es from './es.json';
import et from './et.json';
import fi from './fi.json';
import fr from './fr.json';
import ga from './ga.json';
import gu from './gu.json';
import he from './he.json';
import hi from './hi.json';
import hr from './hr.json';
import hu from './hu.json';
import it from './it.json';
import ja from './ja.json';
import ko from './ko.json';
import lt from './lt.json';
import lv from './lv.json';
import ml from './ml.json';
import ms from './ms.json';
import mt from './mt.json';
import nb from './nb.json';
import ne from './ne.json';
import nl from './nl.json';
import pl from './pl.json';
import pt from './pt.json';
import ro from './ro.json';
import ru from './ru.json';
import si from './si.json';
import sk from './sk.json';
import sl from './sl.json';
import sv from './sv.json';
import sr from './sr.json';
import ta from './ta.json';
import te from './te.json';
import tr from './tr.json';
import uk from './uk.json';
import ur from './ur.json';
import vi from './vi.json';
import zh from './zh.json';

i18n.defaultLocale = 'en';
i18n.fallbacks = true;
i18n.translations = {
  ar,
  bg,
  bn,
  bs,
  ca,
  cs,
  cy,
  da,
  de,
  el,
  en,
  es,
  et,
  fi,
  fr,
  ga,
  gu,
  he,
  hi,
  hr,
  hu,
  it,
  ja,
  ko,
  lt,
  lv,
  ml,
  ms,
  mt,
  nb,
  ne,
  nl,
  pl,
  pt,
  ro,
  ru,
  si,
  sk,
  sl,
  sv,
  sr,
  ta,
  te,
  tr,
  uk,
  ur,
  vi,
  zh,
};

export const setLocale = (locale) => {
  i18n.locale = locale;
};

export default i18n;
