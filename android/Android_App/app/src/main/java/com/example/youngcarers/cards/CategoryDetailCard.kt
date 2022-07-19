package com.example.youngcarers.cards

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
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
import com.example.youngcarers.data.api.models.Category

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun CategoryDetailCard(category: Category, navController: NavHostController) {
    androidx.compose.material.Card(
        backgroundColor = Color.White,
        modifier = Modifier.fillMaxWidth(),
        onClick = {
            navController.navigate(NavRoutes.Detail.route + "/${category.name}")
        }
    ) {
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier
                .fillMaxWidth()
        ) {
            Text(
                category.name, style = TextStyle(
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