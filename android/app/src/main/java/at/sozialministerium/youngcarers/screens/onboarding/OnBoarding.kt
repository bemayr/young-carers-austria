package at.sozialministerium.youngcarers.screens.onboarding
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.KeyboardArrowLeft
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import at.sozialministerium.youngcarers.MarkdownText
import at.sozialministerium.youngcarers.NavigationItem
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.data.api.models.Metadata
import at.sozialministerium.youngcarers.screens.about.AboutViewModel
import com.google.accompanist.pager.ExperimentalPagerApi
import com.google.accompanist.pager.HorizontalPager
import com.google.accompanist.pager.rememberPagerState
import kotlinx.coroutines.launch
import org.koin.androidx.compose.getViewModel


@ExperimentalPagerApi
//@Preview
@Composable
fun OnBoarding(navController: NavController, onboardingDataModel: OnboardingDataModel = hiltViewModel()) {


    val viewModel = getViewModel<AboutViewModel>()
    val metadata: List<Metadata> by viewModel.metadata.collectAsState(initial = emptyList())

    var pageCount = 3

    val scope = rememberCoroutineScope()
    val pageState = rememberPagerState()


    Column(modifier = Modifier.fillMaxSize()) {
        TopSection(
            onBackClick = {
                if (pageState.currentPage + 1 > 1) scope.launch {
                    pageState.scrollToPage(pageState.currentPage - 1)
                }
            }
            /*onSkipClick = {
                if (pageState.currentPage + 1 < items.size) scope.launch {
                    pageState.scrollToPage(items.size - 1)
                }
            }*/
        )
        if(metadata.isEmpty()){
            Text(text = "loading...")
        }else{
            val hello = metadata.first { part ->
                part.key == "welcome-hello"
            }
            val info = metadata.first { part ->
                part.key == "welcome-info"
            }
            val feedback = metadata.first { part ->
                part.key == "welcome-feedback"
            }

            HorizontalPager(
                count = pageCount,
                state = pageState,
                modifier = Modifier
                    .fillMaxHeight(0.9f)
                    .fillMaxWidth()
            ) { page ->
                when (page) {
                    0 -> OnBoardingItem(title = hello.title, content = hello.content, image = R.drawable.logo)
                    1 -> OnBoardingItem(title = info.title, content = info.content, image = R.drawable.webbilder)
                    2 -> OnBoardingItem(title = feedback.title, content = feedback.content, image = R.drawable.question)

                }

            }

        }

        BottomSection(size = pageCount, index = pageState.currentPage
        ) {
            if (pageState.currentPage + 1 < pageCount) scope.launch {
                pageState.scrollToPage(pageState.currentPage + 1)
            } else {
                    onboardingDataModel.saveOnBoardingState(completed = true)
                    navController.popBackStack()
                    //navController.navigate(skipTo)
                    navController.navigate(NavigationItem.Help.route)
                    //navController.navigate(Welcome.Home.route)



            }



        }
    }
}

@ExperimentalPagerApi
@Composable
fun TopSection(onBackClick: () -> Unit = {}, onSkipClick: () -> Unit = {}) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(12.dp)
    ) {
        // Back button
        IconButton(onClick = onBackClick, modifier = Modifier.align(Alignment.CenterStart)) {
            Icon(
                imageVector = Icons.Outlined.KeyboardArrowLeft,
                tint = colorResource(id = R.color.yc_red_dark),
                modifier = Modifier.size(40.dp),
                contentDescription = "back OnBoarding")
        }

       /* // Skip Button
        TextButton(
            onClick = onSkipClick,
            modifier = Modifier.align(Alignment.CenterEnd),
            contentPadding = PaddingValues(0.dp)
        ) {
            Text(text = "Skip", color = MaterialTheme.colors.onBackground)
        }*/
    }
}


@Composable
fun BottomSection(size: Int, index: Int, onNextClick: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(12.dp)
    ) {
        // Indicators
        Indicators(size, index)

        // FAB Next
        /* FloatingActionButton(
             onClick = onButtonClick,
            // backgroundColor = MaterialTheme.colorScheme.primary,
            // contentColor = MaterialTheme.colorScheme.onPrimary,
             modifier = Modifier.align(Alignment.CenterEnd)
         ) {
             Icon(imageVector = Icons.Outlined.KeyboardArrowRight, contentDescription = "Next")
         }*/

        val buttontext = if (size == index + 1) "start" else "next"


        FloatingActionButton(
            onClick =  onNextClick ,
            contentColor = Color.White,

            modifier = Modifier
                .align(Alignment.CenterEnd)
                .clip(RoundedCornerShape(15.dp, 15.dp, 15.dp, 15.dp)),
            backgroundColor = colorResource(id = R.color.yc_red_dark)
        ) {
            //Icon(Icons.Outlined.KeyboardArrowRight, tint = Color.White, contentDescription = "Localized description")
            //Icon(Icons.Outlined.KeyboardArrowRight, contentDescription = "next")
            Text(text = buttontext)
        }

    }
}

@Composable
fun BoxScope.Indicators(size: Int, index: Int) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        modifier = Modifier.align(Alignment.CenterStart)
    ) {
        repeat(size) {
            Indicator(isSelected = it == index)
        }
    }
}

@Composable
fun Indicator(isSelected: Boolean) {
    val width = animateDpAsState(
        targetValue = if (isSelected) 25.dp else 10.dp,
        animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy)
    )

    Box(
        modifier = Modifier
            .height(10.dp)
            .width(width.value)
            .clip(CircleShape)
            .background(
                color = if (isSelected) colorResource(id = R.color.yc_red_dark) else Color(
                    0XFFF8E2E7
                )
            )
    ) {

    }
}


@Composable
fun OnBoardingItem(title: String, content: String,image: Int) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier.fillMaxSize()
    ) {
        Image(
            painter = painterResource(id =image),
            contentDescription = "Image1",
            modifier = Modifier.padding(start = 50.dp, end = 50.dp)
        )

        Spacer(modifier = Modifier.height(25.dp))

        MarkdownText(
            markdown = title,

            // fontSize = 24.sp,
            color = MaterialTheme.colors.onBackground,
            //fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            //letterSpacing = 1.sp,
        )
        Spacer(modifier = Modifier.height(8.dp))

        MarkdownText(
            markdown = content,
            color = MaterialTheme.colors.onBackground,
            //fontWeight = FontWeight.Light,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(10.dp),
            //letterSpacing = 1.sp,
        )
    }
}



/*
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.*
import at.sozialministerium.youngcarers.data.api.models.OnBoardingPage
import com.google.accompanist.pager.*

@OptIn(ExperimentalAnimationApi::class)
@ExperimentalPagerApi
@Composable

fun OnBoarding(navController: NavHostController,welcomeViewModel: OnBoardingViewModel = hiltViewModel()) {
    val pages = listOf(
        OnBoardingPage.First,
        OnBoardingPage.Second,
        OnBoardingPage.Third
    )
    val pagerState = rememberPagerState()

    Column(modifier = Modifier.fillMaxSize()) {
        HorizontalPager(
            modifier = Modifier.weight(10f),
            count = 3,
            state = pagerState,
            verticalAlignment = Alignment.Top
        ) { position ->
            PagerScreen(onBoardingPage = pages[position])
        }
        HorizontalPagerIndicator(
            modifier = Modifier
                .align(Alignment.CenterHorizontally)
                .weight(1f),
            pagerState = pagerState
        )
        FinishButton(
            modifier = Modifier.weight(1f),
            pagerState = pagerState
        ) {
            welcomeViewModel.saveOnBoardingState(completed = true)
            navController.popBackStack()
            navController.navigate(NavigationItem.Help.route)
        }
    }
}

@Composable
fun PagerScreen(onBoardingPage: OnBoardingPage) {
    Column(
        modifier = Modifier
            .fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {
        Image(
            modifier = Modifier
                .fillMaxWidth(0.5f)
                .fillMaxHeight(0.7f),
            painter = painterResource(id = onBoardingPage.image),
            contentDescription = "Pager Image"
        )
        Text(
            modifier = Modifier
                .fillMaxWidth(),
            text = onBoardingPage.title,
            fontSize = MaterialTheme.typography.h4.fontSize,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center
        )
        Text(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 40.dp)
                .padding(top = 20.dp),
            text = onBoardingPage.description,
            fontSize = MaterialTheme.typography.subtitle1.fontSize,
            fontWeight = FontWeight.Medium,
            textAlign = TextAlign.Center
        )
    }
}

@ExperimentalAnimationApi
@ExperimentalPagerApi
@Composable
fun FinishButton(
    modifier: Modifier,
    pagerState: PagerState,
    onClick: () -> Unit
) {
    Row(
        modifier = modifier
            .padding(horizontal = 40.dp),
        verticalAlignment = Alignment.Top,
        horizontalArrangement = Arrangement.Center
    ) {
        AnimatedVisibility(
            modifier = Modifier.fillMaxWidth(),
            visible = pagerState.currentPage == 2
        ) {
            Button(
                onClick = onClick,
                colors = ButtonDefaults.buttonColors(
                    contentColor = Color.White
                )
            ) {
                Text(text = "Finish")
            }
        }
    }
}

@Composable
@Preview(showBackground = true)
fun FirstOnBoardingScreenPreview() {
    Column(modifier = Modifier.fillMaxSize()) {
        PagerScreen(onBoardingPage = OnBoardingPage.First)
    }
}

@Composable
@Preview(showBackground = true)
fun SecondOnBoardingScreenPreview() {
    Column(modifier = Modifier.fillMaxSize()) {
        PagerScreen(onBoardingPage = OnBoardingPage.Second)
    }
}

@Composable
@Preview(showBackground = true)
fun ThirdOnBoardingScreenPreview() {
    Column(modifier = Modifier.fillMaxSize()) {
        PagerScreen(onBoardingPage = OnBoardingPage.Third)
    }
}

 */