package com.example.youngcarers

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.example.youngcarers.core.*
import com.example.youngcarers.data.api.models.Abc
import com.example.youngcarers.cards.AbcDetailCard
import com.example.youngcarers.ui.theme.*

@Composable
fun ABC_Screen(
    categories: List<Abc>,
    navigateToDetail: (questionIndex: String) -> Unit,
    navController: NavHostController
) {
    var selectedIndex by remember { mutableStateOf(-1) }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colorBackground)
            .verticalScroll(rememberScrollState())
            .padding(bottom = 80.dp)

    ) {
        Text(
            abcHeaderTxt,
            color = colorDarkRed,//colorResource(id = R.color.yc_red_dark),
            fontSize = 35.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(start = 20.dp, top = 60.dp)
        )//TODO: txt from api
        Text(
            abcBodyTxt,
            modifier = Modifier.padding(start = 20.dp, top = 10.dp, end = 40.dp, bottom = 20.dp)
        )//TODO: txt from api
        categories.forEach { item ->
            AbcDetailCard(data = item, navController) { i ->
                selectedIndex = i
            }
        }
    }

}

@Preview(showBackground = true)
@Composable
fun ABCScreenPreview() {
    /*ABC_Screen(
        getABCList(),
        navController = NavHostController(context = LocalContext.current)
    )*/
}


