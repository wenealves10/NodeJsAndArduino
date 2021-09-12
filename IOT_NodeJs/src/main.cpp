#include <Arduino.h>

#define pin 3

void setup()
{
  pinMode(pin, OUTPUT);
}

void loop()
{
  digitalWrite(pin, HIGH);
  delay(300);
  digitalWrite(pin, LOW);
  delay(300);
}