import configure from "./services/configure";
import extend from "./services/extend";
import init from "./services/init";

export default function typedataSuggestions(config) {
    this.options = config;
    if (this.options.token === undefined) {
        console.log("Token not passed");
        return;
    }
    this.id = typedataSuggestions.instances = (typedataSuggestions.instances || 0) + 1;
    this.name = "typedataSuggestions";
    this.placeHolder = "Введите адрес в свободной форме";
    this.wrapper = 1;
    this.threshold = 1;
    this.debounce = 0;
    this.searchEngine = "loose";
    this.resultsList = {
        position: "afterend",
        tag: "ul",
        noResults: true,
        maxResults: 15,
        tabSelect: true,
        element: (list, data) => {
            const info = document.createElement("p");
            info.innerHTML = `Выберите вариант или продолжите ввод: <img onclick="window.open('https://typedata.net/?utm_source=widget&utm_medium=copyright&utm_campaign='+location.host)" src="https://typedata.net/logo.svg">`;
            list.prepend(info);
        },
    };
    this.resultItem = {
        tag: "li",
        highlight: true
    };
    this.data = {
        src: async (query) => {
            if (query == undefined) {
                return;
            }
            try {
                const source = await fetch("https://api.typedata.net/v1/suggest/address", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Token ${this.options.token}`,
                    },
                    body: JSON.stringify({query: query})
                });
                const data = await source.json();
                return data.suggestions;
            } catch (error) {
                return error;
            }
        },
        keys: ["value"],
        cache: false,
    };
    configure(this);
    extend.call(this, typedataSuggestions);
    init(this);
}
