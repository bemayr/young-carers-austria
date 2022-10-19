package com.example.youngcarers

import androidx.compose.material.icons.Icons


/**
 * Navigation Items for routes
 */

sealed class NavigationItem(
    var route: String,
    var icon: Int,
    var title: String
) {
    object Help : NavigationItem("help", R.drawable.ic_help_icon_toolbar, "Hilfe") //R.drawable.ic_help_toolbar_gray
    object ABC : NavigationItem("abc", R.drawable.ic_info_icon_toolbar, "Info")
    object Emergency : NavigationItem("emergency", R.drawable.ic_emergency_icon_toolbar, "Im Notfall")
    object About : NavigationItem("about", R.drawable.ic_about_icon_toolbar, "Über")

    /**
     * ChatBot
     */
    object Bot : NavigationItem("bot", R.drawable.ic_bot_icon, "Bot")
    //object Onboard : NavigationItem("onboarding_route", R.drawable.ic_about_toolbar_gray, "onboarding_screen")
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
    object Home: Welcome("home_screen")

}


