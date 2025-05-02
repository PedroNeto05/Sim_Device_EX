const { Saiot, Sensor } = require("@saiot2/device");
const { execSync } = require('child_process');

const saiotDevice = new Saiot(
  "Dispositivo geral",
  "geral",
  "Dispositivo que contêm todos os sensores e atuadores disponíveis"
);

let numericSensorState = 0;


function numericSensor() {
  try {
    const result = execSync('python ./main.py', { encoding: 'utf-8' });
    numericSensorState = Number(result.trim());
  } catch (error) {
    console.error('Error executing Python script:', error);
    numericSensorState = 0; // Default value in case of error
  }
  return numericSensorState;
}

function numericSensorCallback() {
  return numericSensor();
}

function setup() {
  saiotDevice.setLogin("teste@teste.com", "0123456789");
  saiotDevice.setBrokerUrl("mqtt://localhost:3002");

  const numericSensor = new Sensor(
    "number",
    "Sensor numérico",
    "number",
    numericSensorState,
    2,
    numericSensorCallback
  );

  saiotDevice.addSensor(numericSensor);

  saiotDevice.start();
}

function loop() {
  saiotDevice.loop();
}

setup();
loop();
