package at.sozialministerium.youngcarers.screens.help

import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.MarkdownText
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.cards.ExpandedFaqsCard
import at.sozialministerium.youngcarers.cards.InsightsCard
import at.sozialministerium.youngcarers.data.api.models.Faq
import at.sozialministerium.youngcarers.data.api.models.Insight
import org.intellij.lang.annotations.JdkConstants
import org.koin.androidx.compose.getViewModel

/**
 * @param navigateToDetail navController with given int index
 * Generate the help screen page with title, body and insights detail cards in list form
 */

@OptIn(ExperimentalAnimationApi::class, androidx.compose.material.ExperimentalMaterialApi::class)
@Composable
fun HelpScreen(
    navigateToDetail: (questionIndex: Int) -> Unit,
    navController: NavHostController
) {
    val viewModel = getViewModel<HelpScreenViewModel>()
    val insights: List<Insight> by viewModel.insights.collectAsState(initial = emptyList())
    val faqs: List<Faq> by viewModel.faqs.collectAsState(initial = emptyList())
    val description: String by viewModel.description.collectAsState(initial = "")
    val title: String by viewModel.title.collectAsState(initial = "")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(id = R.color.yc_background))
            .verticalScroll(rememberScrollState())
            .padding(bottom = 140.dp)
            .testTag("helpScreen")
    ) {
        if (insights.isEmpty() || faqs.isEmpty() || description.isEmpty() || title.isEmpty()) {
            CircularProgressIndicator(color = colorResource(id = R.color.yc_red_dark))
        } else {
            Text(
                text = title,
                color = colorResource(id = R.color.yc_red_dark),
                fontSize = 35.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(start = 20.dp, top = 60.dp)
            )
            MarkdownText(
                markdown = description,
                modifier = Modifier.padding(
                    start = 20.dp,
                    top = 10.dp,
                    end = 20.dp,
                    bottom = 10.dp
                )
            )
            insights.forEachIndexed { index, item ->
                InsightsCard(data = item, navController = navController, index = index)
            }
            Text(
                "Häufig gestellte Fragen",
                color = colorResource(id = R.color.yc_red_dark),
                fontSize = 25.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .align(Alignment.CenterHorizontally)
                    .padding(top = 20.dp, bottom = 15.dp)
            )
            faqs.forEach { items ->
                ExpandedFaqsCard(data = items)
            }
        }
    }
}

