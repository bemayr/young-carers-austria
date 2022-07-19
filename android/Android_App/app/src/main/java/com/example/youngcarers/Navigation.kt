package com.example.youngcarers


import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.youngcarers.core.emergency
//import com.example.youngcarers.core.getABCList
import com.example.youngcarers.core.tel
import com.example.youngcarers.data.api.service.MainViewModel
import com.example.youngcarers.screens.Detail_Screen
import com.example.youngcarers.screens.Insights_Detail_Screen



@Composable
fun Navigation(navController: NavHostController, mainViewModel: MainViewModel) {

    fun navigateToInsightDetail(questionIndex: Int) {
        navController.navigate(NavRoutes.InsightsDetail.route + "/$questionIndex")
    }

    fun navigateToAbcDetail(abcEntryName: String) {
        navController.navigate(NavRoutes.Detail.route + "/$abcEntryName")
    }

   // mainViewModel.content?.let { content ->
        NavHost(
            navController = navController,
            startDestination = NavigationItem.Help.route
        ) {
            // Insights Page
            composable(NavigationItem.Help.route) {
                mainViewModel.content?.let { content ->
                    Help_Screen(
                        insights = content.insights,
                        navigateToDetail = ::navigateToInsightDetail,
                        navController
                    ) // TODO: Remove this, not needed any more due to function passing
                }
            }

            // Categories Page
            composable(NavigationItem.ABC.route) {
                mainViewModel.content?.let { content ->
                    ABC_Screen(
                        categories = content.abc,
                        navigateToDetail = ::navigateToAbcDetail,
                        navController)
            }}

            // Emergency Page
            composable(NavigationItem.Emergency.route) {
                Emergency_Screen(emergency, tel, navController)
            }

            // About Page
            composable(NavigationItem.About.route) {
                mainViewModel.content?.let { content ->
                    About_Screen(
                        metadata = content.metadata
                    )
                }

            }

            // Insight Detail Page
            composable(
                NavRoutes.InsightsDetail.route + "/{questionIndex}",
                arguments = listOf(navArgument("questionIndex") { type = NavType.IntType })
            ) { backStackEntry ->
                val questionIndex = backStackEntry.arguments?.getInt("questionIndex")!!

                mainViewModel.content?.let { content ->
                    val insight = content.insights[questionIndex]
                    Insights_Detail_Screen(navController, insight!!)
                }
            }

            // Category Detail Page
            composable(NavRoutes.Detail.route + "/{viewTitle}") { backStackEntry ->
                val viewTitle = backStackEntry.arguments?.getString("viewTitle")
                mainViewModel.content?.let { content ->
                    Detail_Screen(navController, viewTitle, content = content.abc)
                }


            }

    }
}

