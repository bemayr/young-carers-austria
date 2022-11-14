package at.sozialministerium.youngcarers.screens.emergency

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.text.ClickableText
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.MarkdownText
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.cards.CategoryDetailCard
import at.sozialministerium.youngcarers.cards.EmergencyNumberCard
import at.sozialministerium.youngcarers.cards.InsightsDetailCard
import at.sozialministerium.youngcarers.data.api.models.Content
import at.sozialministerium.youngcarers.data.api.models.Number
import org.koin.androidx.compose.getViewModel

/**
 * @param navController navController to another page
 * Generate the emergency page with title, body, phone number cards and insights detail cards
 */

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun EmergencyScreen(
    navController: NavHostController
) {
    val viewModel = getViewModel<EmergencyViewModel>()
    val uriHandler = LocalUriHandler.current
    val numbers: List<Number> by viewModel.numbers.collectAsState(initial = emptyList())
    val content: List<Content> by viewModel.content.collectAsState(initial = emptyList())
    val description: String by viewModel.description.collectAsState(initial = "")
    val title: String by viewModel.title.collectAsState(initial = "")

    Scaffold(
        backgroundColor = colorResource(id = R.color.yc_background),
        modifier = Modifier.padding(bottom = 55.dp)
    ) {
        LazyColumn(
            Modifier.fillMaxWidth(),
            contentPadding = PaddingValues(bottom = 124.dp)
        ) {
            item {
                if (numbers.isEmpty() || content.isEmpty() || description.isEmpty() || title.isEmpty()) {
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
                    numbers.forEach { num ->
                        EmergencyNumberCard(name = num.label, number = num.number)
                    }

                    val annotatedLinkString: AnnotatedString = buildAnnotatedString {
                        val str =
                            "Mehr Info zu den Notrufnummern findest du auf www.oesterreich.gv.at."
                        append(str)
                        addStyle(
                            style = SpanStyle(
                                color = Color(0xFF700009),
                                fontSize = 14.sp,
                            ), start = 0, end = str.length
                        )
                        addStringAnnotation(
                            tag = "URL",
                            annotation = "https://www.oesterreich.gv.at",
                            start = 0,
                            end = str.length
                        )
                    }
                    ClickableText(
                        modifier = Modifier
                            .padding(all = 16.dp)
                            .fillMaxWidth(),
                        text = annotatedLinkString,
                        onClick = {
                            annotatedLinkString
                                .getStringAnnotations("URL", it, it)
                                .firstOrNull()?.let { stringAnnotation ->
                                    uriHandler.openUri(stringAnnotation.item)
                                }
                        }
                    )
                    // render parts based on their type
                    if (content != null) {
                        content.forEach { part ->
                            when (part.type) {
                                "text" -> MarkdownText(
                                    markdown = part.text,
                                    modifier = Modifier.padding(
                                        start = 20.dp,
                                        top = 10.dp,
                                        end = 20.dp,
                                        bottom = 10.dp
                                    )
                                )
                                "reference" -> InsightsDetailCard(
                                    header = part.reference.title,
                                    description = part.reference.description,
                                    image = part.reference.previewImageUrl,
                                    navController,
                                    url = part.reference.url,
                                    index = 0
                                ) // Todo: Replace with real image URL once provided by the backend
                                "category" -> CategoryDetailCard(part.category, navController)
                                else -> throw IllegalArgumentException("part.type ${part.type} not allowed, please provide either text, reference or category")
                            }
                        }
                    }
                }
            }
        }
    }

}

