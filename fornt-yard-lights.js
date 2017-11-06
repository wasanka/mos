load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');

let workTopic = '/devices/' + Cfg.get('device.id') + '/switch/';
let stateTopic = '/devices/' + Cfg.get('device.id') + '/state/';

// Blink built-in LED every second
GPIO.set_mode(14, GPIO.MODE_OUTPUT);
GPIO.set_mode(13, GPIO.MODE_OUTPUT);
GPIO.set_mode(12, GPIO.MODE_OUTPUT);
Timer.set(3000 /* 2 sec */, true /* repeat */, function() {

  let switchOne = GPIO.read(14);
  let switchTwo = GPIO.read(13);
  let switchThree = GPIO.read(12);
  
  MQTT.pub(stateTopic + "1", JSON.stringify(switchOne), 0);
  MQTT.pub(stateTopic + "2", JSON.stringify(switchTwo), 0);
  MQTT.pub(stateTopic + "3", JSON.stringify(switchThree), 0);
  
}, null);

MQTT.sub(workTopic + "1", function(conn, topic, msg) {
  print('Received:', workTopic + "1", '->', msg);
  if(msg === "on"){
    GPIO.write(14, 1);
  }else{
    GPIO.write(14, 0);
  }
}, null);
MQTT.sub(workTopic + "2", function(conn, topic, msg) {
  print('Received:', workTopic + "2", '->', msg);
  if(msg === "on"){
    GPIO.write(13, 1);
  }else{
    GPIO.write(13, 0);
  }
}, null);
MQTT.sub(workTopic + "3", function(conn, topic, msg) {
  print('Received:', workTopic + "3", '->', msg);
  if(msg === "on"){
    GPIO.write(12, 1);
  }else{
    GPIO.write(12, 0);
  }
}, null);