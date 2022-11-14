package at.sozialministerium.youngcarers.screens.abc

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import at.sozialministerium.youngcarers.MarkdownText
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.cards.AbcDetailCard
import at.sozialministerium.youngcarers.data.api.models.Abc
import org.koin.androidx.compose.getViewModel

/**
 * @param navigateToDetail navController with given string index
 * Generate the abc page with title, body and abc cards in list form
 */

@Composable
fun AbcScreen(
    navigateToDetail: (questionIndex: String) -> Unit
) {

    val viewModel = getViewModel<AbcViewModel>()
    val articles: List<Abc> by viewModel.articles.collectAsState(initial = emptyList())
    val description: String by viewModel.description.collectAsState(initial = "")
    val title: String by viewModel.title.collectAsState(initial = "")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(id = R.color.yc_background))
            .verticalScroll(rememberScrollState())
            .padding(bottom = 140.dp)
            .testTag("abcScreen")
    ) {
        if (articles.isEmpty() || description.isEmpty() || title.isEmpty()) {
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
                modifier = Modifier.padding(start = 20.dp, top = 10.dp, end = 40.dp, bottom = 20.dp)
            )
            articles.forEach { article ->
                AbcDetailCard(data = article, onClick = navigateToDetail)
            }
        }
    }
}


