export default class CodeFile {
  id: number;
  type: string;
  contents: string;
  name: string;

  // id: 0-indexed order for this file
  // name: name of this file
  // contents: file contetns
  // type: type of file (for highlighting)
  constructor(id: number, name: string, contents: string, type: string) {
    this.id = id;
    this.name = name;
    this.contents = contents;
    this.type = type;
  }

  rawObject(): { id: number, name: string, contents: string, type: string } {
    return {
      id: this.id,
      name: this.name,
      contents: this.contents,
      type: this.type
    }
  }

  // return json-serialized file
  serialize(): string {
    return JSON.stringify(this.rawObject());
  }
}