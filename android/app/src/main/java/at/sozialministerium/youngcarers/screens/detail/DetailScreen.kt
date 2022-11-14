package at.sozialministerium.youngcarers.screens.detail

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.MarkdownText
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.data.api.models.Abc
import at.sozialministerium.youngcarers.cards.AbcDetailSideCard
import at.sozialministerium.youngcarers.screens.detail.DetailViewModel
import org.koin.androidx.compose.getViewModel

/**
 * @param navController navController for navigation to another screen
 * @param viewTitle Given string of screen title
 * Generate the detail screen page with title, body and dynamic creation of the page given by the backend
 */

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun DetailScreen(
    navController: NavHostController,
    viewTitle: String?
) {
    val viewModel = getViewModel<DetailViewModel>()
    val articles: List<Abc> by viewModel.articles.collectAsState(initial = emptyList())

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    //*Error without txt ?*//
                },
                navigationIcon = {
                    IconButton(
                        onClick = {
                            navController.navigateUp()
                        }
                    )
                    {
                        Icon(Icons.Filled.ArrowBack, "backIcon")
                    }
                },
                backgroundColor = colorResource(id = R.color.yc_red_dark),
                contentColor = Color.White,
                elevation = 10.dp
            )
        },
        backgroundColor = colorResource(id = R.color.yc_background),
        modifier = Modifier.padding(bottom = 55.dp)
    ) {
        LazyColumn(
            Modifier.fillMaxWidth(),
            contentPadding = PaddingValues(16.dp),
        ) {
            if (articles.isEmpty()) {
                item {
                    CircularProgressIndicator(color = colorResource(id = R.color.yc_red_dark))
                }
            } else {
                item {
                    articles.forEach { part ->
                        if (part.name == viewTitle) {
                            if (viewTitle != null) {
                                Text(
                                    "$viewTitle",
                                    color = colorResource(id = R.color.yc_red_dark),
                                    fontSize = 35.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(start = 20.dp, top = 60.dp)
                                )
                            } else {
                                Text(
                                    stringResource(R.string.detail_title),
                                    color = colorResource(id = R.color.yc_red_dark),
                                    fontSize = 35.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(start = 20.dp, top = 60.dp)
                                )
                            }
                            MarkdownText(
                                markdown = part.information,
                                modifier = Modifier.padding(
                                    start = 20.dp,
                                    top = 10.dp,
                                    end = 20.dp,
                                    bottom = 10.dp
                                )
                            )
                            part.entries.forEach { entry ->
                                MarkdownText(
                                    markdown = entry.ownerName,
                                    fontSize = 15.sp,
                                    modifier = Modifier.padding(
                                        start = 20.dp,
                                        top = 10.dp,
                                        end = 20.dp,
                                        bottom = 10.dp
                                    )
                                )
                                Row(
                                    modifier = Modifier
                                        .horizontalScroll(rememberScrollState())
                                        .fillMaxWidth()
                                ) {
                                    entry.references.forEach { ref ->
                                        AbcDetailSideCard(
                                            ref.title,
                                            ref.description,
                                            ref.previewImageUrl,
                                            ref.url,
                                            ref.isPaidContent
                                        )
                                    }
                                }
                            }
                        }
                    }
                    Spacer(modifier = Modifier.padding(bottom = 55.dp))
                }

            }
        }
    }
}


@Preview(showBackground = true)
@Composable
fun DetailScreenPreview() {

}