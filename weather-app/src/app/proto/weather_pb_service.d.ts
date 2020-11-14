// package: weather
// file: weather.proto

import * as weather_pb from "./weather_pb";
import {grpc} from "@improbable-eng/grpc-web";

type WeatherGetWeather = {
  readonly methodName: string;
  readonly service: typeof Weather;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof weather_pb.WeatherRequest;
  readonly responseType: typeof weather_pb.WeatherResponse;
};

export class Weather {
  static readonly serviceName: string;
  static readonly GetWeather: WeatherGetWeather;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class WeatherClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getWeather(requestMessage: weather_pb.WeatherRequest, metadata?: grpc.Metadata): ResponseStream<weather_pb.WeatherResponse>;
}

