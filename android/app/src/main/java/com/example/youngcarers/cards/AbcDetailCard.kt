package com.example.youngcarers.cards

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Card
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Icon
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.youngcarers.NavRoutes
import com.example.youngcarers.data.api.models.Abc

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun AbcDetailCard(data: Abc, navController: NavHostController, onClick: (Int) -> Unit) {

    var viewTitle = data.name


    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(1.dp)

    ) {
        Card(
            backgroundColor = Color.White,
            modifier = Modifier.fillMaxWidth(),
            onClick = {
                //Todo "/" error handling
                if(viewTitle.contains("/")){
                    viewTitle = viewTitle.replace("/","")
                }
                navController.navigate(NavRoutes.Detail.route + "/$viewTitle")
            }
        ) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier
                    .fillMaxWidth()

            ) {
                Text(
                    data.name, style = TextStyle(
                        color = Color.Black,
                        fontSize = 20.sp,
                        textAlign = TextAlign.Left
                    ), modifier = Modifier.padding(16.dp)
                )

                    Icon(

                        imageVector = Icons.Filled.KeyboardArrowRight,
                        contentDescription = "Forward",
                        modifier = Modifier.padding(end = 10.dp, top = 16.dp)

                    )

            }
        }
    }
}
