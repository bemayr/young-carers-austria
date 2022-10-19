package at.sozialministerium.youngcarers

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4

import org.junit.Test
import org.junit.runner.RunWith
import org.junit.Rule

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4::class)
class IntegrationTests {

    @get:Rule
    val composeTestRule = createAndroidComposeRule(MainActivity::class.java)


    @Test
    fun testBottomBarNavigation() {

        composeTestRule.onNodeWithText("Hilfe").assertIsSelected()
        composeTestRule.onNodeWithText("Hallo!").assertIsDisplayed()
        composeTestRule.onNodeWithText("ABC").performClick()
        composeTestRule.onNodeWithText("Hilfe").assertIsNotSelected()
        composeTestRule.onNodeWithText("ABC").assertIsSelected()
        composeTestRule.onNodeWithTag("abcScreen").assertIsDisplayed()
        composeTestRule.onNodeWithText("Young Carers ABC").assertIsDisplayed()
    }

    @Test
    fun testNavigationToInsightsDetailScreen() {

        composeTestRule.onNodeWithTag("helpScreen").assertIsDisplayed()
    }
}