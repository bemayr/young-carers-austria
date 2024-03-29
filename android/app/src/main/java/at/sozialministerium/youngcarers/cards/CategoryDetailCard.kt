package at.sozialministerium.youngcarers.cards

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
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import at.sozialministerium.youngcarers.NavRoutes
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.data.api.models.Category

/**
 * @param category category data from the category model
 * @param navController navController for navigate to another page
 * Here the category detail cards for the insights detail screen are created
 */

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun CategoryDetailCard(
    category: Category,
    navController: NavHostController
) {
    val oldValue = "/"
    val newValue = "%2F"

    androidx.compose.material.Card(
        backgroundColor = Color.White,
        modifier = Modifier.fillMaxWidth(),
        onClick = {
            if (category.name.contains("/")) {
                val categoryName = category.name.replace(oldValue, newValue)
                navController.navigate(NavRoutes.Detail.route + "/${categoryName}")
            } else {
                navController.navigate(NavRoutes.Detail.route + "/${category.name}")
            }
        }
    ) {
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(
                category.name, style = TextStyle(
                    color = Color.Black,
                    fontSize = 20.sp,
                    textAlign = TextAlign.Left
                ),
                modifier = Modifier.padding(16.dp)
            )
            Icon(
                imageVector = Icons.Filled.KeyboardArrowRight,
                contentDescription = R.string.contentDescription.toString(),
                modifier = Modifier.padding(end = 10.dp, top = 16.dp)
            )
        }
    }
}

@Preview
@Composable
fun CategoryDetailCardPreview() {
    val category = Category(emptyList(), "id","Info...", "Category Name", "Category Title")
    CategoryDetailCard(
        category = category,
        navController = rememberNavController(navigators = emptyArray())
    )
}