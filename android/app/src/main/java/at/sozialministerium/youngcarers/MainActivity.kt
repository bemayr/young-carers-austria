package at.sozialministerium.youngcarers


import android.app.Application
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.navigation.NavController
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import at.sozialministerium.youngcarers.splashScreen.SplashViewModel
import at.sozialministerium.youngcarers.ui.theme.ShimmerColorShades
import at.sozialministerium.youngcarers.ui.theme.YoungCarersTheme
import at.sozialministerium.youngcarers.ui.theme.colorDarkRed
import com.google.accompanist.pager.ExperimentalPagerApi
import dagger.hilt.android.AndroidEntryPoint
import dagger.hilt.android.HiltAndroidApp
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.GlobalContext.startKoin
import javax.inject.Inject


@ExperimentalAnimationApi
@ExperimentalPagerApi
@AndroidEntryPoint
class MainActivity : ComponentActivity() {


    @Inject
    lateinit var splashViewModel: SplashViewModel


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // need for the chat bot section, the keyboard fits into the app and does not slide over the text field
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)

        startKoin{
            androidLogger()
            androidContext(this@MainActivity)
            modules(appModule)
        }

       installSplashScreen().setKeepOnScreenCondition {
            !splashViewModel.isLoading.value
        }

        setContent {
            YoungCarersTheme {

                val screen by splashViewModel.startDestination
                val navController = rememberNavController()

                Scaffold(
                    bottomBar = {

                        if (currentDestination(navController = navController) != "onboarding_route") BottomNavigationBar(
                            navController
                        )
                    }
                )
                {

                    Navigation(navController = navController, startDestination = screen)

                }
            }
        }

    }
}

@Composable
fun currentDestination(navController: NavController): String? {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    return navBackStackEntry?.destination?.route
}

@HiltAndroidApp
class MyApplication: Application()
