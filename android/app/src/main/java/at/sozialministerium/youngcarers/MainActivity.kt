package at.sozialministerium.youngcarers


import android.app.Application
import android.os.Bundle
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
                //MainScreen(screen, navController)
                //OnBoarding()


            }
            // MainScreen()
        }

    }
}

@Composable
fun MainScreen(screen: String, navController: NavHostController) {




    YoungCarersTheme {

        Scaffold(
            bottomBar = { if(currentDestination(navController = navController) != "onboarding_route")  BottomNavigationBar(navController) }
        )
        {
            Navigation(navController = navController, startDestination = screen)
        }
    }
}
@Composable
fun HomeScreen() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "HOME",
            fontSize = MaterialTheme.typography.h4.fontSize
        )
    }
}
@Composable
fun BotActionButton(navController: NavHostController,) {

    Box(
        contentAlignment = Alignment.BottomEnd,

        modifier = Modifier
            .padding(start = 120.dp, top = 15.dp) // .padding(start = 135.dp, top = 8.dp)
            .size(80.dp)
            .clip(CircleShape)
            .background(Color.Transparent)


    ) {
        repeat(5) {

                ShimmerAnimation(navController)


        }
      /*Button(
            onClick = {},
            shape = CircleShape,
            modifier = Modifier
                .align(Alignment.CenterEnd)
                .size(80.dp),
        ) {
            Icon(painter = painterResource(id= R.drawable.bot_icon_big), contentDescription = null)
        }*/
    }
}


@Composable
fun currentDestination(navController: NavController): String? {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    return navBackStackEntry?.destination?.route
}




/*
@Composable
fun MainScreen() {

    val navController = rememberNavController()

    YoungCarersTheme {


        Scaffold(
            bottomBar = { BottomNavigationBar(navController) }
        )
        {
            Navigation(navController = navController)
        }
    }
}


@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    MainScreen()
}
*/

@OptIn(ExperimentalPagerApi::class)
@Composable
fun ShimmerItem(
    brush: Brush, navController: NavHostController
) {

            Button(
                onClick = {
                    navController.navigate(NavigationItem.Bot.route)

                },
                colors = ButtonDefaults.buttonColors(backgroundColor = Color.Transparent),
                shape = CircleShape,//RoundedCornerShape(50),
                modifier = Modifier
                    .background(brush = brush) //.align(Alignment.CenterEnd)
                    .fillMaxSize(),
                border= BorderStroke(5.dp, colorDarkRed),
               contentPadding = PaddingValues(0.dp),

            ) {
                Icon(
                    painter = painterResource(id = R.drawable.ic_bot_icon),
                    contentDescription = null,
                    modifier = Modifier.size(60.dp),
                    tint = Color.Unspecified
                )
            }



}

@Composable
fun ShimmerAnimation(navController: NavHostController,
) {

    /*
    Create InfiniteTransition
    which holds child animation like [Transition]
    animations start running as soon as they enter
    the composition and do not stop unless they are removed
    */
    val transition = rememberInfiniteTransition()
    val translateAnim by transition.animateFloat(
        /*
        Specify animation positions,
        initial Values 0F means it
        starts from 0 position
        */
        initialValue = 0f,
        targetValue = 1000f,
        animationSpec = infiniteRepeatable(


            // Tween Animates between values over specified [durationMillis]
            tween(durationMillis = 1200, easing = FastOutSlowInEasing),
            RepeatMode.Reverse
        )
    )
    val rotateAnimation by transition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(
                durationMillis = 360,
                easing = LinearEasing
            )
        )
    )
    /*
    Create a gradient using the list of colors
    */
    val brush = Brush.linearGradient(
        colors = ShimmerColorShades,
        start = Offset(10f, 10f), // top left corner
        end = Offset(translateAnim, translateAnim)


    )

    ShimmerItem(brush = brush, navController)

   CircularProgressIndicator(
        modifier = Modifier
            .size(size = 80.dp)
            .rotate(degrees = rotateAnimation)
            .border(
                width = 4.dp,
                brush = Brush.sweepGradient(ShimmerColorShades),
                shape = CircleShape
            ),
        progress = 1f,
        strokeWidth = 1.dp,
        color = Color.Transparent // Set background color
    )
}

@HiltAndroidApp
class MyApplication: Application()
