// package: weather
// file: weather.proto

var weather_pb = require("./weather_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Weather = (function () {
  function Weather() {}
  Weather.serviceName = "weather.Weather";
  return Weather;
}());

Weather.GetWeather = {
  methodName: "GetWeather",
  service: Weather,
  requestStream: false,
  responseStream: true,
  requestType: weather_pb.WeatherRequest,
  responseType: weather_pb.WeatherResponse
};

exports.Weather = Weather;

function WeatherClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

WeatherClient.prototype.getWeather = function getWeather(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Weather.GetWeather, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.WeatherClient = WeatherClient;

