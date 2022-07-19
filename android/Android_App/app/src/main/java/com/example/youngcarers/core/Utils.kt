package com.example.youngcarers.core

// TODO: Remove this file, when the api is finish

data class Help(
    val id: Int,
    val header: String,
    val description: String,
    val imageRes : Int
)

data class Detail(
    val id: Int,
    val header: String,
    val description: String,
    val imageRes : Int
)

// Help view data
const val helpHeaderTxt = "Hallo!"
const val helpBodyTxt = "Hier bist du auf der Young Carers App gelandet. Vielleicht hast du ja eine der folgenden Fragen oder du erlebst auch gerade eine dieser Situationen?"
const val head1 = "Für alle Fälle - Hilfe und Notrufe"
const val body1 = "Hier sind alle wichtigen Telefonnummern zu Notruf Hotlines, Vergiftungsinformationszentrale, ..."
const val head2 = "Dir ist alles zu viel?"
const val body2 = "Manchmal kann es einem so vorkommen, als wäre einfach alles viel zu viel, hier siehst du, dass du nicht alleine bist und was du tun kannst, bzw. wer für dich da ist."
const val head3 = "Hände waschen - ein Kinderspiel"
const val body3 = "Mit diesen Tipps und Tricks erfährst du, wie deine Hände richtig sauber werden"
const val helpBodyBottom = "Du hast nicht gefunden wonach du gesucht hast, vielleicht wirst du im Young Carers ABC fündig?"
val helps = listOf(
    Help(1,head1, body1, 1),
    Help(2,head2, body2,2),
    Help(3,head3, body3,3)
)
val detail = Detail(1,head1, body1, 1)

// ABC view data
const val abcHeaderTxt = "Young Carers ABC"
const val abcBodyTxt = "Hier haben wir alle Informationen für dich gesammelt und alphabetisch sortiert " +
        "Schau einfach ein bisschen durch, frag den Chatbot oder probiere die Suche " +
        "wenn du Infos zu einem speziellen Thema haben möchtest "

// About view data
const val aboutHeaderTxt = "Über die App und Rechtliches"
const val aboutBodyTxt = "Hallo. Ich bin ein kleiner Blindtext. Und zwar schon so lange ich denken kann. Es war nicht leicht zu verstehen, was es bedeutet, ein blinder Text zu sein: Man ergibt keinen Sinn. Wirklich keinen Sinn. Man wird zusammenhangslos eingeschoben und rumgedreht – und oftmals gar nicht erst gelesen. "

//Emergency view data
data class Emergency(
    val id: Int,
    val header: String,
    val description: String,
    val imageRes : Int
)
data class Tel(
    val header: String
)
fun getEmergencyList() = listOf(
    Emergency(1,emghead1, emgbody1, 1),
    Emergency(2,emghead2, emgbody2,2),
    Emergency(3,emghead3, emgbody3,3)
)
const val emghead1 = "Für alle Fälle - Hilfe und Notrufe"
const val emgbody1 = "Hier sind alle wichtigen Telefonnummern zu Notruf Hotlines, Vergiftungsinformationszentrale, ..."
const val emghead2 = "Wie funktioniert ein Notruf?"
const val emgbody2 = "Hier wird es dir erklärt"
const val emghead3 = "1x1 der Ersten Hilfe"
const val emgbody3 = "Informationen über richtiges Handel, bei einem Notfall"

const val emgRettung = "144 - Rettung"
const val emgPolice = "133 - Polizei"
const val emgFire = "122 - Feuerwehr"
const val emgEuro = "112 - Euronotruf"
const val emgBerg = "140 - Bergrettung"
const val emgGehör = "0800 133 133 - Notruf für Gehörlose"
const val emgRatAufDraht = "147 - Rat auf Draht"
const val emgSeelsorge = "142 - Telefonseelsorge"
const val  emgNotdienst = "141 - Ärztenotdienst"

fun getTelList() = listOf(
    Tel(emgRettung),
    Tel(emgPolice),
    Tel(emgFire),
    Tel(emgEuro),
    Tel(emgRatAufDraht),
    Tel(emgSeelsorge),
    Tel(emgNotdienst),
    Tel(emgBerg)
)
val emergency = listOf(
    Emergency(1,emghead1, emgbody1, 1),
    Emergency(2,emghead2, emgbody2,2),
    Emergency(3,emghead3, emgbody3,3)
)
val tel = listOf(
    Tel(emgRettung),
    Tel(emgPolice),
    Tel(emgFire),
    Tel(emgEuro),
    Tel(emgRatAufDraht),
    Tel(emgSeelsorge),
    Tel(emgNotdienst),
    Tel(emgBerg)
)

