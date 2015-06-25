$(function() {
    var startupView = "About";
    DevExpress.devices.current("desktop");

    Application1.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Application1,
        layoutSet: DevExpress.framework.html.layoutSets[Application1.config.layoutSet],
        animationSet: DevExpress.framework.html.animationSets[Application1.config.animationSet],
        mode: "webSite",
        navigation: Application1.config.navigation,
        commandMapping: Application1.config.commandMapping,
        navigateToRootViewMode: "keepHistory",
        useViewTitleAsBackText: true
    });

    $(window).unload(function() {
        Application1.app.saveState();
    });

    Application1.app.router.register(":view/:id", { view: startupView, id: undefined });
    Application1.app.navigate();
});