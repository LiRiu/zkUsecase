//@ts-ignore
import { Bytes, Event } from "@hyperoracle/zkgraph-lib";
import { Enter } from "./utils/parser";

export function handleEvents(events: Event[]): Bytes {
  let resultBytes = Bytes.empty();

  for (let i = 0; i <= events.length - 1; i++) {
    const event = events[i];
    const enter = Enter.fromEvent(event);
    resultBytes.concat(enter.toBytes());
  }

  return resultBytes;
}