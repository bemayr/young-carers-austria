package at.sozialministerium.youngcarers


/**
 * Navigation Items for routes
 */

sealed class NavigationItem(
    var route: String,
    var icon: Int,
    var title: String
) {
    object Help : NavigationItem("help", R.drawable.ic_help_icon_toolbar, "Hilfe")
    object ABC : NavigationItem("abc", R.drawable.ic_info_icon_toolbar, "Info")
    object Emergency : NavigationItem("emergency", R.drawable.ic_emergency_icon_toolbar, "Im Notfall")
    object About : NavigationItem("about", R.drawable.ic_about_icon_toolbar, "Über")
}

sealed class NavRoutes(
    var route: String,
    var title: String
) {
    object InsightsDetail : NavRoutes("insights_detail_route", "insights detail")
    object Detail : NavRoutes("detail_route", "detail")

}

sealed class Welcome(
    var route: String,
) {
    object Onboard : Welcome("onboarding_route")
    /**
     * ChatBot
     */
    object Bot : Welcome("bot_route")
}


