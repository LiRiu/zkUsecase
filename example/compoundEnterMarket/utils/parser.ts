// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class Enter {
  public borrower: Address;
  public cToken: Address;

  constructor(borrower: Address, cToken: Address) {
    this.borrower = borrower;
    this.cToken = cToken;
  }

  static fromEvent(event: Event): Enter {
    const cToken = Address.fromBytes(event.topic1.slice(12, 32));
    const borrower = Address.fromBytes(event.topic2.slice(12, 32));

    return new Enter(borrower, cToken);
  }

  toBytes(): Bytes {
    let bytes = Bytes.empty();
    bytes.concat(Bytes.fromHexString(this.borrower.toString()).padStart(32,0));
    bytes.concat(Bytes.fromHexString(this.cToken.toString()).padStart(32,0));
    return bytes;
  }
}