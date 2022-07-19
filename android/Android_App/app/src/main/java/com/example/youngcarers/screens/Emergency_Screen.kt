package com.example.youngcarers

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.youngcarers.core.*
import com.example.youngcarers.cards.AbcDetailSideCard
import com.example.youngcarers.cards.EmergencyNumberCard
import com.example.youngcarers.cards.InsightsDetailCard
import com.example.youngcarers.ui.theme.*

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun Emergency_Screen(emgList: List<Emergency>, telList: List<Tel>, navController: NavHostController) {

    Scaffold(
        backgroundColor = colorBackground,
        modifier = Modifier.padding(bottom = 55.dp)
    ) {
        LazyColumn(
            Modifier.fillMaxWidth(),
            contentPadding = PaddingValues(16.dp)

        ) {
            item {

                Text(
                    "Im Notfall",
                    color = colorDarkRed,//colorResource(id = R.color.yc_red_dark),
                    fontSize = 35.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(start = 20.dp, top = 60.dp)
                )
                Text(
                    "Hier findest du die wichtigstn Dinge bei einem Notfall. Schnelle Hilfe und wichtige Kontakte.",
                    modifier = Modifier.padding(
                        start = 20.dp,
                        top = 10.dp,
                        end = 20.dp,
                        bottom = 10.dp
                    )
                )
                Text(
                    "Wenns mal wirklich schnell gehen muss. Die wichtigsten Rufnummern:",
                    modifier = Modifier
                        .padding(
                            top = 40.dp,
                            start = 40.dp,
                            end = 40.dp
                        )
                )



            Column(modifier = Modifier
                .fillMaxWidth()) {
                for (numbers in getTelList()){
                    EmergencyNumberCard(header = numbers.header)
                }
            }
            }

            item {
                Text(
                    "Zur Vorbereitung",
                    modifier = Modifier
                        .padding(
                            top = 20.dp,
                            start = 20.dp,
                            end = 40.dp
                        )
                )
            }
            items(emgList) { emg ->
                InsightsDetailCard(emg.header, emg.description, emg.imageRes,navController, "https://www.linz.at/notfall.php")
                //TODO: add url from api
            }

        }
    }
}

@Preview(showBackground = true)
@Composable
fun EmergencyScreenPreview() {
    Emergency_Screen(
        getEmergencyList(),
        getTelList(),
        navController = NavHostController(context = LocalContext.current)
    )
}




