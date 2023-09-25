// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class Pay {
  public receipient: Address;
  public cToken: Address;
  public value: BigInt;

  constructor(receipient: Address, cToken: Address, value: BigInt) {
    this.receipient = receipient;
    this.cToken = cToken;
    this.value = value;
  }

  /**
   * Creates a Pay object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @return {Pay} The created Pay object.
   */
  static fromEvent(event: Event): Pay {
    const cToken = Address.fromBytes(event.topic1.slice(12, 32));
    const receipient = Address.fromBytes(event.topic3.slice(12, 32));
    const value = BigInt.fromBytes(event.data);

    return new Pay(receipient, cToken, value);
  }

  /**
   * Converts the function body to bytes.
   * {receipient} Liquidate Profit is {value}
   *
   * @return {Bytes} The bytes representation of the function body.
   */
  toBytes(): Bytes {
    let bytes = Bytes.empty();
    bytes.concat(
      Bytes.fromHexString(this.receipient.toString()).padStart(32, 0),
    );
    bytes.concat(Bytes.fromHexString(this.value.toString(16)).padStart(32, 0));
    return bytes;
  }
}
