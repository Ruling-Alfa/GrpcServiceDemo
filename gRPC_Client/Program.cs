using Grpc.Core;
using Grpc.Net.Client;
using GrpcServiceBackend;
using System;
using System.Threading.Tasks;

namespace gRPC_Client
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var channel = GrpcChannel.ForAddress("https://localhost:5001");
            var client = new Greeter.GreeterClient(channel);
            var requestObj = new HelloRequest()
            {
                Name = "Neel"
            };
            var resp = client.SayHelloStream(requestObj);
            var responseObjs = resp.ResponseStream.ReadAllAsync();
            await foreach(var respObj in responseObjs)
            {
                Console.WriteLine(respObj);
            }
            
        }
    }
}
