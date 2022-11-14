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
@Composable
fun OnBoarding(
    navController: NavController,
    onboardingDataModel: OnboardingDataModel = hiltViewModel()
) {
    val viewModel = getViewModel<AboutViewModel>()
    val metadata: List<Metadata> by viewModel.metadata.collectAsState(initial = emptyList())
    val pageCount = 3
    val scope = rememberCoroutineScope()
    val pageState = rememberPagerState()

    Column(modifier = Modifier.fillMaxSize()) {
        TopSection(
            onBackClick = {
                if (pageState.currentPage + 1 > 1) scope.launch {
                    pageState.scrollToPage(pageState.currentPage - 1)
                }
            }
        )
        if (metadata.isEmpty()) {
            CircularProgressIndicator(color = colorResource(id = R.color.yc_red_dark))
        } else {
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
                    //TOdo entfernen des leeren strings
                    0 -> OnBoardingItem(
                        title = "",
                        content = hello.content,
                        image = R.drawable.logo
                    )
                    1 -> OnBoardingItem(
                        title = "",
                        content = info.content,
                        image = R.drawable.webbilder
                    )
                    2 -> OnBoardingItem(
                        title = "",
                        content = feedback.content,
                        image = R.drawable.question
                    )
                }
            }
        }
        BottomSection(
            size = pageCount, index = pageState.currentPage
        ) {
            if (pageState.currentPage + 1 < pageCount) scope.launch {
                pageState.scrollToPage(pageState.currentPage + 1)
            } else {
                onboardingDataModel.saveOnBoardingState(completed = true)
                navController.popBackStack()
                navController.navigate(NavigationItem.Help.route)
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
                contentDescription = "back OnBoarding"
            )
        }
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

        val buttonText = if (size == index + 1) "   Informiere dich   " else "   Weiter   "

        FloatingActionButton(
            onClick = onNextClick,
            contentColor = Color.White,
            modifier = Modifier
                .align(Alignment.CenterEnd)
                .clip(RoundedCornerShape(15.dp, 15.dp, 15.dp, 15.dp)),
            backgroundColor = colorResource(id = R.color.yc_red_dark)
        ) {
            Text(text = buttonText)
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
fun OnBoardingItem(
    title: String,
    content: String,
    image: Int
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier.fillMaxSize()
    ) {
        Image(
            painter = painterResource(id = image),
            contentDescription = "Image1",
            modifier = Modifier.padding(start = 50.dp, end = 50.dp)
        )
        Spacer(modifier = Modifier.height(25.dp))
        MarkdownText(
            markdown = title,
            color = MaterialTheme.colors.onBackground,
            textAlign = TextAlign.Center,
        )

        Spacer(modifier = Modifier.height(8.dp))

        MarkdownText(
            markdown = content,
            color = MaterialTheme.colors.onBackground,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(10.dp),
        )
    }
}
