package at.sozialministerium.youngcarers

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.cards.InsightsCard
import at.sozialministerium.youngcarers.data.api.models.Insight
import at.sozialministerium.youngcarers.screens.help.HelpScreenViewModel
import org.koin.androidx.compose.getViewModel

/**
 * @param navigateToDetail navController with given int index
 * Generate the help screen page with title, body and insights detail cards in list form
 */

@Composable
fun HelpScreen(
    navigateToDetail: (questionIndex: Int) -> Unit,
    navController: NavHostController
) {


    val viewModel = getViewModel<HelpScreenViewModel>()
    val insights: List<Insight> by viewModel.insights.collectAsState(initial = emptyList())


    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(id = R.color.yc_background))
            .verticalScroll(rememberScrollState())
            .padding(bottom = 80.dp)
            .testTag("helpScreen")

    ) {
        Text(
            stringResource(id = R.string.help_title),
            color = colorResource(id = R.color.yc_red_dark),
            fontSize = 35.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(start = 20.dp, top = 60.dp)
        )//TODO: txt from api
        Text(
            stringResource(R.string.help_body),
            modifier = Modifier.padding(
                start = 20.dp,
                top = 10.dp,
                end = 20.dp,
                bottom = 10.dp
            )
        )//TODO: txt from api
        /*insights.forEachIndexed { index, item ->
            InsightsDetailCard(
                header = item.question,//part.question,
                description = "",//item.text,//con.reference.title,
                image = "help", //item.reference.previewImageUrl,//"help",//part.reference.previewImageUrl,//content.reference.previewImageUrl,
                navController = navController,
                url = "null",
                index = index
            )
        }*/
        insights.forEachIndexed { index, item ->
                InsightsCard(data = item, navController = navController, index = index)
            }

        }
    }

/*
@Preview(showBackground = true)
@Composable
fun HelpScreenPreview() {
    HelpScreen(
        getHelpList()
    )
}
 */