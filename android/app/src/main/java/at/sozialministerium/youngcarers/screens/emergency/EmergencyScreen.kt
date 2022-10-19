package at.sozialministerium.youngcarers

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.text.ClickableText
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import at.sozialministerium.youngcarers.cards.EmergencyNumberCard
import at.sozialministerium.youngcarers.core.emergency_number_names
import at.sozialministerium.youngcarers.core.emergency_numbers
import at.sozialministerium.youngcarers.screens.emergency.EmergencyViewModel
import org.koin.androidx.compose.getViewModel

/**
 * @param navController navController to another page
 * Generate the emergency page with title, body, phone number cards and insights detail cards
 */

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun EmergencyScreen(
    navController: NavHostController
) {

    val viewModel = getViewModel<EmergencyViewModel>()
    val uriHandler = LocalUriHandler.current

    Scaffold(
        backgroundColor = colorResource(id = R.color.yc_background),
        modifier = Modifier.padding(bottom = 55.dp)
    ) {
        LazyColumn(
            Modifier.fillMaxWidth(),
            contentPadding = PaddingValues(16.dp)

        ) {
            item {

                Text(
                    stringResource(R.string.emergency_title),
                    color = colorResource(id = R.color.yc_red_dark),
                    fontSize = 35.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(start = 20.dp, top = 60.dp)
                )
                Text(
                    stringResource(R.string.emergency_quick_help),
                    modifier = Modifier.padding(
                        start = 20.dp,
                        top = 10.dp,
                        end = 20.dp,
                        bottom = 10.dp
                    )
                )


                /* Column(
                    modifier = Modifier
                        .fillMaxWidth()
                ) {
                   // for (number in getPhoneList()) {
                       // EmergencyNumberCard(title = number.header)
                    //}
                    EmergencyNumberCard(numbers = getPhoneList())
                }*/

            }

            itemsIndexed(items = emergency_number_names()) { index, name ->
                EmergencyNumberCard(name = name, number = emergency_numbers().elementAt(index))
            }

            val annotatedLinkString: AnnotatedString = buildAnnotatedString {

                val str = "Mehr Info zu den Notrufnummern findest du auf www.oesterreich.gv.at."
                append(str)
                addStyle(
                    style = SpanStyle(
                        color = Color(0xFF700009),
                        fontSize = 14.sp,
                    ), start = 0, end = str.length
                )

                addStringAnnotation(
                    tag = "URL",
                    annotation = "https://www.oesterreich.gv.at",
                    start = 0,
                    end = str.length
                )

            }

            item {
                ClickableText(
                    modifier = Modifier
                        .padding(all = 16.dp)
                        .fillMaxWidth(),
                    text = annotatedLinkString,
                    onClick = {
                        annotatedLinkString
                            .getStringAnnotations("URL", it, it)
                            .firstOrNull()?.let { stringAnnotation ->
                                uriHandler.openUri(stringAnnotation.item)
                            }
                    }
                )
            }

            item {
                Text(
                    stringResource(R.string.emergency_title_preparation),
                    modifier = Modifier
                        .padding(
                            top = 20.dp,
                            start = 20.dp,
                            end = 40.dp
                        )
                )
            }


        }


    }

}

