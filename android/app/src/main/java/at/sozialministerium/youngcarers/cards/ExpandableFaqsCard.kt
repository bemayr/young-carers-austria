package at.sozialministerium.youngcarers.cards

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.Card
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import at.sozialministerium.youngcarers.MarkdownText
import at.sozialministerium.youngcarers.data.api.models.Faq

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun ExpandedFaqsCard(data: Faq) {

    var expanded by remember { mutableStateOf(false) }
    val rotateState = animateFloatAsState(
        targetValue = if (expanded) 180F else 0F,
    )

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(1.dp)
            .background(Color.Transparent)
    ) {
        Card(
            onClick = { expanded = !expanded },
            modifier = Modifier.padding(start = 20.dp, end = 20.dp)
        )
        {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                MarkdownText(
                    markdown = data.question,
                    modifier = Modifier.fillMaxWidth(0.92F),
                    style = MaterialTheme.typography.subtitle1
                )
                Icon(
                    Icons.Default.ArrowDropDown, "",
                    modifier = Modifier.rotate(rotateState.value)
                )
            }
        }
        AnimatedVisibility(
            visible = expanded,
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp, vertical = 16.dp)
            ) {
                MarkdownText(
                    markdown = data.answer
                )
            }
        }
    }
}