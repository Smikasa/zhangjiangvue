module.exports = {
    '/(passengerFlow|baseStation|task|faultAlarm|performanceWarning|testInstructions|baseStation|people|userconf|portal|oss|VMOCX|console|vehiclelib|connectplus|eaplog|notes)': {
        target: 'http://218.77.106.72:1029',
        changeOrigin: false
    }
};