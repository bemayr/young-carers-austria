package at.sozialministerium.youngcarers

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
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
import at.sozialministerium.youngcarers.cards.AbcDetailCard
import at.sozialministerium.youngcarers.data.api.models.Abc
import at.sozialministerium.youngcarers.screens.abc.AbcViewModel
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


    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorResource(id = R.color.yc_background))
            .verticalScroll(rememberScrollState())
            .padding(bottom = 80.dp)
            .testTag("abcScreen")
    ) {
        Text(
            stringResource(R.string.abc_title),
            color =  colorResource(id = R.color.yc_red_dark),
            fontSize = 35.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(start = 20.dp, top = 60.dp)
        )//TODO: backend api

        Text(
            stringResource(R.string.abc_body),
            modifier = Modifier.padding(start = 20.dp, top = 10.dp, end = 40.dp, bottom = 20.dp)
        )//TODO: backend api

        articles.forEach { article ->
            AbcDetailCard(data = article, onClick = navigateToDetail)
        }
    }

}


