#include <Arduino.h>
#include "DHT.h"

#define pin 3
DHT dht;

void dhtLoop();
void Led();

void setup()
{
  pinMode(pin, OUTPUT);
  Serial.begin(9600);
  dht.setup(2);
}

void loop()
{
  Led();
  dhtLoop();
}

void dhtLoop()
{
  delay(2000);
  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();
  if (!isnan(humidity) && !isnan(temperature))
  {
    Serial.print(humidity, 1);
    Serial.print(",");
    Serial.print(temperature, 1);
    Serial.print(",");
    Serial.print(dht.toFahrenheit(temperature), 1);
    Serial.println();
  }
}

void Led()
{
  if (Serial.available())
  {
    switch (Serial.read())
    {
    case 'a':
      digitalWrite(pin, HIGH);
      break;
    case 'b':
      digitalWrite(pin, LOW);
      break;
    }
  }
}
