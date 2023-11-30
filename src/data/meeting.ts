export class MeetingSession {
  //span: number | undefined;

  constructor(
    public start_time: number,
    public end_time: number,
    public pname: string,
    public room: number,
    public theme: string
  ) {}

      /** 持续时间 */
  get span() {
    return Math.floor((this.end_time - this.start_time) / 2700000);
  } 
}