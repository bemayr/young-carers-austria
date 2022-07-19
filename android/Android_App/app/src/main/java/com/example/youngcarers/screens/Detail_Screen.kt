package com.example.youngcarers.screens

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.youngcarers.R

import com.example.youngcarers.core.*
import com.example.youngcarers.data.api.models.Abc
import com.example.youngcarers.cards.AbcDetailSideCard
import com.example.youngcarers.ui.theme.*


@OptIn(ExperimentalMaterialApi::class)
@Composable
fun Detail_Screen(navController: NavHostController, viewTitle: String?, content: List<Abc>) {
    val text = remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    //*Error without txt ?*//
                    ""
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
        LazyColumn(
            Modifier.fillMaxWidth(),
            contentPadding = PaddingValues(16.dp),


        ) {
            item {

                content.forEach { part ->
                    //Todo error handling
                    if (part.name == viewTitle) {



                if (viewTitle != null) {
                    Text(
                        "$viewTitle",
                        color = colorDarkRed,//colorResource(id = R.color.yc_red_dark),
                        fontSize = 35.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(start = 20.dp, top = 60.dp)
                    )
                }else{
                    Text(
                        helpHeaderTxt,
                        color = colorDarkRed,//colorResource(id = R.color.yc_red_dark),
                        fontSize = 35.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(start = 20.dp, top = 60.dp)
                    )
                }

                Text(
                    part.information,
                    modifier = Modifier.padding(
                        start = 20.dp,
                        top = 10.dp,
                        end = 20.dp,
                        bottom = 10.dp
                    )
                )

                    part.entries.forEach { entry ->

                        Text(
                            text = entry.ownerName,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
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
                                AbcDetailSideCard(ref.title, ref.description, detail.imageRes, ref.url)
                            }//TODO: image
                        }


                }

            }}
            }
        }
    }
}


@Preview(showBackground = true)
@Composable
fun DetailScreenPreview() {
/* Detail_Screen(
     navController = NavHostController(context = LocalContext.current),
     viewTitle = "D"
 )*/
}