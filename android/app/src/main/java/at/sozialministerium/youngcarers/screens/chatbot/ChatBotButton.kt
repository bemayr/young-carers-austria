package at.sozialministerium.youngcarers.screens.chatbot

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
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.NavigationItem
import at.sozialministerium.youngcarers.ui.theme.ShimmerColorShades
import com.google.accompanist.pager.ExperimentalPagerApi

@Composable
fun BotActionButton(navController: NavHostController,) {

    Box(
        //contentAlignment = Alignment.BottomEnd,

        modifier = Modifier
            //.padding(start = 100.dp, end = 100.dp, bottom = 10.dp) // .padding(start = 135.dp, top = 8.dp)
            // .size(80.dp)
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

@OptIn(ExperimentalPagerApi::class)
@Composable
fun ShimmerItem(
    brush: Brush, navController: NavHostController
) {
// Column composable containing spacer shaped like a rectangle,
// set the [background]'s [brush] with the brush receiving from [ShimmerAnimation]
// Composable which is the Animation you are gonna create.
    /*Column(modifier = Modifier.padding(16.dp)) {
           Spacer(
               modifier = Modifier
                   .fillMaxWidth()
                   .size(250.dp)
                   .background(brush = brush)
           )
           Spacer(
               modifier = Modifier
                   .fillMaxWidth()
                   .height(30.dp)
                   .padding(vertical = 8.dp)
                   .background(brush = brush)
           )
       }*/


    Button(
        onClick = {
            navController.navigate(NavigationItem.Bot.route)

        },
        colors = ButtonDefaults.buttonColors(backgroundColor = Color.Transparent),
        shape = CircleShape,//RoundedCornerShape(50),
        modifier = Modifier
            .background(brush = brush) //.align(Alignment.CenterEnd)

        //.fillMaxSize(),
        ,
        //border= BorderStroke(5.dp, colorDarkRed),
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
    Use Linear Gradient for animating in any direction according to requirement
    start=specifies the position to start with in cartesian like system Offset(10f,10f) means x(10,0) , y(0,10)
    end = Animate the end position to give the shimmer effect using the transition created above
    */
    val brush = Brush.linearGradient(
        colors = ShimmerColorShades,
        start = Offset(10f, 10f), // top left corner
        end = Offset(translateAnim, translateAnim)


    )

    ShimmerItem(brush = brush, navController)

    /*CircularProgressIndicator(
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
    )*/
}

@Preview(showBackground = true)
@Composable
fun BotActionButtonPreview() {

    BotActionButton(
        navController = NavHostController(context = LocalContext.current),

        )

}
