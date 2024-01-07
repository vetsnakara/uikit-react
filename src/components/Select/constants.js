export const SelectEvent = {
    SHOW: "show.bs.select",
    SHOWN: "shown.bs.select",
    HIDE: "hide.bs.select",
    HIDDEN: "hidden.bs.select",
    LOADED: "loaded.bs.select",
    RENDERED: "rendered.bs.select",
    REFRESHED: "refreshed.bs.select",
    CHANGED: "changed.bs.select",
};

export const selectpickerEventHandlers = Object.keys(SelectEvent).map((name) => {
    const lcName = name.toLowerCase();
    return "on" + lcName[0].toUpperCase() + lcName.slice(1);
});
