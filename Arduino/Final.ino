//#include <avr/pgmspace.h>
#include <EEPROM.h>
#include "etherShield.h"
#include "ETHER_28J60.h"
#define LED 1
#define FRENTE 9
#define TRAS 8



static uint8_t mac[6] = {
  0x54, 0x55, 0x58, 0x10, 0x00, 0x25};   // Só precisa ser unico, 

static uint8_t ip[4] = {
  192, 168, 1, 130}; // 192, 168, 0, 15 IP address for UDESC

static uint16_t port = 80; // Usar porta 80 - Default para HTTP

ETHER_28J60 e;



void setup() {            
  
  pinMode(LED,OUTPUT);
  pinMode(FRENTE, OUTPUT);
  pinMode(TRAS, OUTPUT);
  digitalWrite(FRENTE, LOW);
  digitalWrite(TRAS, LOW);  
  e.setup(mac, ip, port);
}

unsigned int displayInt;

void loop() {
  char* params;
  if (params = e.serviceRequest())
  {
   
    if (strcmp(params, "?atuador=click1") == 0)
    {
      digitalWrite(TRAS, LOW);
      digitalWrite(FRENTE, HIGH);
      delay(500);
      digitalWrite(FRENTE, LOW);
      delay(100);
      e.print("frente_ok");
    }
    else if (strcmp(params, "?atuador=click0") == 0)
    {
      digitalWrite(FRENTE, LOW);
      digitalWrite(TRAS, HIGH);
      delay(500);
      digitalWrite(TRAS, LOW);
      delay(100);
      e.print("tras_ok");
    }
        else if (strcmp(params, "?atuador=continuos1") == 0)
    {
      digitalWrite(TRAS, LOW);
      digitalWrite(FRENTE, HIGH);
      e.print("frente_continuos_ok");
    }
        else if (strcmp(params, "?atuador=continuos0") == 0)
    {
      digitalWrite(FRENTE, LOW);
      digitalWrite(TRAS, HIGH);
      e.print("tras_continuos_ok");
    }
            else if (strcmp(params, "?atuador=stop") == 0)
    {
      digitalWrite(FRENTE, LOW);
      digitalWrite(TRAS, LOW);
      e.print("stopped");
    }
    else
    {
      e.print("ERROR...");
    }
    e.respond();
  }
}







