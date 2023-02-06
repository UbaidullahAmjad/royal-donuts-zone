import i18next from 'i18next';
import en from "./en.json";
import fr from "./fr.json";
import { useSelector } from "react-redux";

const I18Config = () => {

    const i18Langauge = useSelector((state) => state.i18Langauge)

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
    i18next.changeLanguage(i18Langauge.language);

    return (<></>);
}

export default I18Config