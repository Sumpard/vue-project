import BitSet from "BitSet";
import { ClassData } from "./curriculum";

const mapday = new Map<string, number>([
  ["星期一", 0],
  ["星期二", 1],
  ["星期三", 2],
  ["星期四", 3],
  ["星期五", 4],
  ["星期六", 5],
  ["星期日", 6],
]);

function mapDay(str: string) {
  return mapday.get(str)!;
}

export function ckey(cd: ClassData) {
  return `${cd.cid}-${cd.no}`;
}

export function splitkey(key: string): [string, string] {
  return key.split("-") as [string, string];
}

export class ClassSession {
  static tpDict = new Map<string, ClassSession[]>();

  constructor(
    public data: ClassData,
    public raw: string[],
    public week: number,
    public day: number,
    public tStart: number,
    public tEnd: number,
    public classroom: string
  ) {}

  /** 首尾序数，闭区间 */
  get ordinal() {
    const base = (this.week - 1) * 91 + this.day * 13;
    return [base + this.tStart, base + this.tEnd];
  }

  /** 排序键 */
  get sortingOrder() {
    return (this.day * 13 + this.tStart) * 17 + this.week;
  }

  /** 持续时间 */
  get span() {
    return this.tEnd - this.tStart + 1;
  }

  contains(t: number) {
    return t >= this.tStart && t <= this.tEnd;
  }

  /** 解析教学时间地点的字符串 */
  static parseTeachingPlace(cd: ClassData) {
    const teachingPlace = cd.teachingPlace;
    if (ClassSession.tpDict.has(teachingPlace)) {
      return ClassSession.tpDict.get(teachingPlace)!;
    }
    //有一个问题，周后面的内容可能会省略
    if (!teachingPlace || teachingPlace == "undefined") return [];
    let sp = teachingPlace
      .split(",")
      .filter(t => t != undefined)
      .map(str => str.split(" "));
    for (let i = sp.length - 1; i >= 0; i--) {
      if (sp[i].length <= 1) sp[i][1] = sp[i + 1][1];
      if (sp[i].length <= 2) sp[i][2] = sp[i + 1][2];
      if (sp[i].length <= 3) sp[i][3] = sp[i + 1][3];
    }
    ClassSession.tpDict.set(
      teachingPlace,
      sp
        .map(s => {
          let weekstr;
          let step = 1;
          if (s[0].endsWith(")")) {
            weekstr = s[0].slice(0, -4);
            step = 2;
          } else {
            weekstr = s[0].slice(0, -1);
          }
          let [t1, t2] = weekstr.split("-").map(t => parseInt(t));
          const arr = [];
          for (; t1 <= t2; t1 += step) {
            const [tStart, tEnd] = s[2]
              .slice(0, -1)
              .split("-")
              .map(t => parseInt(t) - 1);
            arr.push(new ClassSession(cd, s, t1, mapDay(s[1]), tStart, tEnd, s[3]));
          }
          return arr;
        })
        .flat()
        .sort((a, b) => a.ordinal[0] - b.ordinal[0])
    );
    return ClassSession.tpDict.get(teachingPlace)!;
  }
}

/** 课程对应的 */
export class TeachingPlaceInfo {
  sessions: ClassSession[];
  bits: BitSet;

  static tpiDict = new Map<string, TeachingPlaceInfo>();

  constructor(cd: ClassData) {
    this.sessions = ClassSession.parseTeachingPlace(cd);
    this.bits = new BitSet();
    for (const s of this.sessions) {
      const [tStart, tEnd] = s.ordinal;
      this.bits.setRange(tStart, tEnd);
    }
  }

  collides(other: ClassData) {
    return !TeachingPlaceInfo.get(other).bits.and(this.bits).isEmpty();
  }

  static get(cd: ClassData) {
    const key = ckey(cd);
    if (!TeachingPlaceInfo.tpiDict.has(key)) {
      TeachingPlaceInfo.tpiDict.set(key, new TeachingPlaceInfo(cd));
    }
    return TeachingPlaceInfo.tpiDict.get(key)!;
  }
}
