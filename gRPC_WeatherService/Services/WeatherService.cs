using Grpc.Core;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gRPC_WeatherService
{
    public class WeatherService : Weather.WeatherBase
    {
        private readonly Random _random;
        public WeatherService()
        {
            _random = new Random();
        }
        public override async Task GetWeather(WeatherRequest request, IServerStreamWriter<WeatherResponse> responseStream, ServerCallContext context)
        {
            foreach (var item in getWeatherData())
            {
                await responseStream.WriteAsync(item);
            }
        }

        private IEnumerable<WeatherResponse> getWeatherData()
        {
            for(int i = 0;i < 10; i++)
            {
                yield return new WeatherResponse()
                {
                    Name = $"City{i}",
                    Temp = _random.Next()
                };
            }
        }
    }
}
