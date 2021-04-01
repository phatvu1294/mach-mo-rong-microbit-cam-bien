let buff1 = ""
let buff2 = ""
let buff3 = ""
let buff4 = ""
let adcVal: number = 0
let voltage: number = 0
let temp: number = 0
let t: number = 0
let h: number = 0

I2C_LCD1602.LcdInit(39)
I2C_LCD1602.on()

basic.forever(function () {
    dht11_dht22.queryData(DHTtype.DHT11, DigitalPin.P8, false, false, false)

    if (dht11_dht22.readDataSuccessful()) {
        h = Math.round(dht11_dht22.readData(dataType.humidity));
        t = Math.round(dht11_dht22.readData(dataType.temperature));

        buff1 = t.toString() + "C"
        buff2 = h.toString() + "%"
    }

    adcVal = pins.analogReadPin(AnalogPin.P0)
    voltage = Math.map(adcVal, 0, 1023, 0, 3.15)
    voltage = Math.roundWithPrecision(voltage, 3)
    buff3 = "V=" + voltage.toString().substr(0, 5) + "V    "

    adcVal = pins.analogReadPin(AnalogPin.P2)
    temp = Math.map(adcVal, 0, 1023, 0, 315)
    temp = Math.roundWithPrecision(temp, 3)
    buff4 = "T=" + temp.toString().substr(0, 5) + "C    "

    I2C_LCD1602.ShowString(buff3, 0, 0)
    I2C_LCD1602.ShowString(buff1, 13, 0)
    I2C_LCD1602.ShowString(buff4, 0, 1)
    I2C_LCD1602.ShowString(buff2, 13, 1)
})



