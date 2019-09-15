#include "SoftwareSerial.h"
String ssid = "Home.V";
String password = "3E3FDA79FH99HCH9";
#define rxPin 7
#define txPin 6
SoftwareSerial esp(rxPin,txPin);// RX, TX
String data;
String server = "biogasproject.000webhostapp.com"; // www.example.com
String uri = "/addData.php";// our example is /esppost.php
int index = 0;
char buffer[8];
int wifiCheck = 0;
int maxCheck = 10;

void setup() {
  //pinMode (DHpin, OUTPUT);
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  esp.begin(115200);
  Serial.begin(115200);
  reset();
  connectWifi();
  esp.println("AT+CIPMUX=0");
}

void loop () {
// data sent must be under this form //name1=value1&name2=value2.
  String num = itoa(index,buffer,10);
  data = "string=" + num;// data sent must be under this form //name1=value1&name2=value2.
  httppost();
  // int num = (int)index;
  // num++;
  delay(1000);
}

//
// Functions
//

//reset the esp8266 module
void reset() {
  esp.println("AT+RST");
  delay(1000);
  if (esp.find("OK") ) Serial.println("Module Reset");
}

//connect to your wifi network
void connectWifi() {
  String cmd = "AT+CWJAP=\"" + ssid + "\",\"" + password + "\"";
  esp.println(cmd);
  delay(3000);
  if (esp.find("OK")) {
    Serial.println("Connected!");
  }
  else {
    Serial.println("Cannot connect to wifi");
    connectWifi();
  }
}

void httppost () {

  esp.println("AT+CIPSTART=\"TCP\",\"" + server + "\",80");//start a TCP connection.
  Serial.println("AT+CIPSTART=\"TCP\",\"" + server + "\",80");
  delay(50);
  //Serial.println(esp.readString());
  if (esp.find("OK")) {
    wifiCheck = 0;
    Serial.println("TCP connection ready");
    String postRequest =
      "POST " + uri + " HTTP/1.1\r\n" +
      "Host: " + server + "\r\n" +
      "Accept: *" + "/" + "*\r\n" +
      "Content-Length: " + data.length() + "\r\n" +
      "Content-Type: application/x-www-form-urlencoded\r\n" +
      "\r\n" + data;
    String sendCmd = "AT+CIPSEND=";//determine the number of caracters to be sent.
    esp.print(sendCmd);
    esp.println(postRequest.length());
    //Serial.println(esp.readString());
    Serial.println(sendCmd + postRequest.length());
    delay(100);
    if (esp.find(">")) {
      Serial.println("Sending.."); esp.print(postRequest);
      Serial.println(postRequest);
      //esp.println(postRequest.length());
      if (esp.find("SEND OK")) {
        Serial.println("Packet sent");
        index++;
        while (esp.available()) {
          String tmpResp = esp.readString();
          Serial.println(tmpResp);
        }
      }
    }
  }
  else{
    Serial.println("Connection not Established");
    if (wifiCheck > maxCheck) {
      connectWifi();
      wifiCheck = 0;
    }
    wifiCheck++;
  }
  // close the connection
  esp.println("AT+CIPCLOSE");
  Serial.println(wifiCheck);
}
