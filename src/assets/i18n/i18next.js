import i18next from 'i18next';
import en from "./en.json";
import fr from "./fr.json";

i18next.init({
    lng: 'fr', // if you're using a language detector, do not define the lng option (default-language)
    debug: true,
    languages: ['en', 'fr'],
    resources: {
        en: {
            translations: en
        },
        fr: {
            translations: fr
        }
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false, // we use content as keys
    interpolation: {
        escapeValue: false
    }
})

export default i18next