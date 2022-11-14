package at.sozialministerium.youngcarers.cards

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
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.NavRoutes
import at.sozialministerium.youngcarers.R
import at.sozialministerium.youngcarers.data.api.models.Insight

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun InsightsCard(
    data: Insight,
    navController: NavHostController,
    index: Int
) {

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(1.dp)
    ) {
        Card(
            backgroundColor = Color.White,
            modifier = Modifier.fillMaxWidth().padding(start = 20.dp, end = 20.dp),
            onClick = {
                navController.navigate(NavRoutes.InsightsDetail.route + "/$index")
            }
        ) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    data.question, style = TextStyle(
                        color = Color.Black,
                        textAlign = TextAlign.Left
                    ), modifier = Modifier.padding(10.dp)
                )
                Icon(
                    imageVector = Icons.Filled.KeyboardArrowRight,
                    contentDescription = R.string.contentDescription.toString(),
                    modifier = Modifier.padding(end = 10.dp, top = 10.dp)
                )
            }
        }
    }
}