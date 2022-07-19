package com.example.youngcarers.cards

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.youngcarers.NavRoutes
import com.example.youngcarers.R


@OptIn(ExperimentalMaterialApi::class)
@Composable
fun InsightsDetailCard(header: String, description: String, image: Int, navController: NavHostController, url: String) {

    val uriHandler = LocalUriHandler.current

    Card(
        modifier = Modifier
            .padding(10.dp)
            .fillMaxWidth()
            .wrapContentHeight()
            .clip(RoundedCornerShape(15.dp)),
        onClick = {
            if (url != "null"){
                uriHandler.openUri(url)
            }else{
                navController.navigate(NavRoutes.InsightsDetail.route + "/0")
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
                Image(
                    painter = painterResource(id = R.drawable.picture),
                    contentDescription = null,
                    modifier = Modifier
                        .size(width = 120.dp, height = 80.dp)
                        .padding(8.dp)
                        .clip(RoundedCornerShape(15.dp)),
                    contentScale = ContentScale.Fit,

                    )
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