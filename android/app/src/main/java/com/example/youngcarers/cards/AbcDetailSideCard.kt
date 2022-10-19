package com.example.youngcarers.cards

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.rememberAsyncImagePainter

/**
 * @param header header of the detail card
 * @param description description of the detail card
 * @param image image for the detail card
 * @param url Url for the link, when clicking on the card
 * Here the cards for the abc detail screen are created,
 * when clicking on a card on the abc screen
 */

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun AbcDetailSideCard(
    header: String,
    description: String,
    image: String,
    url: String
) {

    val uriHandler = LocalUriHandler.current


    Card(
        modifier = Modifier
            .padding(10.dp)
            .clip(RoundedCornerShape(15.dp))
            .width(310.dp),
        onClick = {
            uriHandler.openUri(url)
        },
        shape = MaterialTheme.shapes.medium,
        elevation = 5.dp,
        backgroundColor = MaterialTheme.colors.surface
    ) {
        Column()
        {
            //TODO: dynamic image, not static,no size needed with an static image ?
            Image(
                painter = rememberAsyncImagePainter(image),
                contentDescription = null,
                modifier = Modifier
                    .size(width = 310.dp, height = 160.dp)
                    .padding(bottom = 5.dp)
                    .fillMaxWidth()
                    .fillMaxHeight(),
                contentScale = ContentScale.FillWidth,



                )
            Text(
                text = header,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .padding(start = 10.dp, bottom = 5.dp, end = 10.dp)
                    .fillMaxWidth(),
            )


            Text(
                text = description,
                color = androidx.compose.ui.graphics.Color.Gray,

                style = MaterialTheme.typography.body2,
                modifier = Modifier.padding(start = 10.dp, bottom = 15.dp, end = 10.dp)
            )
            // }

        }
    }
}

@Preview
@Composable
fun AbcDetailSideCardPreview() {
    AbcDetailSideCard(
        header = "Header",
        description = "Description",
        image = "",
        url = "www.google.com"
    )
}
