package at.sozialministerium.youngcarers

import androidx.compose.runtime.*
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import at.sozialministerium.youngcarers.screens.DetailScreen
import at.sozialministerium.youngcarers.screens.InsightsDetailScreen
import at.sozialministerium.youngcarers.screens.chatbot.ChatBotScreen
import at.sozialministerium.youngcarers.screens.onboarding.OnBoarding
import com.google.accompanist.pager.ExperimentalPagerApi

/**
 * Navigation controller, which selects the links and content on the individual pages
 */

@OptIn(ExperimentalPagerApi::class)
@Composable
fun Navigation(
    navController: NavHostController,
    startDestination: String
    ) {

    // TODO: remove navController integrate this
    fun navigateToInsightDetail(questionIndex: Int) {
        navController.navigate(NavRoutes.InsightsDetail.route + "/$questionIndex")
    }
    // TODO: remove navController integrate this
    fun navigateToAbcDetail(abcEntryName: String) {
        navController.navigate(NavRoutes.Detail.route + "/$abcEntryName")
    }

// mainViewModel.content?.let { content -> // TODO
    NavHost(
        navController = navController,
        //startDestination = NavigationItem.Help.route
        startDestination = startDestination


    ) {

        // Insights Page
        composable(NavigationItem.Help.route) {
            HelpScreen(
                navigateToDetail = {
                        questionIndex: Int -> navController.navigate(NavRoutes.InsightsDetail.route + "/$questionIndex")
                },
                navController
            ) // TODO: Remove this, not needed any more due to function passing
        }

        // Categories Page
        composable(NavigationItem.ABC.route) {
            AbcScreen(
                navigateToDetail = {
                    abcEntryName: String -> navController.navigate(NavRoutes.Detail.route + "/$abcEntryName")
                }
            )
        }

        // Emergency Page
        composable(NavigationItem.Emergency.route) {
            EmergencyScreen(navController = navController)
        }

        // About Page
        composable(NavigationItem.About.route) {
            AboutScreen()
        }
        /**
         * ChatBot
         */
        // ChatBot Page
       composable(NavigationItem.Bot.route) {
            ChatBotScreen()
        }

        // Insight Detail Page
        composable(
            NavRoutes.InsightsDetail.route + "/{questionIndex}",
            arguments = listOf(navArgument("questionIndex") { type = NavType.IntType })
        ) { backStackEntry ->
            val questionIndex = backStackEntry.arguments?.getInt("questionIndex")!!
            InsightsDetailScreen(
                navController,
                onClick = {
                    questionIndex: Int -> navController.navigate(NavRoutes.InsightsDetail.route + "/$questionIndex")
                },
                questionIndex)
        }

        // Category Detail Page
        composable(NavRoutes.Detail.route + "/{viewTitle}") { backStackEntry ->
            val viewTitle = backStackEntry.arguments?.getString("viewTitle")
            DetailScreen(navController, viewTitle)
        }

        // Onboardscreen
        composable(Welcome.Onboard.route){
            OnBoarding(navController = navController)

        }
    }
}

