package com.example.youngcarers

sealed class NavigationItem(
    var route: String,
    var icon: Int,
    var title: String)
{
    object Help : NavigationItem("help", R.drawable.ic_help_toolbar_gray, "Hilfe")
    object ABC : NavigationItem("abc", R.drawable.ic_abc_toolbar_gray, "ABC")
    object Emergency : NavigationItem("emergency", R.drawable.ic_emergency_toolbar_gray, "Im Notfall")
    object About : NavigationItem("about", R.drawable.ic_about_toolbar_gray, "Über")

}

sealed class NavRoutes(
    var route: String,
    var title: String)
{

    object InsightsDetail : NavRoutes("insights_detail_route","insights detail")
    object Detail : NavRoutes("detail_route","detail")
}