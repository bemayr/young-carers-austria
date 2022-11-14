package at.sozialministerium.youngcarers

import androidx.compose.runtime.*
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import at.sozialministerium.youngcarers.data.api.connectivity.ConnectionState
import at.sozialministerium.youngcarers.data.api.connectivity.connectivityState
import at.sozialministerium.youngcarers.screens.detail.DetailScreen
import at.sozialministerium.youngcarers.screens.insightDetail.InsightsDetailScreen
import at.sozialministerium.youngcarers.screens.abc.AbcScreen
import at.sozialministerium.youngcarers.screens.about.AboutScreen
import at.sozialministerium.youngcarers.screens.chatbot.ChatBotScreen
import at.sozialministerium.youngcarers.screens.emergency.EmergencyScreen
import at.sozialministerium.youngcarers.screens.help.HelpScreen
import at.sozialministerium.youngcarers.screens.onboarding.OnBoarding
import com.google.accompanist.pager.ExperimentalPagerApi

/**
 * Navigation controller, which selects the links and content on the individual pages
 */

@OptIn(ExperimentalPagerApi::class, kotlinx.coroutines.ExperimentalCoroutinesApi::class)
@Composable
fun Navigation(
    navController: NavHostController,
    startDestination: String
) {
    val connection by connectivityState()
    val isConnected = connection === ConnectionState.Available

    NavHost(
        navController = navController,
        startDestination = startDestination
    ) {
        // Insights Page
        composable(NavigationItem.Help.route) {
            if (isConnected) {
                HelpScreen(
                    navigateToDetail = { questionIndex: Int ->
                        navController.navigate(NavRoutes.InsightsDetail.route + "/$questionIndex")
                    },
                    navController
                )
            } else {
                NoConnectionScreen()
            }
        }
        // Categories Page
        composable(NavigationItem.ABC.route) {
            if (isConnected) {
                AbcScreen(
                    navigateToDetail = { abcEntryName: String ->
                        navController.navigate(NavRoutes.Detail.route + "/$abcEntryName")
                    }
                )
            } else {
                NoConnectionScreen()
            }
        }
        // Emergency Page
        composable(NavigationItem.Emergency.route) {
            if (isConnected) {
                EmergencyScreen(navController = navController)
            } else {
                NoConnectionScreen()
            }
        }
        // About Page
        composable(NavigationItem.About.route) {
            if (isConnected) {
                AboutScreen()
            } else {
                NoConnectionScreen()
            }
        }
        // ChatBot Page
        composable(Welcome.Bot.route) {
            if (isConnected) {
                ChatBotScreen(navController = navController)
            } else {
                NoConnectionScreen()
            }
        }
        // Insight Detail Page
        composable(
            NavRoutes.InsightsDetail.route + "/{questionIndex}",
            arguments = listOf(navArgument("questionIndex") { type = NavType.IntType })
        ) { backStackEntry ->
            if (isConnected) {
                val questionIndex = backStackEntry.arguments?.getInt("questionIndex")!!
                InsightsDetailScreen(
                    navController,
                    onClick = { questionIndex: Int ->
                        navController.navigate(NavRoutes.InsightsDetail.route + "/$questionIndex")
                    },
                    questionIndex
                )
            } else {
                NoConnectionScreen()
            }
        }
        // Category Detail Page
        composable(NavRoutes.Detail.route + "/{viewTitle}") { backStackEntry ->
            if (isConnected) {
                val viewTitle = backStackEntry.arguments?.getString("viewTitle")
                DetailScreen(navController, viewTitle)
            } else {
                NoConnectionScreen()
            }
        }
        // Onboarding Screen
        composable(Welcome.Onboard.route) {
            if (isConnected) {
                OnBoarding(navController = navController)
            } else {
                NoConnectionScreen()
            }
        }
    }
}

