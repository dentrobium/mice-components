import ReactGA from "react-ga4";

const gaEventClick = (category, label) => {
    ReactGA.event({
        category,
        action: "Click",
        label,
    });
};

export { gaEventClick };
