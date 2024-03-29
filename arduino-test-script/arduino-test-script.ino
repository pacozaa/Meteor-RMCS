/*
  Serial Event example
 
 When new serial data arrives, this sketch adds it to a String.
 When a newline is received, the loop prints the string and 
 clears it.
 
 A good test for this is to try it with a GPS receiver 
 that sends out NMEA 0183 sentences. 
 
 Created 9 May 2011
 by Tom Igoe
 
 This example code is in the public domain.
 
 http://www.arduino.cc/en/Tutorial/SerialEvent
 
 */

String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete
double lati = 13.8600000;
double longti = 100.8600000;
void setup() {
  // initialize serial:
  delay(5000);
  Serial.begin(9600);
  delay(1000);
  Serial.println("launch");
  // reserve 200 bytes for the inputString:
  inputString.reserve(200);
}

void loop() {

    Serial.print("GP,"); 
    Serial.print(lati,7);
    Serial.print(",");
    Serial.println(longti,7);
delay(1000);
lati+=0.005;
longti+=0.005;
}

/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read(); 
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    } 
  }
}


