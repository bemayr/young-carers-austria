package com.example.youngcarers.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.youngcarers.R
import com.example.youngcarers.data.api.models.Insight
import com.example.youngcarers.ui.theme.*
import com.example.youngcarers.cards.*

//ToDo: Insights get data dynamic in random order, text, reference,

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun Insights_Detail_Screen(navController: NavHostController, insight: Insight) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                        //*Error without txt ?*//
                        insight.question
                },
            navigationIcon = {
                IconButton(onClick = {
                    navController.navigateUp()//navigate(NavigationItem.Help.route)
                }) {
                    Icon(Icons.Filled.ArrowBack, "backIcon")
                }
            },
            backgroundColor = colorDarkRed,
        contentColor = Color.White,
        elevation = 10.dp
        ) },
        backgroundColor = colorBackground,
        modifier = Modifier.padding(bottom = 55.dp)
    ) {
        Column(modifier = Modifier
            .verticalScroll(rememberScrollState())) {

            Text(
                text = insight.question,
                color = colorDarkRed,//colorResource(id = R.color.yc_red_dark),
                fontSize = 25.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(start = 20.dp, top = 60.dp)
            )
            
            // render parts based on their type
            insight.content.forEach { part ->
                when (part.type) {
                    "text" -> Text(text = part.text,
                        modifier = Modifier.padding(
                        start = 20.dp,
                        top = 10.dp,
                        end = 20.dp,
                        bottom = 10.dp
                    ))
                    "reference" -> InsightsDetailCard(
                        header = part.reference.title,
                        description = part.reference.description,
                        image = R.drawable.picture,
                        navController,
                        url = part.reference.url
                    ) // Todo: Replace with real image URL once provided by the backend
                    "category" -> CategoryDetailCard(part.category, navController)
                    else -> throw IllegalArgumentException("part.type ${part.type} not allowed, please provide either text, reference or category")
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun InsightsDetailScreenPreview() {
    val insight: Insight = Insight(listOf(), "Ist das eine Frage?");

    Insights_Detail_Screen(
        navController = NavHostController(context = LocalContext.current),
        insight
    )

}
