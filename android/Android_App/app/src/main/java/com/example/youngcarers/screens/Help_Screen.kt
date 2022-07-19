package com.example.youngcarers

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.youngcarers.core.*
import com.example.youngcarers.data.api.models.Insight
import com.example.youngcarers.ui.theme.*
import com.example.youngcarers.cards.*


@Composable
fun Help_Screen(
    insights: List<Insight>,
    navigateToDetail: (questionIndex: Int) -> Unit,
    navController: NavHostController) {

    Scaffold(
        backgroundColor = colorBackground,
        modifier = Modifier.padding(bottom = 55.dp)
    ) {

        Column {
        /*Column {
            insights.forEachIndexed { index, insight ->
                Button(onClick = {
                    navigateToDetail(index)
                }) {
                    Text(text = insight.question)
                }
            }
        }*/

        val helpList = helps

        LazyColumn(
            Modifier.fillMaxWidth(),
            contentPadding = PaddingValues(16.dp)
        ) {
            item {

                Text(
                    helpHeaderTxt,
                    color = colorDarkRed,//colorResource(id = R.color.yc_red_dark),
                    fontSize = 35.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(start = 20.dp, top = 60.dp)
                )//TODO: txt from api
                Text(
                    helpBodyTxt,
                    modifier = Modifier.padding(
                        start = 20.dp,
                        top = 10.dp,
                        end = 20.dp,
                        bottom = 10.dp
                    )
                )//TODO: txt from api

            }
            items(helpList) { help ->
                InsightsDetailCard(header = help.header, description = help.description, image = help.imageRes , navController = navController, url = "null")
            }
           /* insights.forEach { part ->
                InsightsDetailCard(header = part.question, description = help.de, image = , navController = )
            }*/ //TODO when api is ready

            item {
                Text(
                    helpBodyBottom,
                    modifier = Modifier
                        .padding(
                            top = 40.dp,
                            start = 40.dp,
                            end = 40.dp
                        )
                )

                Icon(
                    imageVector = Icons.Filled.ArrowBack,
                    tint = colorDarkRed,
                    contentDescription = "ArrowToSymbol",
                    modifier = Modifier
                        .padding(start = 135.dp, top = 8.dp)
                        .rotate(-65.0F)
                        .size(50.dp)
                )
            }


        }
        }
    }
}
/*
@Preview(showBackground = true)
@Composable
fun HelpScreenPreview() {
    Help_Screen(
        getHelpList()
    )
}
 */