#include <Arduino.h>
#include "DHT.h"

#define pin 3
DHT dht;

void dhtLoop();
void highLowLed();

void setup()
{
  pinMode(pin, OUTPUT);
  Serial.begin(9600);
  dht.setup(2);
}

void loop()
{
  dhtLoop();
}

void dhtLoop()
{
  highLowLed();
  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();
  Serial.println(humidity, 1);
  Serial.println(temperature, 1);
  Serial.println(dht.toFahrenheit(temperature), 1);
}

void highLowLed()
{
  digitalWrite(pin, HIGH);
  delay(1000);
  digitalWrite(pin, LOW);
  delay(1000);
}
