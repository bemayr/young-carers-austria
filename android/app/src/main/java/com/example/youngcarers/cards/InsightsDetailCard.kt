package com.example.youngcarers.cards

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import coil.compose.rememberAsyncImagePainter
import com.example.youngcarers.NavRoutes
import com.example.youngcarers.R
import com.example.youngcarers.data.api.models.Abc
import com.example.youngcarers.data.api.models.Insight

/**
 * @param header header of the detail card
 * @param description description of the detail card
 * @param image image for the detail card
 * @param onClick onClick listener with given string
 * @param url Url for the link, when clicking on the card
 * Here the cards for the insights detail screen are created
 */

@OptIn(ExperimentalMaterialApi::class)
@Composable

fun InsightsDetailCard(
    header: String,
    description: String,
    image: String,
    navController: NavHostController,
    url: String,
    index: Int
) {

    val uriHandler = LocalUriHandler.current



    Card(
        modifier = Modifier
            .padding(10.dp)
            .fillMaxWidth()
            .wrapContentHeight()
            .clip(RoundedCornerShape(15.dp))
            .testTag("insightsCard"),
        onClick = {
            if (url != "null") {
                uriHandler.openUri(url)
            } else {
                navController.navigate(NavRoutes.InsightsDetail.route + "/$index")
            }
        },
        shape = MaterialTheme.shapes.medium,
        elevation = 5.dp,
        backgroundColor = MaterialTheme.colors.surface

    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {

            Row(
                Modifier.padding(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                if(image != "help"){
                    Image(

                        painter = rememberAsyncImagePainter(image),
                        contentDescription = null,
                        modifier = Modifier
                            .size(width = 120.dp, height = 80.dp)
                            .padding(8.dp)
                            .clip(RoundedCornerShape(15.dp)),
                        contentScale = ContentScale.Fit,

                        )
                }
                else
                {
                    Image(

                        painter = painterResource(id = R.drawable.question),
                        contentDescription = null,
                        modifier = Modifier
                            .size(width = 120.dp, height = 80.dp)
                            .padding(8.dp)
                            .clip(RoundedCornerShape(15.dp)),
                        contentScale = ContentScale.Fit,

                        )
                }

                Text(
                    text = header,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier
                        .padding(8.dp)
                        .fillMaxWidth(),
                    )
            }
            Text(
                text = description,
                style = MaterialTheme.typography.body2,
                modifier = Modifier.padding(start = 30.dp, bottom = 15.dp, end = 30.dp)
            )
        }
    }
}

@Preview
@Composable
fun InsightDetailCardPreview() {
    InsightsDetailCard(
        header = "Header",
        description = "Description",
        image = "",
        url = "www.google.com",
        navController = rememberNavController(navigators = emptyArray()),
        index = 0
    )
}

