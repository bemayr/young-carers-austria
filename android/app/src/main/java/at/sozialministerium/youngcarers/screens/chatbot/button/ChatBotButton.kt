package at.sozialministerium.youngcarers.screens.chatbot.button

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.ui.theme.ShimmerColorShades
import  at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.Welcome
import com.google.accompanist.pager.ExperimentalPagerApi

@Composable
fun BotActionButton(navController: NavHostController) {

    Box(
        modifier = Modifier
            .clip(CircleShape)
            .background(Color.Transparent)
    ) {
        repeat(5) {
            ShimmerAnimation(navController)
        }
    }
}

@OptIn(ExperimentalPagerApi::class)
@Composable
fun ShimmerItem(
    brush: Brush,
    navController: NavHostController
) {
    Button(
        onClick = {
            navController.navigate(Welcome.Bot.route)
        },
        colors = ButtonDefaults.buttonColors(backgroundColor = Color.Transparent),
        shape = CircleShape,
        modifier = Modifier
            .background(brush = brush),
        contentPadding = PaddingValues(0.dp),
    ) {
        Icon(
            painter = painterResource(id = R.drawable.ic_bot_icon),
            contentDescription = null,
            modifier = Modifier.size(60.dp),
            tint = Color.White
        )
    }
}

@Composable
fun ShimmerAnimation(
    navController: NavHostController,
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
    /*
    Create a gradient using the list of colors
    Use Linear Gradient for animating in any direction according to requirement
    start=specifies the position to start with in cartesian like system Offset(10f,10f) means x(10,0) , y(0,10)
    end = Animate the end position to give the shimmer effect using the transition created above
    */
    val brush = Brush.linearGradient(
        colors = ShimmerColorShades,
        start = Offset(10f, 10f),
        end = Offset(translateAnim, translateAnim)
    )

    ShimmerItem(brush = brush, navController)

}

@Preview(showBackground = true)
@Composable
fun BotActionButtonPreview() {
    BotActionButton(
        navController = NavHostController(context = LocalContext.current)
    )
}