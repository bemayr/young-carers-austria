package com.example.youngcarers.cards

import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.youngcarers.R

/**
 * @param title title of the card
 * Here the call number cards for the emergency screen are created
 */

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun EmergencyNumberCard(name: String, number: String) {

            GreetingView(name = name, number = number) {

            }


}

@Composable
private fun GreetingView(name: String, number: String, onClick: (msg: String) -> Unit) {
    val name = "$name"
    val number = "$number"
    val context = LocalContext.current
    Card(
        backgroundColor = Color.White,
        modifier = Modifier
            .padding(horizontal = 8.dp, vertical = 2.dp)
            .clickable( onClick = {
                val u = Uri.parse("tel:" + number)
                val i = Intent(Intent.ACTION_DIAL, u)
                try {
                    context.startActivity(i)
                }catch (s: SecurityException){
                    Toast.makeText(context, "An error occurred", Toast.LENGTH_LONG)
                        .show()
                }


            } )
    ) {
        Row(modifier = Modifier
            .padding(12.dp)
            .fillMaxWidth()
           ) {
            Text(text = name, color = colorResource(id = R.color.yc_red_dark))
            Spacer(modifier = Modifier.weight(1f))
            Text(text = number, color = colorResource(id = R.color.yc_red_dark), fontWeight = FontWeight.Bold)
        }
    }
}


@Preview()
@Composable
fun EmergencyNumberCardPreview() {
    EmergencyNumberCard(name = "Notruf", number = "112")
}